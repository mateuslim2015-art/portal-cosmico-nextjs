
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Bell, X } from 'lucide-react';
import { toast } from 'sonner';

export function NotificationPrompt() {
  const [open, setOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Verificar se as notificações estão suportadas
    if (typeof window === 'undefined' || !('Notification' in window) || !('serviceWorker' in navigator) || !('PushManager' in window)) {
      return;
    }

    // Verificar status atual das notificações
    const checkSubscription = async () => {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        
        setIsSubscribed(!!subscription);
        
        // Se não estiver inscrito e nunca foi perguntado, mostrar prompt
        if (!subscription && Notification.permission === 'default') {
          const lastPromptDate = typeof window !== 'undefined' ? localStorage.getItem('notificationPromptDate') : null;
          const now = Date.now();
          const oneDayInMs = 24 * 60 * 60 * 1000;
          
          // Mostrar prompt se nunca foi mostrado ou se passou mais de 1 dia
          if (!lastPromptDate || (now - parseInt(lastPromptDate)) > oneDayInMs) {
            setTimeout(() => setOpen(true), 3000); // Mostrar após 3 segundos
          }
        }
      } catch (error) {
        console.error('Erro ao verificar subscrição:', error);
      }
    };

    checkSubscription();
  }, []);

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const subscribeToNotifications = async () => {
    setIsLoading(true);

    try {
      // Solicitar permissão
      const permission = await Notification.requestPermission();
      
      if (permission !== 'granted') {
        toast.error('Permissão para notificações negada');
        setOpen(false);
        localStorage.setItem('notificationPromptDate', Date.now().toString());
        setIsLoading(false);
        return;
      }

      // Registrar service worker
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      await navigator.serviceWorker.ready;

      // Criar subscrição push
      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      
      if (!vapidPublicKey) {
        toast.error('Erro de configuração. Contate o suporte.');
        setIsLoading(false);
        return;
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      });

      // Enviar subscrição para o servidor
      const response = await fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar subscrição');
      }

      setIsSubscribed(true);
      setOpen(false);
      toast.success('🔔 Notificações ativadas! Você receberá insights diários.');
      localStorage.setItem('notificationPromptDate', Date.now().toString());
    } catch (error) {
      console.error('Erro ao ativar notificações:', error);
      toast.error('Erro ao ativar notificações. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismiss = () => {
    setOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('notificationPromptDate', Date.now().toString());
    }
  };

  if (!isClient || typeof window === 'undefined' || !('Notification' in window)) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-purple-900/20">
            <Bell className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <DialogTitle className="text-center text-xl">
            Receba Orientações Diárias
          </DialogTitle>
          <DialogDescription className="text-center space-y-2">
            <p>
              Ative as notificações e receba:
            </p>
            <ul className="text-sm space-y-1 text-left list-disc list-inside">
              <li>🌟 Sua carta do dia com interpretações personalizadas</li>
              <li>✨ Insights místicos no momento certo</li>
              <li>🔮 Lembretes para suas práticas espirituais</li>
              <li>💫 Novidades e conteúdos exclusivos</li>
            </ul>
            <p className="text-xs text-muted-foreground mt-4">
              Enviaremos apenas 2-3 notificações por dia nos horários ideais para você.
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-col gap-2">
          <Button
            onClick={subscribeToNotifications}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Ativando...' : '🔔 Ativar Notificações'}
          </Button>
          <Button
            variant="ghost"
            onClick={handleDismiss}
            className="w-full"
          >
            Agora não
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
