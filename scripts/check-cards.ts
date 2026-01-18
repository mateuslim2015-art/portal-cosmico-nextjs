const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const cards = await prisma.card.findMany({
    take: 5,
    select: {
      id: true,
      name: true,
      imageUrl: true,
      type: true
    }
  })
  
  console.log('Primeiras 5 cartas:')
  console.log(JSON.stringify(cards, null, 2))
  
  const total = await prisma.card.count()
  console.log(`\nTotal de cartas no banco: ${total}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
