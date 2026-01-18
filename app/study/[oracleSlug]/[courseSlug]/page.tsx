import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import CourseClient from './course-client';

interface PageProps {
  params: {
    oracleSlug: string;
    courseSlug: string;
  };
}

export default async function CoursePage({ params }: PageProps) {
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

  // Buscar curso com módulos e lições
  const course = await prisma.course.findFirst({
    where: {
      slug: params.courseSlug,
      oracle: {
        slug: params.oracleSlug,
      },
    },
    include: {
      oracle: true,
      modules: {
        orderBy: { order: 'asc' },
        include: {
          lessons: {
            where: { published: true },
            orderBy: { order: 'asc' },
            select: {
              id: true,
              title: true,
              slug: true,
              duration: true,
              xpReward: true,
              order: true,
            },
          },
        },
      },
    },
  });

  if (!course) {
    redirect('/study');
  }

  // Buscar progresso do usuário
  const userProgress = await prisma.userCourseProgress.findUnique({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId: course.id,
      },
    },
  });

  // Buscar lições completadas
  const completedLessons = await prisma.userLessonProgress.findMany({
    where: {
      userId: user.id,
      completed: true,
      lesson: {
        module: {
          courseId: course.id,
        },
      },
    },
    select: {
      lessonId: true,
    },
  });

  const completedLessonIds = completedLessons.map((l) => l.lessonId);

  return (
    <CourseClient
      course={course}
      userProgress={userProgress}
      completedLessonIds={completedLessonIds}
      oracleSlug={params.oracleSlug}
    />
  );
}
