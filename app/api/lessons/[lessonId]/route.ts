import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { lessonId } = params

    // Get lesson with module and course info
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        module: {
          include: {
            course: {
              include: {
                oracle: true,
              },
            },
            lessons: {
              select: {
                id: true,
                title: true,
                slug: true,
                order: true,
              },
              orderBy: { order: 'asc' },
            },
          },
        },
        exercises: {
          where: { active: true },
          orderBy: { order: 'asc' },
        },
      },
    })

    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
    }

    // Get user progress for this lesson
    const userProgress = await prisma.userLessonProgress.findUnique({
      where: {
        userId_lessonId: {
          userId: session.user.id,
          lessonId: lesson.id,
        },
      },
    })

    // Find previous and next lessons
    const currentIndex = lesson.module.lessons.findIndex((l) => l.id === lesson.id)
    const previousLesson = currentIndex > 0 ? lesson.module.lessons[currentIndex - 1] : null
    const nextLesson =
      currentIndex < lesson.module.lessons.length - 1
        ? lesson.module.lessons[currentIndex + 1]
        : null

    return NextResponse.json({
      lesson: {
        id: lesson.id,
        title: lesson.title,
        slug: lesson.slug,
        content: lesson.content,
        duration: lesson.duration,
        xpReward: lesson.xpReward,
        order: lesson.order,
        completed: userProgress?.completed || false,
        completedAt: userProgress?.completedAt,
        module: {
          id: lesson.module.id,
          title: lesson.module.title,
          slug: lesson.module.slug,
        },
        course: {
          id: lesson.module.course.id,
          title: lesson.module.course.title,
          slug: lesson.module.course.slug,
        },
        oracle: {
          id: lesson.module.course.oracle.id,
          name: lesson.module.course.oracle.name,
          slug: lesson.module.course.oracle.slug,
          icon: lesson.module.course.oracle.icon,
        },
        exercises: lesson.exercises.map((ex) => ({
          id: ex.id,
          title: ex.title,
          description: ex.description,
          type: ex.type,
          difficulty: ex.difficulty,
          xpReward: ex.xpReward,
          crystalReward: ex.crystalReward,
        })),
        navigation: {
          previous: previousLesson
            ? {
                id: previousLesson.id,
                title: previousLesson.title,
                slug: previousLesson.slug,
              }
            : null,
          next: nextLesson
            ? {
                id: nextLesson.id,
                title: nextLesson.title,
                slug: nextLesson.slug,
              }
            : null,
        },
      },
    })
  } catch (error) {
    console.error('Error fetching lesson:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
