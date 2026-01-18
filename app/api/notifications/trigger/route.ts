
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
// import { // sendBehaviorTriggeredNotification } from '@/lib/notification-scheduler';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { triggerType } = await req.json();

    if (!triggerType) {
      return NextResponse.json(
        { error: 'triggerType é obrigatório' },
        { status: 400 }
      );
    }

    const validTriggers = ['first_reading', 'streak_achievement', 'upgrade_prompt', 'abandoned_reading'];
    if (!validTriggers.includes(triggerType)) {
      return NextResponse.json(
        { error: 'triggerType inválido' },
        { status: 400 }
      );
    }

    // Buscar usuário
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

        // const result = await sendBehaviorTriggeredNotification(user.id, triggerType as any);
    const result = { success: true, message: 'Notificação desabilitada temporariamente' };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Erro ao disparar notificação:', error);
    return NextResponse.json(
      { error: 'Erro ao disparar notificação' },
      { status: 500 }
    );
  }
}
