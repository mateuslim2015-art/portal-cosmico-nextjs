export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import { getTodayChallengeProgress } from '@/lib/daily-challenge-service';

const prisma = new PrismaClient();

/**
 * GET /api/daily-challenge
 * Retorna o desafio diário atual e o progresso do usuário
 */

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    const progress = await getTodayChallengeProgress(user.id);

    // Busca a carta relacionada se houver
    let card = null;
    if (progress.challenge.cardId) {
      card = await prisma.tarotCard.findUnique({
        where: { id: progress.challenge.cardId }
      });
    }

    // Calcula tempo restante até meia-noite
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(23, 59, 59, 999);
    const timeRemaining = midnight.getTime() - now.getTime();
    const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutesRemaining = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );

    return NextResponse.json({
      ...progress,
      card,
      timeRemaining: {
        hours: hoursRemaining,
        minutes: minutesRemaining,
        total: timeRemaining
      },
      streak: user.streak
    });
  } catch (error) {
    console.error('Erro ao buscar desafio diário:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar desafio diário' },
      { status: 500 }
    );
  }
}
