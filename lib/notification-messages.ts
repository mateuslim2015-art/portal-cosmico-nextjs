
import { TarotCard } from '@prisma/client';

export interface NotificationMessage {
  title: string;
  body: string;
  url: string;
  type: 'daily_card' | 'reading_reminder' | 'insight' | 'promotional';
  data?: any;
}

export function getDailyCardNotification(card?: TarotCard): NotificationMessage {
  const messages = [
    {
      title: '🌟 Sua Carta do Dia Está Pronta',
      body: card 
        ? `${card.name} te aguarda com uma mensagem especial. Descubra o que o universo preparou para você hoje!`
        : 'Uma mensagem cósmica te aguarda. Descubra o que o universo preparou para você hoje!',
      url: '/dashboard',
    },
    {
      title: '✨ O Universo Fala Com Você',
      body: card
        ? `${card.name} traz insights poderosos para o seu dia. Não deixe essa energia passar!`
        : 'Receba a orientação cósmica que transformará seu dia!',
      url: '/dashboard',
    },
    {
      title: '🔮 Momento de Conexão',
      body: 'Sua leitura diária está pronta. Conecte-se com sua intuição e descubra os mistérios do dia.',
      url: '/dashboard',
    },
  ];

  const selected = messages[Math.floor(Math.random() * messages.length)];
  return {
    ...selected,
    type: 'daily_card',
    data: card ? { cardId: card.id } : undefined,
  };
}

export function getReadingReminderNotification(daysAgo: number): NotificationMessage {
  const messages = [
    {
      title: '🃏 Continue Sua Jornada',
      body: `Faz ${daysAgo} dias desde sua última leitura. O Tarot tem novas mensagens para você!`,
      url: '/reading',
    },
    {
      title: '💫 Saudades das Cartas?',
      body: 'Sua intuição está te chamando. Que tal uma nova leitura hoje?',
      url: '/reading',
    },
    {
      title: '🌙 Hora de Refletir',
      body: 'As cartas estão ansiosas para guiar você. Faça uma nova consulta!',
      url: '/reading',
    },
  ];

  const selected = messages[Math.floor(Math.random() * messages.length)];
  return {
    ...selected,
    type: 'reading_reminder',
  };
}

export function getInsightNotification(topic: string): NotificationMessage {
  const insights = [
    {
      title: '📚 Aprenda Algo Novo',
      body: `Descubra os segredos de ${topic} e aprofunde seu conhecimento místico!`,
      url: '/cards',
    },
    {
      title: '🎯 Dica do Dia',
      body: `Você sabia? ${topic} tem conexões profundas com sua jornada espiritual.`,
      url: '/cards',
    },
    {
      title: '✨ Expanda Sua Sabedoria',
      body: `Explore o significado de ${topic} e transforme sua prática!`,
      url: '/cards',
    },
  ];

  const selected = insights[Math.floor(Math.random() * insights.length)];
  return {
    ...selected,
    type: 'insight',
    data: { topic },
  };
}

export function getPromotionalNotification(message: string, url: string): NotificationMessage {
  return {
    title: '🎁 Novidade no Portal Cósmico',
    body: message,
    url,
    type: 'promotional',
  };
}

export function getTrialEndingNotification(daysLeft: number): NotificationMessage {
  return {
    title: '⏰ Seu Trial Está Acabando',
    body: `Faltam apenas ${daysLeft} dias! Continue sua jornada cósmica com acesso total.`,
    url: '/dashboard',
    type: 'promotional',
  };
}

export function getWelcomeNotification(): NotificationMessage {
  return {
    title: '🌟 Bem-vindo ao Portal Cósmico!',
    body: 'Sua jornada de autodescoberta começa agora. Explore o poder do Tarot!',
    url: '/dashboard',
    type: 'promotional',
  };
}

export function getNotificationMessage(type: string): NotificationMessage {
  switch (type) {
    case 'daily_card':
      return getDailyCardNotification();
    case 'tip':
    case 'card_meaning':
      return getInsightNotification('as cartas');
    case 'study_reminder':
      return {
        title: '📚 Hora de Estudar!',
        body: 'Aprofunde seus conhecimentos no Tarot. Explore a biblioteca de cartas!',
        url: '/cards',
        type: 'insight',
      };
    case 'reading_reminder':
      return getReadingReminderNotification(2);
    case 'engagement':
      return {
        title: '✨ Sentimos sua Falta!',
        body: 'Volte e continue sua jornada espiritual. As cartas têm mensagens para você!',
        url: '/reading',
        type: 'reading_reminder',
      };
    default:
      return getDailyCardNotification();
  }
}
