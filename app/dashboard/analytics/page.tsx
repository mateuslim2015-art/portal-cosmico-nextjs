
import { Metadata } from 'next';
import { NotificationAnalyticsDashboard } from '@/components/notification-analytics-dashboard';

export const metadata: Metadata = {
  title: 'Analytics de Notificações | Portal Cósmico',
  description: 'Acompanhe o desempenho das suas notificações',
};

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analytics de Notificações</h1>
        <p className="text-muted-foreground">
          Acompanhe o desempenho e engajamento das suas notificações
        </p>
      </div>

      <NotificationAnalyticsDashboard />
    </div>
  );
}
