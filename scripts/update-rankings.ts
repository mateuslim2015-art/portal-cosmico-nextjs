import { PrismaClient } from '@prisma/client'
import { updateAllUserRankings } from '../lib/ranking-service'

const prisma = new PrismaClient()

async function main() {
  console.log('🏆 Atualizando rankings...')
  
  // Buscar todos os usuários
  const users = await prisma.user.findMany({
    where: {
      showInRanking: true,
    },
    select: {
      id: true,
      name: true,
      username: true,
    },
  })
  
  console.log(`📊 Encontrados ${users.length} usuários`)
  
  // Atualizar ranking de cada usuário
  for (const user of users) {
    console.log(`⏳ Atualizando ${user.name || user.username || user.id}...`)
    await updateAllUserRankings(user.id)
  }
  
  console.log('✅ Rankings atualizados com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
