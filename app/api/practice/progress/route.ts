export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getUserExerciseProgress } from '@/lib/practice-service'

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }
    
    const progress = await getUserExerciseProgress(session.user.id)
    
    return NextResponse.json(progress)
  } catch (error) {
    console.error('Erro ao buscar progresso:', error)
    return NextResponse.json({ error: 'Erro ao buscar progresso' }, { status: 500 })
  }
}
