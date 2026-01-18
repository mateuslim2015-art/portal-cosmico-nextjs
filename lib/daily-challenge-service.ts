import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type ChallengeType =
  | 'reflection'
  | 'identification'
  | 'interpretation'
  | 'symbolism'
  | 'practice';

interface ChallengeData {
  type: ChallengeType;
  title: string;
  description: string;
  cardId?: string;
  question?: string;
  options?: string[];
  correctAnswer?: string;
  xpReward: number;
  crystalReward: number;
}

/**
 * Gera um desafio diário aleatório
 */
export async function generateDailyChallenge(): Promise<ChallengeData> {
  const types: ChallengeType[] = [
    'reflection',
    'identification',
    'interpretation',
    'symbolism',
    'practice'
  ];

  const randomType = types[Math.floor(Math.random() * types.length)];

  // Busca uma carta aleatória dos Arcanos Maiores
  const cards = await prisma.tarotCard.findMany({
    where: { arcana: 'major' }
  });

  const randomCard = cards[Math.floor(Math.random() * cards.length)];

  switch (randomType) {
    case 'reflection':
      return {
        type: 'reflection',
        title: 'Carta do Dia - Reflexão Profunda',
        description: `${randomCard.name} apareceu para você hoje.`,
        cardId: randomCard.id,
        question: getReflectionQuestion(randomCard.name),
        xpReward: 100,
        crystalReward: 2
      };

    case 'identification':
      const otherCards = cards
        .filter((c) => c.id !== randomCard.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);

      const options = [randomCard.name, ...otherCards.map((c) => c.name)].sort(
        () => Math.random() - 0.5
      );

      return {
        type: 'identification',
        title: 'Identificação de Carta',
        description: 'Qual é o nome desta carta?',
        cardId: randomCard.id,
        options,
        correctAnswer: randomCard.name,
        xpReward: 50,
        crystalReward: 1
      };

    case 'interpretation':
      return {
        type: 'interpretation',
        title: 'Interpretação Rápida',
        description: getInterpretationScenario(randomCard.name),
        cardId: randomCard.id,
        options: getInterpretationOptions(randomCard.name),
        correctAnswer: randomCard.upright.substring(0, 100),
        xpReward: 75,
        crystalReward: 2
      };

    case 'symbolism':
      return {
        type: 'symbolism',
        title: 'Simbolismo Profundo',
        description: `O que representa ${getSymbolQuestion(randomCard.name)}?`,
        cardId: randomCard.id,
        question: getSymbolQuestion(randomCard.name),
        xpReward: 80,
        crystalReward: 2
      };

    case 'practice':
      return {
        type: 'practice',
        title: 'Tiragem Prática',
        description: 'Faça uma tiragem real e interprete',
        question:
          'Tire 1-3 cartas sobre uma pergunta pessoal e escreva sua interpretação',
        xpReward: 150,
        crystalReward: 3
      };

    default:
      return {
        type: 'reflection',
        title: 'Carta do Dia',
        description: `${randomCard.name} apareceu para você hoje.`,
        cardId: randomCard.id,
        question: 'Como esta carta se relaciona com seu dia hoje?',
        xpReward: 100,
        crystalReward: 2
      };
  }
}

/**
 * Retorna uma pergunta reflexiva para uma carta
 */
