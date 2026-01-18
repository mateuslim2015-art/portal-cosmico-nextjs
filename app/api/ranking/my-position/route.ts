export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getUserRanking, RankingType, RankingCategory } from '@/lib/ranking-service'


export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }
    
    const searchParams = request.nextUrl.searchParams
    const type = (searchParams.get('type') || 'GLOBAL') as RankingType
    const category = (searchParams.get('category') || 'XP') as RankingCategory
    
    const ranking = await getUserRanking(session.user.id, type, category)
    
    return NextResponse.json(ranking)
  } catch (error) {
    console.error('Erro ao buscar posição do usuário:', error)
    return NextResponse.json({ error: 'Erro ao buscar posição' }, { status: 500 })
  }
}
