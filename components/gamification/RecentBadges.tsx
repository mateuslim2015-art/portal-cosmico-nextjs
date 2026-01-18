'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, Sparkles, Star, Crown, Flame, Zap, Moon, BookOpen } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Badge3D from '@/components/3d/Badge3D'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface Badge {
  id: string
  name: string
  description: string
  icon: 'award' | 'star' | 'crown' | 'flame' | 'zap' | 'moon' | 'book'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlockedAt: string
  progress?: number
  total?: number
}

const MOCK_BADGES: Badge[] = [
  {
    id: '1',
    name: 'Primeiro Passo',
    description: 'Completou sua primeira leitura de Tarot',
    icon: 'star',
    rarity: 'common',
    unlockedAt: 'Há 2 dias',
  },
  {
    id: '2',
    name: 'Estudante Lunar',
    description: 'Estudou durante uma lua cheia',
    icon: 'moon',
    rarity: 'rare',
    unlockedAt: 'Há 5 dias',
  },
  {
    id: '3',
    name: 'Mestre das Cartas',
    description: 'Completou 100 leituras de Tarot',
    icon: 'crown',
    rarity: 'epic',
    unlockedAt: 'Há 1 semana',
  },
]

const LOCKED_BADGES: Badge[] = [
  {
    id: '4',
    name: 'Chama Eterna',
    description: 'Mantenha uma sequência de 30 dias',
    icon: 'flame',
    rarity: 'legendary',
    unlockedAt: '',
    progress: 7,
    total: 30,
  },
  {
    id: '5',
    name: 'Sábio Cósmico',
    description: 'Estude todos os 78 arcanos',
    icon: 'book',
    rarity: 'epic',
    unlockedAt: '',
    progress: 23,
    total: 78,
  },
]

const RARITY_CONFIG = {
  common: {
    color: 'from-gray-500 to-gray-600',
    glow: 'shadow-gray-500/50',
    border: 'border-gray-400/30',
    text: 'text-gray-300',
    label: 'Comum',
  },
  rare: {
    color: 'from-blue-500 to-cyan-500',
    glow: 'shadow-blue-500/50',
    border: 'border-blue-400/30',
    text: 'text-blue-300',
    label: 'Raro',
  },
  epic: {
    color: 'from-purple-500 to-pink-500',
    glow: 'shadow-purple-500/50',
    border: 'border-purple-400/30',
    text: 'text-purple-300',
    label: 'Épico',
  },
  legendary: {
    color: 'from-yellow-500 to-orange-500',
    glow: 'shadow-yellow-500/50',
    border: 'border-yellow-400/30',
    text: 'text-yellow-300',
    label: 'Lendário',
  },
}

