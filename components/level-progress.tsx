'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Zap, Target } from "lucide-react"

interface LevelProgressProps {
  level: number
  currentXP: number
  xpForNextLevel: number
  totalReadings: number
  streak: number
}

export function LevelProgress({ 
  level, 
  currentXP, 
  xpForNextLevel, 
  totalReadings, 
  streak 
}: LevelProgressProps) {
  const progressPercentage = (currentXP / xpForNextLevel) * 100

  return (
    <Card className="bg-gradient-to-br from-purple-900/80 to-indigo-900/80 border-purple-500/30 cosmic-glow">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center">
            <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
            <span>Seu Progresso</span>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <Zap className="w-4 h-4 mr-1 text-yellow-400" />
              <span className="text-purple-200">{streak} dias</span>
            </div>
            <div className="flex items-center">
              <Target className="w-4 h-4 mr-1 text-purple-400" />
              <span className="text-purple-200">{totalReadings} leituras</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Level Display */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-white">Nível {level}</div>
            <div className="text-purple-200 text-sm">
              {currentXP} / {xpForNextLevel} XP
            </div>
          </div>
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <div className="text-2xl font-bold text-white">{level}</div>
            </div>
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="url(#gradient)"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 36}`}
                strokeDashoffset={`${2 * Math.PI * 36 * (1 - progressPercentage / 100)}`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={progressPercentage} className="h-3" />
          <div className="flex justify-between text-xs text-purple-300">
            <span>Faltam {xpForNextLevel - currentXP} XP para o próximo nível</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
        </div>

        {/* XP Sources */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="bg-purple-800/30 rounded-lg p-3">
            <div className="text-yellow-400 font-semibold text-sm">+50 XP</div>
            <div className="text-purple-200 text-xs">Completar lição</div>
          </div>
          <div className="bg-purple-800/30 rounded-lg p-3">
            <div className="text-yellow-400 font-semibold text-sm">+20 XP</div>
            <div className="text-purple-200 text-xs">Fazer leitura</div>
          </div>
          <div className="bg-purple-800/30 rounded-lg p-3">
            <div className="text-yellow-400 font-semibold text-sm">+30 XP</div>
            <div className="text-purple-200 text-xs">Exercício</div>
          </div>
          <div className="bg-purple-800/30 rounded-lg p-3">
            <div className="text-yellow-400 font-semibold text-sm">+50 XP</div>
            <div className="text-purple-200 text-xs">Desafio diário</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
