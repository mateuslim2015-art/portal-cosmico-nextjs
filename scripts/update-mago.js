const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function updateMago() {
  const content = fs.readFileSync('/home/ubuntu/portal_cosmico/nextjs_space/scripts/licao-o-mago.md', 'utf8');
  
  await prisma.lesson.update({
    where: { id: 'cmhcnfvkz000np2nmiobbv0q6' },
    data: {
      content: content,
      duration: 30
    }
  });
  
  console.log('✅ Lição O Mago atualizada com sucesso!');
}

updateMago()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
