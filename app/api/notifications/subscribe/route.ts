
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

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

    const subscription = await request.json();

    // Verificar se já existe uma subscrição para esse usuário
    const existingSubscription = await prisma.notificationSubscription.findUnique({
      where: { userId: user.id },
    });

    let savedSubscription;
    
    if (existingSubscription) {
      // Atualizar a subscrição existente
      savedSubscription = await prisma.notificationSubscription.update({
        where: { userId: user.id },
        data: {
          subscriptionId: subscription.endpoint,
          endpoint: subscription.endpoint,
          keys: JSON.stringify(subscription.keys),
        },
      });
    } else {
      // Criar nova subscrição
      savedSubscription = await prisma.notificationSubscription.create({
        data: {
          userId: user.id,
          subscriptionId: subscription.endpoint,
          endpoint: subscription.endpoint,
          keys: JSON.stringify(subscription.keys),
        },
      });
    }

    // Criar preferências padrão se não existirem
    const preferences = await prisma.notificationPreferences.findUnique({
      where: { userId: user.id },
    });

    if (!preferences) {
      await prisma.notificationPreferences.create({
        data: {
          userId: user.id,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao salvar subscrição:', error);
    return NextResponse.json(
      { error: 'Erro ao salvar subscrição' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
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

    await prisma.notificationSubscription.delete({
      where: { userId: user.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao remover subscrição:', error);
    return NextResponse.json(
      { error: 'Erro ao remover subscrição' },
      { status: 500 }
    );
  }
}
