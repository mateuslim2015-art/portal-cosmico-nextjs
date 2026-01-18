import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    // Remover subscrição do banco de dados
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        notificationSubscription: null,
      },
    });

    // Desativar preferências de notificações
    await prisma.notificationPreferences.updateMany({
      where: { userId: session.user.id },
      data: {
        enabled: false,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao cancelar subscrição:', error);
    return NextResponse.json(
      { error: 'Erro ao cancelar subscrição' },
      { status: 500 }
    );
  }
}
