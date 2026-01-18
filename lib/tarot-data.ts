
// Dados enriquecidos das 78 cartas do Tarot baseados em análise profunda
export interface TarotCard {
  id: string;
  name: string;
  arcana: 'maior' | 'menor';
  suit?: 'paus' | 'copas' | 'espadas' | 'ouros';
  number?: number;
  element?: 'fogo' | 'agua' | 'ar' | 'terra';
  keywords: string[];
  upright: {
    general: string;
    love: string;
    career: string;
    spiritual: string;
  };
  reversed: {
    general: string;
    love: string;
    career: string;
    spiritual: string;
  };
  symbolism: string;
  deepMeaning: string;
  imageUrl: string;
}

// Arcanos Maiores
export const majorArcana: TarotCard[] = [
  {
    id: '0-fool',
    name: 'O Louco',
    arcana: 'maior',
    number: 0,
    keywords: ['Novos começos', 'Inocência', 'Espontaneidade', 'Salto de fé'],
    upright: {
      general: 'Novos começos, aventura, potencial ilimitado. O Louco representa a coragem de embarcar em uma nova jornada sem medo.',
      love: 'Novo romance emocionante, paixão espontânea, aventura amorosa.',
      career: 'Nova oportunidade de trabalho, mudança de carreira, empreendedorismo.',
      spiritual: 'Despertar espiritual, confiança no universo, jornada de autodescoberta.'
    },
    reversed: {
      general: 'Imprudência, decisões precipitadas, irracionalidade, medo de mudanças.',
      love: 'Relação instável, falta de compromisso, imaturidade emocional.',
      career: 'Projetos mal planejados, risco financeiro desnecessário.',
      spiritual: 'Confusão espiritual, resistência ao crescimento.'
    },
    symbolism: 'O Louco dança à beira do precipício, simbolizando o salto para o desconhecido. O cão branco representa lealdade e proteção.',
    deepMeaning: 'O Louco é o espírito em busca de experiência. Representa a potencialidade infinita antes que qualquer forma definida seja tomada. É o número 0, contendo todos os números em si.',
    imageUrl: 'https://cdn.abacus.ai/images/d9490f23-bef7-4c4f-ad18-cd82dde7fa0d.png'
  },
  {
    id: '1-magician',
    name: 'O Mago',
    arcana: 'maior',
    number: 1,
    keywords: ['Manifestação', 'Poder pessoal', 'Ação', 'Criatividade'],
    upright: {
      general: 'Poder de manifestar seus desejos, originalidade, iniciativa, habilidade e diplomacia.',
      love: 'Atração magnética, comunicação clara, início de relacionamento promissor.',
      career: 'Habilidades sendo reconhecidas, sucesso em negociações, início de projetos.',
      spiritual: 'Conexão entre céu e terra, canalização de energia divina.'
    },
    reversed: {
      general: 'Manipulação, engano, falta de escrúpulos, indecisão.',
      love: 'Manipulação emocional, falsas promessas.',
      career: 'Abuso de poder, falta de ética nos negócios.',
      spiritual: 'Desconexão espiritual, ego inflado.'
    },
    symbolism: 'O Mago ergue a varinha para o céu com uma mão e aponta para a terra com a outra, simbolizando "Como acima, assim abaixo".',
    deepMeaning: 'O Mago representa a vontade humana e o poder de transformar pensamento em realidade. É a primeira manifestação da energia pura em ação consciente.',
    imageUrl: 'https://cdn.abacus.ai/images/80ea978b-693a-439c-99f9-d782d0f9ad47.png'
  },
  {
    id: '2-high-priestess',
    name: 'A Sacerdotisa',
    arcana: 'maior',
    number: 2,
    keywords: ['Intuição', 'Mistério', 'Sabedoria interior', 'Dualidade'],
    upright: {
      general: 'Sabedoria intuitiva, segredos a serem revelados, paciência e silêncio.',
      love: 'Conexão profunda e espiritual, mistérios do amor.',
      career: 'Confie em sua intuição, momentos de reflexão antes de agir.',
      spiritual: 'Acesso ao conhecimento oculto, meditação profunda.'
    },
    reversed: {
      general: 'Segredos revelados de forma prejudicial, ignorar a intuição.',
      love: 'Falta de comunicação, segredos no relacionamento.',
      career: 'Informações ocultas que precisam vir à tona.',
      spiritual: 'Bloqueio da intuição, negação da sabedoria interior.'
    },
    symbolism: 'Sentada entre dois pilares (B e J), representa a dualidade e o equilíbrio. A lua aos seus pés simboliza o subconsciente.',
    deepMeaning: 'A Sacerdotisa guarda os mistérios do inconsciente. Ela é o portal entre o consciente e o subconsciente, entre o visível e o oculto.',
    imageUrl: 'https://cdn.abacus.ai/images/5bc632ab-b0a0-48c6-849a-d7e6f3a65131.png'
  },
  {
    id: '3-empress',
    name: 'A Imperatriz',
    arcana: 'maior',
    number: 3,
    keywords: ['Abundância', 'Natureza', 'Fertilidade', 'Criação'],
    upright: {
      general: 'Abundância, fertilidade, natureza, sensualidade, criação artística.',
      love: 'Amor abundante, gravidez, relação fértil e nutritiva.',
      career: 'Crescimento financeiro, projetos criativos florescendo.',
      spiritual: 'Conexão com a Mãe Terra, energia feminina divina.'
    },
    reversed: {
      general: 'Bloqueios criativos, dependência dos outros, negligência.',
      love: 'Sufocamento no relacionamento, ciúmes excessivos.',
      career: 'Falta de crescimento, projetos estagnados.',
      spiritual: 'Desconexão com a natureza e feminino sagrado.'
    },
    symbolism: 'Rodeada pela natureza exuberante, representa a mãe natureza e a abundância da Terra.',
    deepMeaning: 'A Imperatriz representa a alma glorificada na natureza. Ela é a manifestação da energia criativa feminina em sua plenitude.',
    imageUrl: 'https://cdn.abacus.ai/images/1329a9a8-a7df-43a2-8177-342a772b2297.png'
  },
  {
    id: '4-emperor',
    name: 'O Imperador',
    arcana: 'maior',
    number: 4,
    keywords: ['Autoridade', 'Estrutura', 'Controle', 'Estabilidade'],
    upright: {
      general: 'Autoridade, estrutura, controle, estabilidade, proteção, pai arquetípico.',
      love: 'Compromisso sólido, proteção, relação estável.',
      career: 'Liderança, promoção, estabelecimento de autoridade.',
      spiritual: 'Disciplina espiritual, estrutura em práticas.'
    },
    reversed: {
      general: 'Tirania, rigidez excessiva, falta de disciplina.',
      love: 'Controle excessivo, falta de afeto.',
      career: 'Abuso de autoridade, ambiente de trabalho rígido.',
      spiritual: 'Dogmatismo, falta de flexibilidade espiritual.'
    },
    symbolism: 'Sentado em trono de pedra, representa poder terrenal e autoridade estabelecida.',
    deepMeaning: 'O Imperador simboliza o domínio de si mesmo e do mundo material. Representa a organização e a civilização construída pela vontade humana.',
    imageUrl: 'https://cdn.abacus.ai/images/126fb25b-53bd-4323-9289-1be648213825.png'
  },
  {
    id: '5-hierophant',
    name: 'O Hierofante',
    arcana: 'maior',
    number: 5,
    keywords: ['Tradição', 'Educação', 'Conformidade', 'Instituições'],
    upright: {
      general: 'Tradição, educação formal, conformidade, busca de conselhos sábios.',
      love: 'Casamento tradicional, compromisso formal, aprovação familiar.',
      career: 'Mentoria, educação formal, seguir regras estabelecidas.',
      spiritual: 'Ensinamentos espirituais tradicionais, rituais sagrados.'
    },
    reversed: {
      general: 'Rebelião contra tradições, dogmatismo, rigidez mental.',
      love: 'Relacionamento não convencional, rejeição de normas.',
      career: 'Questionar autoridade, buscar métodos alternativos.',
      spiritual: 'Busca espiritual fora de religiões organizadas.'
    },
    symbolism: 'Como professor espiritual, abençoa dois discípulos, representando a transmissão de conhecimento sagrado.',
    deepMeaning: 'O Hierofante é a ponte entre o divino e o humano, o professor que transmite sabedoria através das gerações.',
    imageUrl: 'https://cdn.abacus.ai/images/21939ff3-1030-4e85-a038-db832ee10eb6.png'
  },
  {
    id: '6-lovers',
    name: 'Os Enamorados',
    arcana: 'maior',
    number: 6,
    keywords: ['Escolha', 'Amor', 'União', 'Valores'],
    upright: {
      general: 'Escolhas importantes, amor verdadeiro, união de opostos, harmonia.',
      love: 'Amor profundo e verdadeiro, decisão sobre relacionamento.',
      career: 'Parceria de negócios bem-sucedida, escolha de carreira.',
      spiritual: 'Integração de aspectos internos, escolha do caminho espiritual.'
    },
    reversed: {
      general: 'Desalinhamento de valores, decisões mal tomadas, conflito interno.',
      love: 'Infidelidade, desequilíbrio no relacionamento, tentação.',
      career: 'Parceria problemática, conflitos profissionais.',
      spiritual: 'Conflito entre ego e alma, falta de alinhamento.'
    },
    symbolism: 'Adão e Eva sob o anjo, representando a escolha entre o material e o espiritual, o consciente e o inconsciente.',
    deepMeaning: 'Os Enamorados representam a necessidade de fazer escolhas que alinhem nossos valores internos com ações externas.',
    imageUrl: 'https://cdn.abacus.ai/images/66790bd3-6f9a-42af-aebb-1c92a1a1efd1.png'
  },
  {
    id: '7-chariot',
    name: 'O Carro',
    arcana: 'maior',
    number: 7,
    keywords: ['Vitória', 'Determinação', 'Controle', 'Progresso'],
    upright: {
      general: 'Vitória através de determinação, controle, progresso, superação de obstáculos.',
      love: 'Superação de desafios no relacionamento, compromisso vitorioso.',
      career: 'Sucesso através de foco e determinação, promoção.',
      spiritual: 'Domínio sobre forças internas, disciplina espiritual.'
    },
    reversed: {
      general: 'Perda de controle, falta de direção, energia dispersa.',
      love: 'Relação sem direção, falta de comprometimento.',
      career: 'Projetos fora de controle, falta de foco.',
      spiritual: 'Desequilíbrio interno, falta de disciplina.'
    },
    symbolism: 'O guerreiro no carro puxado por esfinges branca e preta representa o controle sobre forças opostas.',
    deepMeaning: 'O Carro simboliza a vitória da vontade humana sobre as contradições da vida através do autodomínio.',
    imageUrl: 'https://cdn.abacus.ai/images/51776645-b386-4b79-b779-5c9adf84cfd2.png'
  },
  {
    id: '8-strength',
    name: 'A Força',
    arcana: 'maior',
    number: 8,
    keywords: ['Coragem', 'Paciência', 'Compaixão', 'Força interior'],
    upright: {
      general: 'Força interior, coragem, paciência, compaixão, controle suave.',
      love: 'Amor paciente e compassivo, força no relacionamento.',
      career: 'Liderança gentil, resolução pacífica de conflitos.',
      spiritual: 'Domínio das paixões, força espiritual.'
    },
    reversed: {
      general: 'Fraqueza, dúvida, falta de autocontrole, agressão.',
      love: 'Insegurança no relacionamento, ciúmes.',
      career: 'Falta de confiança, abuso de poder.',
      spiritual: 'Dominado por desejos, falta de autocontrole.'
    },
    symbolism: 'A mulher domestica o leão com gentileza, não com força bruta, mostrando que a verdadeira força é interior.',
    deepMeaning: 'A Força representa a sublimação das paixões e instintos através da compaixão e paciência, não da repressão.',
    imageUrl: 'https://cdn.abacus.ai/images/ffc62ad4-0398-43f1-b16a-42bd66d5282a.png'
  },
  {
    id: '9-hermit',
    name: 'O Eremita',
    arcana: 'maior',
    number: 9,
    keywords: ['Introspecção', 'Busca interior', 'Solidão', 'Sabedoria'],
    upright: {
      general: 'Busca interior, introspecção, solidão consciente, sabedoria profunda.',
      love: 'Tempo sozinho para refletir sobre o amor, autossuficiência.',
      career: 'Momento para reflexão antes de agir, mentoria.',
      spiritual: 'Jornada espiritual interior, iluminação através da solidão.'
    },
    reversed: {
      general: 'Isolamento excessivo, recusa de ajuda, solidão não saudável.',
      love: 'Medo de intimidade, isolamento emocional.',
      career: 'Recusa de colaboração, trabalhar sozinho em excesso.',
      spiritual: 'Evitar o mundo em vez de buscar verdade interior.'
    },
    symbolism: 'O ancião com lanterna no topo da montanha representa a luz da sabedoria conquistada através da jornada interior.',
    deepMeaning: 'O Eremita simboliza a necessidade de se afastar do mundo exterior para encontrar verdades profundas dentro de si.',
    imageUrl: 'https://cdn.abacus.ai/images/63c0949f-5d15-4615-8707-24ce8f31c408.png'
  }
];

