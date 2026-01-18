export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    // Buscar todas as cartas do banco
    const cards = await prisma.tarotCard.findMany({
      where: {
        arcana: 'major', // Apenas arcanos maiores para carta do dia
      },
    })

    if (cards.length === 0) {
      return NextResponse.json(
        { error: 'Nenhuma carta encontrada' },
        { status: 404 }
      )
    }

    // Selecionar carta baseada na data (mesma carta para o mesmo dia)
    const today = new Date()
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        1000 /
        60 /
        60 /
        24
    )
    const cardIndex = dayOfYear % cards.length
    const selectedCard = cards[cardIndex]

    // Formatar resposta
    const cardOfDay = {
      id: selectedCard.id,
      name: selectedCard.name,
      arcana: selectedCard.arcana === 'major' ? 'Arcano Maior' : 'Arcano Menor',
      image: selectedCard.imageUrl || '/tarot/default.jpg',
      keywords: [
        'Novos começos',
        'Aventura',
        'Inocência',
        'Espontaneidade',
      ], // TODO: adicionar keywords ao schema
      upright: selectedCard.upright,
      reversed: selectedCard.reversed,
      description: selectedCard.shortMeaning || 'Descrição não disponível',
    }

    return NextResponse.json({ card: cardOfDay })
  } catch (error) {
    console.error('Erro ao buscar carta do dia:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar carta do dia' },
      { status: 500 }
    )
  }
}
