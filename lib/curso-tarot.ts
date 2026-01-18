
// Estrutura do Mini Curso de Tarot
// Baseado em análise profunda dos 23 PDFs de Tarot

export interface CursoModulo {
  id: string;
  titulo: string;
  descricao: string;
  duracao: string;
  licoes: Licao[];
}

export interface Licao {
  id: string;
  titulo: string;
  conteudo: string;
  pontosPrincipais: string[];
  exercicio?: string;
}

export const cursoTarot: CursoModulo[] = [
  {
    id: 'modulo-1',
    titulo: 'Fundamentos do Tarot',
    descricao: 'Descubra a história, estrutura e propósito do Tarot como ferramenta de autodescoberta',
    duracao: '45 minutos',
    licoes: [
      {
        id: 'licao-1-1',
        titulo: 'O que é o Tarot?',
        conteudo: `O Tarot é muito mais do que um simples jogo de cartas - é um sistema simbólico profundo que reflete a jornada da alma humana. 

**A Estrutura do Tarot:**

O baralho completo possui **78 cartas** divididas em:
- **22 Arcanos Maiores** (0-21): Representam os grandes arquétipos universais e as lições maiores da vida
- **56 Arcanos Menores**: Representam as experiências cotidianas e os quatro elementos

**Os 4 Naipes dos Arcanos Menores:**

Cada naipe possui 14 cartas (Ás a 10 + 4 Figuras de Corte):

1. **PAUS (Fogo)** 🔥
   - Elemento: Fogo
   - Representa: Espírito, criatividade, paixão, ação, carreira
   - Energia: Quente e Seco (Yang - Masculino)

2. **COPAS (Água)** 💧
   - Elemento: Água
   - Representa: Emoções, amor, intuição, relacionamentos
   - Energia: Fria e Úmida (Yin - Feminino)

3. **ESPADAS (Ar)** 🌪️
   - Elemento: Ar
   - Representa: Mente, pensamento, conflitos, decisões
   - Energia: Quente e Úmido

4. **OUROS (Terra)** 🌍
   - Elemento: Terra
   - Representa: Matéria, finanças, trabalho, segurança
   - Energia: Fria e Seca`,
        pontosPrincipais: [
          '78 cartas divididas em Arcanos Maiores e Menores',
          '4 naipes representam os 4 elementos da natureza',
          'Cada elemento possui qualidades e energias específicas',
          'O Tarot é um espelho da experiência humana'
        ],
        exercicio: 'Pegue seu baralho e separe as cartas por categoria: Arcanos Maiores, Paus, Copas, Espadas e Ouros. Observe as diferenças visuais entre cada grupo.'
      },
      {
        id: 'licao-1-2',
        titulo: 'A Jornada do Louco',
        conteudo: `Os 22 Arcanos Maiores contam a história de "A Jornada do Louco" - uma metáfora para a jornada espiritual de cada ser humano do nascimento à iluminação.

**O Louco (0)** inicia sua jornada puro e inocente, encontrando diversos arquétipos que lhe ensinam lições fundamentais:

**Fase 1: O Despertar** (Cartas 0-7)
- O Louco sai em aventura
- Encontra O Mago (poder pessoal) e A Sacerdotisa (intuição)
- Conhece A Imperatriz (criação) e O Imperador (estrutura)
- Recebe ensinamentos d'O Hierofante
- Faz escolhas n'Os Enamorados
- Segue seu caminho n'O Carro

**Fase 2: Os Desafios** (Cartas 8-14)
- Enfrenta A Força interior
- Busca sabedoria com O Eremita
- Gira na Roda da Fortuna
- Encontra A Justiça
- Sacrifica-se n'O Enforcado
- Atravessa A Morte (transformação)

**Fase 3: A Transformação** (Cartas 14-21)
- Encontra equilíbrio na Temperança
- Enfrenta O Diabo (sombras)
- Destrói ilusões n'A Torre
- Vê esperança n'A Estrela
- Atravessa os mistérios d'A Lua
- Alcança a iluminação d'O Sol
- Renasce no Julgamento
- Completa O Mundo`,
        pontosPrincipais: [
          'Os Arcanos Maiores contam uma jornada espiritual',
          'Cada carta representa um arquétipo universal',
          'A jornada é cíclica - sempre recomeçamos',
          'Todos nós vivenciamos essas fases em nossa vida'
        ]
      }
    ]
  },
  {
    id: 'modulo-2',
    titulo: 'Os Arcanos Maiores',
    descricao: 'Mergulhe profundamente nos 22 arquétipos universais e seu simbolismo',
    duracao: '2 horas',
    licoes: [
      {
        id: 'licao-2-1',
        titulo: 'Arcanos 0-7: O Despertar',
        conteudo: `Estas primeiras cartas representam o despertar da consciência e o desenvolvimento das habilidades fundamentais para a jornada.

**0 - O LOUCO** 🎭
*Palavra-chave: REVOLUCIONAR*
O espírito puro em busca de experiência. Representa novos começos, fé no universo e coragem para o desconhecido. O cão branco é o instinto que alerta para perigos.

**I - O MAGO** ✨
*Palavra-chave: ASPIRAR*
"Como acima, assim abaixo". O Mago domina os 4 elementos (espada, bastão, copa, disco) e tem o poder de manifestar sua vontade na realidade. O símbolo do infinito sobre sua cabeça mostra a conexão com o divino.

**II - A SACERDOTISA** 🌙
*Palavra-chave: INTUIR*
Guardiã dos mistérios do inconsciente. Sentada entre os pilares B (Boaz) e J (Jachin), representa o equilíbrio entre opostos. Ela é o portal para o conhecimento oculto.

**III - A IMPERATRIZ** 👑
*Palavra-chave: CRIAR*
A mãe universal, fertilidade e abundância. Representa a criação em todas as formas - artística, maternal, material. A natureza floresce ao seu redor.

**IV - O IMPERADOR** 🏛️
*Palavra-chave: CONTROLAR*
O pai universal, estrutura e autoridade. Estabelece ordem e regras. O trono com carneiros representa o signo de Áries - liderança e iniciativa.

**V - O HIEROFANTE** 📚
*Palavra-chave: DISCIPLINAR*
O professor espiritual, tradição e sabedoria estabelecida. Ensina as leis divinas e humanas. Os dois discípulos representam a transmissão de conhecimento.

**VI - OS ENAMORADOS** 💕
*Palavra-chave: ESCOLHER*
O livre-arbítrio e decisões importantes. O anjo abençoa a escolha consciente. Representa escolhas do coração, não apenas românticas, mas todas as decisões importantes da vida.

**VII - O CARRO** 🏆
*Palavra-chave: DIRECIONAR*
Vitória através do controle e determinação. As duas esfinges (uma branca, uma negra) representam forças opostas que devem ser equilibradas para avançar.`,
        pontosPrincipais: [
          'Primeiras 7 cartas = desenvolvimento da consciência',
          'Cada carta tem uma palavra-chave de ação',
          'Símbolos visuais carregam significados profundos',
          'Estas cartas formam a base da jornada'
        ],
        exercicio: 'Escolha uma dessas 7 cartas. Medite sobre ela por 5 minutos. Como esse arquétipo se manifesta em sua vida atual?'
      },
      {
        id: 'licao-2-2',
        titulo: 'Arcanos 8-14: Os Desafios',
        conteudo: `Esta fase representa os desafios internos e externos que nos transformam.

**VIII - A FORÇA** 🦁
*Palavra-chave: DOMINAR*
Não é força bruta, mas domínio suave. A mulher fecha a boca do leão com gentileza - representa o controle da natureza animal (instintos, ego) através da força espiritual.

**IX - O EREMITA** 🏔️
*Palavra-chave: PESQUISAR*
Retiro espiritual e sabedoria interior. A lanterna com a estrela ilumina o caminho do autoconhecimento. Solidão necessária para crescimento.

**X - A RODA DA FORTUNA** 🎡
*Palavra-chave: ALTERAR*
Os ciclos da vida. "O que sobe, desce". A esfinge no topo representa o destino. Mudanças inevitáveis que trazem oportunidades.

**XI - A JUSTIÇA** ⚖️
*Palavra-chave: AJUSTAR*
Lei de causa e efeito (Karma). Decisões importantes, contratos. A espada corta ilusões, a balança pesa ações. Verdade e responsabilidade.

**XII - O ENFORCADO** 🔄
*Palavra-chave: TRANSCENDER*
Sacrifício voluntário que traz iluminação. Nova perspectiva ao ver o mundo de cabeça para baixo. Suspensão necessária antes de transformação.

**XIII - A MORTE** 💀
*Palavra-chave: TRANSFORMAR*
Raramente representa morte física! É o fim de um ciclo para o início de outro. O sol nasce ao fundo - após a morte vem o renascimento.

**XIV - A TEMPERANÇA** 😇
*Palavra-chave: PERSEVERAR*
Equilíbrio e moderação. O anjo mistura as águas (consciente e inconsciente). Paciência e harmonia após a transformação.`,
        pontosPrincipais: [
          'Cartas 8-14 = enfrentar sombras e transformar',
          'A Morte é transformação, não fim',
          'Sacrifícios necessários trazem crescimento',
          'Equilíbrio surge após os desafios'
        ]
      },
      {
        id: 'licao-2-3',
        titulo: 'Arcanos 15-21: A Iluminação',
        conteudo: `A fase final: confronto com sombras e alcance da iluminação.

**XV - O DIABO** 😈
*Palavra-chave: LIBERTAR-SE*
Apegos, vícios, materialismo excessivo. As correntes são frouxas - podemos nos libertar quando quisermos. Ilusão de prisão.

**XVI - A TORRE** ⚡
*Palavra-chave: ROMPER*
Destruição necessária de estruturas falsas. O raio destrói ilusões. Parece catastrófico, mas liberta.

**XVII - A ESTRELA** ⭐
*Palavra-chave: ESPERAR*
Renovação e esperança após a Torre. A mulher derrama água (emoções) na terra e na água - conexão entre material e espiritual.

**XVIII - A LUA** 🌙
*Palavra-chave: INTUIR*
O inconsciente, medos, ilusões. O caminho entre as torres é incerto. Confiança na intuição durante a "noite escura da alma".

**XIX - O SOL** ☀️
*Palavra-chave: ILUMINAR*
Alegria, vitalidade, verdade revelada. A criança no cavalo representa inocência renovada. Sucesso e clareza.

**XX - O JULGAMENTO** 📯
*Palavra-chave: DESPERTAR*
Renascimento espiritual. O anjo toca a trombeta anunciando nova consciência. Libertação do passado.

**XXI - O MUNDO** 🌍
*Palavra-chave: COMPLETAR*
Conclusão da jornada. A figura dança na coroa de louros. Realização e harmonia. Fim de um ciclo e início de outro.`,
        pontosPrincipais: [
          'Cartas 15-21 = confronto com sombras e iluminação',
          'O Diabo mostra nossas prisões auto-impostas',
          'A Torre destrói para reconstruir melhor',
          'O Mundo é realização, mas também novo começo'
        ],
        exercicio: 'Reflexão: Em qual fase da Jornada do Louco você se encontra agora? Por quê?'
      }
    ]
  },
  {
    id: 'modulo-3',
    titulo: 'Os Arcanos Menores',
    descricao: 'Entenda como os 4 elementos se manifestam nas experiências diárias',
    duracao: '1h 30min',
    licoes: [
      {
        id: 'licao-3-1',
        titulo: 'Os 4 Elementos e Naipes',
        conteudo: `Os Arcanos Menores são o "palco" onde os Arcanos Maiores se expressam. Eles representam as experiências cotidianas filtradas pelos 4 elementos.

**🔥 PAUS (FOGO) - O Mundo do Espírito**
Estação: Primavera | Direção: Sul
*Temas:* Criatividade, paixão, carreira, iniciativa, energia, ambição

**Progressão das Cartas de Paus:**
- Ás: A centelha da inspiração
- 2: Decisões e escolhas
- 3: Vislumbrando ideais
- 4: Celebração e estabilidade
- 5: Competição e conflito
- 6: Vitória e reconhecimento
- 7: Defesa de posição
- 8: Movimento rápido
- 9: Resiliência e defesa
- 10: Peso da responsabilidade

**💧 COPAS (ÁGUA) - O Mundo das Emoções**
Estação: Verão | Direção: Leste
*Temas:* Amor, emoções, intuição, relacionamentos, felicidade

**Progressão das Cartas de Copas:**
- Ás: Amor puro e abundante
- 2: Parceria e união
- 3: Celebração e alegria
- 4: Apatia e tédio
- 5: Perda e tristeza
- 6: Nostalgia e memórias
- 7: Ilusões e fantasias
- 8: Abandono necessário
- 9: Realização de desejos
- 10: Felicidade familiar

**🌪️ ESPADAS (AR) - O Mundo do Intelecto**
Estação: Outono | Direção: Oeste
*Temas:* Pensamento, conflito, verdade, comunicação, desafios mentais

**Progressão das Cartas de Espadas:**
- Ás: Clareza mental e verdade
- 2: Decisão difícil
- 3: Mágoa e tristeza
- 4: Descanso e recuperação
- 5: Conflito e derrota
- 6: Transição e movimento
- 7: Estratégia questionável
- 8: Aprisionamento mental
- 9: Ansiedade e pesadelos
- 10: Fim de um ciclo doloroso

**🌍 OUROS (TERRA) - O Mundo Material**
Estação: Inverno | Direção: Norte
*Temas:* Dinheiro, trabalho, saúde, segurança, manifestação física

**Progressão das Cartas de Ouros:**
- Ás: Oportunidade material
- 2: Equilíbrio e malabarismo
- 3: Trabalho em equipe
- 4: Segurança e apego
- 5: Dificuldade financeira
- 6: Generosidade e compartilhar
- 7: Paciência e investimento
- 8: Aprendizado e dedicação
- 9: Abundância e autossuficiência
- 10: Riqueza e legado`,
        pontosPrincipais: [
          'Cada naipe representa um aspecto da vida',
          'Paus = Ação | Copas = Sentimento | Espadas = Pensamento | Ouros = Matéria',
          'Números progridem do 1 (início) ao 10 (conclusão)',
          'Entender os elementos facilita a leitura'
        ],
        exercicio: 'Qual elemento você mais se identifica? Qual você precisa desenvolver?'
      },
      {
        id: 'licao-3-2',
        titulo: 'As Figuras de Corte',
        conteudo: `As 16 Figuras de Corte representam pessoas, personalidades ou estados de ser.

**VALETES (Mensageiros da Terra)** 📬
Representam: Jovens, mensagens, novidades, oportunidades
- Valete de Paus: Notícias empolgantes, aventura
- Valete de Copas: Mensagem amorosa, sensibilidade
- Valete de Espadas: Notícia desafiadora, vigilância
- Valete de Ouros: Oportunidade material, estudo

**CAVALEIROS (Guerreiros do Ar)** 🐴
Representam: Ação, movimento, estados de espírito
- Cavaleiro de Paus: Entusiasmo impulsivo
- Cavaleiro de Copas: Romance e harmonia
- Cavaleiro de Espadas: Ação rápida e decisiva
- Cavaleiro de Ouros: Progresso lento e constante

**RAINHAS (Mestres da Água)** 👸
Representam: Aspectos femininos, nutrição, receptividade
- Rainha de Paus: Mulher confiante e carismática
- Rainha de Copas: Mulher intuitiva e compassiva
- Rainha de Espadas: Mulher inteligente e direta
- Rainha de Ouros: Mulher prática e abundante

**REIS (Mestres do Fogo)** 🤴
Representam: Aspectos masculinos, autoridade, domínio
- Rei de Paus: Líder visionário e empreendedor
- Rei de Copas: Líder emocional e diplomático
- Rei de Espadas: Líder intelectual e justo
- Rei de Ouros: Líder prático e bem-sucedido

**Como Interpretar Figuras de Corte:**

1. **Como Pessoas:** Podem representar pessoas reais em sua vida
2. **Como Aspectos Internos:** Partes de sua própria personalidade
3. **Como Situações:** Estados de ser ou atmosferas

*Dica:* Figuras de Corte olhando para a direita = futuro/ação. Olhando para a esquerda = passado/reflexão.`,
        pontosPrincipais: [
          'Figuras de Corte = pessoas, personalidades ou aspectos internos',
          'Valetes = mensagens | Cavaleiros = ação',
          'Rainhas = receptividade | Reis = autoridade',
          'Combinam elemento do naipe com energia da figura'
        ]
      }
    ]
  },
  {
    id: 'modulo-4',
    titulo: 'Leituras Práticas',
    descricao: 'Aprenda métodos de leitura e como interpretar combinações de cartas',
    duracao: '1 hora',
    licoes: [
      {
        id: 'licao-4-1',
        titulo: 'Preparação para Leitura',
        conteudo: `Antes de realizar uma leitura, é importante criar o ambiente e estado mental corretos.

**1. CONSAGRAÇÃO DO BARALHO**

*Ritual Completo:*
- **Norte:** Acenda uma vela (Fogo/Paus)
- **Leste:** Coloque incenso (Ar/Espadas)
- **Sul:** Posicione uma taça com água (Água/Copas)
- **Oeste:** Coloque um cristal ou moeda (Terra/Ouros)
- **Centro:** Coloque seu baralho sobre um pentagrama

*Invocação:*
"Honro os 4 elementos e seus anjos guardiões. Consagro este baralho como instrumento de sabedoria e autoconhecimento. Que seja sempre usado para o bem maior."

**2. LIMPEZA ENERGÉTICA**

*Métodos:*
- Passar fumaça de incenso ou sálvia
- Colocar cristal de quartzo sobre o baralho
- Deixar sob a lua cheia durante a noite
- Bater levemente o baralho para "descarregar"

**3. PREPARAÇÃO MENTAL**

*Antes de cada leitura:*
1. Respire profundamente 3 vezes
2. Centre-se no momento presente
3. Declare sua intenção claramente
4. Embaralhe com foco e respeito

**4. FORMULANDO PERGUNTAS**

*Perguntas Eficazes:*
✅ "Como posso melhorar minha carreira?"
✅ "O que preciso saber sobre esta situação?"
✅ "Que energia posso esperar este mês?"

*Evite:*
❌ "Ele vai me ligar?" (sim/não)
❌ "Quando vou casar?" (timing exato)
❌ "O que vai acontecer?" (remove livre-arbítrio)`,
        pontosPrincipais: [
          'Consagração cria conexão com o baralho',
          'Limpeza energética é importante regularmente',
          'Estado mental claro = leitura clara',
          'Perguntas abertas são mais produtivas'
        ],
        exercicio: 'Consagre seu baralho seguindo o ritual completo. Anote suas sensações durante o processo.'
      },
      {
        id: 'licao-4-2',
        titulo: 'Métodos de Tiragem',
        conteudo: `Diferentes métodos de leitura servem a diferentes propósitos.

**TIRAGEM DE UMA CARTA** 📇
*Uso:* Orientação diária, resposta rápida
*Como fazer:* 
1. Formule pergunta
2. Embaralhe focado
3. Retire uma carta
4. Reflita sobre seu significado

**TIRAGEM DE TRÊS CARTAS** 📇📇📇
*Variações:*
- Passado / Presente / Futuro
- Situação / Ação / Resultado
- Você / Outra Pessoa / Relacionamento
- Mente / Corpo / Espírito

**CRUZ CÉLTICA** ✨ (Mais Complexa)
10 cartas revelando situação completa:
1. Situação Atual
2. Desafio/Obstáculo
3. Fundação/Causa Raiz
4. Passado Recente
5. Melhor Resultado Possível
6. Futuro Próximo
7. Você (atitude atual)
8. Ambiente/Outros
9. Esperanças/Medos
10. Resultado Final

**TIRAGEM DO ZODÍACO** 🔮
12 cartas em círculo - uma para cada área da vida (casas astrológicas)

**DICAS DE INTERPRETAÇÃO:**

1. **Observe as Cartas Predominantes:**
   - Muitos Arcanos Maiores = situação kármica importante
   - Muitos Paus = questões de carreira/ação
   - Muitas Copas = questões emocionais
   - Muitas Espadas = questões mentais/conflitos
   - Muitos Ouros = questões materiais

2. **Note os Números Repetidos:**
   - Vários Ases = novos começos
   - Vários 5s = mudanças e desafios
   - Vários 10s = conclusões

3. **Observe Cartas Invertidas:**
   - Energia bloqueada ou internalizada
   - Aspecto sombra do significado
   - Lição ainda não aprendida`,
        pontosPrincipais: [
          'Comece com tiragens simples',
          'Escolha o método adequado à pergunta',
          'Observe padrões nas cartas',
          'Confie em sua intuição'
        ],
        exercicio: 'Faça uma tiragem de 3 cartas (Passado-Presente-Futuro) sobre algo atual em sua vida. Anote sua interpretação.'
      },
      {
        id: 'licao-4-3',
        titulo: 'Desenvolvendo sua Intuição',
        conteudo: `O Tarot é uma ferramenta, mas sua intuição é a verdadeira guia.

**EXERCÍCIOS DIÁRIOS:**

**1. Carta do Dia (5 minutos)**
- Manhã: Tire uma carta
- Pergunta: "O que preciso saber hoje?"
- Carregue a carta mentalmente o dia todo
- Noite: Reflita sobre como ela se manifestou

**2. Meditação com Cartas (10 minutos)**
- Escolha uma carta
- Observe cada detalhe visual
- Feche os olhos e visualize-a
- Pergunte: "O que você quer me ensinar?"
- Anote insights recebidos

**3. Diário de Tarot** 📔
*Registre:*
- Data e pergunta
- Cartas tiradas e posições
- Primeira impressão/intuição
- Significados tradicionais
- Como se manifestou na realidade
- Aprendizados

**DESENVOLVENDO SENSIBILIDADE:**

*Técnica do "Sentir Antes de Ver":*
1. Embaralhe as cartas
2. Passe a mão sobre elas sem olhar
3. "Sinta" qual carta "chama" você
4. Retire e observe
5. Sua primeira impressão estava correta?

*Exercício de Associação Livre:*
1. Olhe uma carta por 30 segundos
2. Feche os olhos
3. Fale tudo que vem à mente
4. Sem julgar, apenas observe

**COMBINAÇÕES DE CARTAS:**

*Cartas se Fortalecem:*
- O Sol + Qualquer Ás = Excelente começo
- A Estrela + Copas = Cura emocional
- O Mago + Qualquer Rei = Poder de liderança

*Cartas Alertam:*
- 5 de Espadas + O Diabo = Conflito por apego
- 7 de Espadas + A Lua = Engano/ilusão
- 10 de Espadas + A Torre = Fim doloroso mas libertador

**MENSAGEM FINAL:**

O Tarot não prevê um futuro fixo. Ele ilumina o caminho atual e mostra possibilidades. Você sempre tem livre-arbítrio para mudar direção.

Use o Tarot como:
✨ Ferramenta de autoconhecimento
✨ Espelho da psique
✨ Guia para decisões conscientes
✨ Conexão com sua sabedoria interior

Lembre-se: Você é o mago de sua própria vida. O Tarot apenas reflete o que já está dentro de você.`,
        pontosPrincipais: [
          'Prática diária desenvolve intuição',
          'Diário de Tarot aprofunda aprendizado',
          'Combinações de cartas criam narrativas',
          'Você sempre tem livre-arbítrio'
        ],
        exercicio: 'Comprometa-se com a "Carta do Dia" por 30 dias. Observe como sua intuição se desenvolve.'
      }
    ]
  }
];

