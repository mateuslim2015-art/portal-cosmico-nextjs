import { prisma } from './db'
import OpenAI from 'openai'

const openai = new OpenAI()

// Tipos de exercícios
export type ExerciseType = 'quiz' | 'guided_reading' | 'photo_upload' | 'card_identification' | 'interpretation'

// Interface para Quiz
export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  cardId?: string
}

export interface QuizData {
  questions: QuizQuestion[]
}

// Interface para Leitura Guiada
export interface GuidedReadingData {
  spreadType: string
  cards: string[]
  prompts: string[]
}

// Função para gerar quiz com IA
export async function generateQuiz(
  topic: string,
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  questionCount: number = 5
): Promise<QuizData> {
  const prompt = `Crie ${questionCount} perguntas de múltipla escolha sobre ${topic} no Tarot.
Dificuldade: ${difficulty}

Para cada pergunta, forneça:
1. A pergunta
2. 4 opções de resposta
3. O índice da resposta correta (0-3)
4. Uma explicação detalhada

Retorne em formato JSON:
{
  "questions": [
    {
      "id": "1",
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 0,
      "explanation": "..."
    }
  ]
}`

  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      {
        role: 'system',
        content: 'Você é um especialista em Tarot criando exercícios educativos. Sempre retorne JSON válido.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    response_format: { type: 'json_object' },
    temperature: 0.7,
  })

  const content = response.choices[0].message.content
  if (!content) throw new Error('Resposta vazia da IA')

  return JSON.parse(content)
}

// Função para avaliar resposta de quiz
export function evaluateQuiz(userAnswers: number[], correctAnswers: number[]): {
  score: number
  correctCount: number
  totalCount: number
} {
  const correctCount = userAnswers.filter((answer, index) => answer === correctAnswers[index]).length
  const totalCount = correctAnswers.length
  const score = Math.round((correctCount / totalCount) * 100)

  return { score, correctCount, totalCount }
}

// Função para gerar feedback de leitura guiada
export async function generateGuidedReadingFeedback(
  cards: string[],
  userInterpretation: string,
  spreadType: string
): Promise<string> {
  const prompt = `O usuário fez uma tiragem de ${spreadType} com as seguintes cartas:
${cards.map((card, i) => `${i + 1}. ${card}`).join('\n')}

Interpretação do usuário:
"${userInterpretation}"

Como especialista em Tarot, forneça feedback construtivo:
1. Identifique pontos fortes da interpretação
2. Sugira aspectos que poderiam ser aprofundados
3. Adicione insights que o usuário pode ter perdido
4. Seja encorajador e educativo

Mantenha o tom místico e acolhedor.`

  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      {
        role: 'system',
        content: 'Você é um mestre de Tarot experiente e paciente, ensinando um estudante.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 0.8,
  })

  return response.choices[0].message.content || 'Não foi possível gerar feedback.'
}

// Função para avaliar interpretação com IA
export async function evaluateInterpretation(
  cards: string[],
  userInterpretation: string,
  context?: string
): Promise<{
  score: number
  feedback: string
  strengths: string[]
  improvements: string[]
}> {
  const prompt = `Avalie a seguinte interpretação de Tarot em uma escala de 0-100:

Cartas: ${cards.join(', ')}
${context ? `Contexto: ${context}` : ''}

Interpretação do usuário:
"${userInterpretation}"

Forneça:
1. Uma pontuação de 0-100
2. Feedback geral
3. Lista de pontos fortes (3-5 itens)
4. Lista de áreas para melhoria (3-5 itens)

Retorne em formato JSON:
{
  "score": 85,
  "feedback": "...",
  "strengths": ["...", "..."],
  "improvements": ["...", "..."]
}`

  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      {
        role: 'system',
        content: 'Você é um avaliador expert de interpretações de Tarot. Seja justo mas encorajador.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    response_format: { type: 'json_object' },
    temperature: 0.7,
  })

  const content = response.choices[0].message.content
  if (!content) throw new Error('Resposta vazia da IA')

  return JSON.parse(content)
}

// Função para identificar cartas em foto (simulado - OCR real requer integração com Vision API)
export async function identifyCardsInPhoto(photoUrl: string): Promise<string[]> {
  // TODO: Integrar com OpenAI Vision API ou Google Cloud Vision
  // Por enquanto, retorna simulação
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      {
        role: 'system',
        content: 'Você está simulando identificação de cartas de Tarot em uma foto.'
      },
      {
        role: 'user',
        content: `Simule a identificação de 3 cartas aleatórias de Tarot. Retorne apenas os nomes das cartas em JSON: {"cards": ["...", "...", "..."]}`
      }
    ],
    response_format: { type: 'json_object' },
  })

  const content = response.choices[0].message.content
  if (!content) throw new Error('Resposta vazia da IA')

  const result = JSON.parse(content)
  return result.cards
}

