import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const oracleSlug = searchParams.get('oracle')

    if (!oracleSlug) {
      return NextResponse.json({ error: 'Oracle slug is required' }, { status: 400 })
    }

    // Find oracle
    const oracle = await prisma.oracle.findUnique({
      where: { slug: oracleSlug },
    })

    if (!oracle) {
      return NextResponse.json({ error: 'Oracle not found' }, { status: 404 })
    }

    // Get courses with user progress
    const courses = await prisma.course.findMany({
      where: {
        oracleId: oracle.id,
        published: true,
      },
      include: {
        modules: {
          include: {
            lessons: {
              select: {
                id: true,
                userProgress: {
                  where: {
                    userId: session.user.id,
                    completed: true,
                  },
                },
              },
            },
          },
        },
        userProgress: {
          where: {
            userId: session.user.id,
          },
        },
      },
      orderBy: { order: 'asc' },
    })

    // Calculate progress for each course
    const coursesWithProgress = courses.map((course) => {
      const totalLessons = course.modules.reduce(
        (sum, module) => sum + module.lessons.length,
        0
      )
      const completedLessons = course.modules.reduce(
        (sum, module) => sum + module.lessons.filter(lesson => lesson.userProgress.length > 0).length,
        0
      )
      const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

      return {
        id: course.id,
        title: course.title,
        slug: course.slug,
        description: course.description,
        imageUrl: course.imageUrl,
        duration: course.duration,
        level: course.level,
        order: course.order,
        totalModules: course.modules.length,
        totalLessons,
        completedLessons,
        progress: Math.round(progress),
        isStarted: completedLessons > 0,
        isCompleted: completedLessons === totalLessons && totalLessons > 0,
      }
    })

    return NextResponse.json({ courses: coursesWithProgress })
  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
