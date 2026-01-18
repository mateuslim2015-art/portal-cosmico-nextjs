'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface Card {
  id: string;
  name: string;
  imageUrl?: string;
}

interface CardDeckProps {
  cards: Card[];
  maxSelection: number;
  onSelectionComplete: (selectedCards: Card[]) => void;
}

export default function CardDeck({
  cards,
  maxSelection,
  onSelectionComplete,
}: CardDeckProps) {
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [deckCards, setDeckCards] = useState(cards);

  const handleShuffle = () => {
    setIsShuffling(true);
    
    // Shuffle animation
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setDeckCards(shuffled);

    setTimeout(() => {
      setIsShuffling(false);
    }, 1000);
  };

  const handleCardClick = (card: Card, index: number) => {
    if (isShuffling || selectedCards.length >= maxSelection) return;

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === maxSelection) {
      setTimeout(() => {
        onSelectionComplete(newSelected);
      }, 500);
    }
  };

  const canSelectMore = selectedCards.length < maxSelection;

  return (
    <div className="space-y-8">
      {/* Instructions */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-400" />
          <h3 className="text-2xl font-bold text-white">
            Selecione {maxSelection} {maxSelection === 1 ? 'carta' : 'cartas'}
          </h3>
          <Sparkles className="w-6 h-6 text-purple-400" />
        </div>
        <p className="text-gray-400">
          {selectedCards.length} / {maxSelection} cartas selecionadas
        </p>
      </div>

      {/* Shuffle Button */}
      {selectedCards.length === 0 && (
        <div className="flex justify-center">
          <button
            onClick={handleShuffle}
            disabled={isShuffling}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isShuffling ? 'Embaralhando...' : '🔀 Embaralhar Cartas'}
          </button>
        </div>
      )}

      {/* Selected Cards Display */}
      {selectedCards.length > 0 && (
        <div className="flex justify-center gap-4 flex-wrap">
          {selectedCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.5, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="w-32 h-48 bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-lg border-2 border-purple-500 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🃏</div>
                  <p className="text-xs text-gray-300 px-2">{card.name}</p>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Deck */}
      <div className="relative h-64 flex items-center justify-center">
        <AnimatePresence>
          {canSelectMore && (
            <div className="relative w-full max-w-4xl">
              {/* Fan of cards */}
              <div className="flex justify-center items-end gap-2">
                {deckCards.slice(0, 15).map((card, index) => {
                  const rotation = (index - 7) * 3;
                  const yOffset = Math.abs(index - 7) * 5;

                  return (
                    <motion.button
                      key={`${card.id}-${index}`}
                      onClick={() => handleCardClick(card, index)}
                      disabled={isShuffling}
                      className="relative cursor-pointer"
                      style={{
                        zIndex: index,
                      }}
                      initial={{ opacity: 0, y: 100 }}
                      animate={{
                        opacity: 1,
                        y: yOffset,
                        rotate: rotation,
                      }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      whileHover={{
                        scale: 1.1,
                        y: yOffset - 20,
                        rotate: rotation,
                        zIndex: 100,
                      }}
                      transition={{
                        duration: 0.3,
                        delay: isShuffling ? index * 0.05 : 0,
                      }}
                    >
                      {/* Card Back */}
                      <div className="w-24 h-36 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg border-2 border-purple-400 shadow-xl flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl mb-1">✨</div>
                          <div className="text-xs text-purple-200 font-bold">
                            TAROT
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent blur-3xl -z-10" />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress */}
      {canSelectMore && selectedCards.length > 0 && (
        <div className="text-center">
          <p className="text-purple-400 font-semibold">
            Selecione mais {maxSelection - selectedCards.length}{' '}
            {maxSelection - selectedCards.length === 1 ? 'carta' : 'cartas'}
          </p>
        </div>
      )}
    </div>
  );
}
