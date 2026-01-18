
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    let preferences = await prisma.notificationPreferences.findUnique({
      where: { userId: user.id },
    });

    // Criar preferências padrão se não existirem
    if (!preferences) {
      // Buscar subscription do usuário
      const subscription = await prisma.notificationSubscription.findUnique({
        where: { userId: user.id },
      });

      // Se não houver subscription, retornar preferências vazias
      if (!subscription) {
        return NextResponse.json({
          userId: user.id,
          enabled: false,
          dailyCardEnabled: false,
          readingRemindersEnabled: false,
          studyRemindersEnabled: false,
          weeklyInsight: false,
          promotionalMessages: false,
          morningEnabled: false,
          afternoonEnabled: false,
          eveningEnabled: false,
          message: 'Ative as notificações para configurar preferências'
        });
      }

      preferences = await prisma.notificationPreferences.create({
        data: {
          userId: user.id,
        },
      });
    }

    return NextResponse.json(preferences);
  } catch (error) {
    console.error('Erro ao buscar preferências:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar preferências' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    const data = await request.json();

    const preferences = await prisma.notificationPreferences.upsert({
      where: { userId: user.id },
      update: data,
      create: {
        userId: user.id,
        ...data,
      },
    });

    return NextResponse.json(preferences);
  } catch (error) {
    console.error('Erro ao atualizar preferências:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar preferências' },
      { status: 500 }
    );
  }
}
