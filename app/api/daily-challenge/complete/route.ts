import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import { completeDailyChallenge } from '@/lib/daily-challenge-service';
import { checkAndUnlockBadges } from '@/lib/badge-service';

const prisma = new PrismaClient();

/**
 * POST /api/daily-challenge/complete
 * Completa o desafio diário do usuário
 */
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { challengeId, userAnswer } = body;

    if (!challengeId || !userAnswer) {
      return NextResponse.json(
        { error: 'Dados inválidos' },
        { status: 400 }
      );
    }

    // Completa o desafio
    const result = await completeDailyChallenge(
      user.id,
      challengeId,
      userAnswer
    );

    // Verifica e desbloqueia badges
    const unlockedBadges = await checkAndUnlockBadges(user.id);

    // Busca usuário atualizado
    const updatedUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        xp: true,
        level: true,
        crystals: true,
        streak: true
      }
    });

    return NextResponse.json({
      ...result,
      unlockedBadges,
      user: updatedUser
    });
  } catch (error: any) {
    console.error('Erro ao completar desafio diário:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao completar desafio diário' },
      { status: 500 }
    );
  }
}
