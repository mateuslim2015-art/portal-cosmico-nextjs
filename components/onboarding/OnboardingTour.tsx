'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Button } from '@/components/ui/button'

interface OnboardingStep {
  id: string
  title: string
  description: string
  target?: string // CSS selector for the element to highlight
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center'
  image?: string
  icon?: React.ReactNode
}

interface OnboardingTourProps {
  steps: OnboardingStep[]
  storageKey?: string
  onComplete?: () => void
  onSkip?: () => void
}

export default function OnboardingTour({
  steps,
  storageKey = 'onboarding-completed',
  onComplete,
  onSkip,
}: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [hasCompleted, setHasCompleted] = useLocalStorage(storageKey, false)
  const [targetPosition, setTargetPosition] = useState<DOMRect | null>(null)

  useEffect(() => {
    // Show onboarding if not completed
    if (!hasCompleted) {
      setIsVisible(true)
    }
  }, [hasCompleted])

  useEffect(() => {
    // Update target position when step changes
    const step = steps[currentStep]
    if (step.target) {
      const element = document.querySelector(step.target)
      if (element) {
        const rect = element.getBoundingClientRect()
        setTargetPosition(rect)
        
        // Scroll element into view
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    } else {
      setTargetPosition(null)
    }
  }, [currentStep, steps])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    setHasCompleted(true)
    setIsVisible(false)
    onComplete?.()
  }

  const handleSkip = () => {
    setHasCompleted(true)
    setIsVisible(false)
    onSkip?.()
  }

  if (!isVisible || hasCompleted) return null

  const step = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[100]"
            onClick={handleSkip}
          />

          {/* Highlight target element */}
          {targetPosition && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed z-[101] pointer-events-none"
              style={{
                top: targetPosition.top - 8,
                left: targetPosition.left - 8,
                width: targetPosition.width + 16,
                height: targetPosition.height + 16,
                boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.8), 0 0 20px rgba(147, 51, 234, 0.6)',
                borderRadius: '12px',
                border: '3px solid rgba(147, 51, 234, 0.8)',
              }}
            >
              {/* Pulse animation */}
              <motion.div
                className="absolute inset-0 border-2 border-purple-400 rounded-xl"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          )}

          {/* Tooltip/Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed z-[102] max-w-md"
            style={getTooltipPosition(targetPosition, step.position)}
          >
            <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl shadow-2xl border border-purple-500/30 overflow-hidden">
              {/* Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {step.icon || <Sparkles className="w-6 h-6 text-purple-400" />}
                    <h3 className="text-xl font-cinzel text-white">{step.title}</h3>
                  </div>
                  <button
                    onClick={handleSkip}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Image */}
                {step.image && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}

                {/* Description */}
                <p className="text-purple-200 leading-relaxed">{step.description}</p>
              </div>

              {/* Progress bar */}
              <div className="px-6 pb-4">
                <div className="h-1 bg-purple-950 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-purple-300">
                    Passo {currentStep + 1} de {steps.length}
                  </span>
                  <button
                    onClick={handleSkip}
                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Pular tour
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 p-6 pt-0">
                {currentStep > 0 && (
                  <Button
                    onClick={handlePrevious}
                    variant="outline"
                    className="flex-1 border-purple-500/30 hover:bg-purple-500/20"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Anterior
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {currentStep < steps.length - 1 ? (
                    <>
                      Próximo
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    'Concluir'
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function getTooltipPosition(
  targetPosition: DOMRect | null,
  position: string = 'center'
): React.CSSProperties {
  if (!targetPosition) {
    // Center of screen
    return {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }
  }

  const offset = 20

  switch (position) {
    case 'top':
      return {
        bottom: `${window.innerHeight - targetPosition.top + offset}px`,
        left: `${targetPosition.left + targetPosition.width / 2}px`,
        transform: 'translateX(-50%)',
      }
    case 'bottom':
      return {
        top: `${targetPosition.bottom + offset}px`,
        left: `${targetPosition.left + targetPosition.width / 2}px`,
        transform: 'translateX(-50%)',
      }
    case 'left':
      return {
        top: `${targetPosition.top + targetPosition.height / 2}px`,
        right: `${window.innerWidth - targetPosition.left + offset}px`,
        transform: 'translateY(-50%)',
      }
    case 'right':
      return {
        top: `${targetPosition.top + targetPosition.height / 2}px`,
        left: `${targetPosition.right + offset}px`,
        transform: 'translateY(-50%)',
      }
    default:
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }
  }
}
