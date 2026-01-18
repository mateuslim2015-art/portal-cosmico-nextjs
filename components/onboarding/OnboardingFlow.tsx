'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MobileButton from '../mobile/MobileButton';

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
}

interface OnboardingFlowProps {
  steps: OnboardingStep[];
  onComplete: () => void;
  onSkip?: () => void;
}

export default function OnboardingFlow({ steps, onComplete, onSkip }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 z-50 flex flex-col">
      {/* Skip Button */}
      {onSkip && currentStep < steps.length - 1 && (
        <div className="absolute top-4 right-4">
          <button
            onClick={onSkip}
            className="text-gray-400 hover:text-white transition-colors px-4 py-2"
          >
            Pular
          </button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="text-center max-w-md"
          >
            {/* Icon/Image */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="text-8xl mb-8"
            >
              {step.icon}
            </motion.div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-white mb-4">
              {step.title}
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-300 leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mb-6">
        {steps.map((_, index) => (
          <motion.div
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentStep 
                ? 'w-8 bg-purple-500' 
                : 'w-2 bg-gray-600'
            }`}
            animate={{
              scale: index === currentStep ? 1 : 0.8,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="px-6 pb-8 space-y-3">
        <MobileButton
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleNext}
        >
          {currentStep < steps.length - 1 ? 'Próximo' : 'Começar'}
        </MobileButton>

        {currentStep > 0 && (
          <MobileButton
            variant="ghost"
            size="md"
            fullWidth
            onClick={handlePrev}
          >
            Voltar
          </MobileButton>
        )}
      </div>
    </div>
  );
}
