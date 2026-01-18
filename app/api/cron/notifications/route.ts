
import { NextRequest, NextResponse } from 'next/server';
// import { sendScheduledNotifications } from '@/lib/notification-scheduler';

// Endpoint para executar o cron manualmente ou via webhook externo
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Verificar token de autenticação (segurança)
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET || 'dev-secret-change-in-production';
    
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // const result = await sendScheduledNotifications();
    const result = { sent: 0, message: 'Notificações desabilitadas temporariamente' };

    return NextResponse.json({
      success: true,
      message: 'Notificações enviadas',
      stats: result,
    });
  } catch (error) {
    console.error('Erro ao executar cron:', error);
    return NextResponse.json(
      { error: 'Erro ao executar cron', details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}
