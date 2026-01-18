import { prisma } from './db'

// Tipos de ranking
export type RankingType = 'GLOBAL' | 'WEEKLY' | 'MONTHLY'
export type RankingCategory = 'XP' | 'STREAK' | 'READINGS' | 'BADGES'
export type League = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND'

// Configuração de ligas por pontuação
const LEAGUE_THRESHOLDS = {
  DIAMOND: 10000,
  PLATINUM: 5000,
  GOLD: 2000,
  SILVER: 500,
  BRONZE: 0,
}

// Função para calcular liga baseada na pontuação
export function calculateLeague(score: number): League {
  if (score >= LEAGUE_THRESHOLDS.DIAMOND) return 'DIAMOND'
  if (score >= LEAGUE_THRESHOLDS.PLATINUM) return 'PLATINUM'
  if (score >= LEAGUE_THRESHOLDS.GOLD) return 'GOLD'
  if (score >= LEAGUE_THRESHOLDS.SILVER) return 'SILVER'
  return 'BRONZE'
}

// Função para obter season atual
export function getCurrentSeason(type: RankingType): string {
  const now = new Date()
  
  if (type === 'GLOBAL') {
    return 'all-time'
  }
  
  if (type === 'WEEKLY') {
    // Formato: 2025-W44
    const year = now.getFullYear()
    const week = getWeekNumber(now)
    return `${year}-W${week.toString().padStart(2, '0')}`
  }
  
  if (type === 'MONTHLY') {
    // Formato: 2025-10
    const year = now.getFullYear()
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    return `${year}-${month}`
  }
  
  return 'all-time'
}

// Função auxiliar para calcular número da semana
function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
}

// Função para calcular score baseado na categoria
export async function calculateUserScore(userId: string, category: RankingCategory): Promise<number> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      readings: true,
      badges: true,
    },
  })
  
  if (!user) return 0
  
  switch (category) {
    case 'XP':
      return user.xp
    
    case 'STREAK':
      return user.streak
    
    case 'READINGS':
      return user.readings.length
    
    case 'BADGES':
      return user.badges.length
    
    default:
      return 0
  }
}

// Função para atualizar entrada no ranking
export async function updateLeaderboardEntry(
  userId: string,
  type: RankingType,
  category: RankingCategory
) {
  const season = getCurrentSeason(type)
  const score = await calculateUserScore(userId, category)
  const league = calculateLeague(score)
  
  // Buscar dados do usuário para metadata
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      username: true,
      avatarUrl: true,
      equippedFrame: true,
      equippedTitle: true,
      showInRanking: true,
    },
  })
  
  if (!user || !user.showInRanking) {
    return null
  }
  
  const metadata = JSON.stringify({
    name: user.name || user.username || 'Usuário Anônimo',
    username: user.username,
    avatarUrl: user.avatarUrl,
    equippedFrame: user.equippedFrame,
    equippedTitle: user.equippedTitle,
  })
  
  // Upsert da entrada
  const entry = await prisma.leaderboardEntry.upsert({
    where: {
      userId_type_category_season: {
        userId,
        type,
        category,
        season,
      },
    },
    update: {
      score,
      league,
      metadata,
      updatedAt: new Date(),
    },
    create: {
      userId,
      type,
      category,
      season,
      score,
      league,
      metadata,
      rank: 0, // Será calculado depois
    },
  })
  
  // Recalcular ranks
  await recalculateRanks(type, category, season)
  
  return entry
}

// Função para recalcular ranks de um ranking específico
async function recalculateRanks(type: RankingType, category: RankingCategory, season: string) {
  // Buscar todas as entradas ordenadas por score
  const entries = await prisma.leaderboardEntry.findMany({
    where: { type, category, season },
    orderBy: { score: 'desc' },
  })
  
  // Atualizar rank de cada entrada
  for (let i = 0; i < entries.length; i++) {
    await prisma.leaderboardEntry.update({
      where: { id: entries[i].id },
      data: { rank: i + 1 },
    })
  }
}

