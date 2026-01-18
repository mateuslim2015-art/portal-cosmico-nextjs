import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    const { lessonId } = await request.json();

    if (!lessonId) {
      return NextResponse.json({ error: 'lessonId é obrigatório' }, { status: 400 });
    }

    // Buscar lição
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        module: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!lesson) {
      return NextResponse.json({ error: 'Lição não encontrada' }, { status: 404 });
    }

    // Verificar se já foi concluída
    const existingProgress = await prisma.userLessonProgress.findUnique({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId: lesson.id,
        },
      },
    });

    if (existingProgress?.completed) {
      return NextResponse.json({ message: 'Lição já concluída', xpEarned: 0 });
    }

    // Marcar como concluída e dar XP
    await prisma.userLessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId: lesson.id,
        },
      },
      create: {
        userId: user.id,
        lessonId: lesson.id,
        completed: true,
        completedAt: new Date(),
        xpEarned: lesson.xpReward,
      },
      update: {
        completed: true,
        completedAt: new Date(),
        xpEarned: lesson.xpReward,
      },
    });

    // Atualizar XP do usuário
    const newXp = user.xp + lesson.xpReward;
    const newLevel = calculateLevel(newXp);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        xp: newXp,
        level: newLevel,
        lastActivityDate: new Date(),
      },
    });

    // Atualizar progresso do curso
    const courseId = lesson.module.course.id;
    
    // Contar total de lições do curso
    const totalLessons = await prisma.lesson.count({
      where: {
        module: {
          courseId: courseId,
        },
        published: true,
      },
    });

    // Contar lições concluídas
    const completedLessons = await prisma.userLessonProgress.count({
      where: {
        userId: user.id,
        completed: true,
        lesson: {
          module: {
            courseId: courseId,
          },
        },
      },
    });

    const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    const isCompleted = progressPercent === 100;

    await prisma.userCourseProgress.upsert({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: courseId,
        },
      },
      create: {
        userId: user.id,
        courseId: courseId,
        progressPercent: progressPercent,
        completedAt: isCompleted ? new Date() : null,
        lastAccessedAt: new Date(),
      },
      update: {
        progressPercent: progressPercent,
        completedAt: isCompleted ? new Date() : null,
        lastAccessedAt: new Date(),
      },
    });

    return NextResponse.json({
      message: 'Lição concluída com sucesso!',
      xpEarned: lesson.xpReward,
      newXp: newXp,
      newLevel: newLevel,
      leveledUp: newLevel > user.level,
    });
  } catch (error) {
    console.error('Erro ao completar lição:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

// Função para calcular nível baseado no XP
function calculateLevel(xp: number): number {
  let level = 1;
  let xpNeeded = 100;

  while (xp >= xpNeeded) {
    xp -= xpNeeded;
    level++;
    xpNeeded = Math.floor(100 * Math.pow(1.5, level - 1));
  }

  return level;
}
