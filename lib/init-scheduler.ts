
// import { initializeNotificationScheduler } from './notification-scheduler';

// Extend global type for scheduler initialization flag
declare global {
  var __schedulerInitialized: boolean | undefined;
}

// Inicializar o scheduler apenas no servidor
if (typeof window === 'undefined') {
  // Verificar se estamos em produção ou desenvolvimento
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Em desenvolvimento, inicializar apenas uma vez
  if (isProduction || !global.__schedulerInitialized) {
    try {
      // initializeNotificationScheduler();
      console.log('Notification scheduler desabilitado temporariamente');
      if (!isProduction) {
        global.__schedulerInitialized = true;
      }
    } catch (error) {
      console.error('Erro ao inicializar scheduler:', error);
    }
  }
}

export {};
