
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import webpush from '@/lib/web-push-config';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    const { title, body, url, type, data } = await request.json();

    // Criar registro de notificação
    const notification = await prisma.notification.create({
      data: {
        userId: user.id,
        title,
        message: body,
        body,
        type: type || 'promotional',
        data: JSON.stringify(data || {}),
      },
    });

    // Buscar subscrições do usuário
    const subscriptions = await prisma.notificationSubscription.findMany({
      where: { userId: user.id },
    });

    // Verificar preferências
    const preferences = await prisma.notificationPreferences.findUnique({
      where: { userId: user.id },
    });

    if (!preferences?.enabled) {
      return NextResponse.json({ 
        success: false, 
        message: 'Notificações desabilitadas pelo usuário' 
      });
    }

    // Enviar notificação para todas as subscrições
    const payload = JSON.stringify({
      title,
      body,
      url: url || '/',
      data,
      notificationId: notification.id,
    });

    interface SendResult {
      success: boolean;
      subscriptionId: string;
      error?: any;
    }

    const sendPromises = subscriptions.map(async (subscription): Promise<SendResult> => {
      try {
        const keys = JSON.parse(subscription.keys);
        await webpush.sendNotification(
          {
            endpoint: subscription.endpoint,
            keys: {
              p256dh: keys.p256dh,
              auth: keys.auth,
            },
          },
          payload
        );
        return { success: true, subscriptionId: subscription.id };
      } catch (error: any) {
        console.error('Erro ao enviar notificação:', error);
        
        // Se a subscrição expirou ou é inválida, remover
        if (error.statusCode === 410 || error.statusCode === 404) {
          await prisma.notificationSubscription.delete({
            where: { id: subscription.id },
          });
        }
        
        return { success: false, subscriptionId: subscription.id, error };
      }
    });

    const results = await Promise.all(sendPromises);
    const successCount = results.filter((r: SendResult) => r.success).length;

    // Atualizar status da notificação
    if (successCount > 0) {
      await prisma.notification.update({
        where: { id: notification.id },
        data: {
          sent: true,
          sentAt: new Date(),
        },
      });
    }

    return NextResponse.json({
      success: true,
      notificationId: notification.id,
      sent: successCount,
      total: subscriptions.length,
    });
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
    return NextResponse.json(
      { error: 'Erro ao enviar notificação' },
      { status: 500 }
    );
  }
}
