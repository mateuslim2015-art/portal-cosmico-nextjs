import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { submitExercise } from '@/lib/practice-service'

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }
    
    const body = await request.json()
    const { exerciseId, userAnswers } = body
    
    if (!exerciseId || !userAnswers) {
      return NextResponse.json(
        { error: 'exerciseId e userAnswers são obrigatórios' },
        { status: 400 }
      )
    }
    
    const result = await submitExercise(session.user.id, exerciseId, userAnswers)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Erro ao submeter exercício:', error)
    return NextResponse.json({ error: 'Erro ao submeter exercício' }, { status: 500 })
  }
}
