import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const missions = [
  // ========================================
  // MISSÕES DIÁRIAS
  // ========================================
  {
    type: 'daily',
    category: 'practice',
    title: 'Carta do Despertar',
    description: 'Completar o desafio diário',
    requirement: JSON.stringify({
      type: 'daily_challenge',
      target: 1
    }),
    xpReward: 100,
    crystalReward: 2,
    order: 1,
    active: true
  },
  {
    type: 'daily',
    category: 'study',
    title: 'Sabedoria Matinal',
    description: 'Ler 1 lição completa',
    requirement: JSON.stringify({
      type: 'read_lesson',
      target: 1
    }),
    xpReward: 50,
    crystalReward: 1,
    order: 2,
    active: true
  },
  {
    type: 'daily',
    category: 'practice',
    title: 'Consulta Diária',
    description: 'Fazer 1 leitura de tarot (qualquer tipo)',
    requirement: JSON.stringify({
      type: 'create_reading',
      target: 1
    }),
    xpReward: 75,
    crystalReward: 1,
    order: 3,
    active: true
  },
  {
    type: 'daily',
    category: 'study',
    title: 'Reflexão Profunda',
    description: 'Escrever uma reflexão sobre a carta do dia (mínimo 100 palavras)',
    requirement: JSON.stringify({
      type: 'write_reflection',
      minWords: 100
    }),
    xpReward: 80,
    crystalReward: 2,
    order: 4,
    active: true
  },
  {
    type: 'daily',
    category: 'study',
    title: 'Mestre do Simbolismo',
    description: 'Identificar corretamente 5 símbolos em cartas diferentes',
    requirement: JSON.stringify({
      type: 'identify_symbols',
      target: 5
    }),
    xpReward: 60,
    crystalReward: 1,
    order: 5,
    active: true
  },

  // ========================================
  // MISSÕES SEMANAIS
  // ========================================
  {
    type: 'weekly',
    category: 'streak',
    title: 'Chama da Semana',
    description: 'Completar desafios diários por 7 dias consecutivos',
    requirement: JSON.stringify({
      type: 'daily_challenge_streak',
      target: 7
    }),
    xpReward: 500,
    crystalReward: 15,
    badgeReward: 'chama-constante',
    order: 10,
    active: true
  },
  {
    type: 'weekly',
    category: 'study',
    title: 'Estudante Dedicado',
    description: 'Completar 3 lições do curso',
    requirement: JSON.stringify({
      type: 'complete_lessons',
      target: 3
    }),
    xpReward: 300,
    crystalReward: 10,
    order: 11,
    active: true
  },
  {
    type: 'weekly',
    category: 'practice',
    title: 'Praticante Ativo',
    description: 'Realizar 10 leituras de tarot',
    requirement: JSON.stringify({
      type: 'create_readings',
      target: 10
    }),
    xpReward: 400,
    crystalReward: 12,
    order: 12,
    active: true
  },
  {
    type: 'weekly',
    category: 'practice',
    title: 'Explorador de Tiragens',
    description: 'Experimentar 3 tipos diferentes de tiragem',
    requirement: JSON.stringify({
      type: 'use_spread_types',
      target: 3
    }),
    xpReward: 350,
    crystalReward: 10,
    order: 13,
    active: true
  },
  {
    type: 'weekly',
    category: 'study',
    title: 'Mestre da Interpretação',
    description: 'Acertar 15 questões de interpretação',
    requirement: JSON.stringify({
      type: 'correct_interpretations',
      target: 15
    }),
    xpReward: 450,
    crystalReward: 13,
    order: 14,
    active: true
  },

  // ========================================
  // MISSÕES DE CONQUISTA (Permanentes)
  // ========================================
  
  // Nível 1: Iniciante
  {
    type: 'achievement',
    category: 'practice',
    title: 'Primeira Luz',
    description: 'Completar seu primeiro desafio diário',
    requirement: JSON.stringify({
      type: 'daily_challenge_count',
      target: 1
    }),
    xpReward: 200,
    crystalReward: 5,
    badgeReward: 'primeira-luz',
    order: 20,
    active: true
  },
  {
    type: 'achievement',
    category: 'study',
    title: 'Primeiro Passo',
    description: 'Completar a primeira lição do curso',
    requirement: JSON.stringify({
      type: 'lessons_completed',
      target: 1
    }),
    xpReward: 100,
    crystalReward: 3,
    badgeReward: 'primeiro-passo',
    order: 21,
    active: true
  },
  {
    type: 'achievement',
    category: 'practice',
    title: 'Primeira Consulta',
    description: 'Fazer sua primeira leitura de tarot',
    requirement: JSON.stringify({
      type: 'readings_count',
      target: 1
    }),
    xpReward: 150,
    crystalReward: 5,
    badgeReward: 'primeira-consulta',
    order: 22,
    active: true
  },

  // Nível 2: Aprendiz
  {
    type: 'achievement',
    category: 'streak',
    title: 'Chama Constante',
    description: 'Manter streak de 7 dias consecutivos',
    requirement: JSON.stringify({
      type: 'streak_days',
      target: 7
    }),
    xpReward: 500,
    crystalReward: 15,
    badgeReward: 'chama-constante',
    order: 30,
    active: true
  },
  {
    type: 'achievement',
    category: 'study',
    title: 'Estudioso Iniciante',
    description: 'Completar o Módulo 1 (Introdução ao Tarot)',
    requirement: JSON.stringify({
      type: 'module_completed',
      moduleId: 1
    }),
    xpReward: 400,
    crystalReward: 10,
    badgeReward: 'vidente-iniciante',
    order: 31,
    active: true
  },
  {
    type: 'achievement',
    category: 'performance',
    title: 'Acertou na Mosca',
    description: 'Acertar 10 interpretações consecutivas',
    requirement: JSON.stringify({
      type: 'correct_streak',
      target: 10
    }),
    xpReward: 600,
    crystalReward: 20,
    badgeReward: 'perfeccionista',
    order: 32,
    active: true
  },
  {
    type: 'achievement',
    category: 'collection',
    title: 'Colecionador de Cartas',
    description: 'Visualizar todas as 22 cartas dos Arcanos Maiores na biblioteca',
    requirement: JSON.stringify({
      type: 'cards_viewed',
      target: 22,
      arcana: 'major'
    }),
    xpReward: 300,
    crystalReward: 10,
    badgeReward: 'colecionador-cartas',
    order: 33,
    active: true
  },

  // Nível 3: Praticante
  {
    type: 'achievement',
    category: 'streak',
    title: 'Raio Persistente',
    description: 'Manter streak de 30 dias consecutivos',
    requirement: JSON.stringify({
      type: 'streak_days',
      target: 30
    }),
    xpReward: 1500,
    crystalReward: 50,
    badgeReward: 'raio-persistente',
    order: 40,
    active: true
  },
  {
    type: 'achievement',
    category: 'study',
    title: 'Estudioso Dedicado',
    description: 'Completar 50 reflexões profundas',
    requirement: JSON.stringify({
      type: 'reflections_count',
      target: 50
    }),
    xpReward: 1000,
    crystalReward: 30,
    badgeReward: 'estudioso',
    order: 41,
    active: true
  },
  {
    type: 'achievement',
    category: 'practice',
    title: 'Leitor Dedicado',
    description: 'Realizar 100 leituras de tarot',
    requirement: JSON.stringify({
      type: 'readings_count',
      target: 100
    }),
    xpReward: 1200,
    crystalReward: 40,
    badgeReward: 'leitor-dedicado',
    order: 42,
    active: true
  },
  {
    type: 'achievement',
    category: 'practice',
    title: 'Intérprete Lunar',
    description: 'Fazer leitura em cada fase da lua',
    requirement: JSON.stringify({
      type: 'moon_phases_readings',
      phases: ['new', 'waxing', 'full', 'waning']
    }),
    xpReward: 800,
    crystalReward: 25,
    badgeReward: 'interprete-lunar',
    order: 43,
    active: true
  },
  {
    type: 'achievement',
    category: 'collection',
    title: 'Mestre do Simbolismo',
    description: 'Identificar corretamente 100 símbolos em cartas',
    requirement: JSON.stringify({
      type: 'symbols_identified',
      target: 100
    }),
    xpReward: 900,
    crystalReward: 30,
    badgeReward: 'mestre-simbolismo',
    order: 44,
    active: true
  },

  // Nível 4: Adepto
  {
    type: 'achievement',
    category: 'streak',
    title: 'Diamante Eterno',
    description: 'Manter streak de 100 dias consecutivos',
    requirement: JSON.stringify({
      type: 'streak_days',
      target: 100
    }),
    xpReward: 3000,
    crystalReward: 200,
    badgeReward: 'diamante-eterno',
    order: 50,
    active: true
  },
  {
    type: 'achievement',
    category: 'study',
    title: 'Oráculo Ascendente',
    description: 'Completar todos os 4 módulos do curso de Tarot',
    requirement: JSON.stringify({
      type: 'all_modules_completed',
      courseSlug: 'tarot-completo'
    }),
    xpReward: 2500,
    crystalReward: 100,
    badgeReward: 'oraculo-ascendente',
    order: 51,
    active: true
  },
  {
    type: 'achievement',
    category: 'performance',
    title: 'Terceiro Olho Desperto',
    description: 'Acertar 20 interpretações intuitivas consecutivas',
    requirement: JSON.stringify({
      type: 'intuitive_correct_streak',
      target: 20
    }),
    xpReward: 2000,
    crystalReward: 75,
    badgeReward: 'terceiro-olho-desperto',
    order: 52,
    active: true
  },
  {
    type: 'achievement',
    category: 'practice',
    title: 'Mestre das Tiragens',
    description: 'Dominar 10 tipos diferentes de tiragem',
    requirement: JSON.stringify({
      type: 'master_spread_types',
      target: 10,
      timesEach: 5
    }),
    xpReward: 1800,
    crystalReward: 60,
    order: 53,
    active: true
  },
  {
    type: 'achievement',
    category: 'study',
    title: 'Guardião do Conhecimento',
    description: 'Ler todas as 78 lições (22 Arcanos Maiores + 56 Menores)',
    requirement: JSON.stringify({
      type: 'lessons_completed',
      target: 78
    }),
    xpReward: 2200,
    crystalReward: 80,
    badgeReward: 'guardiao-conhecimento',
    order: 54,
    active: true
  },

  // Nível 5: Mestre
  {
    type: 'achievement',
    category: 'special',
    title: 'Guardião do Cosmos',
    description: 'Completar TUDO - 100% do aplicativo',
    requirement: JSON.stringify({
      type: 'completion_percentage',
      target: 100
    }),
    xpReward: 5000,
    crystalReward: 500,
    badgeReward: 'guardiao-cosmos',
    order: 60,
    active: true
  },
  {
    type: 'achievement',
    category: 'streak',
    title: 'Chama Imortal',
    description: 'Manter streak de 365 dias (1 ano!)',
    requirement: JSON.stringify({
      type: 'streak_days',
      target: 365
    }),
    xpReward: 10000,
    crystalReward: 1000,
    badgeReward: 'chama-imortal',
    order: 61,
    active: true
  },
  {
    type: 'achievement',
    category: 'performance',
    title: 'Perfeccionista Supremo',
    description: 'Acertar 100 interpretações consecutivas',
    requirement: JSON.stringify({
      type: 'correct_streak',
      target: 100
    }),
    xpReward: 4000,
    crystalReward: 150,
    badgeReward: 'perfeccionista-supremo',
    order: 62,
    active: true
  }
];

async function main() {
  console.log('🎯 Iniciando seed de missões...');

  // Limpa missões existentes
  await prisma.mission.deleteMany({});

  for (const mission of missions) {
    await prisma.mission.create({
      data: mission
    });
    console.log(`✅ Missão criada: ${mission.title} (${mission.type})`);
  }

  console.log('🎉 Seed de missões concluído!');
  console.log(`📊 Total: ${missions.length} missões`);
  console.log(
    `   - Diárias: ${missions.filter((m) => m.type === 'daily').length}`
  );
  console.log(
    `   - Semanais: ${missions.filter((m) => m.type === 'weekly').length}`
  );
  console.log(
    `   - Conquistas: ${missions.filter((m) => m.type === 'achievement').length}`
  );
}

main()
  .catch((e) => {
    console.error('❌ Erro ao fazer seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
