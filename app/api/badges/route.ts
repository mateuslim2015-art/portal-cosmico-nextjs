export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import { getUserBadges, checkAndUnlockBadges } from '@/lib/badge-service';

const prisma = new PrismaClient();


/**
 * GET /api/badges
 * Retorna todos os badges (desbloqueados e bloqueados) do usuário
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

    // Verifica e desbloqueia novos badges
    await checkAndUnlockBadges(user.id);

    // Busca todos os badges
    const allBadges = await prisma.badge.findMany({
      orderBy: [{ category: 'asc' }, { order: 'asc' }]
    });

    // Busca badges do usuário
    const userBadges = await getUserBadges(user.id);
    const unlockedBadgeIds = new Set(userBadges.map((ub) => ub.badge.id));

    // Monta resposta com status de cada badge
    const badgesWithStatus = allBadges.map((badge) => ({
      ...badge,
      unlocked: unlockedBadgeIds.has(badge.id),
      earnedAt: userBadges.find((ub) => ub.badge.id === badge.id)?.earnedAt || null
    }));

    // Agrupa por categoria
    const badgesByCategory = {
      streak: badgesWithStatus.filter((b) => b.category === 'streak'),
      study: badgesWithStatus.filter((b) => b.category === 'study'),
      practice: badgesWithStatus.filter((b) => b.category === 'practice'),
      performance: badgesWithStatus.filter((b) => b.category === 'performance'),
      collection: badgesWithStatus.filter((b) => b.category === 'collection'),
      special: badgesWithStatus.filter((b) => b.category === 'special')
    };

    // Estatísticas
    const stats = {
      total: allBadges.length,
      unlocked: userBadges.length,
      percentage: Math.round((userBadges.length / allBadges.length) * 100)
    };

    return NextResponse.json({
      badges: badgesWithStatus,
      badgesByCategory,
      stats
    });
  } catch (error) {
    console.error('Erro ao buscar badges:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar badges' },
      { status: 500 }
    );
  }
}
