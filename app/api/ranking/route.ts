export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getLeaderboard, RankingType, RankingCategory } from '@/lib/ranking-service'

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }
    
    const searchParams = request.nextUrl.searchParams
    const type = (searchParams.get('type') || 'GLOBAL') as RankingType
    const category = (searchParams.get('category') || 'XP') as RankingCategory
    const limit = parseInt(searchParams.get('limit') || '100')
    const offset = parseInt(searchParams.get('offset') || '0')
    
    // Validar parâmetros
    const validTypes: RankingType[] = ['GLOBAL', 'WEEKLY', 'MONTHLY']
    const validCategories: RankingCategory[] = ['XP', 'STREAK', 'READINGS', 'BADGES']
    
    if (!validTypes.includes(type)) {
      return NextResponse.json({ error: 'Tipo de ranking inválido' }, { status: 400 })
    }
    
    if (!validCategories.includes(category)) {
      return NextResponse.json({ error: 'Categoria de ranking inválida' }, { status: 400 })
    }
    
    const leaderboard = await getLeaderboard(type, category, limit, offset)
    
    return NextResponse.json(leaderboard)
  } catch (error) {
    console.error('Erro ao buscar ranking:', error)
    return NextResponse.json({ error: 'Erro ao buscar ranking' }, { status: 500 })
  }
}
