import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const exercises = await prisma.exercise.findMany({
    where: { active: true },
  })
  console.log('Exercícios encontrados:', exercises.length)
  exercises.forEach(ex => {
    console.log(`- ${ex.title} (${ex.type})`)
  })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
