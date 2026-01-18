'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ChevronRight, GripVertical } from 'lucide-react';

interface Card {
  id: string;
  name: string;
  imageUrl?: string;
}

interface IdentificationExerciseProps {
  question: string;
  cards: Card[];
  correctCardId: string;
  explanation?: string;
  onComplete: (correct: boolean) => void;
}

export default function IdentificationExercise({
  question,
  cards,
  correctCardId,
  explanation,
  onComplete,
}: IdentificationExerciseProps) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelectCard = (cardId: string) => {
    if (showResult) return;
    setSelectedCard(cardId);
  };

  const handleSubmit = () => {
    if (!selectedCard) return;

    const correct = selectedCard === correctCardId;
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleContinue = () => {
    onComplete(isCorrect);
  };

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-6 border border-purple-500/30">
        <h3 className="text-xl font-semibold text-white mb-2">
          Identifique a Carta
        </h3>
        <p className="text-gray-200 text-lg">{question}</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const isSelected = selectedCard === card.id;
          const isCorrectCard = card.id === correctCardId;
          const showCorrect = showResult && isCorrectCard;
          const showIncorrect = showResult && isSelected && !isCorrectCard;

          return (
            <motion.button
              key={card.id}
              onClick={() => handleSelectCard(card.id)}
              disabled={showResult}
              className={`
                relative group rounded-xl overflow-hidden border-2 transition-all
                ${
                  showCorrect
                    ? 'border-green-500 ring-4 ring-green-500/30'
                    : showIncorrect
                    ? 'border-red-500 ring-4 ring-red-500/30'
                    : isSelected
                    ? 'border-purple-500 ring-4 ring-purple-500/30'
                    : 'border-gray-700 hover:border-purple-500/50'
                }
                ${showResult ? 'cursor-default' : 'cursor-pointer'}
              `}
              whileHover={!showResult ? { scale: 1.05 } : {}}
              whileTap={!showResult ? { scale: 0.95 } : {}}
            >
              {/* Card Image/Placeholder */}
              <div className="aspect-[2/3] bg-gradient-to-br from-purple-900/50 to-blue-900/50 flex items-center justify-center">
                {card.imageUrl ? (
                  <img
                    src={card.imageUrl}
                    alt={card.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-4">
                    <div className="text-6xl mb-2">🃏</div>
                    <p className="text-gray-400 text-sm font-medium">
                      {card.name}
                    </p>
                  </div>
                )}
              </div>

              {/* Card Name */}
              <div
                className={`
                p-3 text-center font-semibold
                ${
                  showCorrect
                    ? 'bg-green-500/20 text-green-400'
                    : showIncorrect
                    ? 'bg-red-500/20 text-red-400'
                    : isSelected
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'bg-gray-800/80 text-gray-300'
                }
              `}
              >
                {card.name}
              </div>

              {/* Result Icon */}
              {showCorrect && (
                <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
              )}
              {showIncorrect && (
                <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                  <X className="w-5 h-5 text-white" />
                </div>
              )}

              {/* Selection Indicator */}
              {isSelected && !showResult && (
                <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Result */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`
              rounded-xl p-6 border-2
              ${
                isCorrect
                  ? 'bg-green-500/10 border-green-500'
                  : 'bg-red-500/10 border-red-500'
              }
            `}
          >
            <div className="flex items-start gap-4">
              <div
                className={`
                w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
                ${isCorrect ? 'bg-green-500' : 'bg-red-500'}
              `}
              >
                {isCorrect ? (
                  <Check className="w-6 h-6 text-white" />
                ) : (
                  <X className="w-6 h-6 text-white" />
                )}
              </div>

              <div className="flex-1">
                <h4
                  className={`text-xl font-bold mb-2 ${
                    isCorrect ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {isCorrect ? 'Correto!' : 'Incorreto'}
                </h4>

                {!isCorrect && (
                  <p className="text-gray-300 mb-2">
                    A carta correta é:{' '}
                    <span className="font-bold text-white">
                      {cards.find((c) => c.id === correctCardId)?.name}
                    </span>
                  </p>
                )}

                {explanation && (
                  <p className="text-gray-300 mb-4">{explanation}</p>
                )}

                <button
                  onClick={handleContinue}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  Continuar
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Button */}
      {!showResult && (
        <button
          onClick={handleSubmit}
          disabled={!selectedCard}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-blue-700 transition-all"
        >
          Verificar Resposta
        </button>
      )}
    </div>
  );
}
