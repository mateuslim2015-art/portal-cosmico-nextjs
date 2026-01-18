import { Sparkles, Target, Trophy, Calendar, TrendingUp, BookOpen } from 'lucide-react'

export const dashboardOnboardingSteps = [
  {
    id: 'welcome',
    title: 'Bem-vindo ao Portal Cósmico! ✨',
    description:
      'Estamos felizes em tê-lo aqui! Vamos fazer um tour rápido para você conhecer as principais funcionalidades do portal.',
    position: 'center' as const,
    icon: <Sparkles className="w-6 h-6 text-purple-400" />,
  },
  {
    id: 'daily-challenge',
    title: 'Desafio Diário',
    description:
      'Complete desafios diários para ganhar XP e subir de nível. Cada reflexão te aproxima da maestria cósmica!',
    target: '[data-tour="daily-challenge"]',
    position: 'bottom' as const,
    icon: <Sparkles className="w-6 h-6 text-yellow-400" />,
  },
  {
    id: 'card-of-day',
    title: 'Carta do Dia',
    description:
      'Descubra sua carta do dia! Cada carta traz uma mensagem especial e orientação para sua jornada.',
    target: '[data-tour="card-of-day"]',
    position: 'bottom' as const,
    icon: <Sparkles className="w-6 h-6 text-purple-400" />,
  },
  {
    id: 'missions',
    title: 'Missões Ativas',
    description:
      'Complete missões para ganhar recompensas! Acompanhe seu progresso e desbloqueie conquistas especiais.',
    target: '[data-tour="missions"]',
    position: 'right' as const,
    icon: <Target className="w-6 h-6 text-blue-400" />,
  },
  {
    id: 'badges',
    title: 'Conquistas',
    description:
      'Desbloqueie badges conforme avança! Cada conquista representa um marco importante na sua jornada mística.',
    target: '[data-tour="badges"]',
    position: 'left' as const,
    icon: <Trophy className="w-6 h-6 text-yellow-400" />,
  },
  {
    id: 'streak',
    title: 'Calendário de Sequência',
    description:
      'Mantenha sua sequência ativa! Quanto mais consistente você for, maiores serão suas recompensas.',
    target: '[data-tour="streak"]',
    position: 'right' as const,
    icon: <Calendar className="w-6 h-6 text-orange-400" />,
  },
  {
    id: 'activity',
    title: 'Gráfico de Atividade',
    description:
      'Visualize seu progresso semanal! Acompanhe suas leituras, estudos e práticas ao longo do tempo.',
    target: '[data-tour="activity"]',
    position: 'left' as const,
    icon: <TrendingUp className="w-6 h-6 text-green-400" />,
  },
  {
    id: 'navigation',
    title: 'Navegação',
    description:
      'Use a barra inferior para navegar entre as seções: Início, Prática, Leitura, Loja e Perfil.',
    target: '[data-tour="bottom-nav"]',
    position: 'top' as const,
    icon: <BookOpen className="w-6 h-6 text-purple-400" />,
  },
  {
    id: 'complete',
    title: 'Pronto para começar! 🎉',
    description:
      'Você está pronto para sua jornada mística! Explore o portal, complete missões e desbloqueie todo o seu potencial cósmico.',
    position: 'center' as const,
    icon: <Sparkles className="w-6 h-6 text-yellow-400" />,
  },
]
