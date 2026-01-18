import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedCourses() {
  console.log('🌱 Seeding courses...')

  // Create Tarot Oracle
  const tarotOracle = await prisma.oracle.upsert({
    where: { slug: 'tarot' },
    update: {},
    create: {
      name: 'Tarot',
      slug: 'tarot',
      description: 'O Tarot é um sistema de 78 cartas divididas em Arcanos Maiores e Menores, usado para autoconhecimento e orientação.',
      icon: '🔮',
      order: 1,
      available: true,
    },
  })

  console.log('✅ Oracle created:', tarotOracle.name)

  // Create Tarot Course: Fundamentos do Tarot
  const fundamentosCourse = await prisma.course.upsert({
    where: { slug: 'fundamentos-do-tarot' },
    update: {},
    create: {
      title: 'Fundamentos do Tarot',
      slug: 'fundamentos-do-tarot',
      description: 'Aprenda os conceitos básicos do Tarot, sua história e como interpretar as cartas.',
      oracleId: tarotOracle.id,
      level: 'beginner',
      duration: '2 horas',
      published: true,
      order: 1,
    },
  })

  console.log('✅ Course created:', fundamentosCourse.title)

  // Module 1: Introdução ao Tarot
  const module1 = await prisma.module.upsert({
    where: { courseId_slug: { courseId: fundamentosCourse.id, slug: 'introducao-ao-tarot' } },
    update: {},
    create: {
      title: 'Introdução ao Tarot',
      slug: 'introducao-ao-tarot',
      description: 'Conheça a história e estrutura do Tarot',
      courseId: fundamentosCourse.id,
      order: 1,
    },
  })

  // Lessons for Module 1
  await prisma.lesson.createMany({
    data: [
      {
        title: 'História do Tarot',
        slug: 'historia-do-tarot',
        content: `# História do Tarot

O Tarot tem uma história rica e fascinante que remonta ao século XV. Originalmente criado como um jogo de cartas na Itália, o Tarot evoluiu ao longo dos séculos para se tornar uma ferramenta poderosa de autoconhecimento e orientação espiritual.

## Origens

As primeiras cartas de Tarot conhecidas datam de 1440, na corte dos Visconti em Milão. Essas cartas eram ricamente decoradas e usadas pela nobreza italiana para jogos.

## Evolução Esotérica

Foi apenas no século XVIII que o Tarot começou a ser associado ao ocultismo e à adivinhação. Antoine Court de Gébelin, um clérigo francês, foi um dos primeiros a sugerir que as cartas continham sabedoria antiga do Egito.

## Tarot Moderno

Hoje, o Tarot é usado principalmente como uma ferramenta de reflexão pessoal e desenvolvimento espiritual. Existem centenas de decks diferentes, cada um com sua própria arte e interpretação.`,
        moduleId: module1.id,
        order: 1,
        duration: 15,
        xpReward: 50,
        published: true,
      },
      {
        title: 'Estrutura do Tarot',
        slug: 'estrutura-do-tarot',
        content: `# Estrutura do Tarot

O Tarot é composto por 78 cartas divididas em dois grupos principais: os Arcanos Maiores e os Arcanos Menores.

## Arcanos Maiores (22 cartas)

Os Arcanos Maiores representam as grandes lições e temas da vida. Cada carta conta uma história e representa um arquétipo universal.

Exemplos:
- **O Louco (0)**: Novos começos, inocência, espontaneidade
- **O Mago (I)**: Manifestação, recursos, poder
- **A Imperatriz (III)**: Fertilidade, abundância, natureza

## Arcanos Menores (56 cartas)

Os Arcanos Menores são divididos em quatro naipes, cada um representando um elemento e área da vida:

- **Paus (Fogo)**: Ação, criatividade, paixão
- **Copas (Água)**: Emoções, relacionamentos, intuição
- **Espadas (Ar)**: Pensamentos, comunicação, conflitos
- **Ouros (Terra)**: Material, trabalho, segurança

Cada naipe contém 14 cartas: Ás a 10, mais 4 cartas da corte (Pajem, Cavaleiro, Rainha, Rei).`,
        moduleId: module1.id,
        order: 2,
        duration: 20,
        xpReward: 75,
        published: true,
      },
      {
        title: 'Como Usar o Tarot',
        slug: 'como-usar-o-tarot',
        content: `# Como Usar o Tarot

O Tarot é uma ferramenta versátil que pode ser usada de várias maneiras para obter insights e orientação.

## Preparação

Antes de fazer uma leitura:
1. **Limpe suas cartas**: Passe incenso ou simplesmente embaralhe com intenção
2. **Defina sua intenção**: O que você quer saber?
3. **Crie um espaço sagrado**: Encontre um lugar tranquilo

## Tipos de Leitura

### Leitura de Uma Carta
Perfeita para orientação diária ou respostas rápidas.

### Leitura de Três Cartas
Pode representar:
- Passado, Presente, Futuro
- Situação, Ação, Resultado
- Mente, Corpo, Espírito

### Cruz Celta
Uma leitura mais complexa com 10 cartas que oferece uma visão profunda de uma situação.

## Interpretação

A interpretação do Tarot é uma arte que combina:
- **Significado tradicional** das cartas
- **Intuição pessoal**
- **Contexto da pergunta**
- **Posição na tiragem**

Lembre-se: o Tarot não prevê o futuro, mas ilumina possibilidades e oferece perspectivas.`,
        moduleId: module1.id,
        order: 3,
        duration: 25,
        xpReward: 100,
        published: true,
      },
    ],
    skipDuplicates: true,
  })

  console.log('✅ Module 1 and lessons created')

  // Module 2: Arcanos Maiores
  const module2 = await prisma.module.upsert({
    where: { courseId_slug: { courseId: fundamentosCourse.id, slug: 'arcanos-maiores' } },
    update: {},
    create: {
      title: 'Arcanos Maiores',
      slug: 'arcanos-maiores',
      description: 'Estude os 22 Arcanos Maiores em profundidade',
      courseId: fundamentosCourse.id,
      order: 2,
    },
  })

  // Lessons for Module 2 (first 5 arcanos as example)
  await prisma.lesson.createMany({
    data: [
      {
        title: 'O Louco (0)',
        slug: 'o-louco',
        content: `# O Louco (0)

![O Louco](/cards/fool.jpg)

## Significado

O Louco representa o início de uma jornada, a inocência e a espontaneidade. É a carta dos novos começos e da fé no desconhecido.

## Simbolismo

- **Número**: 0 (todas as possibilidades)
- **Elemento**: Ar
- **Planeta**: Urano
- **Palavra-chave**: Novos começos

## Interpretação

**Posição Direta**:
- Novos começos
- Aventura e espontaneidade
- Fé e otimismo
- Liberdade

**Posição Invertida**:
- Imprudência
- Falta de direção
- Ingenuidade
- Medo de mudanças

## Reflexão

O Louco nos convida a dar um salto de fé, a confiar no universo e a abraçar o desconhecido com coragem e otimismo.`,
        moduleId: module2.id,
        order: 1,
        duration: 15,
        xpReward: 50,
        published: true,
      },
      {
        title: 'O Mago (I)',
        slug: 'o-mago',
        content: `# O Mago (I)

## Significado

O Mago representa o poder de manifestação, os recursos disponíveis e a habilidade de transformar ideias em realidade.

## Simbolismo

- **Número**: 1 (unidade, início)
- **Elemento**: Ar
- **Planeta**: Mercúrio
- **Palavra-chave**: Manifestação

## Interpretação

**Posição Direta**:
- Poder e habilidade
- Manifestação
- Recursos disponíveis
- Comunicação

**Posição Invertida**:
- Manipulação
- Falta de energia
- Recursos desperdiçados
- Comunicação bloqueada`,
        moduleId: module2.id,
        order: 2,
        duration: 15,
        xpReward: 50,
        published: true,
      },
    ],
    skipDuplicates: true,
  })

  console.log('✅ Module 2 and lessons created')

  // Create more oracles (placeholders for future)
  await prisma.oracle.createMany({
    data: [
      {
        name: 'Baralho Cigano',
        slug: 'cigano',
        description: 'Sistema de 36 cartas com origem na cultura romani, focado em previsões práticas do dia a dia.',
        icon: '🎴',
        order: 2,
        available: false,
      },
      {
        name: 'Runas',
        slug: 'runas',
        description: 'Alfabeto mágico nórdico de 24 símbolos usado para orientação e autoconhecimento.',
        icon: '🪨',
        order: 3,
        available: false,
      },
      {
        name: 'I-Ching',
        slug: 'iching',
        description: 'Livro das Mutações chinês, um dos textos mais antigos de sabedoria e filosofia.',
        icon: '☯️',
        order: 4,
        available: false,
      },
    ],
    skipDuplicates: true,
  })

  console.log('✅ Additional oracles created (unpublished)')
  console.log('🎉 Courses seed completed!')
}

seedCourses()
  .catch((e) => {
    console.error('❌ Error seeding courses:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