function getReflectionQuestion(cardName: string): string {
  const questions: Record<string, string> = {
    'O Louco':
      'Como você pode abraçar a espontaneidade e a coragem de começar algo novo hoje?',
    'O Mago':
      'Como você pode usar seu poder pessoal para manifestar algo importante hoje?',
    'A Sacerdotisa':
      'Que sabedoria interior está tentando se comunicar com você hoje?',
    'A Imperatriz':
      'Como você pode nutrir e cultivar abundância em sua vida hoje?',
    'O Imperador':
      'Onde você precisa estabelecer estrutura e liderança em sua vida?',
    'O Hierofante':
      'Que tradições ou ensinamentos podem guiar você hoje?',
    'Os Enamorados':
      'Que escolha importante você precisa fazer com o coração?',
    'O Carro':
      'Como você pode direcionar sua vontade para alcançar seus objetivos?',
    'A Força':
      'Onde você precisa demonstrar coragem e compaixão hoje?',
    'O Eremita':
      'Que insights você pode descobrir em momentos de introspecção?',
    'A Roda da Fortuna':
      'Como você pode fluir com as mudanças inevitáveis da vida?',
    'A Justiça':
      'Onde você precisa buscar equilíbrio e verdade em sua vida?',
    'O Enforcado':
      'Que perspectiva diferente você precisa adotar hoje?',
    'A Morte':
      'O que você precisa liberar para permitir uma transformação?',
    'A Temperança':
      'Como você pode encontrar harmonia entre opostos em sua vida?',
    'O Diabo':
      'De quais amarras você precisa se libertar?',
    'A Torre':
      'Que estrutura ultrapassada precisa ser derrubada para seu crescimento?',
    'A Estrela':
      'Como você pode renovar sua esperança e fé no futuro?',
    'A Lua': 'Que ilusões ou medos você precisa enfrentar hoje?',
    'O Sol': 'Como você pode expressar sua alegria e autenticidade hoje?',
    'O Julgamento':
      'Que chamado superior você está sendo convidado a responder?',
    'O Mundo':
      'Como você pode celebrar suas conquistas e abraçar a completude?'
  };

  return questions[cardName] || `Como ${cardName} se manifesta em sua vida hoje?`;
}

/**
 * Retorna um cenário de interpretação
 */
function getInterpretationScenario(cardName: string): string {
  const scenarios: Record<string, string> = {
    'O Louco':
      'Maria está pensando em largar o emprego estável para seguir seu sonho. Ela tirou O Louco. O que isso significa?',
    'O Mago':
      'João quer começar um novo projeto mas se sente inseguro. Ele tirou O Mago. O que a carta indica?',
    'A Torre':
      'Ana está em dúvida sobre mudar de emprego. Ela tirou A Torre. O que isso significa?',
    'A Estrela':
      'Pedro passou por momentos difíceis e tirou A Estrela. Qual a mensagem?',
    'A Lua':
      'Carla está confusa sobre um relacionamento. Ela tirou A Lua. O que a carta revela?'
  };

  return (
    scenarios[cardName] ||
    `Uma pessoa tirou ${cardName} sobre uma decisão importante. O que isso significa?`
  );
}

/**
 * Retorna opções de interpretação
 */
function getInterpretationOptions(cardName: string): string[] {
  // Opções genéricas - em produção, seria mais específico
  return [
    'É um sinal positivo para seguir em frente',
    'Indica necessidade de cautela e reflexão',
    'Sugere transformação e mudança necessária'
  ];
}

/**
 * Retorna uma pergunta sobre simbolismo
 */
function getSymbolQuestion(cardName: string): string {
  const symbols: Record<string, string> = {
    'O Mago': 'o símbolo do infinito acima da cabeça do Mago',
    'A Sacerdotisa': 'a lua aos pés da Sacerdotisa',
    'A Imperatriz': 'as estrelas na coroa da Imperatriz',
    'O Imperador': 'o trono de pedra do Imperador',
    'O Hierofante': 'as chaves cruzadas aos pés do Hierofante',
    'Os Enamorados': 'o anjo acima dos Enamorados',
    'O Carro': 'as esfinges que puxam o Carro',
    'A Força': 'o leão ao lado da figura',
    'O Eremita': 'a lanterna do Eremita',
    'A Roda da Fortuna': 'as criaturas ao redor da Roda',
    'A Justiça': 'a balança e a espada da Justiça',
    'O Enforcado': 'a posição invertida do Enforcado',
    'A Morte': 'o cavaleiro negro',
    'A Temperança': 'os cálices da Temperança',
    'O Diabo': 'as correntes nos pescoços das figuras',
    'A Torre': 'o raio que atinge a Torre',
    'A Estrela': 'as oito estrelas no céu',
    'A Lua': 'o caminho entre as torres',
    'O Sol': 'a criança no cavalo branco',
    'O Julgamento': 'o anjo tocando a trombeta',
    'O Mundo': 'a mandorla ao redor da figura'
  };

  return symbols[cardName] || `um símbolo importante em ${cardName}`;
}

/**
 * Cria ou retorna o desafio diário atual
 */
