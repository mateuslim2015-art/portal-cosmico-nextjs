import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    // Buscar notificações dos últimos 30 dias
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const notifications = await prisma.notification.findMany({
      where: {
        userId: user.id,
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calcular estatísticas totais
    const totalSent = notifications.filter((n: any) => n.sent).length;
    const totalClicked = notifications.filter((n: any) => n.clicked).length;
    
    const deliveryRate = notifications.length > 0 ? (totalSent / notifications.length) * 100 : 0;
    const clickRate = totalSent > 0 ? (totalClicked / totalSent) * 100 : 0;

    // Agrupar por tipo
    const byType: Record<string, { count: number; clicked: number }> = {};
    notifications.forEach((n: any) => {
      if (!byType[n.type]) {
        byType[n.type] = { count: 0, clicked: 0 };
      }
      if (n.sent) byType[n.type].count++;
      if (n.clicked) byType[n.type].clicked++;
    });

    // Agrupar por dia para os últimos 7 dias
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const last7DaysNotifications = notifications.filter(
      (n: any) => new Date(n.createdAt) >= sevenDaysAgo
    );

    const dailyStats: Record<string, { sent: number; clicked: number }> = {};
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      dailyStats[dateStr] = { sent: 0, clicked: 0 };
    }

    last7DaysNotifications.forEach((n: any) => {
      const dateStr = new Date(n.createdAt).toISOString().split('T')[0];
      if (dailyStats[dateStr]) {
        if (n.sent) dailyStats[dateStr].sent++;
        if (n.clicked) dailyStats[dateStr].clicked++;
      }
    });

    const last7Days = Object.entries(dailyStats).map(([date, stats]) => ({
      date: new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      ...stats,
    }));

    // Notificações recentes (últimas 10)
    const recent = notifications.slice(0, 10).map((n: any) => ({
      id: n.id,
      type: n.type,
      title: n.title,
      sentAt: n.sentAt?.toISOString() || n.createdAt.toISOString(),
      delivered: n.sent,
      clicked: n.clicked,
      clickedAt: n.clickedAt?.toISOString(),
    }));

    return NextResponse.json({
      summary: {
        total: totalSent,
        delivered: totalSent,
        clicked: totalClicked,
        deliveryRate: Math.round(deliveryRate),
        clickRate: Math.round(clickRate),
      },
      byType,
      last7Days,
      recent,
    });
  } catch (error: any) {
    console.error('Erro ao buscar analytics:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar analytics', details: error.message },
      { status: 500 }
    );
  }
}
