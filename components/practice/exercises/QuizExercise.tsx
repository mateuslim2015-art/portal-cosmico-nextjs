'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ChevronRight } from 'lucide-react';

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuizExerciseProps {
  question: string;
  options: QuizOption[];
  explanation?: string;
  onComplete: (correct: boolean) => void;
}

export default function QuizExercise({
  question,
  options,
  explanation,
  onComplete,
}: QuizExerciseProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelectOption = (optionId: string) => {
    if (showResult) return;
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;

    const selected = options.find((opt) => opt.id === selectedOption);
    const correct = selected?.isCorrect || false;

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
        <h3 className="text-xl font-semibold text-white mb-2">Pergunta</h3>
        <p className="text-gray-200 text-lg">{question}</p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = selectedOption === option.id;
          const showCorrect = showResult && option.isCorrect;
          const showIncorrect = showResult && isSelected && !option.isCorrect;

          return (
            <motion.button
              key={option.id}
              onClick={() => handleSelectOption(option.id)}
              disabled={showResult}
              className={`
                w-full p-4 rounded-xl border-2 text-left transition-all
                ${
                  showCorrect
                    ? 'bg-green-500/20 border-green-500'
                    : showIncorrect
                    ? 'bg-red-500/20 border-red-500'
                    : isSelected
                    ? 'bg-purple-500/20 border-purple-500'
                    : 'bg-gray-800/50 border-gray-700 hover:border-purple-500/50'
                }
                ${showResult ? 'cursor-default' : 'cursor-pointer'}
              `}
              whileHover={!showResult ? { scale: 1.02 } : {}}
              whileTap={!showResult ? { scale: 0.98 } : {}}
            >
              <div className="flex items-center gap-4">
                {/* Letter */}
                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold
                  ${
                    showCorrect
                      ? 'bg-green-500 text-white'
                      : showIncorrect
                      ? 'bg-red-500 text-white'
                      : isSelected
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-700 text-gray-300'
                  }
                `}
                >
                  {String.fromCharCode(65 + index)}
                </div>

                {/* Text */}
                <span className="flex-1 text-white">{option.text}</span>

                {/* Icon */}
                {showCorrect && <Check className="w-6 h-6 text-green-500" />}
                {showIncorrect && <X className="w-6 h-6 text-red-500" />}
              </div>
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
          disabled={!selectedOption}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-blue-700 transition-all"
        >
          Verificar Resposta
        </button>
      )}
    </div>
  );
}
