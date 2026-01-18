'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

interface ReadingStep {
  id: string;
  title: string;
  description: string;
  cardPosition?: string;
  guidance: string;
}

interface GuidedReadingExerciseProps {
  steps: ReadingStep[];
  onComplete: () => void;
}

export default function GuidedReadingExercise({
  steps,
  onComplete,
}: GuidedReadingExerciseProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;
  const step = steps[currentStep];

  const handleNext = () => {
    setCompletedSteps((prev) => new Set(prev).add(currentStep));

    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-400">
          <span>Passo {currentStep + 1} de {steps.length}</span>
          <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentStep + 1) / steps.length) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex gap-2">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`
              flex-1 h-1 rounded-full transition-all
              ${
                index <= currentStep
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                  : 'bg-gray-700'
              }
            `}
          />
        ))}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Title */}
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center font-bold">
                {currentStep + 1}
              </div>
              <h3 className="text-2xl font-bold text-white">{step.title}</h3>
            </div>
            <p className="text-gray-300 text-lg">{step.description}</p>
          </div>

          {/* Card Position (if applicable) */}
          {step.cardPosition && (
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h4 className="text-sm font-semibold text-purple-400 mb-2">
                POSIÇÃO DA CARTA
              </h4>
              <p className="text-white text-lg">{step.cardPosition}</p>
            </div>
          )}

          {/* Guidance */}
          <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-500/30">
            <h4 className="text-sm font-semibold text-blue-400 mb-3">
              ORIENTAÇÃO
            </h4>
            <p className="text-gray-200 leading-relaxed">{step.guidance}</p>
          </div>

          {/* Example Card (placeholder) */}
          <div className="flex justify-center">
            <div className="w-48 h-72 bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-xl border-2 border-purple-500/30 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-2">🃏</div>
                <p className="text-gray-400 text-sm">Carta de Exemplo</p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handlePrevious}
          disabled={isFirstStep}
          className="flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
          Anterior
        </button>

        <button
          onClick={handleNext}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
        >
          {isLastStep ? (
            <>
              <Check className="w-5 h-5" />
              Concluir
            </>
          ) : (
            <>
              Próximo
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