// Função para criar exercício de quiz
export async function createQuizExercise(
  title: string,
  topic: string,
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  questionCount: number = 5
) {
  const quizData = await generateQuiz(topic, difficulty, questionCount)

  const exercise = await prisma.exercise.create({
    data: {
      title,
      description: `Quiz sobre ${topic} - ${questionCount} perguntas`,
      type: 'quiz',
      category: difficulty,
      difficulty,
      oracleType: 'tarot',
      content: JSON.stringify(quizData),
      xpReward: questionCount * 10,
      crystalReward: questionCount * 2,
      minScore: 70,
      active: true,
    },
  })

  return exercise
}

// Função para submeter resposta de exercício
export async function submitExercise(
  userId: string,
  exerciseId: string,
  userAnswers: any
) {
  const exercise = await prisma.exercise.findUnique({
    where: { id: exerciseId },
  })

  if (!exercise) throw new Error('Exercício não encontrado')

  // Buscar ou criar progresso do usuário
  let userExercise = await prisma.userExercise.findUnique({
    where: {
      userId_exerciseId: {
        userId,
        exerciseId,
      },
    },
  })

  if (!userExercise) {
    userExercise = await prisma.userExercise.create({
      data: {
        userId,
        exerciseId,
        status: 'IN_PROGRESS',
        startedAt: new Date(),
      },
    })
  }

  // Avaliar baseado no tipo
  let score = 0
  let feedback = ''

  if (exercise.type === 'quiz') {
    const quizData: QuizData = JSON.parse(exercise.content)
    const correctAnswers = quizData.questions.map(q => q.correctAnswer)
    const evaluation = evaluateQuiz(userAnswers, correctAnswers)
    score = evaluation.score
    feedback = `Você acertou ${evaluation.correctCount} de ${evaluation.totalCount} perguntas.`
  } else if (exercise.type === 'guided_reading' || exercise.type === 'interpretation') {
    const guidedData: GuidedReadingData = JSON.parse(exercise.content)
    const evaluation = await evaluateInterpretation(
      guidedData.cards,
      userAnswers.interpretation
    )
    score = evaluation.score
    feedback = evaluation.feedback
  }

  // Verificar se passou
  const passed = score >= exercise.minScore
  const status = passed ? 'COMPLETED' : 'FAILED'

  // Calcular recompensas
  const xpEarned = passed ? exercise.xpReward : Math.floor(exercise.xpReward * 0.5)
  const crystalsEarned = passed ? exercise.crystalReward : 0

  // Atualizar progresso
  const updatedUserExercise = await prisma.userExercise.update({
    where: { id: userExercise.id },
    data: {
      status,
      score,
      attempts: { increment: 1 },
      userAnswers: JSON.stringify(userAnswers),
      aiFeedback: feedback,
      xpEarned,
      crystalsEarned,
      completedAt: passed ? new Date() : null,
    },
  })

  // Atualizar XP e cristais do usuário
  if (passed) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        xp: { increment: xpEarned },
        crystals: { increment: crystalsEarned },
      },
    })
  }

  return {
    ...updatedUserExercise,
    passed,
  }
}

// Função para listar exercícios disponíveis
export async function listExercises(filters?: {
  type?: ExerciseType
  category?: string
  difficulty?: string
  oracleType?: string
}) {
  return prisma.exercise.findMany({
    where: {
      active: true,
      ...(filters?.type && { type: filters.type }),
      ...(filters?.category && { category: filters.category }),
      ...(filters?.difficulty && { difficulty: filters.difficulty }),
      ...(filters?.oracleType && { oracleType: filters.oracleType }),
    },
    orderBy: [
      { order: 'asc' },
      { createdAt: 'desc' },
    ],
  })
}

// Função para obter progresso do usuário em exercícios
export async function getUserExerciseProgress(userId: string) {
  const exercises = await prisma.userExercise.findMany({
    where: { userId },
    include: {
      exercise: true,
    },
    orderBy: { updatedAt: 'desc' },
  })

  const stats = {
    total: exercises.length,
    completed: exercises.filter(e => e.status === 'COMPLETED').length,
    inProgress: exercises.filter(e => e.status === 'IN_PROGRESS').length,
    failed: exercises.filter(e => e.status === 'FAILED').length,
    totalXP: exercises.reduce((sum, e) => sum + e.xpEarned, 0),
    totalCrystals: exercises.reduce((sum, e) => sum + e.crystalsEarned, 0),
    averageScore: exercises.length > 0
      ? Math.round(exercises.reduce((sum, e) => sum + e.score, 0) / exercises.length)
      : 0,
  }

  return { exercises, stats }
}
