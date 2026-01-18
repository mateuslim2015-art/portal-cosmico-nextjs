
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/db"
import DashboardClient from "./dashboard-client"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  // Fetch user data with trial information
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      readings: {
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          cards: {
            include: {
              card: true,
            },
            orderBy: { position: 'asc' },
          },
        },
      },
    },
  })

  if (!user) {
    redirect('/login')
  }

  // Calculate trial status
  const now = new Date()
  let trialActive = false
  let daysRemaining = 0
  
  if (user.trialEndsAt && user.trialStartDate) {
    const trialEndsAt = new Date(user.trialEndsAt)
    const msRemaining = trialEndsAt.getTime() - now.getTime()
    daysRemaining = Math.max(Math.ceil(msRemaining / (1000 * 60 * 60 * 24)), 0)
    trialActive = daysRemaining > 0
  }

  return (
    <DashboardClient 
      user={user}
      trialActive={trialActive}
      daysRemaining={daysRemaining}
      readings={user.readings}
    />
  )
}
