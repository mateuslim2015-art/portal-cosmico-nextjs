'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface MoonPhaseData {
  phase: string
  phaseName: string
  emoji: string
  illumination: number
  meaning: string
  energy: string
}

export default function MoonPhase() {
  const [moonData, setMoonData] = useState<MoonPhaseData | null>(null)

  useEffect(() => {
    calculateMoonPhase()
  }, [])

  const calculateMoonPhase = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const day = today.getDate()

    // Algoritmo simplificado para calcular a fase da lua
    // Baseado na data da lua nova conhecida: 6 de janeiro de 2000
    const knownNewMoon = new Date(2000, 0, 6, 18, 14)
    const lunarCycle = 29.53058867 // dias
    
    const currentDate = new Date(year, month - 1, day)
    const daysSinceNewMoon = (currentDate.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24)
    const phase = (daysSinceNewMoon % lunarCycle) / lunarCycle

    const phaseData = getMoonPhaseData(phase)
    setMoonData(phaseData)
  }

  const getMoonPhaseData = (phase: number): MoonPhaseData => {
    const illumination = Math.round(
      phase < 0.5 
        ? phase * 2 * 100 
        : (1 - (phase - 0.5) * 2) * 100
    )

    if (phase < 0.033 || phase > 0.967) {
      return {
        phase: 'new',
        phaseName: 'Lua Nova',
        emoji: '🌑',
        illumination: 0,
        meaning: 'Novos começos e intenções',
        energy: 'Tempo de plantar sementes e definir intenções para o ciclo lunar',
      }
    } else if (phase < 0.216) {
      return {
        phase: 'waxing-crescent',
        phaseName: 'Lua Crescente',
        emoji: '🌒',
        illumination,
        meaning: 'Crescimento e manifestação',
        energy: 'Momento de agir sobre suas intenções e construir momentum',
      }
    } else if (phase < 0.283) {
      return {
        phase: 'first-quarter',
        phaseName: 'Quarto Crescente',
        emoji: '🌓',
        illumination: 50,
        meaning: 'Decisões e ação',
        energy: 'Tempo de tomar decisões importantes e superar obstáculos',
      }
    } else if (phase < 0.467) {
      return {
        phase: 'waxing-gibbous',
        phaseName: 'Lua Gibosa Crescente',
        emoji: '🌔',
        illumination,
        meaning: 'Refinamento e ajustes',
        energy: 'Momento de refinar seus planos e fazer ajustes necessários',
      }
    } else if (phase < 0.533) {
      return {
        phase: 'full',
        phaseName: 'Lua Cheia',
        emoji: '🌕',
        illumination: 100,
        meaning: 'Plenitude e revelação',
        energy: 'Momento de colher resultados e celebrar conquistas',
      }
    } else if (phase < 0.717) {
      return {
        phase: 'waning-gibbous',
        phaseName: 'Lua Gibosa Minguante',
        emoji: '🌖',
        illumination,
        meaning: 'Gratidão e compartilhamento',
        energy: 'Tempo de compartilhar conhecimento e expressar gratidão',
      }
    } else if (phase < 0.783) {
      return {
        phase: 'last-quarter',
        phaseName: 'Quarto Minguante',
        emoji: '🌗',
        illumination: 50,
        meaning: 'Liberação e perdão',
        energy: 'Momento de liberar o que não serve mais e perdoar',
      }
    } else {
      return {
        phase: 'waning-crescent',
        phaseName: 'Lua Minguante',
        emoji: '🌘',
        illumination,
        meaning: 'Descanso e reflexão',
        energy: 'Tempo de descansar, refletir e se preparar para o novo ciclo',
      }
    }
  }

  if (!moonData) {
    return (
      <Card className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Moon className="w-8 h-8 text-indigo-400" />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-500/30 overflow-hidden relative">
      {/* Background stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <CardContent className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-cinzel text-indigo-200 flex items-center gap-2">
            <Moon className="w-5 h-5 text-indigo-400" />
            Fase Lunar
          </h3>
          <span className="text-sm text-indigo-300">
            {moonData.illumination}% iluminada
          </span>
        </div>

        <div className="flex items-center gap-6">
          {/* Moon emoji with animation */}
          <motion.div
            className="text-6xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {moonData.emoji}
          </motion.div>

          {/* Moon info */}
          <div className="flex-1">
            <h4 className="text-2xl font-cinzel text-white mb-1">
              {moonData.phaseName}
            </h4>
            <p className="text-indigo-200 text-sm mb-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {moonData.meaning}
            </p>
            <p className="text-indigo-300 text-xs leading-relaxed">
              {moonData.energy}
            </p>
          </div>
        </div>

        {/* Illumination bar */}
        <div className="mt-4">
          <div className="h-2 bg-indigo-950/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-400 to-purple-400"
              initial={{ width: 0 }}
              animate={{ width: `${moonData.illumination}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>
      </CardContent>

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-indigo-500/5 to-transparent pointer-events-none" />
    </Card>
  )
}
