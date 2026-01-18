import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Mapeamento completo das 78 cartas do Tarot com suas novas URLs
const cardImageUrls: Record<string, string> = {
  // Arcanos Maiores (22 cartas)
  'The Fool': 'https://cdn.abacus.ai/images/d9490f23-bef7-4c4f-ad18-cd82dde7fa0d.png',
  'The Magician': 'https://cdn.abacus.ai/images/80ea978b-693a-439c-99f9-d782d0f9ad47.png',
  'The High Priestess': 'https://cdn.abacus.ai/images/5bc632ab-b0a0-48c6-849a-d7e6f3a65131.png',
  'The Empress': 'https://cdn.abacus.ai/images/1329a9a8-a7df-43a2-8177-342a772b2297.png',
  'The Emperor': 'https://cdn.abacus.ai/images/126fb25b-53bd-4323-9289-1be648213825.png',
  'The Hierophant': 'https://cdn.abacus.ai/images/21939ff3-1030-4e85-a038-db832ee10eb6.png',
  'The Lovers': 'https://cdn.abacus.ai/images/66790bd3-6f9a-42af-aebb-1c92a1a1efd1.png',
  'The Chariot': 'https://cdn.abacus.ai/images/51776645-b386-4b79-b779-5c9adf84cfd2.png',
  'Strength': 'https://cdn.abacus.ai/images/ffc62ad4-0398-43f1-b16a-42bd66d5282a.png',
  'The Hermit': 'https://cdn.abacus.ai/images/63c0949f-5d15-4615-8707-24ce8f31c408.png',
  'Wheel of Fortune': 'https://cdn.abacus.ai/images/7a5ce9e6-5b3c-47f8-8c32-849e142d6fed.png',
  'Justice': 'https://cdn.abacus.ai/images/3d70814b-1fe9-43fa-bf62-83a05a13de27.png',
  'The Hanged Man': 'https://cdn.abacus.ai/images/fc61de0f-9f8e-4897-a9e4-ee57bc0295d1.png',
  'Death': 'https://cdn.abacus.ai/images/904e27ad-ad48-4bbc-b2e1-e52f130b6f32.png',
  'Temperance': 'https://cdn.abacus.ai/images/5c3fa78f-6a3c-4cf5-b65c-0db13b472e58.png',
  'The Devil': 'https://cdn.abacus.ai/images/12b361e6-019a-432e-a38d-af7f6f3191a4.png',
  'The Tower': 'https://cdn.abacus.ai/images/c89718b9-a2ae-402f-88ac-2a0ef302ac52.png',
  'The Star': 'https://cdn.abacus.ai/images/70accb2f-0d06-46b1-89ac-1f5a53df070b.png',
  'The Moon': 'https://cdn.abacus.ai/images/37bff3fe-c52c-42b7-9860-220f1d2ad414.png',
  'The Sun': 'https://cdn.abacus.ai/images/27daf152-c5c7-4120-996a-b9fbeceb5156.png',
  'Judgement': 'https://cdn.abacus.ai/images/d02830e7-70b4-4341-ac45-56f20d96a4b3.png',
  'The World': 'https://cdn.abacus.ai/images/d3a47b62-3d21-4caf-902e-37f6df5444a5.png',
  
  // Copas (14 cartas)
  'Ace of Copas': 'https://cdn.abacus.ai/images/2bb60b20-ec2c-4274-b59e-27d407254082.jpg',
  'Two of Copas': 'https://cdn.abacus.ai/images/02b37ede-4530-43c9-89d2-e688bfc4a595.jpg',
  'Three of Copas': 'https://cdn.abacus.ai/images/a141b2d7-20a7-4cb6-ad21-f452c6ae98bc.jpg',
  'Four of Copas': 'https://cdn.abacus.ai/images/960656d0-b627-45e2-8319-e0bfd2596b12.jpg',
  'Five of Copas': 'https://cdn.abacus.ai/images/b9ad1efb-1954-4120-8202-f21eeed7d8a1.jpg',
  'Six of Copas': 'https://cdn.abacus.ai/images/d0f48d64-cffd-42ec-aab6-447e583aaa85.jpg',
  'Seven of Copas': 'https://cdn.abacus.ai/images/96582c27-2d95-45ad-9b02-e5716c1fd8a8.jpg',
  'Eight of Copas': 'https://cdn.abacus.ai/images/3e1e9725-72c2-4ea0-981d-3f9259c42a8a.jpg',
  'Nine of Copas': 'https://cdn.abacus.ai/images/3c92c875-7c63-4232-94a5-e6f9ae83cb19.jpg',
  'Ten of Copas': 'https://cdn.abacus.ai/images/95971874-9d04-481c-b054-57232e5d5a37.jpg',
  'Page of Copas': 'https://cdn.abacus.ai/images/8b1addd5-9559-4e6a-acbb-a19f356d0258.jpg',
  'Knight of Copas': 'https://cdn.abacus.ai/images/11489a9c-20f5-463c-b3a6-debd6ca4500b.jpg',
  'Queen of Copas': 'https://cdn.abacus.ai/images/0cbb5f12-e519-4fe0-a45a-a251fee07589.jpg',
  'King of Copas': 'https://cdn.abacus.ai/images/0b92cc6d-91d9-493d-acaa-a3ea84a9d6cd.jpg',
  
  // Paus (14 cartas)
  'Ace of Paus': 'https://cdn.abacus.ai/images/d4abfbbc-e7cd-443f-97d5-74332230f002.jpg',
  'Two of Paus': 'https://cdn.abacus.ai/images/bf64575e-1213-443e-8989-dd7bb8dd80c8.png',
  'Three of Paus': 'https://cdn.abacus.ai/images/8e57b7e8-069a-411a-b792-c9085c9520f7.png',
  'Four of Paus': 'https://cdn.abacus.ai/images/60fe061e-43f1-4052-bd32-96c7898be180.png',
  'Five of Paus': 'https://cdn.abacus.ai/images/c38b5e57-24bf-418a-ae73-b92da1a12bbd.png',
  'Six of Paus': 'https://cdn.abacus.ai/images/50533e18-52bb-4a72-b98e-7472478f2995.png',
  'Seven of Paus': 'https://cdn.abacus.ai/images/44e0fe49-08e4-4c96-a83b-24b120b7f31e.png',
  'Eight of Paus': 'https://cdn.abacus.ai/images/096c19cd-4c67-4859-9c42-da49a5e04e19.png',
  'Nine of Paus': 'https://cdn.abacus.ai/images/81a6614f-c3c7-4c54-9f82-f95fc4c21b3b.png',
  'Ten of Paus': 'https://cdn.abacus.ai/images/5ef68cf6-7e58-48f0-a010-749e748acd1e.png',
  'Page of Paus': 'https://cdn.abacus.ai/images/74fc1cca-7243-44d1-9364-15c387ede344.png',
  'Knight of Paus': 'https://cdn.abacus.ai/images/80b6c73f-e28f-44ec-b121-a1a55498116a.png',
  'Queen of Paus': 'https://cdn.abacus.ai/images/802145f3-1faa-4e3f-9698-f11ad35ff049.png',
  'King of Paus': 'https://cdn.abacus.ai/images/39671998-9057-4155-87c8-f2b538ca0da6.png',
  
  // Espadas (14 cartas)
  'Ace of Espadas': 'https://cdn.abacus.ai/images/3f767a40-a525-4459-aa4a-1c4b6dcb36a7.png',
  'Two of Espadas': 'https://cdn.abacus.ai/images/4b2e3bbb-4a81-46a3-a5fd-ec705cd5b88c.png',
  'Three of Espadas': 'https://cdn.abacus.ai/images/679f0dec-ef39-4257-97b6-63888205ebea.png',
  'Four of Espadas': 'https://cdn.abacus.ai/images/8c102442-32d1-4d5b-a54d-082e6f0bd371.png',
  'Five of Espadas': 'https://cdn.abacus.ai/images/e0638128-4806-4860-be5f-acb141c9f520.png',
  'Six of Espadas': 'https://cdn.abacus.ai/images/fbbceb20-b45f-4400-a658-710ea6721eb3.png',
  'Seven of Espadas': 'https://cdn.abacus.ai/images/039c75a8-f73c-4d40-96ff-e84333e9c2d7.png',
  'Eight of Espadas': 'https://cdn.abacus.ai/images/611444d2-e049-4307-9416-9b8b391f31b9.png',
  'Nine of Espadas': 'https://cdn.abacus.ai/images/184fa7d8-2e1c-4059-8134-282c3a79bc8c.png',
  'Ten of Espadas': 'https://cdn.abacus.ai/images/57949866-3cd2-460d-9444-3d8f40e9fff5.png',
  'Page of Espadas': 'https://cdn.abacus.ai/images/001aab5d-7e25-4321-9ac2-4491d010920c.png',
  'Knight of Espadas': 'https://cdn.abacus.ai/images/3fda3d69-1fbf-4e18-af9e-9e258105156f.png',
  'Queen of Espadas': 'https://cdn.abacus.ai/images/c7bc14d5-7c48-40d5-b03f-5f751a4a804a.png',
  'King of Espadas': 'https://cdn.abacus.ai/images/2a020f65-a521-48d8-a7a5-1914ce41ebc7.png',
  
  // Ouros (14 cartas)
  'Ace of Ouros': 'https://cdn.abacus.ai/images/68e3ab59-b4fc-4fa5-ad7e-21ce34d9c452.png',
  'Two of Ouros': 'https://cdn.abacus.ai/images/220b0747-4929-456f-9f37-0bcf6b83839a.png',
  'Three of Ouros': 'https://cdn.abacus.ai/images/574e465f-c59b-406e-be35-367139b09483.png',
  'Four of Ouros': 'https://cdn.abacus.ai/images/9df70bef-35c7-423f-9a50-e2ef839da7b5.png',
  'Five of Ouros': 'https://cdn.abacus.ai/images/0a5b824a-c442-41ad-b7b1-149c25efbd87.png',
  'Six of Ouros': 'https://cdn.abacus.ai/images/b8fb17a0-52e3-4832-b623-abd6fdb2020f.png',
  'Seven of Ouros': 'https://cdn.abacus.ai/images/935a9a7f-7efc-4223-ac51-d4bbe449acfa.png',
  'Eight of Ouros': 'https://cdn.abacus.ai/images/1f2bc709-b392-4326-a303-c50c6c9c6844.png',
  'Nine of Ouros': 'https://cdn.abacus.ai/images/d358e33a-d4f8-47e1-8d65-502488f68c78.png',
  'Ten of Ouros': 'https://cdn.abacus.ai/images/36ad35d8-6605-41b2-bf05-51866b1b2fe2.png',
  'Page of Ouros': 'https://cdn.abacus.ai/images/e919386c-689a-41fb-87d0-a51d1db333f0.png',
  'Knight of Ouros': 'https://cdn.abacus.ai/images/1e179bf2-05cc-44b2-bae8-91946792ef36.png',
  'Queen of Ouros': 'https://cdn.abacus.ai/images/d5040bda-ac39-4a16-82d6-c55b80197603.png',
  'King of Ouros': 'https://cdn.abacus.ai/images/d0bd1539-9714-42d0-86a9-c35a585eaf11.png',
}

async function main() {
  console.log('🎨 Atualizando imagens das cartas do Tarot...\n')

  let updatedCount = 0
  let notFoundCount = 0

  for (const [cardName, imageUrl] of Object.entries(cardImageUrls)) {
    try {
      const result = await prisma.tarotCard.updateMany({
        where: { name: cardName },
        data: { imageUrl }
      })

      if (result.count > 0) {
        console.log(`✅ ${cardName}: imagem atualizada`)
        updatedCount += result.count
      } else {
        console.log(`⚠️  ${cardName}: carta não encontrada no banco de dados`)
        notFoundCount++
      }
    } catch (error) {
      console.error(`❌ Erro ao atualizar ${cardName}:`, error)
    }
  }

  console.log(`\n📊 Resumo:`)
  console.log(`   ✅ ${updatedCount} cartas atualizadas`)
  console.log(`   ⚠️  ${notFoundCount} cartas não encontradas`)
  console.log(`   📦 Total de URLs fornecidas: ${Object.keys(cardImageUrls).length}`)
}

main()
  .catch((e) => {
    console.error('❌ Erro fatal:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
