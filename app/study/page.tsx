import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import OraclesClient from './oracles-client';

export default async function StudyPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/login');
  }

  // Buscar oráculos disponíveis
  const oracles = await prisma.oracle.findMany({
    orderBy: { order: 'asc' },
    include: {
      courses: {
        where: { published: true },
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
  });

  return <OraclesClient oracles={oracles} />;
}
