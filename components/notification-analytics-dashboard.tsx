
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Bell, TrendingUp, MousePointerClick, CheckCircle2, Activity } from 'lucide-react';

interface AnalyticsSummary {
  total: number;
  delivered: number;
  clicked: number;
  deliveryRate: number;
  clickRate: number;
}

interface TypeStats {
  [key: string]: {
    count: number;
    clicked: number;
  };
}

interface DayStats {
  date: string;
  sent: number;
  clicked: number;
}

interface RecentNotification {
  id: string;
  type: string;
  title: string;
  sentAt: string;
  delivered: boolean;
  clicked: boolean;
  clickedAt?: string;
}

interface AnalyticsData {
  summary: AnalyticsSummary;
  byType: TypeStats;
  last7Days: DayStats[];
  recent: RecentNotification[];
}

const typeLabels: Record<string, string> = {
  daily_card: '🌅 Carta do Dia',
  tip: '💡 Dica',
  study_reminder: '📚 Lembrete de Estudo',
  reading_reminder: '🔮 Lembrete de Leitura',
  card_meaning: '🃏 Significado de Carta',
  engagement: '✨ Engajamento',
  first_reading: '🎉 Primeira Leitura',
  streak_achievement: '🔥 Conquista de Sequência',
  upgrade_prompt: '⬆️ Upgrade',
  abandoned_reading: '⏰ Leitura Abandonada',
};

export function NotificationAnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/notifications/analytics');
      if (response.ok) {
        const analyticsData = await response.json();
        setData(analyticsData);
      }
    } catch (error) {
      console.error('Erro ao buscar analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!data || !data.summary) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Nenhum dado de notificações disponível ainda.</p>
          <p className="text-sm mt-2">Ative as notificações para ver estatísticas.</p>
        </CardContent>
      </Card>
    );
  }

  const { summary, byType = {}, last7Days = [], recent = [] } = data;

  return (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Enviadas</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.total}</div>
            <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Entrega</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.deliveryRate}%</div>
            <p className="text-xs text-muted-foreground">
              {summary.delivered} de {summary.total}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Cliques</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.clickRate}%</div>
            <p className="text-xs text-muted-foreground">
              {summary.clicked} cliques
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engajamento</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summary.clicked > 0 ? '📈' : '📊'}
            </div>
            <p className="text-xs text-muted-foreground">
              {summary.clicked > 0 ? 'Crescendo' : 'Estável'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico dos Últimos 7 Dias */}
      <Card>
        <CardHeader>
          <CardTitle>Notificações dos Últimos 7 Dias</CardTitle>
          <CardDescription>Enviadas e clicadas por dia</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {last7Days.map((day, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-20 text-sm text-muted-foreground">{day.date}</div>
                <div className="flex-1 flex gap-2">
                  <div
                    className="bg-purple-200 dark:bg-purple-900/40 rounded h-8 flex items-center justify-center text-xs font-medium transition-all"
                    style={{ width: `${(day.sent / Math.max(...last7Days.map(d => d.sent), 1)) * 100}%`, minWidth: day.sent > 0 ? '40px' : '0' }}
                  >
                    {day.sent > 0 && day.sent}
                  </div>
                  <div
                    className="bg-purple-500 dark:bg-purple-700 rounded h-8 flex items-center justify-center text-xs font-medium text-white transition-all"
                    style={{ width: `${(day.clicked / Math.max(...last7Days.map(d => d.clicked), 1)) * 80}%`, minWidth: day.clicked > 0 ? '40px' : '0' }}
                  >
                    {day.clicked > 0 && `👆 ${day.clicked}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-200 dark:bg-purple-900/40 rounded"></div>
              <span>Enviadas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 dark:bg-purple-700 rounded"></div>
              <span>Clicadas</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notificações por Tipo */}
      <Card>
        <CardHeader>
          <CardTitle>Notificações por Tipo</CardTitle>
          <CardDescription>Desempenho de cada categoria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(byType).map(([type, stats]) => {
              const clickRate = stats.count > 0 ? Math.round((stats.clicked / stats.count) * 100) : 0;
              return (
                <div key={type} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="min-w-[140px]">
                      {typeLabels[type] || type}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {stats.count} enviadas
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{clickRate}% CTR</span>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Notificações Recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Notificações Recentes</CardTitle>
          <CardDescription>Últimas 10 notificações enviadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recent.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start justify-between p-3 rounded-lg bg-muted/50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs">
                      {typeLabels[notification.type] || notification.type}
                    </Badge>
                    {notification.clicked && (
                      <Badge variant="default" className="text-xs bg-purple-600">
                        ✓ Clicada
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(notification.sentAt).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
