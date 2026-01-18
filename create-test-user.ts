import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('teste123', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'teste@teste.com' },
    update: {},
    create: {
      email: 'teste@teste.com',
      password: hashedPassword,
      name: 'Usuário Teste',
      firstName: 'Usuário',
      lastName: 'Teste',
      crystals: 1000,
      level: 5,
      xp: 500,
      streak: 7
    }
  });
  
  console.log('✅ Usuário de teste criado:');
  console.log(`  Email: teste@teste.com`);
  console.log(`  Senha: teste123`);
  console.log(`  Cristais: ${user.crystals}`);
  console.log(`  Level: ${user.level}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
