
// Definição dos produtos e preços do Portal Cósmico

export const STRIPE_PRODUCTS = {
  BASIC: {
    name: 'Plano Básico',
    priceId: process.env.STRIPE_PRICE_BASIC || 'price_basic_placeholder',
    amount: 1990, // R$ 19,90 em centavos
    currency: 'brl',
    interval: 'month' as const,
    description: 'Acesso completo ao Tarot com IA',
    features: [
      'Leituras ilimitadas de Tarot',
      'Biblioteca completa de 78 cartas',
      'Interpretações com IA personalizada',
      'Histórico de leituras',
      'Notificações inteligentes',
    ],
  },
  PREMIUM: {
    name: 'Plano Premium',
    priceId: process.env.STRIPE_PRICE_PREMIUM || 'price_premium_placeholder',
    amount: 4990, // R$ 49,90 em centavos
    currency: 'brl',
    interval: 'month' as const,
    description: 'Acesso a todos os oráculos + recursos extras',
    features: [
      'Tudo do Plano Básico',
      'Cigano, Runas e I-Ching (em breve)',
      'Análise de padrões',
      'Diário de prática guiado',
      'Acesso a cursos básicos',
    ],
  },
  PRO: {
    name: 'Plano Pro',
    priceId: process.env.STRIPE_PRICE_PRO || 'price_pro_placeholder',
    amount: 9990, // R$ 99,90 em centavos
    currency: 'brl',
    interval: 'month' as const,
    description: 'Experiência completa com mentorias e workshops',
    features: [
      'Tudo do Plano Premium',
      'Workshops mensais ao vivo',
      'Mentorias 1:1 com especialistas',
      'Cursos avançados',
      'Suporte VIP prioritário',
      'Acesso antecipado a novos oráculos',
    ],
  },
} as const;

export const TRIAL_PERIOD_DAYS = 7;
