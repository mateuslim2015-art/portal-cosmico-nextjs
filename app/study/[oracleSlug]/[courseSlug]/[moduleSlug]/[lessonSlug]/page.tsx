import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import LessonClient from './lesson-client';

interface PageProps {
  params: {
    oracleSlug: string;
    courseSlug: string;
    moduleSlug: string;
    lessonSlug: string;
  };
}

export default async function LessonPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect('/login');
  }

  // Buscar lição com módulo e curso
  const lesson = await prisma.lesson.findFirst({
    where: {
      slug: params.lessonSlug,
      module: {
        slug: params.moduleSlug,
        course: {
          slug: params.courseSlug,
          oracle: {
            slug: params.oracleSlug,
          },
        },
      },
    },
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
    },
  });

  if (!lesson) {
    redirect('/study');
  }

  // Buscar progresso da lição
  const lessonProgress = await prisma.userLessonProgress.findUnique({
    where: {
      userId_lessonId: {
        userId: user.id,
        lessonId: lesson.id,
      },
    },
  });

  // Encontrar próxima lição
  const currentIndex = lesson.module.lessons.findIndex((l) => l.id === lesson.id);
  const nextLesson = lesson.module.lessons[currentIndex + 1] || null;

  return (
    <LessonClient
      lesson={lesson}
      lessonProgress={lessonProgress}
      nextLesson={nextLesson}
      oracleSlug={params.oracleSlug}
      courseSlug={params.courseSlug}
      moduleSlug={params.moduleSlug}
    />
  );
}
