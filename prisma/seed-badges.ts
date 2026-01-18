import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const badges = [
  // ========================================
  // BADGES DE STREAK (Dias Consecutivos)
  // ========================================
  {
    name: 'Primeira Luz',
    slug: 'primeira-luz',
    description: 'Completar o primeiro desafio diário',
    icon: '🌟',
    category: 'streak',
    rarity: 'common',
    requirement: JSON.stringify({
      type: 'daily_challenge_count',
      target: 1
    }),
    xpReward: 200,
    crystalReward: 5,
    order: 1
  },
  {
    name: 'Chama Constante',
    slug: 'chama-constante',
    description: 'Manter streak de 7 dias consecutivos',
    icon: '🔥',
    category: 'streak',
    rarity: 'rare',
    requirement: JSON.stringify({
      type: 'streak_days',
      target: 7
    }),
    xpReward: 500,
    crystalReward: 15,
    order: 2
  },
  {
    name: 'Raio Persistente',
    slug: 'raio-persistente',
    description: 'Manter streak de 30 dias consecutivos',
    icon: '⚡',
    category: 'streak',
    rarity: 'epic',
    requirement: JSON.stringify({
      type: 'streak_days',
      target: 30
    }),
    xpReward: 1500,
    crystalReward: 50,
    order: 3
  },
  {
    name: 'Diamante Eterno',
    slug: 'diamante-eterno',
    description: 'Manter streak de 100 dias consecutivos',
    icon: '💎',
    category: 'streak',
    rarity: 'legendary',
    requirement: JSON.stringify({
      type: 'streak_days',
      target: 100
    }),
    xpReward: 3000,
    crystalReward: 200,
    order: 4
  },
  {
    name: 'Chama Imortal',
    slug: 'chama-imortal',
    description: 'Manter streak de 365 dias (1 ano!)',
    icon: '🔥',
    category: 'streak',
    rarity: 'legendary',
    requirement: JSON.stringify({
      type: 'streak_days',
      target: 365
    }),
    xpReward: 10000,
    crystalReward: 1000,
    order: 5
  },

  // ========================================
  // BADGES DE ESTUDO
  // ========================================
  {
    name: 'Primeiro Passo',
    slug: 'primeiro-passo',
    description: 'Completar a primeira lição do curso',
    icon: '📚',
    category: 'study',
    rarity: 'common',
    requirement: JSON.stringify({
      type: 'lessons_completed',
      target: 1
    }),
    xpReward: 100,
    crystalReward: 3,
    order: 10
  },
  {
    name: 'Vidente Iniciante',
    slug: 'vidente-iniciante',
    description: 'Completar o Módulo 1 (Introdução ao Tarot)',
    icon: '🔮',
    category: 'study',
    rarity: 'rare',
    requirement: JSON.stringify({
      type: 'module_completed',
      moduleId: 1
    }),
    xpReward: 400,
    crystalReward: 10,
    order: 11
  },
  {
    name: 'Estudioso',
    slug: 'estudioso',
    description: 'Completar 50 reflexões profundas',
    icon: '📚',
    category: 'study',
    rarity: 'epic',
    requirement: JSON.stringify({
      type: 'reflections_count',
      target: 50
    }),
    xpReward: 1000,
    crystalReward: 30,
    order: 12
  },
  {
    name: 'Oráculo Ascendente',
    slug: 'oraculo-ascendente',
    description: 'Completar todos os 4 módulos do curso de Tarot',
    icon: '🌟',
    category: 'study',
    rarity: 'legendary',
    requirement: JSON.stringify({
      type: 'all_modules_completed',
      courseSlug: 'tarot-completo'
    }),
    xpReward: 2500,
    crystalReward: 100,
    order: 13
  },
  {
    name: 'Guardião do Conhecimento',
    slug: 'guardiao-conhecimento',
    description: 'Ler todas as 78 lições (22 Arcanos Maiores + 56 Menores)',
    icon: '📖',
    category: 'study',
    rarity: 'legendary',
    requirement: JSON.stringify({
      type: 'lessons_completed',
      target: 78
    }),
    xpReward: 2200,
    crystalReward: 80,
    order: 14
  },

  // ========================================
  // BADGES DE PRÁTICA
  // ========================================
  {
    name: 'Primeira Consulta',
    slug: 'primeira-consulta',
    description: 'Fazer sua primeira leitura de tarot',
    icon: '🔮',
    category: 'practice',
    rarity: 'common',
    requirement: JSON.stringify({
      type: 'readings_count',
      target: 1
    }),
    xpReward: 150,
    crystalReward: 5,
    order: 20
  },
  {
    name: 'Leitor Dedicado',
    slug: 'leitor-dedicado',
    description: 'Realizar 100 leituras de tarot',
    icon: '🃏',
    category: 'practice',
    rarity: 'epic',
    requirement: JSON.stringify({
      type: 'readings_count',
      target: 100
    }),
    xpReward: 1200,
    crystalReward: 40,
    order: 21
  },
  {
    name: 'Intérprete Lunar',
    slug: 'interprete-lunar',
    description: 'Fazer leitura em cada fase da lua (Nova, Crescente, Cheia, Minguante)',
    icon: '🌙',
    category: 'practice',
    rarity: 'rare',
    requirement: JSON.stringify({
      type: 'moon_phases_readings',
      phases: ['new', 'waxing', 'full', 'waning']
    }),
    xpReward: 800,
    crystalReward: 25,
    order: 22
  },
  {
    name: 'Explorador de Tiragens',
    slug: 'explorador-tiragens',
    description: 'Experimentar 5 tipos diferentes de tiragem',
    icon: '🌟',
    category: 'practice',
    rarity: 'rare',
    requirement: JSON.stringify({
      type: 'spread_types_used',
      target: 5
    }),
    xpReward: 600,
    crystalReward: 20,
    order: 23
  },

  // ========================================
  // BADGES DE PERFORMANCE
  // ========================================
  {
    name: 'Perfeccionista',
    slug: 'perfeccionista',
    description: 'Acertar 10 interpretações consecutivas',
    icon: '🎯',
    category: 'performance',
    rarity: 'rare',
    requirement: JSON.stringify({
      type: 'correct_streak',
      target: 10
    }),
    xpReward: 600,
    crystalReward: 20,
    order: 30
  },
  {
    name: 'Terceiro Olho Desperto',
    slug: 'terceiro-olho-desperto',
    description: 'Acertar 20 interpretações intuitivas consecutivas',
    icon: '👁️',
    category: 'performance',
    rarity: 'legendary',
    requirement: JSON.stringify({
      type: 'intuitive_correct_streak',
      target: 20
    }),
    xpReward: 2000,
    crystalReward: 75,
    order: 31
  },
  {
    name: 'Perfeccionista Supremo',
    slug: 'perfeccionista-supremo',
    description: 'Acertar 100 interpretações consecutivas',
    icon: '🎯',
    category: 'performance',
    rarity: 'legendary',
    requirement: JSON.stringify({
      type: 'correct_streak',
      target: 100
    }),
    xpReward: 4000,
    crystalReward: 150,
    order: 32
  },

  // ========================================
  // BADGES DE COLEÇÃO
  // ========================================
  {
    name: 'Colecionador de Cartas',
    slug: 'colecionador-cartas',
    description: 'Visualizar todas as 22 cartas dos Arcanos Maiores na biblioteca',
    icon: '🃏',
    category: 'collection',
    rarity: 'common',
    requirement: JSON.stringify({
      type: 'cards_viewed',
      target: 22,
      arcana: 'major'
    }),
    xpReward: 300,
    crystalReward: 10,
    order: 40
  },
  {
    name: 'Mestre do Simbolismo',
    slug: 'mestre-simbolismo',
    description: 'Identificar corretamente 100 símbolos em cartas',
    icon: '🎨',
    category: 'collection',
    rarity: 'epic',
    requirement: JSON.stringify({
      type: 'symbols_identified',
      target: 100
    }),
    xpReward: 900,
    crystalReward: 30,
    order: 41
  },

  // ========================================
  // BADGES ESPECIAIS
  // ========================================
  {
    name: 'Guardião do Cosmos',
    slug: 'guardiao-cosmos',
    description: 'Completar 100% do aplicativo',
    icon: '🌌',
    category: 'special',
    rarity: 'legendary',
    requirement: JSON.stringify({
      type: 'completion_percentage',
      target: 100
    }),
    xpReward: 5000,
    crystalReward: 500,
    order: 50
  },
  {
    name: 'Samhain Místico',
    slug: 'samhain-mistico',
    description: 'Fazer 3 leituras no Halloween usando A Morte',
    icon: '🎃',
    category: 'special',
    rarity: 'epic',
    requirement: JSON.stringify({
      type: 'seasonal_event',
      event: 'halloween',
      readings: 3,
      requiredCard: 'death'
    }),
    xpReward: 800,
    crystalReward: 30,
    order: 51
  },
  {
    name: 'Equinócio da Primavera',
    slug: 'equinocio-primavera',
    description: 'Fazer leitura com A Imperatriz no dia do equinócio',
    icon: '🌸',
    category: 'special',
    rarity: 'rare',
    requirement: JSON.stringify({
      type: 'seasonal_event',
      event: 'spring_equinox',
      requiredCard: 'empress'
    }),
    xpReward: 500,
    crystalReward: 20,
    order: 52
  }
];

async function main() {
  console.log('🏆 Iniciando seed de badges...');

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { slug: badge.slug },
      update: badge,
      create: badge
    });
    console.log(`✅ Badge criado: ${badge.name}`);
  }

  console.log('🎉 Seed de badges concluído!');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao fazer seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
