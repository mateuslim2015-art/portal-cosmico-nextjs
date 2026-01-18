import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { courseSlug: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { courseSlug } = params

    // Get course with modules and lessons
    const course = await prisma.course.findUnique({
      where: { slug: courseSlug },
      include: {
        oracle: true,
        modules: {
          include: {
            lessons: {
              orderBy: { order: 'asc' },
            },
          },
          orderBy: { order: 'asc' },
        },
        userProgress: {
          where: {
            userId: session.user.id,
          },
        },
      },
    })

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Get user lesson progress
    const userLessonProgress = await prisma.userLessonProgress.findMany({
      where: {
        userId: session.user.id,
        lesson: {
          module: {
            courseId: course.id,
          },
        },
      },
      select: {
        lessonId: true,
        completed: true,
      },
    })

    const completedLessonIds = new Set(
      userLessonProgress.filter((p) => p.completed).map((p) => p.lessonId)
    )

    // Format modules with lesson progress
    const modulesWithProgress = course.modules.map((module) => {
      const lessonsWithProgress = module.lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        slug: lesson.slug,
        duration: lesson.duration,
        xpReward: lesson.xpReward,
        order: lesson.order,
        completed: completedLessonIds.has(lesson.id),
      }))

      const completedCount = lessonsWithProgress.filter((l) => l.completed).length
      const progress =
        lessonsWithProgress.length > 0
          ? (completedCount / lessonsWithProgress.length) * 100
          : 0

      return {
        id: module.id,
        title: module.title,
        slug: module.slug,
        description: module.description,
        order: module.order,
        lessons: lessonsWithProgress,
        totalLessons: lessonsWithProgress.length,
        completedLessons: completedCount,
        progress: Math.round(progress),
      }
    })

    const totalLessons = modulesWithProgress.reduce(
      (sum, m) => sum + m.totalLessons,
      0
    )
    const completedLessons = modulesWithProgress.reduce(
      (sum, m) => sum + m.completedLessons,
      0
    )
    const overallProgress =
      totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

    return NextResponse.json({
      course: {
        id: course.id,
        title: course.title,
        slug: course.slug,
        description: course.description,
        imageUrl: course.imageUrl,
        duration: course.duration,
        level: course.level,
        oracle: {
          id: course.oracle.id,
          name: course.oracle.name,
          slug: course.oracle.slug,
          icon: course.oracle.icon,
        },
        modules: modulesWithProgress,
        totalLessons,
        completedLessons,
        progress: Math.round(overallProgress),
      },
    })
  } catch (error) {
    console.error('Error fetching course:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
