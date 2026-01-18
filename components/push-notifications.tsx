'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, BellOff, Loader2, Check } from 'lucide-react';
import { toast } from 'sonner';

export function PushNotifications() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    checkSubscription();
  }, []);

  const checkSubscription = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      setIsLoading(false);
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription);
    } catch (error) {
      console.error('Erro ao verificar subscrição:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const subscribeUser = async () => {
    setIsProcessing(true);

    try {
      // Pedir permissão nativa do navegador
      const permission = await Notification.requestPermission();
      
      if (permission !== 'granted') {
        toast.error('Você precisa permitir notificações para usar este recurso');
        setIsProcessing(false);
        return;
      }

      // Registrar service worker
      const registration = await navigator.serviceWorker.register('/sw.js');
      await navigator.serviceWorker.ready;

      // Obter chave pública VAPID do servidor
      const response = await fetch('/api/notifications/vapid-public-key');
      const { publicKey } = await response.json();

      // Criar subscrição
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });

      // Enviar subscrição para o servidor
      const saveResponse = await fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
      });

      if (saveResponse.ok) {
        setIsSubscribed(true);
        toast.success('🔔 Notificações ativadas com sucesso!', {
          description: 'Você receberá Carta do Dia, Lembretes e Insights Semanais',
        });
      } else {
        throw new Error('Erro ao salvar subscrição');
      }
    } catch (error) {
      console.error('Erro ao ativar notificações:', error);
      toast.error('Erro ao ativar notificações. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const unsubscribeUser = async () => {
    setIsProcessing(true);

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await subscription.unsubscribe();

        // Remover do servidor
        await fetch('/api/notifications/unsubscribe', {
          method: 'POST',
        });

        setIsSubscribed(false);
        toast.success('Notificações desativadas');
      }
    } catch (error) {
      console.error('Erro ao desativar notificações:', error);
      toast.error('Erro ao desativar notificações');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-b from-purple-900/60 to-indigo-900/60 border-purple-500/30">
        <CardContent className="flex items-center justify-center h-32">
          <Loader2 className="w-8 h-8 animate-spin text-purple-300" />
        </CardContent>
      </Card>
    );
  }

  // Verificar suporte do navegador
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    return (
      <Card className="bg-gradient-to-b from-purple-900/60 to-indigo-900/60 border-purple-500/30">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BellOff className="w-5 h-5 text-purple-400" />
            <CardTitle className="text-white">Notificações</CardTitle>
          </div>
          <CardDescription className="text-purple-200">
            Seu navegador não suporta notificações push
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-b from-purple-900/60 to-indigo-900/60 border-purple-500/30">
      <CardHeader>
        <div className="flex items-center gap-2">
          {isSubscribed ? (
            <Bell className="w-5 h-5 text-yellow-400" />
          ) : (
            <BellOff className="w-5 h-5 text-purple-400" />
          )}
          <CardTitle className="text-white">Notificações Místicas</CardTitle>
        </div>
        <CardDescription className="text-purple-200">
          {isSubscribed
            ? 'Você está recebendo notificações do Portal Cósmico'
            : 'Receba Carta do Dia, Lembretes e Insights Semanais'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isSubscribed ? (
          <>
            {/* Status Ativo */}
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-300 mb-2">
                <Check className="w-5 h-5" />
                <span className="font-medium">Notificações Ativas</span>
              </div>
              <p className="text-sm text-green-200">
                Você receberá automaticamente:
              </p>
              <ul className="text-sm text-green-200 mt-2 space-y-1">
                <li>🌟 Carta do Dia com interpretação</li>
                <li>🔮 Lembretes para fazer leituras</li>
                <li>✨ Insights semanais sobre Tarot</li>
                <li>🎁 Novidades e ofertas especiais</li>
              </ul>
            </div>

            {/* Botão Desativar */}
            <Button
              onClick={unsubscribeUser}
              disabled={isProcessing}
              variant="outline"
              className="w-full border-purple-500/30 text-white hover:bg-purple-700/50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Desativando...
                </>
              ) : (
                <>
                  <BellOff className="w-4 h-4 mr-2" />
                  Desativar Notificações
                </>
              )}
            </Button>
          </>
        ) : (
          <>
            {/* Benefícios */}
            <div className="bg-purple-800/30 rounded-lg p-4">
              <p className="text-purple-100 text-sm mb-3">
                Ao ativar as notificações, você receberá:
              </p>
              <ul className="text-sm text-purple-200 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">🌟</span>
                  <span>Carta do Dia com interpretação mística</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">🔮</span>
                  <span>Lembretes para praticar suas leituras</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">✨</span>
                  <span>Insights semanais sobre Tarot</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">🎁</span>
                  <span>Novos oráculos e ofertas especiais</span>
                </li>
              </ul>
            </div>

            {/* Botão Ativar */}
            <Button
              onClick={subscribeUser}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Ativando...
                </>
              ) : (
                <>
                  <Bell className="w-4 h-4 mr-2" />
                  Ativar Notificações
                </>
              )}
            </Button>

            <p className="text-xs text-center text-purple-300">
              💡 Você pode desativar a qualquer momento
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
