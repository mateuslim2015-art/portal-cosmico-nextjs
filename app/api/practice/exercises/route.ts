export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { listExercises } from '@/lib/practice-service'


export async function GET(request: NextRequest) {
  try {
    console.log('[API] Iniciando GET /api/practice/exercises')
    
    const session = await getServerSession(authOptions)
    console.log('[API] Session:', session ? 'OK' : 'NULL')
    
    if (!session) {
      console.log('[API] Não autenticado')
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }
    
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type') || undefined
    const category = searchParams.get('category') || undefined
    const difficulty = searchParams.get('difficulty') || undefined
    const oracleType = searchParams.get('oracleType') || undefined
    
    console.log('[API] Chamando listExercises...')
    const exercises = await listExercises({
      type: type as any,
      category,
      difficulty,
      oracleType,
    })
    
    console.log('[API] Exercícios encontrados:', exercises.length)
    return NextResponse.json({ exercises })
  } catch (error) {
    console.error('[API] ERRO:', error)
    console.error('[API] Stack:', error instanceof Error ? error.stack : 'N/A')
    return NextResponse.json({ error: 'Erro ao listar exercícios' }, { status: 500 })
  }
}
