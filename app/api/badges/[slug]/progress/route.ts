import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import { getBadgeProgress } from '@/lib/badge-service';

const prisma = new PrismaClient();

/**
 * GET /api/badges/[slug]/progress
 * Retorna o progresso do usuário em relação a um badge específico
 */
export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    const progress = await getBadgeProgress(user.id, params.slug);

    if (!progress) {
      return NextResponse.json(
        { error: 'Badge não encontrado ou progresso não disponível' },
        { status: 404 }
      );
    }

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Erro ao buscar progresso do badge:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar progresso do badge' },
      { status: 500 }
    );
  }
}