// Função para obter ranking completo
export async function getLeaderboard(
  type: RankingType,
  category: RankingCategory,
  limit: number = 100,
  offset: number = 0
) {
  const season = getCurrentSeason(type)
  
  const entries = await prisma.leaderboardEntry.findMany({
    where: { type, category, season },
    orderBy: { rank: 'asc' },
    take: limit,
    skip: offset,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          avatarUrl: true,
          equippedFrame: true,
          equippedTitle: true,
          equippedAura: true,
        },
      },
    },
  })
  
  // Total de entradas
  const total = await prisma.leaderboardEntry.count({
    where: { type, category, season },
  })
  
  return {
    entries: entries.map(entry => ({
      ...entry,
      metadata: entry.metadata ? JSON.parse(entry.metadata) : null,
    })),
    total,
    season,
  }
}

// Função para obter posição de um usuário específico
export async function getUserRanking(userId: string, type: RankingType, category: RankingCategory) {
  const season = getCurrentSeason(type)
  
  const entry = await prisma.leaderboardEntry.findUnique({
    where: {
      userId_type_category_season: {
        userId,
        type,
        category,
        season,
      },
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          avatarUrl: true,
          equippedFrame: true,
          equippedTitle: true,
        },
      },
    },
  })
  
  if (!entry) {
    // Criar entrada se não existir
    await updateLeaderboardEntry(userId, type, category)
    return getUserRanking(userId, type, category)
  }
  
  // Total de usuários no ranking
  const total = await prisma.leaderboardEntry.count({
    where: { type, category, season },
  })
  
  return {
    ...entry,
    metadata: entry.metadata ? JSON.parse(entry.metadata) : null,
    total,
    percentile: total > 0 ? ((total - entry.rank + 1) / total) * 100 : 0,
  }
}

// Função para atualizar todos os rankings de um usuário
export async function updateAllUserRankings(userId: string) {
  const types: RankingType[] = ['GLOBAL', 'WEEKLY', 'MONTHLY']
  const categories: RankingCategory[] = ['XP', 'STREAK', 'READINGS', 'BADGES']
  
  for (const type of types) {
    for (const category of categories) {
      await updateLeaderboardEntry(userId, type, category)
    }
  }
}

// Função para distribuir recompensas de fim de temporada
export async function distributeSeasonRewards(type: 'WEEKLY' | 'MONTHLY', season: string) {
  const categories: RankingCategory[] = ['XP', 'STREAK', 'READINGS', 'BADGES']
  
  for (const category of categories) {
    // Buscar top 10
    const topEntries = await prisma.leaderboardEntry.findMany({
      where: { type, category, season },
      orderBy: { rank: 'asc' },
      take: 10,
    })
    
    // Recompensas por posição
    const rewards = [
      { minRank: 1, maxRank: 1, xp: 1000, crystals: 100 },    // 1º lugar
      { minRank: 2, maxRank: 2, xp: 750, crystals: 75 },      // 2º lugar
      { minRank: 3, maxRank: 3, xp: 500, crystals: 50 },      // 3º lugar
      { minRank: 4, maxRank: 5, xp: 300, crystals: 30 },      // 4º-5º
      { minRank: 6, maxRank: 10, xp: 150, crystals: 15 },     // 6º-10º
    ]
    
    for (const entry of topEntries) {
      const reward = rewards.find(r => entry.rank >= r.minRank && entry.rank <= r.maxRank)
      
      if (reward) {
        // Dar recompensas ao usuário
        await prisma.user.update({
          where: { id: entry.userId },
          data: {
            xp: { increment: reward.xp },
            crystals: { increment: reward.crystals },
          },
        })
        
        // Registrar recompensa
        await prisma.leaderboardReward.create({
          data: {
            type,
            category,
            season,
            minRank: reward.minRank,
            maxRank: reward.maxRank,
            xpReward: reward.xp,
            crystalReward: reward.crystals,
            distributed: true,
            distributedAt: new Date(),
          },
        })
      }
    }
  }
}

// Função para obter estatísticas do ranking
export async function getRankingStats(type: RankingType, category: RankingCategory) {
  const season = getCurrentSeason(type)
  
  const entries = await prisma.leaderboardEntry.findMany({
    where: { type, category, season },
  })
  
  if (entries.length === 0) {
    return {
      total: 0,
      averageScore: 0,
      topScore: 0,
      leagueDistribution: {},
    }
  }
  
  const scores = entries.map(e => e.score)
  const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length
  const topScore = Math.max(...scores)
  
  const leagueDistribution = entries.reduce((acc, entry) => {
    acc[entry.league] = (acc[entry.league] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  return {
    total: entries.length,
    averageScore: Math.round(averageScore),
    topScore,
    leagueDistribution,
  }
}
