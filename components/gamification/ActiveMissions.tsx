'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Target, CheckCircle2, Clock, Sparkles, Trophy, BookOpen, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface Mission {
  id: string
  title: string
  description: string
  progress: number
  total: number
  reward: number
  icon: 'target' | 'book' | 'sparkles' | 'zap'
  difficulty: 'easy' | 'medium' | 'hard'
  expiresIn?: string
}

const MOCK_MISSIONS: Mission[] = [
  {
    id: '1',
    title: 'Primeira Leitura',
    description: 'Faça sua primeira consulta de Tarot',
    progress: 0,
    total: 1,
    reward: 50,
    icon: 'sparkles',
    difficulty: 'easy',
  },
  {
    id: '2',
    title: 'Estudante Dedicado',
    description: 'Estude 5 cartas diferentes',
    progress: 2,
    total: 5,
    reward: 100,
    icon: 'book',
    difficulty: 'medium',
  },
  {
    id: '3',
    title: 'Sequência de 7 Dias',
    description: 'Acesse o portal por 7 dias consecutivos',
    progress: 3,
    total: 7,
    reward: 200,
    icon: 'target',
    difficulty: 'hard',
    expiresIn: '4 dias',
  },
  {
    id: '4',
    title: 'Mestre das Cartas',
    description: 'Complete 10 leituras de Tarot',
    progress: 4,
    total: 10,
    reward: 150,
    icon: 'zap',
    difficulty: 'medium',
  },
]

const DIFFICULTY_COLORS = {
  easy: 'text-green-400 border-green-500/30 bg-green-500/10',
  medium: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
  hard: 'text-red-400 border-red-500/30 bg-red-500/10',
}

const DIFFICULTY_LABELS = {
  easy: 'Fácil',
  medium: 'Médio',
  hard: 'Difícil',
}

export default function ActiveMissions() {
  const [missions, setMissions] = useState<Mission[]>(MOCK_MISSIONS)

  const getIcon = (iconName: string) => {
    const iconProps = { className: 'w-5 h-5' }
    switch (iconName) {
      case 'target':
        return <Target {...iconProps} />
      case 'book':
        return <BookOpen {...iconProps} />
      case 'sparkles':
        return <Sparkles {...iconProps} />
      case 'zap':
        return <Zap {...iconProps} />
      default:
        return <Target {...iconProps} />
    }
  }

  return (
    <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-cinzel text-purple-200">
          <Trophy className="w-6 h-6 text-yellow-400" />
          Missões Ativas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {missions.map((mission, index) => {
          const progressPercent = (mission.progress / mission.total) * 100
          const isCompleted = mission.progress >= mission.total

          return (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`border ${
                  isCompleted
                    ? 'bg-green-900/20 border-green-500/30'
                    : 'bg-indigo-950/40 border-indigo-500/20'
                } transition-all hover:border-purple-400/50`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div
                      className={`p-2 rounded-lg ${
                        isCompleted
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-purple-500/20 text-purple-400'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        getIcon(mission.icon)
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-white">
                          {mission.title}
                        </h4>
                        <div className="flex items-center gap-1 text-yellow-400 text-sm font-medium shrink-0">
                          <Sparkles className="w-4 h-4" />
                          +{mission.reward} XP
                        </div>
                      </div>

                      <p className="text-sm text-indigo-200 mb-3">
                        {mission.description}
                      </p>

                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-indigo-300">
                            {mission.progress} / {mission.total}
                          </span>
                          <span className="text-indigo-300">
                            {Math.round(progressPercent)}%
                          </span>
                        </div>
                        <Progress
                          value={progressPercent}
                          className="h-2 bg-indigo-950/50"
                        />
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-3">
                        <span
                          className={`text-xs px-2 py-1 rounded-full border ${
                            DIFFICULTY_COLORS[mission.difficulty]
                          }`}
                        >
                          {DIFFICULTY_LABELS[mission.difficulty]}
                        </span>
                        {mission.expiresIn && !isCompleted && (
                          <div className="flex items-center gap-1 text-xs text-orange-400">
                            <Clock className="w-3 h-3" />
                            {mission.expiresIn}
                          </div>
                        )}
                        {isCompleted && (
                          <span className="text-xs text-green-400 font-medium">
                            ✓ Completa
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}

        {/* Summary */}
        <div className="pt-4 border-t border-purple-500/20">
          <div className="flex items-center justify-between text-sm">
            <span className="text-indigo-200">
              {missions.filter((m) => m.progress >= m.total).length} de{' '}
              {missions.length} completas
            </span>
            <span className="text-yellow-400 font-medium">
              {missions.reduce((acc, m) => acc + m.reward, 0)} XP total
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
