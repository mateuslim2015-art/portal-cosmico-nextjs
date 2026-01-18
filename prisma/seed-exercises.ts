import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedExercises() {
  console.log('🌱 Seeding exercises...')

  // Quiz Exercise 1: Arcanos Maiores Básico
  await prisma.exercise.upsert({
    where: { id: 'quiz-arcanos-maiores-1' },
    update: {},
    create: {
      id: 'quiz-arcanos-maiores-1',
      title: 'Quiz: Arcanos Maiores Básico',
      description: 'Teste seus conhecimentos sobre os Arcanos Maiores do Tarot',
      type: 'quiz',
      difficulty: 'beginner',
      content: JSON.stringify({
        questions: [
          {
            question: 'Qual carta representa novos começos e inocência?',
            options: ['O Louco', 'O Mago', 'A Imperatriz', 'O Imperador'],
            correctAnswer: 0,
          },
          {
            question: 'Quantas cartas compõem os Arcanos Maiores?',
            options: ['20', '21', '22', '23'],
            correctAnswer: 2,
          },
          {
            question: 'Qual carta está associada ao poder de manifestação?',
            options: ['O Louco', 'O Mago', 'A Sacerdotisa', 'O Eremita'],
            correctAnswer: 1,
          },
          {
            question: 'O que os Arcanos Maiores representam?',
            options: [
              'Eventos do dia a dia',
              'Grandes lições e temas da vida',
              'Apenas o futuro',
              'Apenas o passado',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Qual é o número da carta O Louco?',
            options: ['0', '1', '21', '22'],
            correctAnswer: 0,
          },
        ],
      }),
      xpReward: 100,
      crystalReward: 50,
      minScore: 60,
      oracleType: 'tarot',
    },
  })

  // Quiz Exercise 2: Naipes do Tarot
  await prisma.exercise.upsert({
    where: { id: 'quiz-naipes-1' },
    update: {},
    create: {
      id: 'quiz-naipes-1',
      title: 'Quiz: Naipes do Tarot',
      description: 'Teste seus conhecimentos sobre os quatro naipes dos Arcanos Menores',
      type: 'quiz',
      difficulty: 'beginner',
      content: JSON.stringify({
        questions: [
          {
            question: 'Qual naipe está associado ao elemento Fogo?',
            options: ['Paus', 'Copas', 'Espadas', 'Ouros'],
            correctAnswer: 0,
          },
          {
            question: 'O naipe de Copas representa qual área da vida?',
            options: ['Ação', 'Emoções', 'Pensamentos', 'Material'],
            correctAnswer: 1,
          },
          {
            question: 'Quantas cartas tem cada naipe dos Arcanos Menores?',
            options: ['10', '12', '14', '16'],
            correctAnswer: 2,
          },
          {
            question: 'Qual naipe está associado ao elemento Terra?',
            options: ['Paus', 'Copas', 'Espadas', 'Ouros'],
            correctAnswer: 3,
          },
          {
            question: 'O naipe de Espadas está associado a qual elemento?',
            options: ['Fogo', 'Água', 'Ar', 'Terra'],
            correctAnswer: 2,
          },
        ],
      }),
      xpReward: 100,
      crystalReward: 50,
      minScore: 60,
      oracleType: 'tarot',
    },
  })

  // Card Identification Exercise 1
  await prisma.exercise.upsert({
    where: { id: 'identification-maiores-1' },
    update: {},
    create: {
      id: 'identification-maiores-1',
      title: 'Identificação: Arcanos Maiores',
      description: 'Identifique as cartas dos Arcanos Maiores pelas imagens',
      type: 'card_identification',
      difficulty: 'intermediate',
      content: JSON.stringify({
        cards: [
          { id: 'fool', name: 'O Louco', imageUrl: '/cards/fool.jpg' },
          { id: 'magician', name: 'O Mago', imageUrl: '/cards/magician.jpg' },
          { id: 'empress', name: 'A Imperatriz', imageUrl: '/cards/empress.jpg' },
          { id: 'emperor', name: 'O Imperador', imageUrl: '/cards/emperor.jpg' },
          { id: 'hierophant', name: 'O Hierofante', imageUrl: '/cards/hierophant.jpg' },
        ],
        instructions: 'Arraste o nome correto para cada carta',
      }),
      xpReward: 150,
      crystalReward: 75,
      minScore: 80,
      oracleType: 'tarot',
    },
  })

  // Interpretation Exercise 1
  await prisma.exercise.upsert({
    where: { id: 'interpretation-louco-1' },
    update: {},
    create: {
      id: 'interpretation-louco-1',
      title: 'Interpretação: O Louco',
      description: 'Pratique a interpretação da carta O Louco em diferentes contextos',
      type: 'interpretation',
      difficulty: 'intermediate',
      content: JSON.stringify({
        card: {
          id: 'fool',
          name: 'O Louco',
          imageUrl: '/cards/fool.jpg',
        },
        scenario: 'Uma pessoa está considerando largar seu emprego estável para seguir um sonho de abrir seu próprio negócio. O Louco aparece na posição de conselho.',
        prompt: 'Como você interpretaria O Louco neste contexto? Escreva sua interpretação considerando o significado da carta e a situação apresentada.',
        minWords: 50,
      }),
      xpReward: 200,
      crystalReward: 100,
      minScore: 70,
      oracleType: 'tarot',
    },
  })

  // Guided Reading Exercise 1
  await prisma.exercise.upsert({
    where: { id: 'guided-reading-3-cartas-1' },
    update: {},
    create: {
      id: 'guided-reading-3-cartas-1',
      title: 'Leitura Guiada: Três Cartas',
      description: 'Aprenda a fazer uma leitura de três cartas (Passado, Presente, Futuro)',
      type: 'guided_reading',
      difficulty: 'beginner',
      content: JSON.stringify({
        spread: {
          name: 'Passado, Presente, Futuro',
          positions: [
            {
              id: 1,
              name: 'Passado',
              description: 'Influências e eventos que levaram à situação atual',
            },
            {
              id: 2,
              name: 'Presente',
              description: 'A situação atual e os desafios que você enfrenta',
            },
            {
              id: 3,
              name: 'Futuro',
              description: 'Possível resultado se você continuar no caminho atual',
            },
          ],
        },
        instructions: [
          'Pense em uma pergunta ou situação que você gostaria de explorar',
          'Embaralhe as cartas mentalmente',
          'Selecione três cartas',
          'Interprete cada carta em sua posição',
          'Reflita sobre a mensagem geral da leitura',
        ],
      }),
      xpReward: 150,
      crystalReward: 75,
      minScore: 70,
      oracleType: 'tarot',
    },
  })

  // Quiz Exercise 3: Simbolismo
  await prisma.exercise.upsert({
    where: { id: 'quiz-simbolismo-1' },
    update: {},
    create: {
      id: 'quiz-simbolismo-1',
      title: 'Quiz: Simbolismo no Tarot',
      description: 'Teste seus conhecimentos sobre os símbolos presentes nas cartas',
      type: 'quiz',
      difficulty: 'intermediate',
      content: JSON.stringify({
        questions: [
          {
            question: 'O que o cachorro branco em O Louco simboliza?',
            options: ['Lealdade', 'Instinto', 'Proteção', 'Todas as anteriores'],
            correctAnswer: 3,
          },
          {
            question: 'Qual planeta está associado ao Mago?',
            options: ['Vênus', 'Marte', 'Mercúrio', 'Júpiter'],
            correctAnswer: 2,
          },
          {
            question: 'O que as quatro ferramentas na mesa do Mago representam?',
            options: [
              'Os quatro elementos',
              'Os quatro naipes',
              'As ferramentas de manifestação',
              'Todas as anteriores',
            ],
            correctAnswer: 3,
          },
          {
            question: 'A Imperatriz está associada a qual planeta?',
            options: ['Lua', 'Vênus', 'Marte', 'Sol'],
            correctAnswer: 1,
          },
          {
            question: 'O que o símbolo do infinito (∞) representa no Tarot?',
            options: [
              'Eternidade',
              'Ciclos infinitos',
              'Potencial ilimitado',
              'Todas as anteriores',
            ],
            correctAnswer: 3,
          },
        ],
      }),
      xpReward: 150,
      crystalReward: 75,
      minScore: 70,
      oracleType: 'tarot',
    },
  })

  // Interpretation Exercise 2
  await prisma.exercise.upsert({
    where: { id: 'interpretation-mago-1' },
    update: {},
    create: {
      id: 'interpretation-mago-1',
      title: 'Interpretação: O Mago',
      description: 'Pratique a interpretação da carta O Mago em diferentes contextos',
      type: 'interpretation',
      difficulty: 'intermediate',
      content: JSON.stringify({
        card: {
          id: 'magician',
          name: 'O Mago',
          imageUrl: '/cards/magician.jpg',
        },
        scenario: 'Alguém está começando um novo projeto e tem dúvidas sobre suas habilidades. O Mago aparece na posição central.',
        prompt: 'Como você interpretaria O Mago neste contexto? Considere o simbolismo da carta e a situação apresentada.',
        minWords: 50,
      }),
      xpReward: 200,
      crystalReward: 100,
      minScore: 70,
      oracleType: 'tarot',
    },
  })

  // Advanced Quiz
  await prisma.exercise.upsert({
    where: { id: 'quiz-avancado-1' },
    update: {},
    create: {
      id: 'quiz-avancado-1',
      title: 'Quiz Avançado: Jornada do Louco',
      description: 'Teste seus conhecimentos sobre a Jornada do Louco através dos Arcanos Maiores',
      type: 'quiz',
      difficulty: 'advanced',
      content: JSON.stringify({
        questions: [
          {
            question: 'A Jornada do Louco representa:',
            options: [
              'Uma sequência aleatória de cartas',
              'A jornada da alma através da vida',
              'Apenas eventos futuros',
              'Apenas o passado',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Qual carta representa o ponto de virada na Jornada do Louco?',
            options: ['A Roda da Fortuna', 'A Morte', 'O Diabo', 'A Torre'],
            correctAnswer: 1,
          },
          {
            question: 'O que as três cartas finais (Estrela, Lua, Sol) representam?',
            options: [
              'Esperança, ilusão e clareza',
              'Passado, presente e futuro',
              'Corpo, mente e espírito',
              'Início, meio e fim',
            ],
            correctAnswer: 0,
          },
          {
            question: 'Qual carta representa o ego e o materialismo?',
            options: ['O Imperador', 'O Hierofante', 'O Diabo', 'O Mundo'],
            correctAnswer: 2,
          },
          {
            question: 'A carta final da Jornada do Louco é:',
            options: ['O Julgamento', 'O Mundo', 'O Sol', 'A Estrela'],
            correctAnswer: 1,
          },
        ],
      }),
      xpReward: 250,
      crystalReward: 150,
      minScore: 80,
      oracleType: 'tarot',
    },
  })

  console.log('✅ 8 exercises created')
  console.log('🎉 Exercises seed completed!')
}

seedExercises()
  .catch((e) => {
    console.error('❌ Error seeding exercises:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
