
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/db"
import CardsClient from "./cards-client"

export default async function CardsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  // Fetch all tarot cards
  const tarotCards = await prisma.tarotCard.findMany({
    orderBy: [
      { arcana: 'asc' },
      { number: 'asc' },
      { name: 'asc' }
    ]
  })

  // Map arcana to type for compatibility
  const cardsWithType = tarotCards.map(card => ({
    ...card,
    type: card.arcana.toLowerCase() === 'major' ? 'major' : 'minor'
  }))

  return <CardsClient cards={cardsWithType} />
}
