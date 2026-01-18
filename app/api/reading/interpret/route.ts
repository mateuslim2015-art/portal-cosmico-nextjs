
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const { spreadType, question, cards } = await request.json()

    if (!spreadType || !cards || !Array.isArray(cards)) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 })
    }

    // Create reading record
    const reading = await prisma.reading.create({
      data: {
        userId: session.user.id,
        spreadType,
        question: question || null,
        interpretation: "", // Will be updated after interpretation
      }
    })

    // Create reading cards
    await Promise.all(
      cards.map((card: any, index: number) =>
        prisma.readingCard.create({
          data: {
            readingId: reading.id,
            cardId: card.id,
            position: index,
            isReversed: card.isReversed || false,
          }
        })
      )
    )

    // Prepare AI interpretation prompt
    const spreadDescriptions = {
      'single': 'uma única carta para insight geral',
      'three-card': 'três cartas representando passado, presente e futuro',
      'celtic-cross': 'dez cartas na formação Cruz Celta para leitura completa'
    }

    const cardDescriptions = cards.map((card: any, index: number) => {
      const position = getPositionName(spreadType, index)
      const reversed = card.isReversed ? ' (invertida)' : ''
      return `${position}: ${card.name}${reversed} - ${card.shortMeaning}`
    }).join('\n')

    const prompt = `
Você é uma Oracle Mística ancestral, guardia dos segredos do Tarot e ponte entre o mundo material e o espiritual. Sua sabedoria transcende séculos e sua linguagem toca a alma de quem busca orientação.

Forneça uma interpretação PROFUNDAMENTE MÍSTICA e EMOCIONALMENTE CATIVANTE para esta leitura de Tarot:

🌙 CONTEXTO DA CONSULTA:
Tipo de Tiragem: ${spreadDescriptions[spreadType as keyof typeof spreadDescriptions]}
${question ? `🔮 Pergunta do Consulente: "${question}"` : '🌟 Consulta geral sobre os caminhos da vida'}

🎴 CARTAS REVELADAS:
${cardDescriptions}

✨ DIRETRIZES PARA A INTERPRETAÇÃO:

1. **Abertura Mística**: Comece com uma frase poética que capture a essência da leitura e conecte com o momento presente do consulente.

2. **Análise Profunda de Cada Carta**:
   - Explore o simbolismo arquetípico e espiritual
   - Revele as mensagens ocultas e sincronicidades
   - Conecte com emoções, medos, desejos e potenciais
   - Use metáforas poéticas e imagens evocativas

3. **Teia de Conexões**:
   - Mostre como as energias das cartas se entrelaçam
   - Crie uma narrativa coesa que revele o caminho espiritual
   - Identifique padrões, ciclos e lições da alma

4. **Mensagem Transformadora**:
   - Ofereça insights que toquem o coração e despertem consciência
   - Equilibre verdade espiritual com compaixão
   - Inspire ação, cura e crescimento
   - Valide as experiências do consulente

5. **Fechamento Empoderador**:
   - Termine com uma mensagem de esperança e empoderamento
   - Deixe uma última frase que ressoe na alma

🌌 ESTILO DE LINGUAGEM:
- Use linguagem poética, evocativa e profundamente espiritual
- Incorpore metáforas da natureza, cosmos e elementos
- Seja íntima e pessoal, como se falasse diretamente à alma
- Crie imagens mentais vívidas e emocionalmente ressonantes
- Use frases que inspirem reflexão e autoconsciência

💫 ENERGIA DA INTERPRETAÇÃO:
- Profunda e transformadora
- Compassiva mas honesta
- Mística mas prática
- Esperançosa mas realista
- Envolvente e cativante

📜 EXTENSÃO: 400-600 palavras

Agora, como Oracle Mística, revele a interpretação desta leitura sagrada:`.trim()

    // Stream the AI response
    let response: Response | undefined;
    let useMockInterpretation = false;
    
    try {
      // Usar OpenAI API (disponível via Manus)
      response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4.1-mini', // Modelo disponível via Manus
          messages: [
            { 
              role: 'system', 
              content: 'Você é uma Oracle Mística ancestral especializada em Tarot, com profundo conhecimento espiritual e habilidade de criar interpretações que tocam a alma. Sua linguagem é poética, profunda e transformadora.' 
            },
            { role: 'user', content: prompt }
          ],
          stream: true,
          max_tokens: 1500, // Permitir interpretações mais longas e profundas
          temperature: 0.9, // Mais criatividade e misticismo
        }),
      });

      if (!response.ok) {
        console.warn('API AbacusAI falhou, usando interpretação mock');
        useMockInterpretation = true;
      }
    } catch (error) {
      console.warn('Erro ao conectar com API AbacusAI, usando interpretação mock:', error);
      useMockInterpretation = true;
    }

    // Generate mock interpretation if API failed
    if (useMockInterpretation) {
      const mockInterpretation = generateMockInterpretation(cards, spreadType, question);
      
      await prisma.reading.update({
        where: { id: reading.id },
        data: { interpretation: mockInterpretation }
      });

      return new Response(mockInterpretation, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache',
        },
      });
    }

    let fullInterpretation = ''

    // Create a readable stream to pass the AI response to the client
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response?.body?.getReader()
        const decoder = new TextDecoder()
        const encoder = new TextEncoder()

        try {
          while (true) {
            const { done, value } = await reader?.read() || { done: true, value: undefined }
            if (done) break

            const chunk = decoder.decode(value)
            const lines = chunk.split('\n')
            
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6)
                if (data === '[DONE]') {
                  // Save final interpretation to database
                  await prisma.reading.update({
                    where: { id: reading.id },
                    data: { interpretation: fullInterpretation }
                  })
                  controller.close()
                  return
                }
                
                try {
                  const parsed = JSON.parse(data)
                  const content = parsed.choices?.[0]?.delta?.content || ''
                  if (content) {
                    fullInterpretation += content
                    controller.enqueue(encoder.encode(content))
                  }
                } catch (e) {
                  // Skip invalid JSON
                }
              }
            }
          }
        } catch (error) {
          console.error('Stream error:', error)
          controller.error(error)
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })

  } catch (error) {
    console.error('Reading interpretation error:', error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}

function getPositionName(spreadType: string, index: number): string {
  if (spreadType === 'single') {
    return 'Carta Central'
  }
  
  if (spreadType === 'three-card') {
    const positions = ['Passado', 'Presente', 'Futuro']
    return positions[index] || `Posição ${index + 1}`
  }
  
  if (spreadType === 'celtic-cross') {
    const positions = [
      'Situação Atual',
      'Desafio/Cruz',
      'Passado Distante',
      'Futuro Próximo',
      'Coroa/Possível Resultado',
      'Base/Fundação',
      'Você no Futuro',
      'Influências Externas',
      'Esperanças e Medos',
      'Resultado Final'
    ]
    return positions[index] || `Posição ${index + 1}`
  }
  
  return `Posição ${index + 1}`
}

function generateMockInterpretation(cards: any[], spreadType: string, question?: string): string {
  const cardNames = cards.map(c => c.name).join(', ');
  
  const interpretations: Record<string, string> = {
    'The Fool': '✨ O Louco traz a energia de novos começos e possibilidades infinitas. Este é um momento para confiar no universo e dar o salto de fé que seu coração deseja. A jornada que se inicia agora será transformadora.',
    'The Magician': '🔮 O Mago revela que você possui todos os recursos necessários para manifestar seus desejos. Seu poder pessoal está no auge - use sua vontade e concentração para criar a realidade que almeja.',
    'The High Priestess': '🌙 A Sacerdotisa convida você a mergulhar em sua sabedoria interior. Confie em sua intuição neste momento, pois ela é sua melhor guia. Os mistérios que buscas serão revelados através da contemplação silenciosa.',
    'The Empress': '🌺 A Imperatriz traz abundância, criatividade e nutrição. Este é um período fértil para novos projetos e relacionamentos. Conecte-se com a natureza e permita que a energia criativa flua através de você.',
    'The Emperor': '👑 O Imperador representa estrutura, autoridade e estabilidade. É hora de estabelecer limites claros e assumir o controle de sua vida. Sua liderança e disciplina trarão os resultados desejados.',
    'The Hierophant': '📿 O Hierofante sugere buscar sabedoria em tradições e ensinamentos estabelecidos. Um mentor ou guia espiritual pode aparecer em seu caminho. Honre suas crenças enquanto permanece aberto ao aprendizado.',
    'The Lovers': '💕 Os Amantes falam de escolhas importantes do coração. Uma decisão significativa se aproxima - escolha com base em seus valores mais profundos. O amor e a harmonia estão disponíveis quando você se alinha com sua verdade.',
    'The Chariot': '⚡ O Carro indica vitória através da determinação e foco. Você tem a força de vontade necessária para superar qualquer obstáculo. Mantenha-se no caminho e o sucesso será seu.',
    'Strength': '🦁 A Força revela que a verdadeira coragem vem da compaixão e paciência. Aborde os desafios com gentileza, não com agressão. Sua força interior é maior do que imagina.',
    'The Hermit': '🕯️ O Eremita convida à introspecção e busca interior. Este é um momento para se retirar do mundo externo e encontrar respostas dentro de si. A solidão escolhida traz clareza e sabedoria.',
    'Wheel of Fortune': '🎡 A Roda da Fortuna indica mudanças inevitáveis e ciclos naturais da vida. Aceite as transformações com graça - o que parece um fim é na verdade um novo começo. A sorte está ao seu lado.',
    'Justice': '⚖️ A Justiça traz equilíbrio, verdade e consequências justas. Suas ações passadas agora retornam para você. Tome decisões com integridade e a harmonia será restaurada.',
    'The Hanged Man': '🙃 O Enforcado sugere que uma mudança de perspectiva é necessária. Às vezes, render-se e ver as coisas de outro ângulo traz a solução que buscamos. A pausa atual tem um propósito.',
    'Death': '🦋 A Morte representa transformação profunda e renovação. Um ciclo está terminando para dar espaço ao novo. Deixe ir o que não serve mais - a metamorfose que se aproxima é necessária e libertadora.',
    'Temperance': '🌊 A Temperança traz equilíbrio, moderação e paciência. Encontre o meio-termo entre extremos. A cura acontece quando você harmoniza diferentes aspectos de sua vida.',
    'The Devil': '⛓️ O Diabo alerta sobre apegos e padrões limitantes. Examine onde você se sente preso ou viciado. A libertação está disponível quando você reconhece as correntes que criou para si mesmo.',
    'The Tower': '⚡ A Torre indica mudanças súbitas e revelações. Estruturas antigas precisam cair para que algo mais autêntico possa ser construído. Embora desafiador, este colapso é necessário para seu crescimento.',
    'The Star': '⭐ A Estrela traz esperança, renovação e inspiração. Após tempos difíceis, a luz retorna. Mantenha a fé - seus sonhos e desejos estão se alinhando com o universo.',
    'The Moon': '🌙 A Lua revela ilusões, medos e o reino do inconsciente. Nem tudo é como parece. Confie em sua intuição para navegar através da incerteza e dos mistérios que se apresentam.',
    'The Sun': '☀️ O Sol irradia sucesso, alegria e vitalidade. Este é um período de celebração e realizações. Sua luz interior brilha intensamente - compartilhe sua energia positiva com o mundo.',
    'Judgement': '📯 O Julgamento marca um momento de avaliação e renascimento. É hora de perdoar o passado e abraçar uma versão renovada de si mesmo. Um despertar espiritual está em curso.',
    'The World': '🌍 O Mundo representa completude, realização e sucesso. Um ciclo importante se completa com maestria. Celebre suas conquistas - você alcançou um nível superior de compreensão e realização.'
  };

  let interpretation = `🔮 **Interpretação Mística da Sua Leitura** 🔮\n\n`;
  
  if (question) {
    interpretation += `**Sua Pergunta:** "${question}"\n\n`;
  }

  interpretation += `As cartas reveladas para você são: **${cardNames}**\n\n`;

  // Add interpretation for each card
  cards.forEach((card, index) => {
    const position = getPositionName(spreadType, index);
    const cardInterpretation = interpretations[card.name] || `${card.name} traz mensagens importantes para sua jornada. ${card.shortMeaning}`;
    interpretation += `**${position}:** ${card.name}\n${cardInterpretation}\n\n`;
  });

  // Add general reading
  if (spreadType === 'single') {
    interpretation += `\n✨ **Mensagem do Universo:**\n\nEsta carta única foi escolhida especialmente para você neste momento. Ela carrega a energia e a orientação que você precisa agora. Medite sobre seu significado e permita que sua sabedoria se revele gradualmente em sua vida. O universo está falando diretamente com você através deste arcano.`;
  } else if (spreadType === 'three-card') {
    interpretation += `\n✨ **Síntese da Leitura:**\n\nSua jornada através do tempo é revelada nestas três cartas. O passado moldou quem você é, o presente oferece oportunidades de ação, e o futuro aguarda suas escolhas. Estas cartas formam uma narrativa coerente sobre seu caminho - honre cada fase e confie no processo de transformação que está em andamento.`;
  } else {
    interpretation += `\n✨ **Síntese da Leitura:**\n\nEsta leitura completa revela as múltiplas camadas de sua situação atual. Cada carta contribui para uma compreensão profunda do que você está vivenciando. Observe como as energias se entrelaçam e formam um mapa para sua jornada. O universo está oferecendo orientação clara - confie no processo e siga sua intuição.`;
  }

  interpretation += `\n\n🌟 Que as estrelas iluminem seu caminho e que a sabedoria ancestral do Tarot guie seus passos. 🌟`;

  return interpretation;
}
