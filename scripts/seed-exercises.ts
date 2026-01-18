import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🎯 Populando exercícios...')

  // Quiz para iniciantes
  const quizBeginner = await prisma.exercise.create({
    data: {
      title: 'Quiz: Arcanos Maiores Básico',
      description: 'Teste seus conhecimentos sobre os 22 Arcanos Maiores',
      type: 'quiz',
      category: 'beginner',
      difficulty: 'beginner',
      oracleType: 'tarot',
      content: JSON.stringify({
        questions: [
          {
            id: '1',
            question: 'Qual carta representa novos começos e potencial infinito?',
            options: ['O Louco', 'O Mago', 'A Imperatriz', 'O Mundo'],
            correctAnswer: 0,
            explanation: 'O Louco (0) representa novos começos, aventura e potencial infinito. É a carta da jornada que está prestes a começar.'
          },
          {
            id: '2',
            question: 'Qual arcano simboliza manifestação e poder pessoal?',
            options: ['O Louco', 'O Mago', 'A Sacerdotisa', 'O Imperador'],
            correctAnswer: 1,
            explanation: 'O Mago (I) representa manifestação, poder pessoal e a capacidade de transformar ideias em realidade.'
          },
          {
            id: '3',
            question: 'Qual carta está associada à intuição e mistérios ocultos?',
            options: ['A Imperatriz', 'A Sacerdotisa', 'A Justiça', 'A Estrela'],
            correctAnswer: 1,
            explanation: 'A Sacerdotisa (II) representa intuição, mistérios ocultos e conhecimento interior.'
          },
          {
            id: '4',
            question: 'Qual arcano simboliza abundância e fertilidade?',
            options: ['A Imperatriz', 'O Imperador', 'O Papa', 'Os Enamorados'],
            correctAnswer: 0,
            explanation: 'A Imperatriz (III) representa abundância, fertilidade, criatividade e nutrição.'
          },
          {
            id: '5',
            question: 'Qual carta representa estrutura e autoridade?',
            options: ['O Mago', 'O Imperador', 'O Eremita', 'A Roda da Fortuna'],
            correctAnswer: 1,
            explanation: 'O Imperador (IV) representa estrutura, autoridade, estabilidade e liderança.'
          }
        ]
      }),
      xpReward: 50,
      crystalReward: 10,
      timeLimit: 300,
      minScore: 60,
      active: true,
      order: 1,
    },
  })

  // Quiz intermediário
  const quizIntermediate = await prisma.exercise.create({
    data: {
      title: 'Quiz: Simbolismo Profundo',
      description: 'Explore os símbolos e significados mais profundos do Tarot',
      type: 'quiz',
      category: 'intermediate',
      difficulty: 'intermediate',
      oracleType: 'tarot',
      content: JSON.stringify({
        questions: [
          {
            id: '1',
            question: 'O que representa a Roda da Fortuna no contexto de ciclos?',
            options: [
              'Apenas sorte e azar',
              'Ciclos naturais e mudanças inevitáveis',
              'Destino fixo e imutável',
              'Escolhas pessoais'
            ],
            correctAnswer: 1,
            explanation: 'A Roda da Fortuna representa os ciclos naturais da vida, mudanças inevitáveis e a natureza cíclica da existência.'
          },
          {
            id: '2',
            question: 'Qual é o significado mais profundo da carta da Morte?',
            options: [
              'Fim literal da vida',
              'Transformação e renascimento',
              'Doença e sofrimento',
              'Perda material'
            ],
            correctAnswer: 1,
            explanation: 'A Morte raramente representa morte física. Ela simboliza transformação profunda, fim de ciclos e renascimento.'
          },
          {
            id: '3',
            question: 'O que a Torre representa em termos de crescimento espiritual?',
            options: [
              'Apenas destruição',
              'Revelação súbita e libertação de ilusões',
              'Punição divina',
              'Má sorte'
            ],
            correctAnswer: 1,
            explanation: 'A Torre representa revelação súbita, quebra de ilusões e libertação de estruturas que não nos servem mais.'
          }
        ]
      }),
      xpReward: 75,
      crystalReward: 15,
      timeLimit: 600,
      minScore: 70,
      active: true,
      order: 2,
    },
  })

  // Leitura Guiada
  const guidedReading = await prisma.exercise.create({
    data: {
      title: 'Leitura Guiada: Três Cartas',
      description: 'Pratique interpretação com feedback da IA',
      type: 'guided_reading',
      category: 'beginner',
      difficulty: 'beginner',
      oracleType: 'tarot',
      content: JSON.stringify({
        spreadType: 'Três Cartas (Passado, Presente, Futuro)',
        cards: ['O Louco', 'O Mago', 'A Imperatriz'],
        prompts: [
          'Observe as três cartas. O que você sente ao vê-las juntas?',
          'Como o Louco (passado) se conecta com o Mago (presente)?',
          'O que a Imperatriz (futuro) sugere sobre o resultado desta jornada?',
          'Qual mensagem geral você vê nesta leitura?'
        ]
      }),
      xpReward: 100,
      crystalReward: 20,
      minScore: 70,
      active: true,
      order: 3,
    },
  })

  // Identificação de Cartas
  const cardIdentification = await prisma.exercise.create({
    data: {
      title: 'Identificação: Arcanos Maiores',
      description: 'Identifique cartas apenas pela imagem',
      type: 'card_identification',
      category: 'beginner',
      difficulty: 'beginner',
      oracleType: 'tarot',
      content: JSON.stringify({
        cardCount: 10,
        timePerCard: 30,
        cards: [
          'O Louco',
          'O Mago',
          'A Sacerdotisa',
          'A Imperatriz',
          'O Imperador',
          'O Papa',
          'Os Enamorados',
          'O Carro',
          'A Força',
          'O Eremita'
        ]
      }),
      xpReward: 60,
      crystalReward: 12,
      timeLimit: 300,
      minScore: 80,
      active: true,
      order: 4,
    },
  })

  // Interpretação Livre
  const interpretation = await prisma.exercise.create({
    data: {
      title: 'Interpretação Livre: Cruz Celta',
      description: 'Interprete uma tiragem completa de Cruz Celta',
      type: 'interpretation',
      category: 'advanced',
      difficulty: 'advanced',
      oracleType: 'tarot',
      content: JSON.stringify({
        spreadType: 'Cruz Celta',
        cards: [
          'O Louco',
          'A Torre',
          'O Sol',
          'A Lua',
          'A Estrela',
          'O Julgamento',
          'O Mundo',
          'O Mago',
          'A Sacerdotisa',
          'A Imperatriz'
        ],
        positions: [
          'Situação Atual',
          'Desafio/Obstáculo',
          'Passado Recente',
          'Futuro Próximo',
          'Acima (Objetivo)',
          'Abaixo (Fundação)',
          'Conselho',
          'Influências Externas',
          'Esperanças e Medos',
          'Resultado Final'
        ]
      }),
      xpReward: 150,
      crystalReward: 30,
      minScore: 75,
      active: true,
      order: 5,
    },
  })

  console.log('✅ 5 exercícios criados com sucesso!')
  console.log(`- ${quizBeginner.title}`)
  console.log(`- ${quizIntermediate.title}`)
  console.log(`- ${guidedReading.title}`)
  console.log(`- ${cardIdentification.title}`)
  console.log(`- ${interpretation.title}`)
}

main()
  .catch((e) => {
    console.error('❌ Erro:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
