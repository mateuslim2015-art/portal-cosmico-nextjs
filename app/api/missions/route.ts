export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/missions
 * Retorna todas as missões (diárias, semanais e conquistas) com progresso do usuário
 */
export const dynamic = 'force-dynamic';

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
      where: { email: session.user.email },
      include: {
        missions: true,
        lessonProgress: true,
        readings: true,
        dailyChallenges: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Busca todas as missões ativas
    const allMissions = await prisma.mission.findMany({
      where: { active: true },
      orderBy: [{ type: 'asc' }, { order: 'asc' }]
    });

    // Calcula progresso para cada missão
    const missionsWithProgress = await Promise.all(
      allMissions.map(async (mission) => {
        const userMission = user.missions.find((um) => um.missionId === mission.id);

        // Calcula progresso atual baseado no tipo de requisito
        const requirement = JSON.parse(mission.requirement);
        let progress = userMission?.progress || 0;
        const target = requirement.target || 1;

        // Atualiza progresso baseado em dados reais do usuário
        switch (requirement.type) {
          case 'daily_challenge':
          case 'daily_challenge_count':
            const completedChallenges = user.dailyChallenges.filter(
              (c) => c.completed
            ).length;
            progress = completedChallenges;
            break;

          case 'read_lesson':
          case 'complete_lessons':
          case 'lessons_completed':
            const completedLessons = user.lessonProgress.filter(
              (l) => l.completed
            ).length;
            progress = completedLessons;
            break;

          case 'create_reading':
          case 'create_readings':
          case 'readings_count':
            progress = user.readings.length;
            break;

          case 'streak_days':
          case 'daily_challenge_streak':
            progress = user.streak;
            break;

          case 'write_reflection':
          case 'reflections_count':
            const reflections = user.dailyChallenges.filter(
              (c) => c.completed && c.userAnswer && c.userAnswer.length >= (requirement.minWords || 50)
            );
            progress = reflections.length;
            break;

          case 'use_spread_types':
            const uniqueSpreads = new Set(user.readings.map((r) => r.spreadType));
            progress = uniqueSpreads.size;
            break;
        }

        const completed = progress >= target;
        const percentage = Math.min(100, Math.round((progress / target) * 100));

        return {
          ...mission,
          progress: {
            current: progress,
            target,
            percentage,
            completed
          },
          userMission: userMission || null
        };
      })
    );

    // Agrupa por tipo
    const missionsByType = {
      daily: missionsWithProgress.filter((m) => m.type === 'daily'),
      weekly: missionsWithProgress.filter((m) => m.type === 'weekly'),
      achievement: missionsWithProgress.filter((m) => m.type === 'achievement')
    };

    // Estatísticas
    const stats = {
      daily: {
        total: missionsByType.daily.length,
        completed: missionsByType.daily.filter((m) => m.progress.completed).length
      },
      weekly: {
        total: missionsByType.weekly.length,
        completed: missionsByType.weekly.filter((m) => m.progress.completed).length
      },
      achievement: {
        total: missionsByType.achievement.length,
        completed: missionsByType.achievement.filter((m) => m.progress.completed).length
      }
    };

    return NextResponse.json({
      missions: missionsWithProgress,
      missionsByType,
      stats
    });
  } catch (error) {
    console.error('Erro ao buscar missões:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar missões' },
      { status: 500 }
    );
  }
}
