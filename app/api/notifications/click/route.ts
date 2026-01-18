
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { notificationId } = await request.json();

    if (!notificationId) {
      return NextResponse.json({ error: 'ID da notificação é obrigatório' }, { status: 400 });
    }

    // Atualizar registro de clique
    await prisma.notification.update({
      where: { id: notificationId },
      data: {
        clicked: true,
        clickedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao registrar clique:', error);
    return NextResponse.json(
      { error: 'Erro ao registrar clique' },
      { status: 500 }
    );
  }
}
