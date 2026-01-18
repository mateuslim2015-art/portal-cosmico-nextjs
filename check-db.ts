import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const badges = await prisma.badge.count();
  const missions = await prisma.mission.count();
  const shopItems = await prisma.shopItem.count();
  const users = await prisma.user.count();
  
  console.log('📊 Dados no banco:');
  console.log(`  - Badges: ${badges}`);
  console.log(`  - Missões: ${missions}`);
  console.log(`  - Itens da Loja: ${shopItems}`);
  console.log(`  - Usuários: ${users}`);
  
  if (shopItems > 0) {
    const items = await prisma.shopItem.findMany({ take: 5 });
    console.log('\n🛒 Primeiros 5 itens:');
    items.forEach(item => {
      console.log(`  - ${item.name} (${item.price} cristais)`);
    });
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
