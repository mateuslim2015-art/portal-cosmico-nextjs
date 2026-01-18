import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding oracles and courses...');

  // ========================================
  // 1. ORÁCULOS
  // ========================================
  
  const tarotOracle = await prisma.oracle.upsert({
    where: { slug: 'tarot' },
    update: {},
    create: {
      name: 'Tarot',
      slug: 'tarot',
      description: 'O Tarot é um sistema de 78 cartas usado para autoconhecimento e orientação espiritual.',
      icon: '🔮',
      imageUrl: '/images/oracles/tarot.jpg',
      available: true,
      order: 1,
    },
  });

  const ciganoOracle = await prisma.oracle.upsert({
    where: { slug: 'cigano' },
    update: {},
    create: {
      name: 'Baralho Cigano',
      slug: 'cigano',
      description: 'O Baralho Cigano possui 36 cartas e é conhecido por suas leituras práticas e diretas.',
      icon: '🎴',
      imageUrl: '/images/oracles/cigano.jpg',
      available: false,
      order: 2,
    },
  });

  const runasOracle = await prisma.oracle.upsert({
    where: { slug: 'runas' },
    update: {},
    create: {
      name: 'Runas',
      slug: 'runas',
      description: 'As Runas são símbolos nórdicos ancestrais usados para orientação e magia.',
      icon: 'ᚱ',
      imageUrl: '/images/oracles/runas.jpg',
      available: false,
      order: 3,
    },
  });

  const ichingOracle = await prisma.oracle.upsert({
    where: { slug: 'i-ching' },
    update: {},
    create: {
      name: 'I-Ching',
      slug: 'i-ching',
      description: 'O I-Ching é um oráculo chinês milenar baseado em 64 hexagramas.',
      icon: '☯',
      imageUrl: '/images/oracles/iching.jpg',
      available: false,
      order: 4,
    },
  });

  console.log('✅ Oráculos criados!');

  // ========================================
  // 2. CURSO DE TAROT
  // ========================================

  const tarotCourse = await prisma.course.upsert({
    where: { slug: 'tarot-completo' },
    update: {},
    create: {
      oracleId: tarotOracle.id,
      title: 'Tarot Completo: Do Iniciante ao Avançado',
      slug: 'tarot-completo',
      description: 'Aprenda tudo sobre Tarot, desde a história até as tiragens avançadas. Domine os 78 arcanos e desenvolva sua intuição.',
      imageUrl: '/images/courses/tarot-course.jpg',
      duration: '8 semanas',
      level: 'beginner',
      order: 1,
      published: true,
    },
  });

  console.log('✅ Curso de Tarot criado!');

  // ========================================
  // 3. MÓDULOS DO CURSO
  // ========================================

  // Módulo 1: Introdução ao Tarot
  const module1 = await prisma.module.upsert({
    where: { courseId_slug: { courseId: tarotCourse.id, slug: 'introducao' } },
    update: {},
    create: {
      courseId: tarotCourse.id,
      title: 'Introdução ao Tarot',
      slug: 'introducao',
      description: 'Conheça a história, estrutura e fundamentos do Tarot.',
      order: 1,
    },
  });

  // Módulo 2: Arcanos Maiores
  const module2 = await prisma.module.upsert({
    where: { courseId_slug: { courseId: tarotCourse.id, slug: 'arcanos-maiores' } },
    update: {},
    create: {
      courseId: tarotCourse.id,
      title: 'Arcanos Maiores',
      slug: 'arcanos-maiores',
      description: 'Estude profundamente as 22 cartas dos Arcanos Maiores.',
      order: 2,
    },
  });

  // Módulo 3: Arcanos Menores
  const module3 = await prisma.module.upsert({
    where: { courseId_slug: { courseId: tarotCourse.id, slug: 'arcanos-menores' } },
    update: {},
    create: {
      courseId: tarotCourse.id,
      title: 'Arcanos Menores',
      slug: 'arcanos-menores',
      description: 'Explore os 56 Arcanos Menores e seus naipes.',
      order: 3,
    },
  });

  // Módulo 4: Tiragens e Prática
  const module4 = await prisma.module.upsert({
    where: { courseId_slug: { courseId: tarotCourse.id, slug: 'tiragens' } },
    update: {},
    create: {
      courseId: tarotCourse.id,
      title: 'Tiragens e Prática',
      slug: 'tiragens',
      description: 'Aprenda as principais tiragens e pratique suas habilidades.',
      order: 4,
    },
  });

  console.log('✅ Módulos criados!');

  // ========================================
  // 4. LIÇÕES DO MÓDULO 1
  // ========================================

  await prisma.lesson.upsert({
    where: { moduleId_slug: { moduleId: module1.id, slug: 'historia-do-tarot' } },
    update: {},
    create: {
      moduleId: module1.id,
      title: 'História do Tarot',
      slug: 'historia-do-tarot',
      content: `# História do Tarot

O Tarot é um sistema de cartas com origens misteriosas que remontam ao século XV na Europa. Embora muitos acreditem que o Tarot tenha raízes no Egito Antigo ou na Cabala, os primeiros registros históricos mostram que as cartas surgiram na Itália renascentista como um jogo de cartas chamado "Tarocchi".

## Origens Históricas

As primeiras cartas de Tarot conhecidas datam de 1440, criadas para a família Visconti-Sforza em Milão. Essas cartas eram ricamente decoradas e usadas principalmente como entretenimento pela nobreza italiana.

## Evolução Esotérica

Foi apenas no século XVIII que o Tarot começou a ser associado ao ocultismo e à adivinhação. O francês Antoine Court de Gébelin foi um dos primeiros a sugerir que as cartas continham sabedoria esotérica egípcia.

## O Tarot Moderno

No século XX, Arthur Edward Waite e Pamela Colman Smith criaram o famoso **Tarot Rider-Waite**, que se tornou o padrão para a maioria dos baralhos modernos. Este deck introduziu imagens simbólicas ricas em todos os 78 arcanos.

## Estrutura do Tarot

O Tarot é composto por **78 cartas** divididas em:

- **22 Arcanos Maiores**: Representam as grandes lições e arquétipos da jornada humana
- **56 Arcanos Menores**: Divididos em 4 naipes (Copas, Paus, Espadas, Ouros), representam situações cotidianas

## O Tarot Hoje

Hoje, o Tarot é usado mundialmente como ferramenta de autoconhecimento, meditação e orientação espiritual. Não se trata de "prever o futuro", mas sim de compreender energias presentes e possibilidades futuras baseadas nas escolhas atuais.

---

**Próxima lição:** Estrutura das 78 Cartas`,
      duration: 15,
      order: 1,
      xpReward: 50,
      published: true,
    },
  });

  await prisma.lesson.upsert({
    where: { moduleId_slug: { moduleId: module1.id, slug: 'estrutura-das-cartas' } },
    update: {},
    create: {
      moduleId: module1.id,
      title: 'Estrutura das 78 Cartas',
      slug: 'estrutura-das-cartas',
      content: `# Estrutura das 78 Cartas

O Tarot é composto por 78 cartas divididas em dois grupos principais: Arcanos Maiores e Arcanos Menores. Cada grupo tem sua função e significado específico nas leituras.

## Arcanos Maiores (22 cartas)

Os Arcanos Maiores representam as **grandes lições da vida** e os **arquétipos universais** da experiência humana. Eles formam uma jornada espiritual conhecida como "A Jornada do Louco".

### Lista dos Arcanos Maiores:
0. O Louco
1. O Mago
2. A Sacerdotisa
3. A Imperatriz
4. O Imperador
5. O Hierofante
6. Os Enamorados
7. O Carro
8. A Força
9. O Eremita
10. A Roda da Fortuna
11. A Justiça
12. O Enforcado
13. A Morte
14. A Temperança
15. O Diabo
16. A Torre
17. A Estrela
18. A Lua
19. O Sol
20. O Julgamento
21. O Mundo

## Arcanos Menores (56 cartas)

Os Arcanos Menores representam as **situações cotidianas** e os **desafios práticos** da vida. São divididos em 4 naipes:

### 🏆 Paus (Fogo)
- **Elemento:** Fogo
- **Energia:** Ação, paixão, criatividade, ambição
- **Área:** Carreira, projetos, iniciativa

### 💧 Copas (Água)
- **Elemento:** Água
- **Energia:** Emoções, relacionamentos, intuição
- **Área:** Amor, sentimentos, conexões

### ⚔️ Espadas (Ar)
- **Elemento:** Ar
- **Energia:** Pensamento, comunicação, conflito
- **Área:** Mente, decisões, desafios

### 💰 Ouros (Terra)
- **Elemento:** Terra
- **Energia:** Materialidade, estabilidade, recursos
- **Área:** Finanças, trabalho, segurança

### Estrutura de cada naipe:
- **Ás a 10:** Representam situações e energias numeradas
- **Valete, Cavaleiro, Rainha, Rei:** Representam pessoas ou aspectos de personalidade

---

**Próxima lição:** Como Preparar seu Baralho`,
      duration: 20,
      order: 2,
      xpReward: 50,
      published: true,
    },
  });

  await prisma.lesson.upsert({
    where: { moduleId_slug: { moduleId: module1.id, slug: 'preparando-baralho' } },
    update: {},
    create: {
      moduleId: module1.id,
      title: 'Como Preparar seu Baralho',
      slug: 'preparando-baralho',
      content: `# Como Preparar seu Baralho

Preparar e cuidar do seu baralho de Tarot é uma prática importante que ajuda a criar uma conexão energética com as cartas e mantém a qualidade das leituras.

## Escolhendo seu Primeiro Baralho

### Dicas para Iniciantes:
- **Rider-Waite ou Rider-Waite-Smith:** O mais recomendado para iniciantes devido às suas imagens claras e simbólicas
- **Conexão intuitiva:** Escolha um baralho que "fale" com você visualmente
- **Qualidade:** Prefira cartas com boa qualidade de impressão e material durável

## Limpeza Energética

Antes de usar seu baralho pela primeira vez (e periodicamente depois), é importante fazer uma limpeza energética:

### Métodos de Limpeza:
1. **Fumaça:** Passe as cartas pela fumaça de incenso ou sálvia
2. **Cristais:** Deixe o baralho sobre um cristal de quartzo transparente durante a noite
3. **Luz solar/lunar:** Exponha as cartas à luz do sol ou da lua cheia por algumas horas
4. **Embaralhamento intencional:** Embaralhe as cartas com a intenção de limpar energias antigas

## Consagração do Baralho

Após a limpeza, você pode consagrar seu baralho:

1. **Segure o baralho nas mãos**
2. **Feche os olhos e respire profundamente**
3. **Mentalize uma luz branca envolvendo as cartas**
4. **Declare sua intenção:** "Que este baralho seja um canal de sabedoria e orientação"
5. **Durma com o baralho sob o travesseiro** na primeira noite

## Cuidados Diários

### Como Guardar:
- Use uma **caixa ou bolsa especial** para proteger as cartas
- Guarde em um **local limpo e respeitoso**
- Evite que outras pessoas toquem sem permissão (opcional, mas muitos praticantes preferem assim)

### Limpeza Física:
- Mantenha as mãos limpas ao manusear
- Evite comer ou beber perto das cartas
- Se necessário, limpe suavemente com pano seco

## Criando uma Conexão

Para criar uma conexão forte com seu baralho:

- **Pratique diariamente:** Puxe uma carta por dia
- **Estude as imagens:** Observe cada detalhe das cartas
- **Medite com as cartas:** Escolha uma carta e medite sobre seu significado
- **Durma com cartas:** Coloque uma carta específica sob o travesseiro para sonhar com seus significados

---

**Parabéns!** Você completou o Módulo 1: Introdução ao Tarot! 🎉

**Próximo módulo:** Arcanos Maiores`,
      duration: 15,
      order: 3,
      xpReward: 50,
      published: true,
    },
  });

  console.log('✅ Lições do Módulo 1 criadas!');

  // ========================================
  // 5. LIÇÕES DO MÓDULO 2 (Arcanos Maiores - Primeiras 3)
  // ========================================

  await prisma.lesson.upsert({
    where: { moduleId_slug: { moduleId: module2.id, slug: 'o-louco' } },
    update: {},
    create: {
      moduleId: module2.id,
      title: '0 - O Louco',
      slug: 'o-louco',
      content: `# O Louco (The Fool) - Arcano 0

![O Louco](/images/cards/the-fool.jpg)

## Visão Geral

O Louco é o arcano número 0 (ou 22) do Tarot e representa o **início da jornada**. Ele é o viajante despreocupado que está prestes a embarcar em uma grande aventura, sem saber exatamente o que encontrará pelo caminho.

## Simbolismo da Carta

### Elementos Visuais:
- **Jovem caminhante:** Representa inocência e novo começo
- **Beira do precipício:** O desconhecido, o salto de fé
- **Trouxa nas costas:** Experiências passadas (leves, não pesadas)
- **Cachorro branco:** Instinto, proteção, lealdade
- **Montanhas ao fundo:** Desafios futuros
- **Sol brilhante:** Otimismo, energia positiva

## Significados

### Posição Vertical (Upright):
- ✨ **Novos começos** e oportunidades
- 🎭 **Espontaneidade** e liberdade
- 🌟 **Fé** no universo e em si mesmo
- 🎨 **Criatividade** sem limites
- 🚀 **Aventura** e exploração
- 💫 **Inocência** e pureza de intenção

### Posição Invertida (Reversed):
- ⚠️ **Imprudência** e falta de planejamento
- 😰 **Medo** de dar o próximo passo
- 🎲 **Riscos desnecessários**
- 🌀 **Falta de direção**
- 🚫 **Resistência** a mudanças

## Interpretações por Área

### 💼 Carreira:
- Novo emprego ou projeto
- Mudança de carreira
- Empreendedorismo
- Período de aprendizado

### ❤️ Amor:
- Novo relacionamento
- Fase de descoberta
- Amor livre e descompromissado
- Renovação de relacionamento existente

### 💰 Finanças:
- Novo investimento
- Risco calculado
- Oportunidade inesperada
- Cuidado com impulsividade

### 🧘 Espiritualidade:
- Início de jornada espiritual
- Abertura para o novo
- Confiança no divino
- Desapego do ego

## Mensagem do Louco

> "Às vezes, você precisa dar um salto de fé. O universo te ampara quando você confia no processo da vida. Não tenha medo de começar de novo."

## Exercício Prático

**Reflexão:**
1. Onde na sua vida você precisa dar um "salto de fé"?
2. O que te impede de começar algo novo?
3. Como você pode cultivar mais espontaneidade?

**Meditação:**
Visualize-se como O Louco, livre e despreocupado, pronto para uma nova aventura. Que sensações surgem?

---

**Próxima lição:** O Mago`,
      duration: 25,
      order: 1,
      xpReward: 50,
      published: true,
    },
  });

  await prisma.lesson.upsert({
    where: { moduleId_slug: { moduleId: module2.id, slug: 'o-mago' } },
    update: {},
    create: {
      moduleId: module2.id,
      title: '1 - O Mago',
      slug: 'o-mago',
      content: `# O Mago (The Magician) - Arcano I

![O Mago](/images/cards/the-magician.jpg)

## Visão Geral

O Mago é o arcano número 1 do Tarot e representa o **poder da manifestação**. Ele possui todas as ferramentas necessárias para criar sua realidade e sabe como usá-las.

## Simbolismo da Carta

### Elementos Visuais:
- **Braço erguido:** Conexão com o divino ("Como acima")
- **Braço apontando para baixo:** Manifestação no plano terrestre ("Assim abaixo")
- **Mesa com 4 elementos:** Copas, Paus, Espadas, Ouros (domínio sobre todos os elementos)
- **Símbolo do infinito:** Poder ilimitado, ciclo eterno
- **Rosas e lírios:** Paixão e pureza
- **Serpente comendo a própria cauda:** Ciclo da vida

## Significados

### Posição Vertical (Upright):
- ⚡ **Manifestação** e poder pessoal
- 🎯 **Foco** e determinação
- 🧠 **Habilidade** e competência
- 🎨 **Criatividade** aplicada
- 💪 **Autoconfiança**
- 🔮 **Recursos disponíveis**

### Posição Invertida (Reversed):
- 🎭 **Manipulação** e engano
- 😕 **Falta de direção**
- 🌀 **Talentos desperdiçados**
- 🎪 **Truques** e ilusões
- 📉 **Falta de planejamento**

## Interpretações por Área

### 💼 Carreira:
- Habilidades sendo reconhecidas
- Momento de agir e manifestar
- Uso de talentos únicos
- Liderança e iniciativa

### ❤️ Amor:
- Atração magnética
- Comunicação clara
- Manifestar o relacionamento desejado
- Charme e sedução

### 💰 Finanças:
- Oportunidades de ganho
- Usar recursos sabiamente
- Investimentos inteligentes
- Transformar ideias em dinheiro

### 🧘 Espiritualidade:
- Poder de co-criação com o universo
- Alinhamento entre intenção e ação
- Domínio sobre os elementos
- Canalização de energia divina

## Mensagem do Mago

> "Você tem tudo o que precisa para criar a vida que deseja. As ferramentas estão em suas mãos. Agora é hora de agir com intenção e foco."

## Exercício Prático

**Reflexão:**
1. Quais são suas "ferramentas" (habilidades, recursos, talentos)?
2. Como você pode usá-las melhor?
3. O que você deseja manifestar em sua vida?

**Ritual:**
Escreva uma intenção clara do que deseja manifestar. Coloque a carta do Mago em seu altar ou espaço de trabalho como lembrete de seu poder pessoal.

---

**Próxima lição:** A Sacerdotisa`,
      duration: 25,
      order: 2,
      xpReward: 50,
      published: true,
    },
  });

  await prisma.lesson.upsert({
    where: { moduleId_slug: { moduleId: module2.id, slug: 'a-sacerdotisa' } },
    update: {},
    create: {
      moduleId: module2.id,
      title: '2 - A Sacerdotisa',
      slug: 'a-sacerdotisa',
      content: `# A Sacerdotisa (The High Priestess) - Arcano II

![A Sacerdotisa](/images/cards/the-high-priestess.jpg)

## Visão Geral

A Sacerdotisa é o arcano número 2 do Tarot e representa a **sabedoria intuitiva** e o **conhecimento oculto**. Ela é a guardiã dos mistérios e nos convida a olhar além do véu da realidade aparente.

## Simbolismo da Carta

### Elementos Visuais:
- **Véu com romãs:** Mistérios ocultos, fertilidade
- **Duas colunas (B e J):** Dualidade, equilíbrio (Boaz e Jachin do Templo de Salomão)
- **Lua aos pés:** Intuição, ciclos, feminino
- **Cruz no peito:** Equilíbrio entre espiritual e material
- **Pergaminho (TORA):** Conhecimento sagrado
- **Águas ao fundo:** Inconsciente, emoções profundas

## Significados

### Posição Vertical (Upright):
- 🌙 **Intuição** e sabedoria interior
- 🔮 **Mistérios** e conhecimento oculto
- 🤫 **Silêncio** e contemplação
- 📚 **Estudo** esotérico
- 💭 **Sonhos** e mensagens do inconsciente
- ⚖️ **Equilíbrio** entre opostos

### Posição Invertida (Reversed):
- 🙉 **Ignorar a intuição**
- 🗣️ **Segredos revelados**
- 😰 **Ansiedade** e confusão mental
- 📢 **Falta de introspecção**
- 🌀 **Desequilíbrio emocional**

## Interpretações por Área

### 💼 Carreira:
- Confiar na intuição para decisões
- Período de estudo e aprendizado
- Informações ainda não reveladas
- Trabalho com o oculto ou espiritual

### ❤️ Amor:
- Conexão profunda e espiritual
- Mistérios no relacionamento
- Ouvir a intuição sobre o parceiro
- Amor platônico ou não revelado

### 💰 Finanças:
- Informações ocultas sobre investimentos
- Aguardar o momento certo
- Estudar antes de agir
- Confiar na intuição financeira

### 🧘 Espiritualidade:
- Desenvolvimento psíquico
- Meditação profunda
- Acesso ao inconsciente
- Sabedoria ancestral

## Mensagem da Sacerdotisa

> "Nem tudo precisa ser dito ou revelado. Há um tempo para o silêncio e a contemplação. Confie em sua voz interior - ela sabe o caminho."

## Exercício Prático

**Reflexão:**
1. Quando foi a última vez que você realmente ouviu sua intuição?
2. Que mistérios da vida te intrigam?
3. Como você pode cultivar mais silêncio interior?

**Meditação:**
Sente-se em silêncio por 10 minutos. Imagine-se entre as duas colunas da Sacerdotisa, no limiar entre o conhecido e o desconhecido. Que mensagens surgem?

---

**Próxima lição:** A Imperatriz`,
      duration: 25,
      order: 3,
      xpReward: 50,
      published: true,
    },
  });

  console.log('✅ Primeiras lições do Módulo 2 criadas!');

  // ========================================
  // 6. BADGES
  // ========================================

  await prisma.badge.upsert({
    where: { slug: 'primeiro-passo' },
    update: {},
    create: {
      name: 'Primeiro Passo',
      slug: 'primeiro-passo',
      description: 'Complete sua primeira lição',
      icon: '🎓',
      requirement: JSON.stringify({ type: 'lessons_completed', count: 1 }),
      xpReward: 100,
    },
  });

  await prisma.badge.upsert({
    where: { slug: 'estudioso' },
    update: {},
    create: {
      name: 'Estudioso',
      slug: 'estudioso',
      description: 'Complete 10 lições',
      icon: '📚',
      requirement: JSON.stringify({ type: 'lessons_completed', count: 10 }),
      xpReward: 200,
    },
  });

  await prisma.badge.upsert({
    where: { slug: 'praticante' },
    update: {},
    create: {
      name: 'Praticante',
      slug: 'praticante',
      description: 'Faça 10 leituras',
      icon: '🔮',
      requirement: JSON.stringify({ type: 'readings_completed', count: 10 }),
      xpReward: 150,
    },
  });

  await prisma.badge.upsert({
    where: { slug: 'dedicado' },
    update: {},
    create: {
      name: 'Dedicado',
      slug: 'dedicado',
      description: 'Mantenha um streak de 7 dias',
      icon: '🔥',
      requirement: JSON.stringify({ type: 'streak', count: 7 }),
      xpReward: 300,
    },
  });

  await prisma.badge.upsert({
    where: { slug: 'mestre-tarot' },
    update: {},
    create: {
      name: 'Mestre do Tarot',
      slug: 'mestre-tarot',
      description: 'Complete o curso de Tarot',
      icon: '👑',
      requirement: JSON.stringify({ type: 'course_completed', courseSlug: 'tarot-completo' }),
      xpReward: 500,
    },
  });

  console.log('✅ Badges criadas!');

  console.log('\n🎉 Seed completo! Banco populado com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao fazer seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
