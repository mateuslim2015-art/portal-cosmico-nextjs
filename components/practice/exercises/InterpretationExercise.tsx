'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, ChevronRight } from 'lucide-react';

interface InterpretationExerciseProps {
  question: string;
  cardName: string;
  cardImageUrl?: string;
  context?: string;
  minWords?: number;
  onComplete: (interpretation: string) => void;
}

export default function InterpretationExercise({
  question,
  cardName,
  cardImageUrl,
  context,
  minWords = 50,
  onComplete,
}: InterpretationExerciseProps) {
  const [interpretation, setInterpretation] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const wordCount = interpretation.trim().split(/\s+/).filter(Boolean).length;
  const isValid = wordCount >= minWords;

  const handleSubmit = async () => {
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);

    // Simulate AI feedback delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setShowFeedback(true);
    setIsSubmitting(false);
  };

  const handleContinue = () => {
    onComplete(interpretation);
  };

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-6 border border-purple-500/30">
        <h3 className="text-xl font-semibold text-white mb-2">
          Interprete a Carta
        </h3>
        <p className="text-gray-200 text-lg">{question}</p>
        {context && (
          <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
            <p className="text-sm font-semibold text-purple-400 mb-1">
              CONTEXTO
            </p>
            <p className="text-gray-300">{context}</p>
          </div>
        )}
      </div>

      {/* Card Display */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-64 h-96 bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-xl border-2 border-purple-500/30 flex items-center justify-center overflow-hidden">
            {cardImageUrl ? (
              <img
                src={cardImageUrl}
                alt={cardName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center p-6">
                <div className="text-8xl mb-4">🃏</div>
                <p className="text-gray-300 text-lg font-semibold">
                  {cardName}
                </p>
              </div>
            )}
          </div>

          {/* Card Name Label */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full">
            <p className="font-bold text-white whitespace-nowrap">{cardName}</p>
          </div>
        </div>
      </div>

      {/* Interpretation Input */}
      {!showFeedback && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-purple-400">
              SUA INTERPRETAÇÃO
            </label>
            <span
              className={`text-sm ${
                isValid ? 'text-green-400' : 'text-gray-400'
              }`}
            >
              {wordCount} / {minWords} palavras
            </span>
          </div>

          <textarea
            value={interpretation}
            onChange={(e) => setInterpretation(e.target.value)}
            placeholder="Escreva sua interpretação da carta no contexto da pergunta..."
            className="w-full h-48 px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none resize-none"
          />

          <div className="flex items-start gap-2 text-sm text-gray-400">
            <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-400" />
            <p>
              Dica: Considere o simbolismo da carta, suas cores, elementos e
              como eles se relacionam com a pergunta.
            </p>
          </div>
        </div>
      )}

      {/* AI Feedback */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* User's Interpretation */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h4 className="text-sm font-semibold text-purple-400 mb-3">
                SUA INTERPRETAÇÃO
              </h4>
              <p className="text-gray-200 leading-relaxed">{interpretation}</p>
            </div>

            {/* AI Feedback */}
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-500/30">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <h4 className="text-sm font-semibold text-blue-400">
                  FEEDBACK DA IA
                </h4>
              </div>
              <p className="text-gray-200 leading-relaxed mb-4">
                Excelente interpretação! Você capturou bem os aspectos principais
                da carta {cardName}. Sua análise demonstra compreensão dos
                símbolos e do contexto apresentado. Continue praticando para
                aprofundar ainda mais suas habilidades interpretativas.
              </p>
              <div className="flex items-center gap-2 text-green-400">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-sm font-semibold">
                  Interpretação Aprovada
                </span>
              </div>
            </div>

            <button
              onClick={handleContinue}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Continuar
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Button */}
      {!showFeedback && (
        <button
          onClick={handleSubmit}
          disabled={!isValid || isSubmitting}
          className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-blue-700 transition-all"
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
              Analisando...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Enviar Interpretação
            </>
          )}
        </button>
      )}
    </div>
  );
}
