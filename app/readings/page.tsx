
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/db"
import ReadingsClient from "./readings-client"

export default async function ReadingsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  // Fetch user readings
  const readings = await prisma.reading.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      cards: {
        include: {
          card: true,
        },
        orderBy: { position: 'asc' },
      },
    },
  })

  return <ReadingsClient readings={readings} />
}
