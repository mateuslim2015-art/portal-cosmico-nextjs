'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, History, Lock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface UserStats {
  totalPractices: number
  completedExercises: number
}

export default function PracticePage() {
  const router = useRouter()
  const [stats, setStats] = useState<UserStats>({ totalPractices: 0, completedExercises: 0 })

  useEffect(() => {
    // Buscar estatísticas do usuário
    // Por enquanto, valores mockados
    setStats({ totalPractices: 3, completedExercises: 12 })
  }, [])

  const oracles = [
    {
      id: 'tarot',
      name: 'Tarot',
      icon: '🔮',
      description: 'Pratique com os 78 arcanos',
      available: true,
      href: '/practice/tarot'
    },
    {
      id: 'cigano',
      name: 'Baralho Cigano',
      icon: '🎴',
      description: 'Em breve',
      available: false,
      href: '#'
    },
    {
      id: 'runas',
      name: 'Runas',
      icon: '🪨',
      description: 'Em breve',
      available: false,
      href: '#'
    },
    {
      id: 'iching',
      name: 'I-Ching',
      icon: '☯️',
      description: 'Em breve',
      available: false,
      href: '#'
    }
  ]

  return (
    <div className="min-h-screen mystical-gradient p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard">
          <Button variant="ghost" className="text-white mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-6 bg-gradient-to-br from-yellow-400/20 to-purple-500/20 rounded-full mb-6">
            <Sparkles className="w-16 h-16 text-yellow-400" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-3">🎯 Prática</h1>
          <p className="text-xl text-purple-100 mb-2">
            {stats.totalPractices} leituras • Desenvolva suas habilidades
          </p>
        </div>

        {/* Botão Ver Histórico */}
        <div className="mb-8">
          <Button
            onClick={() => router.push('/practice/history')}
            className="w-full bg-black/40 hover:bg-black/60 border-2 border-purple-500/50 hover:border-purple-400 text-white py-6 text-lg"
          >
            <History className="w-5 h-5 mr-2" />
            Ver Histórico
          </Button>
        </div>

        {/* Seleção de Oráculo */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Escolha um Oráculo</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {oracles.map((oracle) => (
            <Card
              key={oracle.id}
              className={`bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/50 transition-all ${
                oracle.available
                  ? 'hover:border-purple-400 hover:scale-105 cursor-pointer'
                  : 'opacity-60 cursor-not-allowed'
              }`}
              onClick={() => {
                if (oracle.available) {
                  router.push(oracle.href)
                }
              }}
            >
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">{oracle.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{oracle.name}</h3>
                  <p className="text-gray-300 mb-6">{oracle.description}</p>
                  
                  {oracle.available ? (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 rounded-full text-white font-semibold">
                      <Sparkles className="w-4 h-4" />
                      Disponível
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-full text-gray-400">
                      <Lock className="w-4 h-4" />
                      Em Breve
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Estatísticas */}
        <Card className="mt-8 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-500/50">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Suas Estatísticas</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">{stats.totalPractices}</div>
                <div className="text-sm text-gray-300">Leituras</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">{stats.completedExercises}</div>
                <div className="text-sm text-gray-300">Exercícios Completos</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
