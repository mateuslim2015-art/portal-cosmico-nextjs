'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Flame, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface DayData {
  date: Date
  hasActivity: boolean
  activityCount: number
}

export default function StreakCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentStreak, setCurrentStreak] = useState(7)
  const [longestStreak, setLongestStreak] = useState(15)

  // Generate calendar days for current month
  const generateCalendarDays = (): DayData[] => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days: DayData[] = []

    // Add empty days for alignment
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({
        date: new Date(year, month, -startingDayOfWeek + i + 1),
        hasActivity: false,
        activityCount: 0,
      })
    }

    // Add days of the month with mock activity data
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const today = new Date()
      const isToday = date.toDateString() === today.toDateString()
      const isPast = date < today
      
      // Mock activity: random activity for past days, guaranteed for last 7 days
      const daysSinceToday = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
      const hasActivity = isPast && (daysSinceToday <= 7 || Math.random() > 0.4)
      const activityCount = hasActivity ? Math.floor(Math.random() * 5) + 1 : 0

      days.push({
        date,
        hasActivity: hasActivity || isToday,
        activityCount,
      })
    }

    return days
  }

  const days = generateCalendarDays()
  const monthName = currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const getActivityColor = (count: number) => {
    if (count === 0) return 'bg-gray-800/50'
    if (count === 1) return 'bg-purple-900/50'
    if (count === 2) return 'bg-purple-700/70'
    if (count === 3) return 'bg-purple-600/80'
    if (count === 4) return 'bg-purple-500/90'
    return 'bg-purple-400'
  }

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

  return (
    <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-cinzel text-purple-200">
          <Calendar className="w-6 h-6 text-purple-400" />
          Calendário de Atividades
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Streak stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="text-sm text-orange-200">Sequência Atual</span>
            </div>
            <div className="text-3xl font-bold text-white">{currentStreak}</div>
            <div className="text-xs text-orange-300 mt-1">dias consecutivos</div>
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-purple-200">Melhor Sequência</span>
            </div>
            <div className="text-3xl font-bold text-white">{longestStreak}</div>
            <div className="text-xs text-purple-300 mt-1">dias consecutivos</div>
          </div>
        </div>

        {/* Month navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={previousMonth}
            className="p-2 rounded-lg hover:bg-purple-500/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-purple-300" />
          </button>
          <h3 className="text-lg font-semibold text-white capitalize">{monthName}</h3>
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-purple-500/20 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-purple-300" />
          </button>
        </div>

        {/* Week day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-xs text-indigo-300 font-medium py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const isCurrentMonth = day.date.getMonth() === currentDate.getMonth()
            const isToday = day.date.toDateString() === new Date().toDateString()

            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className="relative aspect-square"
              >
                <div
                  className={`
                    w-full h-full rounded-lg flex items-center justify-center text-sm
                    ${!isCurrentMonth ? 'opacity-30' : ''}
                    ${isToday ? 'ring-2 ring-yellow-400' : ''}
                    ${day.hasActivity ? getActivityColor(day.activityCount) : 'bg-gray-800/30'}
                    ${day.hasActivity ? 'text-white font-semibold' : 'text-gray-500'}
                    transition-all cursor-pointer hover:ring-2 hover:ring-purple-400
                  `}
                  title={
                    day.hasActivity
                      ? `${day.activityCount} atividade${day.activityCount > 1 ? 's' : ''}`
                      : 'Sem atividade'
                  }
                >
                  {day.date.getDate()}
                  
                  {/* Activity indicator */}
                  {day.hasActivity && day.activityCount > 0 && (
                    <div className="absolute bottom-1 flex gap-0.5">
                      {Array.from({ length: Math.min(day.activityCount, 5) }).map((_, i) => (
                        <div
                          key={i}
                          className="w-1 h-1 rounded-full bg-white/80"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-purple-500/20">
          <div className="flex items-center justify-between text-xs">
            <span className="text-indigo-300">Menos</span>
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`w-4 h-4 rounded ${getActivityColor(level)}`}
                />
              ))}
            </div>
            <span className="text-indigo-300">Mais</span>
          </div>
        </div>

        {/* Motivation message */}
        <div className="mt-4 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
          <p className="text-sm text-center text-purple-200">
            {currentStreak >= 7
              ? '🔥 Incrível! Continue assim!'
              : currentStreak >= 3
              ? '✨ Você está indo bem! Continue praticando.'
              : '💫 Comece sua jornada hoje!'}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