// Naipes dos Arcanos Menores
export const suitElements = {
  paus: {
    element: 'fogo' as const,
    keywords: ['Intuição', 'Criatividade', 'Paixão', 'Carreira', 'Espírito'],
    description: 'Representam o fogo, a intuição, o espírito e a força criativa. Relacionado à carreira, inspiração e paixão pela vida.'
  },
  copas: {
    element: 'agua' as const,
    keywords: ['Emoções', 'Amor', 'Relacionamentos', 'Intuição', 'Subconsciente'],
    description: 'Representam a água, as emoções, o coração e os relacionamentos. Conectado aos sonhos, memórias e o mundo dos sentimentos.'
  },
  espadas: {
    element: 'ar' as const,
    keywords: ['Pensamento', 'Intelecto', 'Conflito', 'Comunicação', 'Verdade'],
    description: 'Representam o ar, o pensamento, o intelecto e a comunicação. Relacionado a desafios mentais, conflitos e busca pela verdade.'
  },
  ouros: {
    element: 'terra' as const,
    keywords: ['Material', 'Finanças', 'Trabalho', 'Segurança', 'Físico'],
    description: 'Representam a terra, o mundo material, finanças e segurança. Conectado ao trabalho, dinheiro e tudo que é tangível.'
  }
};

// Spreads (métodos de leitura)
export interface SpreadPosition {
  position: number;
  name: string;
  description: string;
}

