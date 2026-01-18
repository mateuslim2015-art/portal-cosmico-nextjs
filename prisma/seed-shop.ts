import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const shopItems = [
  // ========================================
  // COSMÉTICOS - TEMAS DE DECK
  // ========================================
  {
    type: 'deck_skin',
    category: 'cosmetic',
    name: 'Deck Clássico Rider-Waite',
    slug: 'deck-classico',
    description: 'O deck tradicional e atemporal',
    price: 0,
    rarity: 'common',
    available: true,
    metadata: JSON.stringify({
      colors: ['#8B4513', '#DAA520'],
      style: 'classic'
    }),
    order: 1
  },
  {
    type: 'deck_skin',
    category: 'cosmetic',
    name: 'Deck Místico Roxo',
    slug: 'deck-mistico-roxo',
    description: 'Cartas com fundo roxo profundo e bordas douradas brilhantes',
    price: 50,
    rarity: 'rare',
    available: true,
    metadata: JSON.stringify({
      colors: ['#5A189A', '#FFD700'],
      style: 'mystical',
      effects: ['glow']
    }),
    order: 2
  },
  {
    type: 'deck_skin',
    category: 'cosmetic',
    name: 'Deck Noite Estrelada',
    slug: 'deck-noite-estrelada',
    description: 'Inspirado em Van Gogh com céu estrelado animado',
    price: 75,
    rarity: 'rare',
    available: true,
    metadata: JSON.stringify({
      colors: ['#191970', '#FFD700'],
      style: 'artistic',
      effects: ['stars', 'animation']
    }),
    order: 3
  },
  {
    type: 'deck_skin',
    category: 'cosmetic',
    name: 'Deck Lunar Prateado',
    slug: 'deck-lunar-prateado',
    description: 'Tons de prata e azul claro com fases da lua',
    price: 100,
    rarity: 'epic',
    available: true,
    metadata: JSON.stringify({
      colors: ['#C0C0C0', '#ADD8E6'],
      style: 'lunar',
      effects: ['moon_phases', 'glow']
    }),
    order: 4
  },
  {
    type: 'deck_skin',
    category: 'cosmetic',
    name: 'Deck Fogo Cósmico',
    slug: 'deck-fogo-cosmico',
    description: 'Gradiente laranja-vermelho-roxo com partículas de fogo',
    price: 150,
    rarity: 'epic',
    available: true,
    metadata: JSON.stringify({
      colors: ['#FF6B35', '#E63946', '#7209B7'],
      style: 'fire',
      effects: ['fire_particles', 'animation']
    }),
    order: 5
  },
  {
    type: 'deck_skin',
    category: 'cosmetic',
    name: 'Deck Cristal Arco-Íris',
    slug: 'deck-cristal-arcoiris',
    description: 'Efeito prismático com cores mudando suavemente',
    price: 200,
    rarity: 'legendary',
    available: true,
    metadata: JSON.stringify({
      colors: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'],
      style: 'prismatic',
      effects: ['rainbow', 'shimmer', 'animation']
    }),
    order: 6
  },

  // ========================================
  // COSMÉTICOS - TEMAS DO APP
  // ========================================
  {
    type: 'theme',
    category: 'cosmetic',
    name: 'Tema Portal Cósmico',
    slug: 'theme-portal-cosmico',
    description: 'Tema padrão roxo e dourado místico',
    price: 0,
    rarity: 'common',
    available: true,
    metadata: JSON.stringify({
      primaryColor: '#5A189A',
      secondaryColor: '#FFD700',
      style: 'cosmic'
    }),
    order: 10
  },
  {
    type: 'theme',
    category: 'cosmetic',
    name: 'Tema Jardim Encantado',
    slug: 'theme-jardim-encantado',
    description: 'Verde esmeralda e rosa com flores e folhas decorativas',
    price: 60,
    rarity: 'rare',
    available: true,
    metadata: JSON.stringify({
      primaryColor: '#50C878',
      secondaryColor: '#FFA6C1',
      style: 'nature',
      sounds: ['forest', 'birds']
    }),
    order: 11
  },
  {
    type: 'theme',
    category: 'cosmetic',
    name: 'Tema Templo Egípcio',
    slug: 'theme-templo-egipcio',
    description: 'Dourado e azul turquesa com hieróglifos decorativos',
    price: 80,
    rarity: 'rare',
    available: true,
    metadata: JSON.stringify({
      primaryColor: '#FFD700',
      secondaryColor: '#40E0D0',
      style: 'egyptian'
    }),
    order: 12
  },
  {
    type: 'theme',
    category: 'cosmetic',
    name: 'Tema Galáxia Infinita',
    slug: 'theme-galaxia-infinita',
    description: 'Preto com nebulosas coloridas e estrelas cintilantes',
    price: 120,
    rarity: 'epic',
    available: true,
    metadata: JSON.stringify({
      primaryColor: '#0A1128',
      secondaryColor: '#9D4EDD',
      style: 'galaxy',
      effects: ['stars', '3d_depth']
    }),
    order: 13
  },

  // ========================================
  // COSMÉTICOS - MOLDURAS DE PERFIL
  // ========================================
  {
    type: 'frame',
    category: 'cosmetic',
    name: 'Moldura Iniciante',
    slug: 'frame-iniciante',
    description: 'Moldura dourada simples',
    price: 0,
    rarity: 'common',
    available: true,
    order: 20
  },
  {
    type: 'frame',
    category: 'cosmetic',
    name: 'Moldura Lua Crescente',
    slug: 'frame-lua-crescente',
    description: 'Lua crescente prateada com estrelas nos cantos',
    price: 25,
    rarity: 'common',
    available: true,
    order: 21
  },
  {
    type: 'frame',
    category: 'cosmetic',
    name: 'Moldura Chama Eterna',
    slug: 'frame-chama-eterna',
    description: 'Fogo laranja animado para quem tem streak alto',
    price: 30,
    rarity: 'rare',
    available: true,
    metadata: JSON.stringify({
      effects: ['fire_animation'],
      requirement: 'streak_7'
    }),
    order: 22
  },
  {
    type: 'frame',
    category: 'cosmetic',
    name: 'Moldura Diamante',
    slug: 'frame-diamante',
    description: 'Facetas de diamante brilhantes com reflexos de luz',
    price: 50,
    rarity: 'epic',
    available: true,
    metadata: JSON.stringify({
      effects: ['shimmer', 'reflections']
    }),
    order: 23
  },
  {
    type: 'frame',
    category: 'cosmetic',
    name: 'Moldura Oráculo Supremo',
    slug: 'frame-oraculo-supremo',
    description: 'Mandala complexa dourada com animação de rotação',
    price: 100,
    rarity: 'legendary',
    available: true,
    metadata: JSON.stringify({
      effects: ['rotation', 'mandala']
    }),
    order: 24
  },

  // ========================================
  // COSMÉTICOS - EFEITOS DE AURA
  // ========================================
  {
    type: 'aura',
    category: 'cosmetic',
    name: 'Sem Aura',
    slug: 'aura-none',
    description: 'Sem efeito de aura',
    price: 0,
    rarity: 'common',
    available: true,
    order: 30
  },
  {
    type: 'aura',
    category: 'cosmetic',
    name: 'Partículas de Estrelas',
    slug: 'aura-estrelas',
    description: 'Estrelas flutuando ao redor do avatar',
    price: 20,
    rarity: 'common',
    available: true,
    metadata: JSON.stringify({
      effects: ['star_particles']
    }),
    order: 31
  },
  {
    type: 'aura',
    category: 'cosmetic',
    name: 'Brilho Místico',
    slug: 'aura-brilho-mistico',
    description: 'Pulsos de luz colorida suaves',
    price: 25,
    rarity: 'rare',
    available: true,
    metadata: JSON.stringify({
      effects: ['glow_pulse'],
      colors: ['#9D4EDD', '#FFD700']
    }),
    order: 32
  },
  {
    type: 'aura',
    category: 'cosmetic',
    name: 'Aura de Poder',
    slug: 'aura-poder',
    description: 'Aura colorida girando ao redor do avatar',
    price: 40,
    rarity: 'epic',
    available: true,
    metadata: JSON.stringify({
      effects: ['rotating_aura'],
      colors: ['#FF6B35', '#7209B7']
    }),
    order: 33
  },
  {
    type: 'aura',
    category: 'cosmetic',
    name: 'Aura Galáctica',
    slug: 'aura-galactica',
    description: 'Galáxia completa girando ao redor do perfil',
    price: 350,
    rarity: 'legendary',
    available: true,
    metadata: JSON.stringify({
      effects: ['galaxy_rotation', 'nebula', 'stars']
    }),
    order: 34
  },

  // ========================================
  // BENEFÍCIOS - BOOSTS DE XP
  // ========================================
  {
    type: 'boost',
    category: 'benefit',
    name: 'XP Boost 2x - 1 hora',
    slug: 'xp-boost-2x-1h',
    description: 'Dobra XP por 1 hora',
    price: 10,
    rarity: 'common',
    available: true,
    metadata: JSON.stringify({
      multiplier: 2,
      duration: 3600
    }),
    order: 40
  },
  {
    type: 'boost',
    category: 'benefit',
    name: 'XP Boost 2x - 24 horas',
    slug: 'xp-boost-2x-24h',
    description: 'Dobra XP por 1 dia inteiro',
    price: 30,
    rarity: 'rare',
    available: true,
    metadata: JSON.stringify({
      multiplier: 2,
      duration: 86400
    }),
    order: 41
  },
  {
    type: 'boost',
    category: 'benefit',
    name: 'XP Boost 3x - 1 hora',
    slug: 'xp-boost-3x-1h',
    description: 'Triplica XP por 1 hora',
    price: 25,
    rarity: 'rare',
    available: true,
    metadata: JSON.stringify({
      multiplier: 3,
      duration: 3600
    }),
    order: 42
  },
  {
    type: 'boost',
    category: 'benefit',
    name: 'XP Boost Permanente +10%',
    slug: 'xp-boost-permanent-10',
    description: '+10% XP para sempre',
    price: 200,
    rarity: 'legendary',
    available: true,
    metadata: JSON.stringify({
      multiplier: 1.1,
      duration: -1
    }),
    order: 43
  },

  // ========================================
  // BENEFÍCIOS - PROTEÇÃO DE STREAK
  // ========================================
  {
    type: 'protection',
    category: 'benefit',
    name: 'Escudo de Proteção - 1 dia',
    slug: 'protection-1d',
    description: 'Se esquecer o desafio diário, não perde o streak',
    price: 15,
    rarity: 'common',
    available: true,
    metadata: JSON.stringify({
      duration: 86400
    }),
    order: 50
  },
  {
    type: 'protection',
    category: 'benefit',
    name: 'Escudo de Proteção - 7 dias',
    slug: 'protection-7d',
    description: 'Proteção por 1 semana inteira',
    price: 50,
    rarity: 'rare',
    available: true,
    metadata: JSON.stringify({
      duration: 604800
    }),
    order: 51
  },
  {
    type: 'protection',
    category: 'benefit',
    name: 'Escudo de Proteção - 30 dias',
    slug: 'protection-30d',
    description: 'Proteção por 1 mês - paz de espírito total',
    price: 150,
    rarity: 'epic',
    available: true,
    metadata: JSON.stringify({
      duration: 2592000
    }),
    order: 52
  }
];

async function main() {
  console.log('🛒 Iniciando seed da loja...');

  // Limpa itens existentes
  await prisma.shopItem.deleteMany({});

  for (const item of shopItems) {
    await prisma.shopItem.create({
      data: item
    });
    console.log(`✅ Item criado: ${item.name} (${item.price} cristais)`);
  }

  console.log('🎉 Seed da loja concluído!');
  console.log(`📊 Total: ${shopItems.length} itens`);
  console.log(
    `   - Cosméticos: ${shopItems.filter((i) => i.category === 'cosmetic').length}`
  );
  console.log(
    `   - Benefícios: ${shopItems.filter((i) => i.category === 'benefit').length}`
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
