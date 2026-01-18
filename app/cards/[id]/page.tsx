
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import CardDetailClient from "./card-detail-client"

export default async function CardDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  const card = await prisma.tarotCard.findUnique({
    where: { id: params.id }
  })

  if (!card) {
    notFound()
  }

  return <CardDetailClient card={card} />
}