export interface TarotSpread {
  id: string;
  name: string;
  description: string;
  cardCount: number;
  positions: SpreadPosition[];
  difficulty: 'iniciante' | 'intermediário' | 'avançado';
}

export const tarotSpreads: TarotSpread[] = [
  {
    id: 'three-card',
    name: 'Leitura de 3 Cartas',
    description: 'Método simples e direto para obter clareza sobre passado, presente e futuro.',
    cardCount: 3,
    difficulty: 'iniciante',
    positions: [
      { position: 1, name: 'Passado', description: 'Influências e eventos que te trouxeram até aqui' },
      { position: 2, name: 'Presente', description: 'Situação atual e energias em jogo agora' },
      { position: 3, name: 'Futuro', description: 'Resultado provável se continuar no caminho atual' }
    ]
  },
  {
    id: 'celtic-cross',
    name: 'Cruz Céltica',
    description: 'Um dos métodos mais antigos e populares, oferece visão profunda sobre qualquer situação.',
    cardCount: 10,
    difficulty: 'intermediário',
    positions: [
      { position: 1, name: 'Situação Atual', description: 'O que está acontecendo agora' },
      { position: 2, name: 'Desafio/Obstáculo', description: 'O que está cruzando seu caminho' },
      { position: 3, name: 'Base/Passado', description: 'Fundação da situação' },
      { position: 4, name: 'Passado Recente', description: 'O que está ficando para trás' },
      { position: 5, name: 'Melhor Resultado', description: 'O que você pode alcançar' },
      { position: 6, name: 'Futuro Próximo', description: 'O que está por vir' },
      { position: 7, name: 'Você', description: 'Sua atitude e posição' },
      { position: 8, name: 'Ambiente Externo', description: 'Influências ao seu redor' },
      { position: 9, name: 'Esperanças/Medos', description: 'Suas expectativas internas' },
      { position: 10, name: 'Resultado Final', description: 'Desfecho provável' }
    ]
  },
  {
    id: 'relationship',
    name: 'Leitura de Relacionamento',
    description: 'Explore a dinâmica entre duas pessoas e o potencial da relação.',
    cardCount: 7,
    difficulty: 'intermediário',
    positions: [
      { position: 1, name: 'Você', description: 'Sua energia e posição na relação' },
      { position: 2, name: 'Outra Pessoa', description: 'Energia e posição da outra pessoa' },
      { position: 3, name: 'Conexão', description: 'A ligação entre vocês' },
      { position: 4, name: 'Desafios', description: 'Obstáculos que enfrentam' },
      { position: 5, name: 'Forças', description: 'Pontos positivos da relação' },
      { position: 6, name: 'Conselho', description: 'Orientação para fortalecer a relação' },
      { position: 7, name: 'Potencial', description: 'Para onde a relação pode ir' }
    ]
  },
  {
    id: 'horseshoe',
    name: 'Ferradura',
    description: 'Método em forma de ferradura para questões específicas e orientação clara.',
    cardCount: 7,
    difficulty: 'iniciante',
    positions: [
      { position: 1, name: 'Passado', description: 'Influências passadas' },
      { position: 2, name: 'Presente', description: 'Situação atual' },
      { position: 3, name: 'Futuro', description: 'O que está por vir' },
      { position: 4, name: 'Você', description: 'Sua atitude' },
      { position: 5, name: 'Outros', description: 'Influência externa' },
      { position: 6, name: 'Obstáculos', description: 'O que precisa ser superado' },
      { position: 7, name: 'Resultado', description: 'Desfecho provável' }
    ]
  },
  {
    id: 'year-ahead',
    name: 'O Ano à Frente',
    description: 'Visão panorâmica dos próximos 12 meses, uma carta para cada mês.',
    cardCount: 13,
    difficulty: 'avançado',
    positions: [
      { position: 1, name: 'Energia do Ano', description: 'Tema geral dos próximos 12 meses' },
      { position: 2, name: 'Mês 1', description: 'Energias e eventos do primeiro mês' },
      { position: 3, name: 'Mês 2', description: 'Energias e eventos do segundo mês' },
      { position: 4, name: 'Mês 3', description: 'Energias e eventos do terceiro mês' },
      { position: 5, name: 'Mês 4', description: 'Energias e eventos do quarto mês' },
      { position: 6, name: 'Mês 5', description: 'Energias e eventos do quinto mês' },
      { position: 7, name: 'Mês 6', description: 'Energias e eventos do sexto mês' },
      { position: 8, name: 'Mês 7', description: 'Energias e eventos do sétimo mês' },
      { position: 9, name: 'Mês 8', description: 'Energias e eventos do oitavo mês' },
      { position: 10, name: 'Mês 9', description: 'Energias e eventos do nono mês' },
      { position: 11, name: 'Mês 10', description: 'Energias e eventos do décimo mês' },
      { position: 12, name: 'Mês 11', description: 'Energias e eventos do décimo primeiro mês' },
      { position: 13, name: 'Mês 12', description: 'Energias e eventos do décimo segundo mês' }
    ]
  }
];
