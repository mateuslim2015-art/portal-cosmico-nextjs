'use client';

import { motion } from 'framer-motion';

interface Position {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
  rotation?: number;
}

interface ReadingSpreadProps {
  type: 'THREE_CARDS' | 'CELTIC_CROSS' | 'YES_NO' | 'MANDALA';
  cards: any[];
  onCardClick?: (card: any, position: Position) => void;
}

const SPREAD_LAYOUTS: Record<string, Position[]> = {
  THREE_CARDS: [
    {
      id: 'past',
      name: 'Passado',
      description: 'O que te trouxe até aqui',
      x: 0,
      y: 0,
    },
    {
      id: 'present',
      name: 'Presente',
      description: 'Sua situação atual',
      x: 180,
      y: 0,
    },
    {
      id: 'future',
      name: 'Futuro',
      description: 'O que está por vir',
      x: 360,
      y: 0,
    },
  ],
  CELTIC_CROSS: [
    {
      id: 'present',
      name: 'Presente',
      description: 'Situação atual',
      x: 180,
      y: 120,
    },
    {
      id: 'challenge',
      name: 'Desafio',
      description: 'O que te desafia',
      x: 180,
      y: 120,
      rotation: 90,
    },
    {
      id: 'past',
      name: 'Passado',
      description: 'Influências passadas',
      x: 60,
      y: 120,
    },
    {
      id: 'future',
      name: 'Futuro',
      description: 'Futuro próximo',
      x: 300,
      y: 120,
    },
    {
      id: 'above',
      name: 'Acima',
      description: 'Objetivo consciente',
      x: 180,
      y: 0,
    },
    {
      id: 'below',
      name: 'Abaixo',
      description: 'Base inconsciente',
      x: 180,
      y: 240,
    },
    {
      id: 'advice',
      name: 'Conselho',
      description: 'O que fazer',
      x: 450,
      y: 240,
    },
    {
      id: 'external',
      name: 'Externo',
      description: 'Influências externas',
      x: 450,
      y: 160,
    },
    {
      id: 'hopes',
      name: 'Esperanças',
      description: 'Seus medos e esperanças',
      x: 450,
      y: 80,
    },
    {
      id: 'outcome',
      name: 'Resultado',
      description: 'Resultado final',
      x: 450,
      y: 0,
    },
  ],
  YES_NO: [
    {
      id: 'answer',
      name: 'Resposta',
      description: 'A resposta para sua pergunta',
      x: 180,
      y: 0,
    },
  ],
  MANDALA: [
    // Center
    {
      id: 'center',
      name: 'Centro',
      description: 'Você no momento presente',
      x: 180,
      y: 120,
    },
    // Circle positions
    {
      id: 'pos1',
      name: 'Personalidade',
      description: 'Como você se apresenta',
      x: 180,
      y: 0,
    },
    {
      id: 'pos2',
      name: 'Recursos',
      description: 'Seus recursos materiais',
      x: 300,
      y: 40,
    },
    {
      id: 'pos3',
      name: 'Comunicação',
      description: 'Como você se expressa',
      x: 340,
      y: 120,
    },
    {
      id: 'pos4',
      name: 'Lar',
      description: 'Sua base emocional',
      x: 300,
      y: 200,
    },
    {
      id: 'pos5',
      name: 'Criatividade',
      description: 'Sua expressão criativa',
      x: 180,
      y: 240,
    },
    {
      id: 'pos6',
      name: 'Trabalho',
      description: 'Sua rotina e saúde',
      x: 60,
      y: 200,
    },
    {
      id: 'pos7',
      name: 'Relacionamentos',
      description: 'Suas parcerias',
      x: 20,
      y: 120,
    },
    {
      id: 'pos8',
      name: 'Transformação',
      description: 'Mudanças profundas',
      x: 60,
      y: 40,
    },
  ],
};

export default function ReadingSpread({
  type,
  cards,
  onCardClick,
}: ReadingSpreadProps) {
  const positions = SPREAD_LAYOUTS[type] || SPREAD_LAYOUTS.THREE_CARDS;

  return (
    <div className="relative w-full min-h-[400px] flex items-center justify-center py-8">
      <div className="relative" style={{ width: '600px', height: '300px' }}>
        {positions.map((position, index) => {
          const card = cards[index];

          return (
            <motion.div
              key={position.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className="absolute"
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: `translate(-50%, -50%) rotate(${position.rotation || 0}deg)`,
              }}
            >
              {/* Position Label */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                <p className="text-xs font-semibold text-purple-400">
                  {position.name}
                </p>
              </div>

              {/* Card */}
              <button
                onClick={() => card && onCardClick?.(card, position)}
                className="group relative"
                disabled={!card}
              >
                <div className="w-24 h-36 bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-lg border-2 border-purple-500/50 flex items-center justify-center group-hover:border-purple-400 group-hover:scale-105 transition-all">
                  {card ? (
                    <div className="text-center p-2">
                      <div className="text-3xl mb-1">🃏</div>
                      <p className="text-xs text-gray-300 leading-tight">
                        {card.name}
                      </p>
                    </div>
                  ) : (
                    <div className="text-gray-600 text-4xl">?</div>
                  )}
                </div>

                {/* Tooltip */}
                {card && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap border border-purple-500/30">
                      {position.description}
                    </div>
                  </div>
                )}
              </button>

              {/* Position Number */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {index + 1}
              </div>
            </motion.div>
          );
        })}

        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-3xl blur-3xl -z-10" />
      </div>
    </div>
  );
}
