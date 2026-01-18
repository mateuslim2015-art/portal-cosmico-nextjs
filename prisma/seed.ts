import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...\n')

  try {
    // Run individual seed scripts
    console.log('📚 Seeding courses and oracles...')
    execSync('npx ts-node prisma/seed-courses.ts', { stdio: 'inherit' })

    console.log('\n🎯 Seeding exercises...')
    execSync('npx ts-node prisma/seed-exercises.ts', { stdio: 'inherit' })

    console.log('\n🏆 Seeding badges...')
    execSync('npx ts-node prisma/seed-badges.ts', { stdio: 'inherit' })

    console.log('\n🎯 Seeding missions...')
    execSync('npx ts-node prisma/seed-missions.ts', { stdio: 'inherit' })

    console.log('\n🛍️ Seeding shop items...')
    execSync('npx ts-node prisma/seed-shop.ts', { stdio: 'inherit' })

    console.log('\n✅ All seeds completed successfully!')
  } catch (error) {
    console.error('\n❌ Error during seeding:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
