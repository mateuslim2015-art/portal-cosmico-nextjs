'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Trophy, Calendar, Target } from 'lucide-react'
import Link from 'next/link'

interface PracticeHistory {
  id: string
  exerciseTitle: string
  type: string
  score: number
  passed: boolean
  xpEarned: number
  crystalsEarned: number
  completedAt: string
  feedback: string
}

export default function PracticeHistoryPage() {
  const [history, setHistory] = useState<PracticeHistory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      // Por enquanto, dados mockados
      // TODO: Implementar API /api/practice/history
      const mockHistory: PracticeHistory[] = [
        {
          id: '1',
          exerciseTitle: 'Quiz: Arcanos Maiores Básico',
          type: 'quiz',
          score: 80,
          passed: true,
          xpEarned: 50,
          crystalsEarned: 10,
          completedAt: '2025-10-29T10:30:00',
          feedback: 'Excelente! Você demonstrou bom conhecimento dos Arcanos Maiores.'
        },
        {
          id: '2',
          exerciseTitle: 'Leitura Guiada: Três Cartas',
          type: 'guided_reading',
          score: 75,
          passed: true,
          xpEarned: 100,
          crystalsEarned: 20,
          completedAt: '2025-10-28T15:20:00',
          feedback: 'Boa interpretação! Continue praticando a conexão entre as cartas.'
        },
        {
          id: '3',
          exerciseTitle: 'Quiz: Simbolismo Profundo',
          type: 'quiz',
          score: 55,
          passed: false,
          xpEarned: 0,
          crystalsEarned: 0,
          completedAt: '2025-10-27T09:15:00',
          feedback: 'Você precisa estudar mais sobre os símbolos. Revise o material e tente novamente.'
        }
      ]
      setHistory(mockHistory)
    } catch (error) {
      console.error('Erro ao carregar histórico:', error)
    } finally {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen mystical-gradient flex items-center justify-center">
        <div className="text-white text-xl">Carregando histórico...</div>
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

        <div className="flex items-center gap-3 mb-8">
          <Target className="w-8 h-8 text-purple-400" />
          <div>
            <h1 className="text-4xl font-bold text-white">Histórico de Práticas</h1>
            <p className="text-purple-100">Acompanhe seu progresso</p>
          </div>
        </div>

        {/* Estatísticas Gerais */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-500/50">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-blue-400">{history.length}</div>
              <div className="text-sm text-gray-300">Total</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-900/50 to-purple-900/50 border-green-500/50">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-green-400">
                {history.filter(h => h.passed).length}
              </div>
              <div className="text-sm text-gray-300">Aprovados</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-900/50 to-purple-900/50 border-yellow-500/50">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-yellow-400">
                {Math.round((history.filter(h => h.passed).length / history.length) * 100)}%
              </div>
              <div className="text-sm text-gray-300">Taxa de Sucesso</div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Histórico */}
        {history.length === 0 ? (
          <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/50">
            <CardContent className="p-12 text-center">
              <Trophy className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Nenhuma prática ainda</h2>
              <p className="text-gray-300 mb-6">Comece a praticar para ver seu histórico aqui!</p>
              <Link href="/practice">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Começar a Praticar
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <Card
                key={item.id}
                className={`bg-gradient-to-br ${
                  item.passed
                    ? 'from-green-900/30 to-purple-900/30 border-green-500/50'
                    : 'from-red-900/30 to-purple-900/30 border-red-500/50'
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{getTypeIcon(item.type)}</span>
                      <div>
                        <CardTitle className="text-white text-lg">{item.exerciseTitle}</CardTitle>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                          <Calendar className="w-4 h-4" />
                          {formatDate(item.completedAt)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${
                        item.passed ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {item.score}%
                      </div>
                      <div className="text-sm text-gray-400">
                        {item.passed ? '✅ Aprovado' : '❌ Reprovado'}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{item.feedback}</p>
                  
                  {item.passed && (
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-blue-400">
                        <span className="text-lg">⚡</span>
                        <span className="text-sm">+{item.xpEarned} XP</span>
                      </div>
                      <div className="flex items-center gap-1 text-cyan-400">
                        <span className="text-lg">💎</span>
                        <span className="text-sm">+{item.crystalsEarned} Cristais</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
