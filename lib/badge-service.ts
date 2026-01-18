import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface BadgeRequirement {
  type: string;
  target?: number;
  moduleId?: number;
  courseSlug?: string;
  arcana?: string;
  phases?: string[];
  event?: string;
  readings?: number;
  requiredCard?: string;
}

/**
 * Verifica se o usuário atende aos requisitos de um badge
 */
async function checkBadgeRequirement(
  userId: string,
  requirement: BadgeRequirement
): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      lessonProgress: true,
      readings: true,
      dailyChallenges: true,
      courseProgress: true
    }
  });

  if (!user) return false;

  switch (requirement.type) {
    // ========================================
    // STREAK
    // ========================================
    case 'streak_days':
      return user.streak >= (requirement.target || 0);

    case 'daily_challenge_count':
      const completedChallenges = user.dailyChallenges.filter(
        (c) => c.completed
      ).length;
      return completedChallenges >= (requirement.target || 0);

    // ========================================
    // ESTUDO
    // ========================================
    case 'lessons_completed':
      const completedLessons = user.lessonProgress.filter(
        (l) => l.completed
      ).length;
      return completedLessons >= (requirement.target || 0);

    case 'module_completed':
      // Verifica se todas as lições de um módulo foram completadas
      const module = await prisma.module.findFirst({
        where: { order: requirement.moduleId },
        include: { lessons: true }
      });
      if (!module) return false;

      const moduleLessonIds = module.lessons.map((l) => l.id);
      const completedModuleLessons = user.lessonProgress.filter(
        (lp) => moduleLessonIds.includes(lp.lessonId) && lp.completed
      );
      return completedModuleLessons.length === moduleLessonIds.length;

    case 'all_modules_completed':
      const course = await prisma.course.findUnique({
        where: { slug: requirement.courseSlug },
        include: {
          modules: {
            include: { lessons: true }
          }
        }
      });
      if (!course) return false;

      const allLessonIds = course.modules.flatMap((m) =>
        m.lessons.map((l) => l.id)
      );
      const allCompletedLessons = user.lessonProgress.filter(
        (lp) => allLessonIds.includes(lp.lessonId) && lp.completed
      );
      return allCompletedLessons.length === allLessonIds.length;

    case 'reflections_count':
      // Conta desafios diários do tipo reflexão completados
      const reflections = user.dailyChallenges.filter(
        (c) => c.completed && c.userAnswer && c.userAnswer.length > 50
      );
      return reflections.length >= (requirement.target || 0);

    // ========================================
    // PRÁTICA
    // ========================================
    case 'readings_count':
      return user.readings.length >= (requirement.target || 0);

    case 'spread_types_used':
      const uniqueSpreads = new Set(user.readings.map((r) => r.spreadType));
      return uniqueSpreads.size >= (requirement.target || 0);

    case 'moon_phases_readings':
      // TODO: Implementar verificação de fases da lua
      // Por enquanto retorna false
      return false;

    // ========================================
    // PERFORMANCE
    // ========================================
    case 'correct_streak':
    case 'intuitive_correct_streak':
      // TODO: Implementar sistema de tracking de acertos consecutivos
      // Por enquanto retorna false
      return false;

    // ========================================
    // COLEÇÃO
    // ========================================
    case 'cards_viewed':
      // TODO: Implementar sistema de tracking de cartas visualizadas
      // Por enquanto retorna false
      return false;

    case 'symbols_identified':
      // TODO: Implementar sistema de identificação de símbolos
      // Por enquanto retorna false
      return false;

    // ========================================
    // ESPECIAL
    // ========================================
    case 'completion_percentage':
      // TODO: Calcular porcentagem de conclusão do app
      // Por enquanto retorna false
      return false;

    case 'seasonal_event':
      // TODO: Implementar verificação de eventos sazonais
      // Por enquanto retorna false
      return false;

    default:
      return false;
  }
}

/**
 * Verifica todos os badges e desbloqueia os que o usuário conquistou
 */
