import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import LessonClient from './lesson-client'

interface PageProps {
  params: {
    oracleSlug: string
    courseSlug: string
    lessonId: string
  }
}

export default async function LessonPage({ params }: PageProps) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    redirect('/login')
  }

  // Buscar lição com informações do curso e módulo
  const lesson = await prisma.lesson.findUnique({
    where: { id: params.lessonId },
    include: {
      module: {
        include: {
          course: {
            include: {
              oracle: true,
            },
          },
          lessons: {
            where: { published: true },
            orderBy: { order: 'asc' },
            select: {
              id: true,
              title: true,
              slug: true,
              order: true,
            },
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
    redirect(`/study/${params.oracleSlug}/${params.courseSlug}`)
  }

  // Verificar se o curso pertence ao oráculo correto
  if (lesson.module.course.oracle.slug !== params.oracleSlug || 
      lesson.module.course.slug !== params.courseSlug) {
    redirect('/study')
  }

  // Buscar progresso da lição
  const userProgress = await prisma.userLessonProgress.findUnique({
    where: {
      userId_lessonId: {
        userId: user.id,
        lessonId: lesson.id,
      },
    },
  })

  // Encontrar lição anterior e próxima
  const currentIndex = lesson.module.lessons.findIndex((l) => l.id === lesson.id)
  const previousLesson = currentIndex > 0 ? lesson.module.lessons[currentIndex - 1] : null
  const nextLesson = currentIndex < lesson.module.lessons.length - 1 ? lesson.module.lessons[currentIndex + 1] : null

  return (
    <LessonClient
      lesson={lesson}
      userProgress={userProgress}
      previousLesson={previousLesson}
      nextLesson={nextLesson}
      oracleSlug={params.oracleSlug}
      courseSlug={params.courseSlug}
      userId={user.id}
    />
  )
}
