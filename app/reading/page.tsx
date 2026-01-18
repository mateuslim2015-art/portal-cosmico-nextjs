
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/db"
import ReadingClient from "./reading-client"

export default async function ReadingPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  // Check trial status
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  })

  if (!user) {
    redirect('/login')
  }

  const now = new Date()
  let trialActive = false
  
  if (user.trialEndsAt && user.trialStartDate) {
    const trialEndsAt = new Date(user.trialEndsAt)
    const msRemaining = trialEndsAt.getTime() - now.getTime()
    trialActive = msRemaining > 0
  }

  if (!trialActive) {
    redirect('/dashboard')
  }

  // Fetch all tarot cards
  const tarotCards = await prisma.tarotCard.findMany({
    orderBy: [
      { arcana: 'asc' },
      { number: 'asc' },
      { name: 'asc' }
    ]
  })

  return <ReadingClient cards={tarotCards} />
}