export async function checkAndUnlockBadges(userId: string): Promise<string[]> {
  const unlockedBadges: string[] = [];

  // Busca todos os badges
  const allBadges = await prisma.badge.findMany();

  // Busca badges já desbloqueados pelo usuário
  const userBadges = await prisma.userBadge.findMany({
    where: { userId },
    select: { badgeId: true }
  });

  const unlockedBadgeIds = new Set(userBadges.map((ub) => ub.badgeId));

  // Verifica cada badge
  for (const badge of allBadges) {
    // Pula se já desbloqueado
    if (unlockedBadgeIds.has(badge.id)) continue;

    const requirement: BadgeRequirement = JSON.parse(badge.requirement);
    const meetsRequirement = await checkBadgeRequirement(userId, requirement);

    if (meetsRequirement) {
      // Desbloqueia o badge
      await prisma.userBadge.create({
        data: {
          userId,
          badgeId: badge.id
        }
      });

      // Adiciona recompensas
      await prisma.user.update({
        where: { id: userId },
        data: {
          xp: { increment: badge.xpReward },
          crystals: { increment: badge.crystalReward }
        }
      });

      unlockedBadges.push(badge.slug);
      console.log(`🏆 Badge desbloqueado: ${badge.name} (+${badge.xpReward} XP, +${badge.crystalReward} cristais)`);
    }
  }

  return unlockedBadges;
}

/**
 * Desbloqueia um badge específico para um usuário
 */
export async function unlockBadge(
  userId: string,
  badgeSlug: string
): Promise<boolean> {
  const badge = await prisma.badge.findUnique({
    where: { slug: badgeSlug }
  });

  if (!badge) {
    console.error(`Badge não encontrado: ${badgeSlug}`);
    return false;
  }

  // Verifica se já possui o badge
  const existingBadge = await prisma.userBadge.findUnique({
    where: {
      userId_badgeId: {
        userId,
        badgeId: badge.id
      }
    }
  });

  if (existingBadge) {
    console.log(`Usuário já possui o badge: ${badgeSlug}`);
    return false;
  }

  // Desbloqueia o badge
  await prisma.userBadge.create({
    data: {
      userId,
      badgeId: badge.id
    }
  });

  // Adiciona recompensas
  await prisma.user.update({
    where: { id: userId },
    data: {
      xp: { increment: badge.xpReward },
      crystals: { increment: badge.crystalReward }
    }
  });

  console.log(`🏆 Badge desbloqueado: ${badge.name} (+${badge.xpReward} XP, +${badge.crystalReward} cristais)`);
  return true;
}

/**
 * Retorna todos os badges do usuário
 */
export async function getUserBadges(userId: string) {
  return await prisma.userBadge.findMany({
    where: { userId },
    include: {
      badge: true
    },
    orderBy: {
      earnedAt: 'desc'
    }
  });
}

/**
 * Retorna progresso do usuário em relação a um badge específico
 */
export async function getBadgeProgress(
  userId: string,
  badgeSlug: string
): Promise<{ current: number; target: number; percentage: number } | null> {
  const badge = await prisma.badge.findUnique({
    where: { slug: badgeSlug }
  });

  if (!badge) return null;

  const requirement: BadgeRequirement = JSON.parse(badge.requirement);
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      lessonProgress: true,
      readings: true,
      dailyChallenges: true
    }
  });

  if (!user) return null;

  let current = 0;
  const target = requirement.target || 1;

  switch (requirement.type) {
    case 'streak_days':
      current = user.streak;
      break;

    case 'daily_challenge_count':
      current = user.dailyChallenges.filter((c) => c.completed).length;
      break;

    case 'lessons_completed':
      current = user.lessonProgress.filter((l) => l.completed).length;
      break;

    case 'readings_count':
      current = user.readings.length;
      break;

    case 'reflections_count':
      current = user.dailyChallenges.filter(
        (c) => c.completed && c.userAnswer && c.userAnswer.length > 50
      ).length;
      break;

    default:
      return null;
  }

  const percentage = Math.min(100, Math.round((current / target) * 100));

  return { current, target, percentage };
}