// Recursos adicionais
export const recursosExtras = {
  dicas: [
    'Nunca leia Tarot quando estiver emocionalmente perturbado',
    'Respeite o baralho - ele é um instrumento sagrado',
    'Não faça a mesma pergunta repetidamente esperando resposta diferente',
    'Tarot mostra tendências, não destinos imutáveis',
    'Aprenda os significados tradicionais, mas confie em sua intuição',
    'Pratique com você mesmo antes de ler para outros',
    'Mantenha um diário de suas leituras',
    'Estude simbolismo, numerologia e astrologia para aprofundar'
  ],
  
  simbolosImportantes: {
    'Infinito (∞)': 'Poder divino, eternidade, ciclos',
    'Pentagrama': 'Os 5 elementos (4 + espírito)',
    'Coroa': 'Poder espiritual, realização',
    'Água': 'Emoções, inconsciente',
    'Montanhas': 'Desafios, obstáculos a superar',
    'Flores': 'Crescimento, beleza, vida',
    'Estrelas': 'Esperança, orientação divina',
    'Lua': 'Inconsciente, mistério, intuição',
    'Sol': 'Consciência, vida, verdade',
    'Colunas': 'Dualidade, equilíbrio',
    'Véu': 'Mistérios não revelados',
    'Raio': 'Iluminação súbita, destruição divina'
  },
  
  correspondenciasAstrologicas: {
    'Áries': 'O Imperador',
    'Touro': 'O Hierofante',
    'Gêmeos': 'Os Enamorados',
    'Câncer': 'O Carro',
    'Leão': 'A Força',
    'Virgem': 'O Eremita',
    'Libra': 'A Justiça',
    'Escorpião': 'A Morte',
    'Sagitário': 'A Temperança',
    'Capricórnio': 'O Diabo',
    'Aquário': 'A Estrela',
    'Peixes': 'A Lua'
  }
};
