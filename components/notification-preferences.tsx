
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Bell, BellOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface NotificationPreferences {
  enabled: boolean;
  dailyCard: boolean;
  readingReminder: boolean;
  weeklyInsight: boolean;
  promotionalMessages: boolean;
  preferredTime: string;
}

export function NotificationPreferences() {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    enabled: true,
    dailyCard: true,
    readingReminder: true,
    weeklyInsight: true,
    promotionalMessages: true,
    preferredTime: 'morning',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    loadPreferences();
    checkSubscription();
  }, []);

  const checkSubscription = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription);
    } catch (error) {
      console.error('Erro ao verificar subscrição:', error);
    }
  };

  const loadPreferences = async () => {
    try {
      const response = await fetch('/api/notifications/preferences');
      if (response.ok) {
        const data = await response.json();
        setPreferences({
          enabled: data.enabled,
          dailyCard: data.dailyCard,
          readingReminder: data.readingReminder,
          weeklyInsight: data.weeklyInsight,
          promotionalMessages: data.promotionalMessages,
          preferredTime: data.preferredTime,
        });
      }
    } catch (error) {
      console.error('Erro ao carregar preferências:', error);
      toast.error('Erro ao carregar preferências');
    } finally {
      setIsLoading(false);
    }
  };

  const savePreferences = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/notifications/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      });

      if (response.ok) {
        toast.success('Preferências salvas com sucesso!');
      } else {
        throw new Error('Erro ao salvar');
      }
    } catch (error) {
      console.error('Erro ao salvar preferências:', error);
      toast.error('Erro ao salvar preferências');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggle = (key: keyof NotificationPreferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleTimeChange = (value: string) => {
    setPreferences(prev => ({
      ...prev,
      preferredTime: value,
    }));
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-48">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          {preferences.enabled ? (
            <Bell className="w-5 h-5 text-purple-600" />
          ) : (
            <BellOff className="w-5 h-5 text-muted-foreground" />
          )}
          <CardTitle>Preferências de Notificações</CardTitle>
        </div>
        <CardDescription>
          {isSubscribed
            ? 'Configure como e quando deseja receber notificações'
            : 'Ative as notificações no navegador para personalizar suas preferências'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Master toggle */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="space-y-0.5">
            <Label htmlFor="enabled" className="font-semibold">
              Notificações Ativas
            </Label>
            <p className="text-sm text-muted-foreground">
              Ativar ou desativar todas as notificações
            </p>
          </div>
          <Switch
            id="enabled"
            checked={preferences.enabled}
            onCheckedChange={() => handleToggle('enabled')}
            disabled={!isSubscribed}
          />
        </div>

        {/* Individual toggles */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Tipos de Notificações
          </h3>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5 flex-1">
              <Label htmlFor="dailyCard">🌟 Carta do Dia</Label>
              <p className="text-sm text-muted-foreground">
                Receba sua carta diária com interpretação
              </p>
            </div>
            <Switch
              id="dailyCard"
              checked={preferences.dailyCard}
              onCheckedChange={() => handleToggle('dailyCard')}
              disabled={!preferences.enabled || !isSubscribed}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5 flex-1">
              <Label htmlFor="readingReminder">🔮 Lembretes de Leitura</Label>
              <p className="text-sm text-muted-foreground">
                Incentivo para fazer novas consultas
              </p>
            </div>
            <Switch
              id="readingReminder"
              checked={preferences.readingReminder}
              onCheckedChange={() => handleToggle('readingReminder')}
              disabled={!preferences.enabled || !isSubscribed}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5 flex-1">
              <Label htmlFor="weeklyInsight">✨ Insights Semanais</Label>
              <p className="text-sm text-muted-foreground">
                Dicas e ensinamentos sobre Tarot
              </p>
            </div>
            <Switch
              id="weeklyInsight"
              checked={preferences.weeklyInsight}
              onCheckedChange={() => handleToggle('weeklyInsight')}
              disabled={!preferences.enabled || !isSubscribed}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5 flex-1">
              <Label htmlFor="promotionalMessages">🎁 Novidades</Label>
              <p className="text-sm text-muted-foreground">
                Novos oráculos, cursos e ofertas especiais
              </p>
            </div>
            <Switch
              id="promotionalMessages"
              checked={preferences.promotionalMessages}
              onCheckedChange={() => handleToggle('promotionalMessages')}
              disabled={!preferences.enabled || !isSubscribed}
            />
          </div>
        </div>

        {/* Preferred time */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Horário Preferido
          </h3>
          <div className="space-y-2">
            <Label htmlFor="preferredTime">
              Quando prefere receber notificações?
            </Label>
            <Select
              value={preferences.preferredTime}
              onValueChange={handleTimeChange}
              disabled={!preferences.enabled || !isSubscribed}
            >
              <SelectTrigger id="preferredTime">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">🌅 Manhã (8h - 12h)</SelectItem>
                <SelectItem value="afternoon">☀️ Tarde (12h - 18h)</SelectItem>
                <SelectItem value="evening">🌙 Noite (18h - 22h)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={savePreferences}
          disabled={isSaving || !isSubscribed}
          className="w-full"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Salvando...
            </>
          ) : (
            'Salvar Preferências'
          )}
        </Button>

        {!isSubscribed && (
          <p className="text-sm text-center text-muted-foreground">
            💡 Ative as notificações do navegador para usar este recurso
          </p>
        )}
      </CardContent>
    </Card>
  );
}