export async function getTodayChallenge(): Promise<any> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Verifica se já existe um desafio para hoje
  let challenge = await prisma.dailyChallenge.findFirst({
    where: {
      date: {
        gte: today
      }
    }
  });

  // Se não existe, cria um novo
  if (!challenge) {
    const challengeData = await generateDailyChallenge();

    challenge = await prisma.dailyChallenge.create({
      data: {
        date: today,
        type: challengeData.type,
        title: challengeData.title,
        description: challengeData.description,
        cardId: challengeData.cardId,
        question: challengeData.question,
        options: challengeData.options
          ? JSON.stringify(challengeData.options)
          : null,
        correctAnswer: challengeData.correctAnswer,
        xpReward: challengeData.xpReward,
        crystalReward: challengeData.crystalReward
      }
    });
  }

  return challenge;
}

/**
 * Completa o desafio diário do usuário
 */
export async function completeDailyChallenge(
  userId: string,
  challengeId: string,
  userAnswer: string
): Promise<{ success: boolean; xpEarned: number; crystalsEarned: number; aiFeedback?: string }> {
  const challenge = await prisma.dailyChallenge.findUnique({
    where: { id: challengeId }
  });

  if (!challenge) {
    throw new Error('Desafio não encontrado');
  }

  // Verifica se já completou
  const existing = await prisma.userDailyChallenge.findUnique({
    where: {
      userId_challengeId: {
        userId,
        challengeId
      }
    }
  });

  if (existing?.completed) {
    throw new Error('Desafio já completado');
  }

  // Valida resposta e gera feedback
  let isCorrect = true;
  let aiFeedback = '';

  if (challenge.type === 'identification' || challenge.type === 'interpretation') {
    isCorrect = userAnswer === challenge.correctAnswer;
  }

  // Para reflexões, sempre considera correto se tiver mais de 50 caracteres
  if (challenge.type === 'reflection' || challenge.type === 'symbolism') {
    isCorrect = userAnswer.length >= 50;
    aiFeedback = 'Sua reflexão mostra profundidade e conexão com a carta. Continue explorando esses insights!';
  }

  const xpEarned = isCorrect ? challenge.xpReward : Math.floor(challenge.xpReward / 2);
  const crystalsEarned = isCorrect ? challenge.crystalReward : 0;

  // Atualiza ou cria progresso do usuário
  await prisma.userDailyChallenge.upsert({
    where: {
      userId_challengeId: {
        userId,
        challengeId
      }
    },
    update: {
      completed: true,
      completedAt: new Date(),
      userAnswer,
      aiFeedback,
      xpEarned,
      crystalsEarned
    },
    create: {
      userId,
      challengeId,
      completed: true,
      completedAt: new Date(),
      userAnswer,
      aiFeedback,
      xpEarned,
      crystalsEarned
    }
  });

  // Atualiza XP e cristais do usuário
  await prisma.user.update({
    where: { id: userId },
    data: {
      xp: { increment: xpEarned },
      crystals: { increment: crystalsEarned },
      lastActivityDate: new Date()
    }
  });

  // Atualiza streak
  await updateUserStreak(userId);

  return {
    success: isCorrect,
    xpEarned,
    crystalsEarned,
    aiFeedback
  };
}

/**
 * Atualiza o streak do usuário
 */
async function updateUserStreak(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastActivity = user.lastActivityDate
    ? new Date(user.lastActivityDate)
    : null;

  if (lastActivity) {
    lastActivity.setHours(0, 0, 0, 0);

    const diffDays = Math.floor(
      (today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 1) {
      // Incrementa streak
      await prisma.user.update({
        where: { id: userId },
        data: { streak: { increment: 1 } }
      });
    } else if (diffDays > 1) {
      // Perdeu o streak
      await prisma.user.update({
        where: { id: userId },
        data: { streak: 1 }
      });
    }
  } else {
    // Primeiro dia
    await prisma.user.update({
      where: { id: userId },
      data: { streak: 1 }
    });
  }
}

/**
 * Retorna o progresso do usuário no desafio de hoje
 */
export async function getTodayChallengeProgress(userId: string) {
  const challenge = await getTodayChallenge();

  const progress = await prisma.userDailyChallenge.findUnique({
    where: {
      userId_challengeId: {
        userId,
        challengeId: challenge.id
      }
    }
  });

  return {
    challenge,
    completed: progress?.completed || false,
    userAnswer: progress?.userAnswer,
    aiFeedback: progress?.aiFeedback,
    xpEarned: progress?.xpEarned || 0,
    crystalsEarned: progress?.crystalsEarned || 0
  };
}
