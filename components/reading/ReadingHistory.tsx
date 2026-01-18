'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Eye, ChevronDown, ChevronUp } from 'lucide-react';

interface Reading {
  id: string;
  question: string | null;
  spreadType: string;
  interpretation: string;
  createdAt: string;
  cards: any[];
}

interface ReadingHistoryProps {
  readings: Reading[];
}

const SPREAD_NAMES: Record<string, string> = {
  THREE_CARDS: 'Três Cartas',
  CELTIC_CROSS: 'Cruz Celta',
  YES_NO: 'Sim ou Não',
  MANDALA: 'Mandala Astrológica',
  'three-card': 'Três Cartas',
  'celtic-cross': 'Cruz Celta',
  single: 'Carta Única',
};

export default function ReadingHistory({ readings }: ReadingHistoryProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (readings.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔮</div>
        <h3 className="text-xl font-semibold text-white mb-2">
          Nenhuma leitura ainda
        </h3>
        <p className="text-gray-400">
          Faça sua primeira consulta e ela aparecerá aqui
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {readings.map((reading, index) => {
        const isExpanded = expandedId === reading.id;

        return (
          <motion.div
            key={reading.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700 overflow-hidden"
          >
            {/* Header */}
            <button
              onClick={() => toggleExpand(reading.id)}
              className="w-full p-6 text-left hover:bg-gray-800/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Question */}
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {reading.question || 'Consulta Geral'}
                  </h3>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(reading.createdAt)}
                    </span>
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-semibold">
                      {SPREAD_NAMES[reading.spreadType] || reading.spreadType}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {reading.cards?.length || 0} cartas
                    </span>
                  </div>
                </div>

                {/* Expand Icon */}
                <div className="flex-shrink-0">
                  {isExpanded ? (
                    <ChevronUp className="w-6 h-6 text-purple-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </div>
              </div>
            </button>

            {/* Expanded Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-700"
                >
                  <div className="p-6 space-y-6">
                    {/* Cards */}
                    {reading.cards && reading.cards.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-purple-400 mb-3">
                          CARTAS SELECIONADAS
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {reading.cards.map((cardId, idx) => (
                            <div
                              key={idx}
                              className="w-20 h-28 bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-lg border border-purple-500/30 flex items-center justify-center"
                            >
                              <div className="text-center">
                                <div className="text-3xl mb-1">🃏</div>
                                <p className="text-xs text-gray-400">
                                  #{idx + 1}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Interpretation */}
                    <div>
                      <h4 className="text-sm font-semibold text-blue-400 mb-3">
                        INTERPRETAÇÃO
                      </h4>
                      <div className="prose prose-invert prose-purple max-w-none">
                        <div className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                          {reading.interpretation}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
