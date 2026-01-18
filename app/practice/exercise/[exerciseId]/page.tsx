import { Metadata } from 'next';
import ExerciseClient from './exercise-client';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Exercício | Portal Cósmico',
  description: 'Pratique suas habilidades de leitura de cartas',
};

interface PageProps {
  params: {
    exerciseId: string;
  };
}

export default async function ExercisePage({ params }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  const exercise = await prisma.exercise.findUnique({
    where: { id: params.exerciseId },
    include: {
      oracle: true,
    },
  });

  if (!exercise) {
    redirect('/practice');
  }

  // Check if user has already completed this exercise
  const completion = await prisma.exerciseCompletion.findFirst({
    where: {
      userId: session.user.id,
      exerciseId: exercise.id,
    },
  });

  return (
    <ExerciseClient
      exercise={exercise}
      userId={session.user.id}
      isCompleted={!!completion}
    />
  );
}
