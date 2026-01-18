import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
prisma.user.findUnique({ where: { email: 'teste@teste.com' } })
  .then(user => {
    if (user) {
      console.log('✅ Usuário existe:', user.email, '| Cristais:', user.crystals);
    } else {
      console.log('❌ Usuário não encontrado');
    }
  })
  .finally(() => prisma.$disconnect());
