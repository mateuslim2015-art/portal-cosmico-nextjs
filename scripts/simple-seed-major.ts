import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const majorArcana = [
  {
    name: 'The Fool',
    number: 0,
    arcana: 'Major',
    suit: null,
    shortMeaning: 'Novos começos, inocência, espontaneidade',
    upright: 'Novos começos, inocência, espontaneidade, espírito livre, jornada. O Louco representa o início de uma aventura, tendo fé no futuro.',
    reversed: 'Imprudência, risco desnecessário, ingenuidade, falta de direção.',
    imageUrl: 'https://cdn.abacus.ai/images/d9490f23-bef7-4c4f-ad18-cd82dde7fa0d.png'
  },
  {
    name: 'The Magician',
    number: 1,
    arcana: 'Major',
    suit: null,
    shortMeaning: 'Manifestação, poder, habilidade',
    upright: 'Manifestação, poder pessoal, habilidade, concentração, ação. O Mago tem todos os recursos necessários para manifestar seus desejos.',
    reversed: 'Manipulação, falta de energia, talentos desperdiçados.',
    imageUrl: 'https://cdn.abacus.ai/images/80ea978b-693a-439c-99f9-d782d0f9ad47.png'
  },
  {
    name: 'The High Priestess',
    number: 2,
    arcana: 'Major',
    suit: null,
    shortMeaning: 'Intuição, mistério, conhecimento oculto',
    upright: 'Intuição, sabedoria interior, conhecimento oculto, mistério. A Sacerdotisa representa o acesso ao subconsciente e à sabedoria interior.',
    reversed: 'Segredos, desconexão da intuição, falta de clareza.',
    imageUrl: 'https://cdn.abacus.ai/images/5bc632ab-b0a0-48c6-849a-d7e6f3a65131.png'
  },
  {
    name: 'The Empress',
    number: 3,
    arcana: 'Major',
    suit: null,
    shortMeaning: 'Fertilidade, abundância, natureza',
    upright: 'Fertilidade, abundância, natureza, criação, maternidade. A Imperatriz representa a energia feminina criativa e abundante.',
    reversed: 'Dependência, bloqueio criativo, falta de crescimento.',
    imageUrl: 'https://cdn.abacus.ai/images/1329a9a8-a7df-43a2-8177-342a772b2297.png'
  },
  {
    name: 'The Emperor',
    number: 4,
    arcana: 'Major',
    suit: null,
    shortMeaning: 'Autoridade, estrutura, controle',
    upright: 'Autoridade, estrutura, controle, liderança, pai. O Imperador representa estabilidade, poder e proteção através da estrutura.',
    reversed: 'Tirania, rigidez, dominação excessiva.',
    imageUrl: 'https://cdn.abacus.ai/images/126fb25b-53bd-4323-9289-1be648213825.png'
  },
  {
    name: 'The Hierophant',
    number: 5,
    arcana: 'Major',
    suit: null,
    shortMeaning: 'Tradição, conformidade, educação',
    upright: 'Tradição, conformidade, educação, sistemas de crenças. O Hierofante representa a sabedoria tradicional e os ensinamentos espirituais.',
    reversed: 'Rebelião, subversão, novos métodos.',
    imageUrl: 'https://cdn.abacus.ai/images/21939ff3-1030-4e85-a038-db832ee10eb6.png'
  },
  {
    name: 'The Lovers',
    number: 6,
    arcana: 'Major',
    suit: null,
    shortMeaning: 'Amor, harmonia, escolhas',
    upright: 'Amor, harmonia, relacionamentos, escolhas importantes, valores. Os Amantes representam união e decisões baseadas no coração.',
    reversed: 'Desarmonia, desequilíbrio, escolhas erradas.',
    imageUrl: 'https://cdn.abacus.ai/images/66790bd3-6f9a-42af-aebb-1c92a1a1efd1.png'
  },
  {
    name: 'The Chariot',
    number: 7,
    arcana: 'Major',
    suit: null,
    shortMeaning: 'Controle, determinação, vitória',
    upright: 'Controle, determinação, vitória, força de vontade. O Carro representa o triunfo através da disciplina e do controle.',
    reversed: 'Falta de controle, agressão, falta de direção.',
    imageUrl: 'https://cdn.abacus.ai/images/51776645-b386-4b79-b779-5c9adf84cfd2.png'
  },
  {
    name: 'Strength',
    number: 8,
    arcana: 'Major',
    suit: null,
    shortMeaning: 'Força interior, coragem, paciência',
    upright: 'Força interior, coragem, paciência, compaixão. A Força representa o poder da gentileza e da paciência.',
    reversed: 'Fraqueza, dúvida, falta de disciplina.',
    imageUrl: 'https://cdn.abacus.ai/images/ffc62ad4-0398-43f1-b16a-42bd66d5282a.png'
  },
  {
    name: 'The Hermit',
    number: 9,
    arcana: 'Major',
    suit: null,
    shortMeaning: 'Introspecção, busca interior, solidão',
    upright: 'Introspecção, busca interior, solidão, orientação. O Eremita representa a busca pela verdade interior através da reflexão.',
    reversed: 'Isolamento, solidão excessiva, reclusão.',
    imageUrl: 'https://cdn.abacus.ai/images/63c0949f-5d15-4615-8707-24ce8f31c408.png'
  },
  {
    name: 'Wheel of Fortune',
    number: 10,
    arcana: 'Major',
    suit: null,
    shortMeaning: 'Mudança, ciclos, destino',
    upright: 'Mudança, ciclos, destino, boa sorte. A Roda da Fortuna representa os ciclos inevitáveis da vida.',
    reversed: 'Má sorte, resistência à mudança, ciclos negativos.',
    imageUrl: 'https://cdn.abacus.ai/images/7a5ce9e6-5b3c-47f8-8c32-849e142d6fed.png'
  },
  {
    name: 'Justice',
    number: 11,
    arcana: 'Major',
    suit: null,
    shortMeaning: 'Justiça, equilíbrio, verdade',
    upright: 'Justiça, equilíbrio, verdade, causa e efeito. A Justiça representa a busca pela verdade e pelo equilíbrio.',
    reversed: 'Injustiça, desequilíbrio, desonestidade.',
    imageUrl: 'https://cdn.abacus.ai/images/3d70814b-1fe9-43fa-bf62-83a05a13de27.png'
  },
  {
    name: 'The Hanged Man',
    number: 12,
    arcana: 'Major',
    suit: null,
    shortMeaning: 'Suspensão, entrega, nova perspectiva',
    upright: 'Suspensão, entrega, nova perspectiva, sacrifício. O Enforcado representa a necessidade de ver as coisas de um ângulo diferente.',
    reversed: 'Atraso, resistência, indecisão.',
    imageUrl: 'https://cdn.abacus.ai/images/fc61de0f-9f8e-4897-a9e4-ee57bc0295d1.png'
  },
  {
    name: 'Death',
    number: 13,
    arcana: 'Major',
    suit: null,
    shortMeaning: 'Transformação, fim, recomeço',
    upright: 'Transformação, fim de um ciclo, recomeço, mudança. A Morte representa transformação profunda e renovação.',
    reversed: 'Resistência à mudança, estagnação, medo.',
    imageUrl: 'https://cdn.abacus.ai/images/904e27ad-ad48-4bbc-b2e1-e52f130b6f32.png'
  },
  {
    name: 'Temperance',
    number: 14,
    arcana: 'Major',
    suit: null,
    shortMeaning: 'Equilíbrio, moderação, paciência',
    upright: 'Equilíbrio, moderação, paciência, propósito. A Temperança representa a harmonia através do equilíbrio.',
    reversed: 'Desequilíbrio, excesso, falta de moderação.',
    imageUrl: 'https://cdn.abacus.ai/images/5c3fa78f-6a3c-4cf5-b65c-0db13b472e58.png'
  },
  {
    name: 'The Devil',
    number: 15,
    arcana: 'Major',
    suit: null,
    shortMeaning: 'Apego, materialismo, tentação',
    upright: 'Apego, materialismo, tentação, vícios. O Diabo representa as correntes que criamos para nós mesmos.',
    reversed: 'Libertação, desapego, quebra de correntes.',
    imageUrl: 'https://cdn.abacus.ai/images/12b361e6-019a-432e-a38d-af7f6f3191a4.png'
  },
  {
    name: 'The Tower',
    number: 16,
    arcana: 'Major',
    suit: null,
    shortMeaning: 'Mudança súbita, revelação, caos',
    upright: 'Mudança súbita, revelação, caos, libertação. A Torre representa a destruição necessária para a reconstrução.',
    reversed: 'Evitar desastre, medo da mudança, adiamento.',
    imageUrl: 'https://cdn.abacus.ai/images/c89718b9-a2ae-402f-88ac-2a0ef302ac52.png'
  },
  {
    name: 'The Star',
    number: 17,
    arcana: 'Major',
    suit: null,
    shortMeaning: 'Esperança, renovação, inspiração',
    upright: 'Esperança, renovação, inspiração, serenidade. A Estrela representa a luz após a escuridão.',
    reversed: 'Desesperança, falta de fé, desânimo.',
    imageUrl: 'https://cdn.abacus.ai/images/70accb2f-0d06-46b1-89ac-1f5a53df070b.png'
  },
  {
    name: 'The Moon',
    number: 18,
    arcana: 'Major',
    suit: null,
    shortMeaning: 'Ilusão, intuição, subconsciente',
    upright: 'Ilusão, intuição, subconsciente, medo. A Lua representa o reino dos sonhos e do inconsciente.',
    reversed: 'Confusão liberada, medo diminuindo, clareza.',
    imageUrl: 'https://cdn.abacus.ai/images/37bff3fe-c52c-42b7-9860-220f1d2ad414.png'
  },
  {
    name: 'The Sun',
    number: 19,
    arcana: 'Major',
    suit: null,
    shortMeaning: 'Sucesso, alegria, vitalidade',
    upright: 'Sucesso, alegria, vitalidade, positividade. O Sol representa a energia vital e o sucesso radiante.',
    reversed: 'Otimismo exagerado, falta de sucesso, depressão.',
    imageUrl: 'https://cdn.abacus.ai/images/27daf152-c5c7-4120-996a-b9fbeceb5156.png'
  },
  {
    name: 'Judgement',
    number: 20,
    arcana: 'Major',
    suit: null,
    shortMeaning: 'Julgamento, renascimento, reflexão',
    upright: 'Julgamento, renascimento, reflexão, despertar. O Julgamento representa o momento de avaliação e renovação.',
    reversed: 'Dúvida, autocrítica excessiva, falta de perdão.',
    imageUrl: 'https://cdn.abacus.ai/images/d02830e7-70b4-4341-ac45-56f20d96a4b3.png'
  },
  {
    name: 'The World',
    number: 21,
    arcana: 'Major',
    suit: null,
    shortMeaning: 'Completude, realização, viagem',
    upright: 'Completude, realização, viagem, sucesso. O Mundo representa a conclusão de um ciclo importante.',
    reversed: 'Incompletude, falta de fechamento, atrasos.',
    imageUrl: 'https://cdn.abacus.ai/images/d3a47b62-3d21-4caf-902e-37f6df5444a5.png'
  }
]

async function main() {
  console.log('🌟 Iniciando seed dos Arcanos Maiores do Tarot...')

  for (const card of majorArcana) {
    await prisma.tarotCard.upsert({
      where: { name: card.name },
      update: card,
      create: card,
    })
    console.log(`✅ ${card.name}`)
  }

  console.log('✨ Seed concluído com sucesso!')
  console.log(`📊 Total: ${majorArcana.length} cartas criadas`)
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
