import { OnboardingStep } from '../components/onboarding/OnboardingFlow';

export const portalOnboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Bem-vindo ao Portal Cósmico',
    description: 'Sua jornada mística começa agora. Aprenda, pratique e domine os oráculos ancestrais com a orientação de Inteligência Artificial.',
    icon: '🌟',
  },
  {
    id: 'study',
    title: 'Estude os Arcanos',
    description: 'Explore os 78 arcanos do Tarot e aprenda seus significados profundos através de lições interativas e exercícios práticos.',
    icon: '📚',
  },
  {
    id: 'practice',
    title: 'Pratique Diariamente',
    description: 'Desenvolva suas habilidades com exercícios diários, desafios e tiragens práticas. Ganhe XP e evolua seu nível.',
    icon: '🎯',
  },
  {
    id: 'reading',
    title: 'Consulte os Oráculos',
    description: 'Faça leituras de Tarot, Baralho Cigano, Runas e I-Ching com interpretações personalizadas por IA.',
    icon: '🔮',
  },
  {
    id: 'gamification',
    title: 'Conquiste Badges e Níveis',
    description: 'Complete missões, mantenha seu streak diário e desbloqueie badges exclusivos enquanto avança na sua jornada.',
    icon: '🏆',
  },
];
