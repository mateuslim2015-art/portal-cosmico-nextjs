'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Trophy, Target, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Exercise {
  id: string
  title: string
  description: string | null
  type: string
  difficulty: string
  xpReward: number
  crystalReward: number
}

export default function PracticePage() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log('[PAGE] useEffect triggered')
    fetchExercises()
  }, [])

  const fetchExercises = async () => {
    console.log('[PAGE] fetchExercises started')
    try {
      console.log('[PAGE] Fazendo fetch...')
      const res = await fetch('/api/practice/exercises')
      console.log('[PAGE] Response status:', res.status)
      
      if (!res.ok) {
        const errorData = await res.json()
        console.error('[PAGE] API Error:', errorData)
        setError(errorData.error || 'Erro desconhecido')
        setExercises([])
        return
      }
      
      const data = await res.json()
      console.log('[PAGE] Exercises data:', data)
      setExercises(data.exercises || [])
    } catch (err) {
      console.error('[PAGE] Catch error:', err)
      setError(err instanceof Error ? err.message : 'Erro ao carregar')
      setExercises([])
    } finally {
      console.log('[PAGE] Finally - setting loading false')
      setLoading(false)
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quiz': return '📝'
      case 'guided_reading': return '🔮'
      case 'card_identification': return '🎴'
      case 'interpretation': return '✨'
      default: return '📚'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'quiz': return 'Quiz'
      case 'guided_reading': return 'Leitura Guiada'
      case 'card_identification': return 'Identificação'
      case 'interpretation': return 'Interpretação'
      default: return type
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400'
      case 'intermediate': return 'text-yellow-400'
      case 'advanced': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  console.log('[PAGE] Rendering - loading:', loading, 'exercises:', exercises.length, 'error:', error)

  return (
    <div className="min-h-screen mystical-gradient p-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/dashboard">
          <Button variant="ghost" className="text-white mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <Target className="w-8 h-8 text-purple-400" />
          <div>
            <h1 className="text-4xl font-bold text-white">Prática</h1>
            <p className="text-purple-100">Exercícios com feedback inteligente da IA</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-white">
            <div className="text-xl mb-2">Carregando exercícios...</div>
            <div className="text-sm text-gray-400">Aguarde...</div>
          </div>
        ) : error ? (
          <Card className="bg-gradient-to-br from-red-900/50 to-purple-900/50 border-red-500/50">
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-white mb-2">Erro ao carregar exercícios</h2>
              <p className="text-gray-300 mb-4">{error}</p>
              <Button onClick={() => { setLoading(true); fetchExercises(); }} className="bg-purple-600 hover:bg-purple-700">
                Tentar Novamente
              </Button>
            </CardContent>
          </Card>
        ) : exercises.length === 0 ? (
          <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/50">
            <CardContent className="p-12 text-center">
              <BookOpen className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Nenhum exercício disponível</h2>
              <p className="text-gray-300">Novos exercícios serão adicionados em breve!</p>
            </CardContent>
          </Card>
        ) : (
          <div>
            <div className="text-white mb-4">
              {exercises.length} exercício(s) encontrado(s)
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {exercises.map((exercise) => (
                <Card
                  key={exercise.id}
                  className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/50 hover:border-purple-400 transition-all cursor-pointer"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{getTypeIcon(exercise.type)}</span>
                        <div>
                          <CardTitle className="text-white text-xl">{exercise.title}</CardTitle>
                          <p className="text-sm text-gray-400 mt-1">{getTypeLabel(exercise.type)}</p>
                        </div>
                      </div>
                      <Trophy className="w-6 h-6 text-yellow-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">{exercise.description || 'Sem descrição'}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-sm font-semibold ${getDifficultyColor(exercise.difficulty)}`}>
                        {exercise.difficulty === 'beginner' && '⭐ Iniciante'}
                        {exercise.difficulty === 'intermediate' && '⭐⭐ Intermediário'}
                        {exercise.difficulty === 'advanced' && '⭐⭐⭐ Avançado'}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1 text-blue-400">
                        <span className="text-lg">⚡</span>
                        <span className="text-sm">+{exercise.xpReward} XP</span>
                      </div>
                      <div className="flex items-center gap-1 text-cyan-400">
                        <span className="text-lg">💎</span>
                        <span className="text-sm">+{exercise.crystalReward} Cristais</span>
                      </div>
                    </div>

                    <Link href={`/practice/${exercise.id}`} className="w-full">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">
                        Começar Exercício
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
