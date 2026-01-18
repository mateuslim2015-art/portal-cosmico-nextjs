'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Trophy, Sparkles, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'

interface Exercise {
  id: string
  title: string
  description: string | null
  type: string
  content: string
  difficulty: string
  xpReward: number
  crystalReward: number
  minScore: number
}

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
}

interface QuizData {
  questions: QuizQuestion[]
}

export default function ExercisePage() {
  const params = useParams()
  const router = useRouter()
  const [exercise, setExercise] = useState<Exercise | null>(null)
  const [loading, setLoading] = useState(true)
  const [quizData, setQuizData] = useState<QuizData | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [interpretation, setInterpretation] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    fetchExercise()
  }, [])

  const fetchExercise = async () => {
    try {
      const res = await fetch('/api/practice/exercises')
      const data = await res.json()
      const ex = data.exercises.find((e: Exercise) => e.id === params.id)
      
      if (ex) {
        setExercise(ex)
        if (ex.type === 'quiz') {
          const parsed = JSON.parse(ex.content)
          setQuizData(parsed)
          setSelectedAnswers(new Array(parsed.questions.length).fill(-1))
        }
      }
    } catch (error) {
      console.error('Erro ao carregar exercício:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[questionIndex] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleSubmit = async () => {
    if (!exercise) return
    
    setSubmitting(true)
    try {
      let userAnswers: any = {}
      
      if (exercise.type === 'quiz') {
        userAnswers = { answers: selectedAnswers }
      } else {
        userAnswers = { interpretation }
      }

      const res = await fetch('/api/practice/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exerciseId: exercise.id,
          userAnswers,
        }),
      })

      const data = await res.json()
      setResult(data)
    } catch (error) {
      console.error('Erro ao submeter:', error)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen mystical-gradient flex items-center justify-center">
        <div className="text-white text-xl">Carregando exercício...</div>
      </div>
    )
  }

  if (!exercise) {
    return (
      <div className="min-h-screen mystical-gradient flex items-center justify-center">
        <div className="text-white text-xl">Exercício não encontrado</div>
      </div>
    )
  }

  if (result) {
    return (
      <div className="min-h-screen mystical-gradient p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/50">
            <CardHeader>
              <div className="text-center">
                {result.passed ? (
                  <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4" />
                ) : (
                  <XCircle className="w-20 h-20 text-red-400 mx-auto mb-4" />
                )}
                <CardTitle className="text-3xl text-white mb-2">
                  {result.passed ? '🎉 Parabéns!' : '😔 Quase lá!'}
                </CardTitle>
                <p className="text-xl text-gray-300">
                  Pontuação: {result.score}/100
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-black/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">Feedback da IA</h3>
                <p className="text-gray-300 whitespace-pre-wrap">{result.feedback}</p>
              </div>

              {result.passed && (
                <div className="bg-gradient-to-r from-yellow-900/50 to-purple-900/50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">Recompensas</h3>
                  <div className="flex items-center justify-center gap-8">
                    <div className="text-center">
                      <div className="text-4xl mb-2">⚡</div>
                      <div className="text-2xl font-bold text-blue-400">+{result.xpEarned} XP</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-2">💎</div>
                      <div className="text-2xl font-bold text-cyan-400">+{result.crystalsEarned} Cristais</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  onClick={() => router.push('/practice')}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  Voltar aos Exercícios
                </Button>
                {!result.passed && (
                  <Button
                    onClick={() => {
                      setResult(null)
                      setSelectedAnswers(new Array(quizData?.questions.length || 0).fill(-1))
                      setInterpretation('')
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    Tentar Novamente
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen mystical-gradient p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/practice">
          <Button variant="ghost" className="text-white mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>

        <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/50 mb-6">
          <CardHeader>
            <CardTitle className="text-2xl text-white">{exercise.title}</CardTitle>
            <p className="text-gray-300">{exercise.description}</p>
            <div className="flex items-center gap-4 mt-4">
              <span className="text-blue-400">⚡ +{exercise.xpReward} XP</span>
              <span className="text-cyan-400">💎 +{exercise.crystalReward} Cristais</span>
              <span className="text-yellow-400">🎯 Mínimo: {exercise.minScore}%</span>
            </div>
          </CardHeader>
        </Card>

        {exercise.type === 'quiz' && quizData && (
          <div className="space-y-6">
            {quizData.questions.map((q, qIndex) => (
              <Card key={qIndex} className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-500/50">
                <CardHeader>
                  <CardTitle className="text-lg text-white">
                    Questão {qIndex + 1} de {quizData.questions.length}
                  </CardTitle>
                  <p className="text-gray-300 text-base">{q.question}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {q.options.map((option, oIndex) => (
                    <button
                      key={oIndex}
                      onClick={() => handleQuizAnswer(qIndex, oIndex)}
                      className={`w-full p-4 rounded-lg text-left transition-all ${
                        selectedAnswers[qIndex] === oIndex
                          ? 'bg-purple-600 text-white border-2 border-purple-400'
                          : 'bg-black/30 text-gray-300 border-2 border-gray-700 hover:border-purple-500'
                      }`}
                    >
                      {String.fromCharCode(65 + oIndex)}. {option}
                    </button>
                  ))}
                </CardContent>
              </Card>
            ))}

            <Button
              onClick={handleSubmit}
              disabled={submitting || selectedAnswers.includes(-1)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-6"
            >
              {submitting ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  Avaliando...
                </>
              ) : (
                <>
                  <Trophy className="w-5 h-5 mr-2" />
                  Enviar Respostas
                </>
              )}
            </Button>
          </div>
        )}

        {(exercise.type === 'guided_reading' || exercise.type === 'interpretation') && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-500/50">
              <CardHeader>
                <CardTitle className="text-white">Sua Interpretação</CardTitle>
                <p className="text-gray-300 text-sm">
                  Escreva sua interpretação das cartas. Seja detalhado e use seus conhecimentos de Tarot.
                </p>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={interpretation}
                  onChange={(e) => setInterpretation(e.target.value)}
                  placeholder="Escreva sua interpretação aqui... (mínimo 100 caracteres)"
                  className="min-h-[300px] bg-black/30 text-white border-purple-500/50"
                />
                <p className="text-sm text-gray-400 mt-2">
                  {interpretation.length} caracteres
                </p>
              </CardContent>
            </Card>

            <Button
              onClick={handleSubmit}
              disabled={submitting || interpretation.length < 100}
              className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-6"
            >
              {submitting ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  IA Analisando...
                </>
              ) : (
                <>
                  <Trophy className="w-5 h-5 mr-2" />
                  Enviar para Avaliação
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
