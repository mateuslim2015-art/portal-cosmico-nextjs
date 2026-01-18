'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trophy, TrendingUp, Flame, BookOpen, Award, ArrowLeft, Crown, Medal, Star } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

type RankingType = 'GLOBAL' | 'WEEKLY' | 'MONTHLY'
type RankingCategory = 'XP' | 'STREAK' | 'READINGS' | 'BADGES'
type League = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND'

interface LeaderboardEntry {
  id: string
  userId: string
  rank: number
  score: number
  league: League
  user: {
    name: string
    username: string
    avatarUrl?: string
    equippedTitle?: string
    equippedFrame?: string
  }
}

const LEAGUE_COLORS = {
  BRONZE: 'from-orange-700 to-orange-900',
  SILVER: 'from-gray-400 to-gray-600',
  GOLD: 'from-yellow-400 to-yellow-600',
  PLATINUM: 'from-cyan-400 to-cyan-600',
  DIAMOND: 'from-purple-400 to-pink-600',
}

const LEAGUE_ICONS = {
  BRONZE: '🥉',
  SILVER: '🥈',
  GOLD: '🥇',
  PLATINUM: '💎',
  DIAMOND: '👑',
}

export default function RankingPage() {
  const [type, setType] = useState<RankingType>('WEEKLY')
  const [category, setCategory] = useState<RankingCategory>('XP')
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [myPosition, setMyPosition] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRanking()
    fetchMyPosition()
  }, [type, category])

  const fetchRanking = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/ranking?type=${type}&category=${category}&limit=100`)
      const data = await res.json()
      setEntries(data.entries || [])
    } catch (error) {
      console.error('Erro ao buscar ranking:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMyPosition = async () => {
    try {
      const res = await fetch(`/api/ranking/my-position?type=${type}&category=${category}`)
      const data = await res.json()
      setMyPosition(data)
    } catch (error) {
      console.error('Erro ao buscar minha posição:', error)
    }
  }

  const getCategoryIcon = (cat: RankingCategory) => {
    switch (cat) {
      case 'XP': return <TrendingUp className="w-4 h-4" />
      case 'STREAK': return <Flame className="w-4 h-4" />
      case 'READINGS': return <BookOpen className="w-4 h-4" />
      case 'BADGES': return <Award className="w-4 h-4" />
    }
  }

  const getCategoryLabel = (cat: RankingCategory) => {
    switch (cat) {
      case 'XP': return 'Experiência'
      case 'STREAK': return 'Sequência'
      case 'READINGS': return 'Leituras'
      case 'BADGES': return 'Badges'
    }
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-400" />
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />
    if (rank === 3) return <Medal className="w-6 h-6 text-orange-600" />
    return <span className="text-gray-400 font-bold">#{rank}</span>
  }

  return (
    <div className="min-h-screen mystical-gradient p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <Link href="/dashboard">
          <Button variant="ghost" className="text-white mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-8 h-8 text-yellow-400" />
          <h1 className="text-4xl font-bold text-white">Rankings</h1>
        </div>
        <p className="text-purple-100">Compete com outros jogadores e suba no ranking!</p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Filters */}
        <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/50 mb-6">
          <CardContent className="p-6">
            {/* Type Tabs */}
            <div className="flex gap-2 mb-4">
              <Button
                onClick={() => setType('WEEKLY')}
                variant={type === 'WEEKLY' ? 'default' : 'outline'}
                className={type === 'WEEKLY' ? 'bg-purple-600' : ''}
              >
                📅 Semanal
              </Button>
              <Button
                onClick={() => setType('MONTHLY')}
                variant={type === 'MONTHLY' ? 'default' : 'outline'}
                className={type === 'MONTHLY' ? 'bg-purple-600' : ''}
              >
                📆 Mensal
              </Button>
              <Button
                onClick={() => setType('GLOBAL')}
                variant={type === 'GLOBAL' ? 'default' : 'outline'}
                className={type === 'GLOBAL' ? 'bg-purple-600' : ''}
              >
                🌍 Global
              </Button>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 flex-wrap">
              {(['XP', 'STREAK', 'READINGS', 'BADGES'] as RankingCategory[]).map(cat => (
                <Button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  variant={category === cat ? 'default' : 'outline'}
                  className={category === cat ? 'bg-blue-600' : ''}
                >
                  {getCategoryIcon(cat)}
                  <span className="ml-2">{getCategoryLabel(cat)}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* My Position */}
        {myPosition && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className={`bg-gradient-to-r ${LEAGUE_COLORS[myPosition.league as League]} border-2 border-white/30 mb-6`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{LEAGUE_ICONS[myPosition.league as League]}</div>
                    <div>
                      <p className="text-white/80 text-sm">Sua Posição</p>
                      <p className="text-white text-3xl font-bold">#{myPosition.rank}</p>
                      <p className="text-white/90 text-sm">Top {myPosition.percentile.toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white/80 text-sm">Pontuação</p>
                    <p className="text-white text-3xl font-bold">{myPosition.score.toLocaleString()}</p>
                    <p className="text-white/90 text-sm">Liga {myPosition.league}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Leaderboard */}
        <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              Top 100 - {getCategoryLabel(category)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-white">Carregando...</div>
            ) : entries.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                Nenhum jogador no ranking ainda. Seja o primeiro!
              </div>
            ) : (
              <div className="space-y-2">
                {entries.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                  >
                    <div className={`flex items-center gap-4 p-4 rounded-lg ${
                      entry.rank <= 3 
                        ? 'bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-500/30' 
                        : 'bg-gray-800/30 hover:bg-gray-800/50'
                    } transition-colors`}>
                      {/* Rank */}
                      <div className="w-12 flex justify-center">
                        {getRankIcon(entry.rank)}
                      </div>

                      {/* User Info */}
                      <div className="flex-1">
                        <p className="text-white font-semibold">
                          {entry.user.equippedTitle && (
                            <span className="text-yellow-400 text-sm mr-2">[{entry.user.equippedTitle}]</span>
                          )}
                          {entry.user.name || entry.user.username || 'Jogador Anônimo'}
                        </p>
                        <p className="text-gray-400 text-sm">Liga {entry.league}</p>
                      </div>

                      {/* Score */}
                      <div className="text-right">
                        <p className="text-white text-xl font-bold">{entry.score.toLocaleString()}</p>
                        <p className="text-gray-400 text-sm">{getCategoryLabel(category)}</p>
                      </div>

                      {/* League Badge */}
                      <div className="text-3xl">{LEAGUE_ICONS[entry.league]}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