export default function RecentBadges() {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null)
  const [showLocked, setShowLocked] = useState(false)

  const getIcon = (iconName: string, className: string = 'w-8 h-8') => {
    const props = { className }
    switch (iconName) {
      case 'award':
        return <Award {...props} />
      case 'star':
        return <Star {...props} />
      case 'crown':
        return <Crown {...props} />
      case 'flame':
        return <Flame {...props} />
      case 'zap':
        return <Zap {...props} />
      case 'moon':
        return <Moon {...props} />
      case 'book':
        return <BookOpen {...props} />
      default:
        return <Award {...props} />
    }
  }

  const BadgeItem = ({ badge, locked = false }: { badge: Badge; locked?: boolean }) => {
    const config = RARITY_CONFIG[badge.rarity]

    return (
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setSelectedBadge(badge)}
        className="cursor-pointer"
      >
        <div
          className={`relative p-4 rounded-xl border ${config.border} ${
            locked ? 'bg-gray-900/40' : `bg-gradient-to-br ${config.color}/20`
          } ${!locked && config.glow} transition-all`}
        >
          {/* Rarity indicator */}
          <div className="absolute top-2 right-2">
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                locked ? 'bg-gray-700/50 text-gray-400' : `${config.text} bg-black/30`
              }`}
            >
              {config.label}
            </span>
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-3">
            <Badge3D
              icon={badge.icon}
              rarity={badge.rarity}
              locked={locked}
              size="medium"
            />
          </div>

          {/* Name */}
          <h4
            className={`text-center font-semibold text-sm mb-1 ${
              locked ? 'text-gray-400' : 'text-white'
            }`}
          >
            {badge.name}
          </h4>

          {/* Unlocked time or progress */}
          {!locked && badge.unlockedAt && (
            <p className="text-center text-xs text-indigo-300">{badge.unlockedAt}</p>
          )}

          {locked && badge.progress !== undefined && badge.total !== undefined && (
            <div className="mt-2">
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${config.color} transition-all`}
                  style={{ width: `${(badge.progress / badge.total) * 100}%` }}
                />
              </div>
              <p className="text-center text-xs text-gray-400 mt-1">
                {badge.progress} / {badge.total}
              </p>
            </div>
          )}

          {/* Lock overlay */}
          {locked && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
              <div className="text-4xl">🔒</div>
            </div>
          )}

          {/* Sparkle animation for unlocked badges */}
          {!locked && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              <Sparkles className="absolute top-1 right-1 w-4 h-4 text-yellow-400" />
            </motion.div>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <>
      <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-2xl font-cinzel text-purple-200">
              <Award className="w-6 h-6 text-yellow-400" />
              Conquistas
            </CardTitle>
            <button
              onClick={() => setShowLocked(!showLocked)}
              className="text-sm text-indigo-300 hover:text-indigo-200 transition-colors"
            >
              {showLocked ? 'Ocultar bloqueadas' : 'Ver todas'}
            </button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Unlocked badges */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {MOCK_BADGES.map((badge) => (
              <BadgeItem key={badge.id} badge={badge} />
            ))}
          </div>

          {/* Locked badges */}
          <AnimatePresence>
            {showLocked && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="border-t border-purple-500/20 pt-4 mb-4">
                  <h3 className="text-sm font-semibold text-indigo-200 mb-3">
                    Próximas Conquistas
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {LOCKED_BADGES.map((badge) => (
                      <BadgeItem key={badge.id} badge={badge} locked />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Summary */}
          <div className="pt-4 border-t border-purple-500/20">
            <div className="flex items-center justify-between text-sm">
              <span className="text-indigo-200">
                {MOCK_BADGES.length} conquistas desbloqueadas
              </span>
              <span className="text-purple-300">
                {LOCKED_BADGES.length} em progresso
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badge detail modal */}
      <Dialog open={!!selectedBadge} onOpenChange={() => setSelectedBadge(null)}>
        <DialogContent className="bg-gradient-to-br from-purple-900 to-indigo-900 border-purple-500/30">
          {selectedBadge && (
            <>
              <DialogHeader>
                <div className="flex justify-center mb-4">
                  <div
                    className={`p-6 rounded-full bg-gradient-to-br ${
                      RARITY_CONFIG[selectedBadge.rarity].color
                    } text-white shadow-2xl ${RARITY_CONFIG[selectedBadge.rarity].glow}`}
                  >
                    {getIcon(selectedBadge.icon, 'w-12 h-12')}
                  </div>
                </div>
                <DialogTitle className="text-center text-2xl font-cinzel text-white">
                  {selectedBadge.name}
                </DialogTitle>
                <div className="flex justify-center">
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${
                      RARITY_CONFIG[selectedBadge.rarity].text
                    } bg-black/30`}
                  >
                    {RARITY_CONFIG[selectedBadge.rarity].label}
                  </span>
                </div>
              </DialogHeader>
              <DialogDescription className="text-center text-indigo-200 text-base">
                {selectedBadge.description}
              </DialogDescription>
              {selectedBadge.unlockedAt && (
                <div className="text-center text-sm text-indigo-300 mt-2">
                  Desbloqueado {selectedBadge.unlockedAt}
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
