
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { getFileUrl } from "@/lib/s3"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const { cloudStoragePath, spreadType, question } = await request.json()

    if (!cloudStoragePath || !spreadType) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 })
    }

    // Get signed URL for the photo
    const photoUrl = await getFileUrl(cloudStoragePath)

    // Prepare prompt for GPT-4 Vision - detailed card identification
    const spreadDescriptions = {
      'single': 'uma única carta do Tarot',
      'three-card': 'três cartas do Tarot (representando passado, presente e futuro)',
      'celtic-cross': 'dez cartas do Tarot na formação Cruz Celta'
    }

    const visionPrompt = `Você é um expert em Tarot com décadas de experiência. Analise esta foto de uma tiragem de Tarot com máxima precisão.

TIPO DE TIRAGEM: ${spreadDescriptions[spreadType as keyof typeof spreadDescriptions]}

TAREFA:
1. Conte quantas cartas você vê na imagem
2. Para CADA carta visível, identifique:
   - Nome COMPLETO da carta (ex: "O Louco", "Dois de Copas", "Rainha de Espadas")
   - Se está em posição normal ou invertida (de cabeça para baixo)
   - Posição na tiragem (da esquerda para direita, ou conforme a formação)

3. Observe DETALHES VISUAIS para identificação:
   - Números romanos ou arábicos
   - Naipes (Paus, Copas, Espadas, Ouros/Pentáculos)
   - Figuras (Valete, Cavaleiro, Rainha, Rei)
   - Arcanos Maiores (O Mago, A Imperatriz, A Morte, etc)
   - Símbolos principais na carta
   - Cores dominantes

FORMATO DE RESPOSTA:
Liste CADA carta identificada seguindo EXATAMENTE este formato:

**Carta 1:** [Nome Completo da Carta]
- Orientação: Normal / Invertida
- Observações: [principais símbolos ou características visuais]

**Carta 2:** [Nome Completo da Carta]
- Orientação: Normal / Invertida
- Observações: [principais símbolos ou características visuais]

[Continue para todas as cartas visíveis...]

IMPORTANTE:
- Se não conseguir identificar uma carta com 100% de certeza, descreva o que vê (números, símbolos, cores, figuras)
- Seja específico: "Três de Paus" não "carta de paus"
- Indique claramente se a carta está invertida
- Mantenha a ordem da esquerda para direita ou conforme a tiragem`

    // Create a readable stream to pass the AI response to the client
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()
        
        try {
          // STEP 1: Identify cards using Vision
          controller.enqueue(encoder.encode(JSON.stringify({ 
            type: 'status',
            content: 'Analisando a foto e identificando as cartas...'
          }) + '\n\n'))

          const visionResponse = await fetch('https://apps.abacus.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`
            },
            body: JSON.stringify({
              model: 'gpt-4o',
              messages: [
                {
                  role: 'user',
                  content: [
                    { type: 'text', text: visionPrompt },
                    { type: 'image_url', image_url: { url: photoUrl } }
                  ]
                }
              ],
              max_tokens: 1500,
            }),
          })

          if (!visionResponse.ok) {
            throw new Error('Falha ao analisar a foto com IA')
          }

          const visionData = await visionResponse.json()
          const cardsIdentified = visionData.choices[0].message.content

          // Send identified cards to client
          controller.enqueue(encoder.encode(JSON.stringify({ 
            type: 'cards',
            content: cardsIdentified
          }) + '\n\n'))

          // STEP 2: Individual card interpretations
          controller.enqueue(encoder.encode(JSON.stringify({ 
            type: 'status',
            content: 'Interpretando cada carta individualmente...'
          }) + '\n\n'))

          const individualPrompt = `Com base nas cartas identificadas abaixo, forneça uma interpretação INDIVIDUAL e DETALHADA de cada carta.

${question ? `CONTEXTO DA PERGUNTA: "${question}"` : 'CONTEXTO: Consulta geral sobre a vida da pessoa'}

CARTAS IDENTIFICADAS:
${cardsIdentified}

Para CADA carta identificada, forneça:

**[Nome da Carta]**

🔮 **Significado Nesta Posição:**
[Interpretação específica considerando a posição na tiragem e se está normal/invertida]

💫 **Mensagem da Carta:**
[O que esta carta está comunicando no contexto da pergunta]

⚡ **Energia e Conselhos:**
[Que energia ela traz e qual conselho prático oferece]

---

Continue este formato para TODAS as cartas identificadas. Seja profundo, místico, mas prático e esperançoso.`

          const individualResponse = await fetch('https://apps.abacus.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`
            },
            body: JSON.stringify({
              model: 'gpt-4o-mini',
              messages: [
                { role: 'user', content: individualPrompt }
              ],
              stream: true,
              max_tokens: 2000,
            }),
          })

          if (!individualResponse.ok) {
            throw new Error('Falha ao obter interpretação individual')
          }

          let individualInterpretation = ''
          const individualReader = individualResponse.body?.getReader()
          const decoder = new TextDecoder()

          if (individualReader) {
            while (true) {
              const { done, value } = await individualReader.read()
              if (done) break

              const chunk = decoder.decode(value)
              const lines = chunk.split('\n')
              
              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  const data = line.slice(6)
                  if (data === '[DONE]') break
                  
                  try {
                    const parsed = JSON.parse(data)
                    const content = parsed.choices?.[0]?.delta?.content || ''
                    if (content) {
                      individualInterpretation += content
                      controller.enqueue(encoder.encode(JSON.stringify({ 
                        type: 'individual',
                        content: content 
                      }) + '\n\n'))
                    }
                  } catch (e) {
                    // Skip invalid JSON
                  }
                }
              }
            }
          }

          // STEP 3: General interpretation connecting all cards
          controller.enqueue(encoder.encode(JSON.stringify({ 
            type: 'status',
            content: 'Criando interpretação geral conectando todas as cartas...'
          }) + '\n\n'))

          const generalPrompt = `Agora que analisamos cada carta individualmente, forneça uma INTERPRETAÇÃO GERAL que conecte TODAS as cartas em uma narrativa coesa.

${question ? `PERGUNTA: "${question}"` : 'CONSULTA GERAL'}

CARTAS DA TIRAGEM:
${cardsIdentified}

INTERPRETAÇÕES INDIVIDUAIS:
${individualInterpretation}

Forneça uma síntese mística que:

🌟 **VISÃO GERAL DA LEITURA**
[Uma visão panorâmica do que as cartas revelam juntas]

🔗 **CONEXÕES ENTRE AS CARTAS**
[Como as cartas se relacionam e formam uma história maior]

💎 **MENSAGEM CENTRAL**
[Qual é a mensagem principal desta leitura]

🌙 **ORIENTAÇÃO PRÁTICA**
[Conselhos práticos baseados na leitura completa]

✨ **PERSPECTIVAS FUTURAS**
[O que as cartas sugerem sobre os próximos passos]

Seja profundo, respeitoso à tradição do Tarot, esperançoso e empoderador. Use linguagem mística mas acessível.`

          const generalResponse = await fetch('https://apps.abacus.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`
            },
            body: JSON.stringify({
              model: 'gpt-4o-mini',
              messages: [
                { role: 'user', content: generalPrompt }
              ],
              stream: true,
              max_tokens: 1500,
            }),
          })

          if (!generalResponse.ok) {
            throw new Error('Falha ao obter interpretação geral')
          }

          let generalInterpretation = ''
          const generalReader = generalResponse.body?.getReader()

          if (generalReader) {
            while (true) {
              const { done, value } = await generalReader.read()
              if (done) break

              const chunk = decoder.decode(value)
              const lines = chunk.split('\n')
              
              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  const data = line.slice(6)
                  if (data === '[DONE]') break
                  
                  try {
                    const parsed = JSON.parse(data)
                    const content = parsed.choices?.[0]?.delta?.content || ''
                    if (content) {
                      generalInterpretation += content
                      controller.enqueue(encoder.encode(JSON.stringify({ 
                        type: 'general',
                        content: content 
                      }) + '\n\n'))
                    }
                  } catch (e) {
                    // Skip invalid JSON
                  }
                }
              }
            }
          }

          // Save to database
          const fullInterpretation = `CARTAS IDENTIFICADAS:\n${cardsIdentified}\n\nINTERPRETAÇÕES INDIVIDUAIS:\n${individualInterpretation}\n\nINTERPRETAÇÃO GERAL:\n${generalInterpretation}`
          
          const reading = await prisma.reading.create({
            data: {
              userId: session.user.id,
              spreadType,
              question: question || null,
              interpretation: fullInterpretation,
              photoUrl: cloudStoragePath,
            }
          })

          // Send completion
          controller.enqueue(encoder.encode(JSON.stringify({ 
            type: 'done',
            readingId: reading.id
          }) + '\n\n'))
          
          controller.close()

        } catch (error) {
          console.error('Stream error:', error)
          controller.enqueue(encoder.encode(JSON.stringify({ 
            type: 'error',
            content: 'Erro ao processar a interpretação'
          }) + '\n\n'))
          controller.error(error)
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })

  } catch (error) {
    console.error('Photo interpretation error:', error)
    return NextResponse.json(
      { error: "Erro ao interpretar a foto" },
      { status: 500 }
    )
  }
}
