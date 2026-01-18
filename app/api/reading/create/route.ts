
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
// import { // sendBehaviorTriggeredNotification } from '@/lib/notification-scheduler';

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

    const { spreadType, question, cards, interpretation } = await request.json();

    // Criar a leitura
    const reading = await prisma.reading.create({
      data: {
        userId: user.id,
        spreadType,
        question: question || null,
        interpretation,
        cards: {
          create: cards.map((card: any, index: number) => ({
            cardId: card.id,
            position: index,
            isReversed: card.isReversed || false,
          })),
        },
      },
      include: {
        cards: {
          include: {
            card: true,
          },
        },
      },
    });

    // Verificar se é a primeira leitura do usuário
    const readingCount = await prisma.reading.count({
      where: { userId: user.id },
    });

    if (readingCount === 1) {
      // Enviar notificação de primeira leitura (assíncrono)
      // sendBehaviorTriggeredNotification(user.id, 'first_reading').catch(console.error);
    }

    // Verificar sequência de dias consecutivos
    const last7Days = await prisma.reading.findMany({
      where: {
        userId: user.id,
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Verificar se tem leitura em todos os últimos 7 dias
    const uniqueDays = new Set(
      last7Days.map(r => new Date(r.createdAt).toDateString())
    );

    if (uniqueDays.size === 7) {
      // Enviar notificação de sequência (assíncrono)
      // sendBehaviorTriggeredNotification(user.id, 'streak_achievement').catch(console.error);
    }

    // Verificar se está no final do trial
    if (user.subscriptionStatus === 'trialing' && user.trialStartDate) {
      const trialEnd = new Date(user.trialStartDate);
      trialEnd.setDate(trialEnd.getDate() + 7);
      const daysRemaining = Math.ceil((trialEnd.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

      if (daysRemaining <= 2 && readingCount >= 3) {
        // Enviar notificação de upgrade (assíncrono)
        // sendBehaviorTriggeredNotification(user.id, 'upgrade_prompt').catch(console.error);
      }
    }

    return NextResponse.json(reading);
  } catch (error) {
    console.error('Erro ao criar leitura:', error);
    return NextResponse.json(
      { error: 'Erro ao criar leitura' },
      { status: 500 }
    );
  }
}
