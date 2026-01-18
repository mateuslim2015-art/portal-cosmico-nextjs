'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Sparkles, BookOpen, Target } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ActivityData {
  day: string
  readings: number
  study: number
  practice: number
}

const MOCK_DATA: ActivityData[] = [
  { day: 'Seg', readings: 3, study: 2, practice: 1 },
  { day: 'Ter', readings: 5, study: 3, practice: 2 },
  { day: 'Qua', readings: 2, study: 4, practice: 1 },
  { day: 'Qui', readings: 4, study: 2, practice: 3 },
  { day: 'Sex', readings: 6, study: 5, practice: 2 },
  { day: 'Sáb', readings: 8, study: 3, practice: 4 },
  { day: 'Dom', readings: 4, study: 2, practice: 2 },
]

type ActivityType = 'readings' | 'study' | 'practice' | 'all'

const ACTIVITY_CONFIG = {
  readings: {
    label: 'Leituras',
    color: 'bg-purple-500',
    icon: Sparkles,
  },
  study: {
    label: 'Estudo',
    color: 'bg-blue-500',
    icon: BookOpen,
  },
  practice: {
    label: 'Prática',
    color: 'bg-pink-500',
    icon: Target,
  },
}

export default function ActivityGraph() {
  const [selectedType, setSelectedType] = useState<ActivityType>('all')

  const maxValue = Math.max(
    ...MOCK_DATA.map((d) =>
      selectedType === 'all'
        ? d.readings + d.study + d.practice
        : d[selectedType as keyof Omit<ActivityData, 'day'>]
    )
  )

  const totalReadings = MOCK_DATA.reduce((sum, d) => sum + d.readings, 0)
  const totalStudy = MOCK_DATA.reduce((sum, d) => sum + d.study, 0)
  const totalPractice = MOCK_DATA.reduce((sum, d) => sum + d.practice, 0)
  const totalActivities = totalReadings + totalStudy + totalPractice

  const getBarHeight = (value: number) => {
    return (value / maxValue) * 100
  }

  return (
    <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-cinzel text-purple-200">
          <BarChart3 className="w-6 h-6 text-purple-400" />
          Atividade Semanal
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Stats summary */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <button
            onClick={() => setSelectedType('all')}
            className={`p-3 rounded-lg border transition-all ${
              selectedType === 'all'
                ? 'bg-gradient-to-br from-purple-500/30 to-indigo-500/30 border-purple-400/50'
                : 'bg-indigo-950/40 border-indigo-500/20 hover:border-indigo-400/40'
            }`}
          >
            <TrendingUp className="w-5 h-5 text-purple-400 mx-auto mb-1" />
            <div className="text-2xl font-bold text-white text-center">
              {totalActivities}
            </div>
            <div className="text-xs text-indigo-300 text-center">Total</div>
          </button>

          {(Object.keys(ACTIVITY_CONFIG) as Array<keyof typeof ACTIVITY_CONFIG>).map((type) => {
            const config = ACTIVITY_CONFIG[type]
            const Icon = config.icon
            const total =
              type === 'readings'
                ? totalReadings
                : type === 'study'
                ? totalStudy
                : totalPractice

            return (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`p-3 rounded-lg border transition-all ${
                  selectedType === type
                    ? 'bg-gradient-to-br from-purple-500/30 to-indigo-500/30 border-purple-400/50'
                    : 'bg-indigo-950/40 border-indigo-500/20 hover:border-indigo-400/40'
                }`}
              >
                <Icon className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                <div className="text-2xl font-bold text-white text-center">{total}</div>
                <div className="text-xs text-indigo-300 text-center">
                  {config.label}
                </div>
              </button>
            )
          })}
        </div>

        {/* Graph */}
        <div className="relative h-64 mb-4">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-indigo-300 pr-2">
            <span>{maxValue}</span>
            <span>{Math.round(maxValue * 0.75)}</span>
            <span>{Math.round(maxValue * 0.5)}</span>
            <span>{Math.round(maxValue * 0.25)}</span>
            <span>0</span>
          </div>

          {/* Grid lines */}
          <div className="absolute left-10 right-0 top-0 bottom-0">
            {[0, 25, 50, 75, 100].map((percent) => (
              <div
                key={percent}
                className="absolute w-full border-t border-indigo-500/10"
                style={{ bottom: `${percent}%` }}
              />
            ))}
          </div>

          {/* Bars */}
          <div className="absolute left-10 right-0 bottom-0 flex items-end justify-around h-full">
            {MOCK_DATA.map((data, index) => {
              const readings = getBarHeight(data.readings)
              const study = getBarHeight(data.study)
              const practice = getBarHeight(data.practice)
              const total = getBarHeight(data.readings + data.study + data.practice)

              return (
                <div key={data.day} className="flex flex-col items-center flex-1 max-w-[60px]">
                  <div className="relative w-full flex-1 flex items-end justify-center">
                    {selectedType === 'all' ? (
                      <div className="relative w-12 flex flex-col items-center">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${total}%` }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          className="w-full bg-gradient-to-t from-purple-600 via-blue-500 to-pink-500 rounded-t-lg relative group cursor-pointer"
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            L: {data.readings} | E: {data.study} | P: {data.practice}
                          </div>
                        </motion.div>
                      </div>
                    ) : (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{
                          height: `${getBarHeight(
                            data[selectedType as keyof Omit<ActivityData, 'day'>]
                          )}%`,
                        }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className={`w-12 ${
                          ACTIVITY_CONFIG[selectedType as keyof typeof ACTIVITY_CONFIG].color
                        } rounded-t-lg relative group cursor-pointer`}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {data[selectedType as keyof Omit<ActivityData, 'day'>]}
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <div className="text-xs text-indigo-300 mt-2 font-medium">{data.day}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        {selectedType === 'all' && (
          <div className="flex items-center justify-center gap-4 pt-4 border-t border-purple-500/20">
            {(Object.keys(ACTIVITY_CONFIG) as Array<keyof typeof ACTIVITY_CONFIG>).map((type) => {
              const config = ACTIVITY_CONFIG[type]
              return (
                <div key={type} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded ${config.color}`} />
                  <span className="text-xs text-indigo-300">{config.label}</span>
                </div>
              )
            })}
          </div>
        )}

        {/* Insights */}
        <div className="mt-4 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
          <p className="text-sm text-center text-purple-200">
            {totalActivities >= 20
              ? '🌟 Semana excepcional! Você está em chamas!'
              : totalActivities >= 10
              ? '✨ Ótimo progresso esta semana!'
              : '💫 Continue praticando para melhorar!'}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
