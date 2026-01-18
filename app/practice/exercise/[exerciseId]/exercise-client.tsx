'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Star } from 'lucide-react';
import QuizExercise from '@/components/practice/exercises/QuizExercise';
import GuidedReadingExercise from '@/components/practice/exercises/GuidedReadingExercise';
import IdentificationExercise from '@/components/practice/exercises/IdentificationExercise';
import InterpretationExercise from '@/components/practice/exercises/InterpretationExercise';

interface ExerciseClientProps {
  exercise: any;
  userId: string;
  isCompleted: boolean;
}

export default function ExerciseClient({
  exercise,
  userId,
  isCompleted: initialCompleted,
}: ExerciseClientProps) {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(initialCompleted);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComplete = async (data: any) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/practice/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exerciseId: exercise.id,
          ...data,
        }),
      });

      if (response.ok) {
        setIsCompleted(true);
        // Redirect to practice page after 2 seconds
        setTimeout(() => {
          router.push('/practice');
        }, 2000);
      }
    } catch (error) {
      console.error('Error completing exercise:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderExercise = () => {
    const content = exercise.content as any;

    switch (exercise.type) {
      case 'QUIZ':
        return (
          <QuizExercise
            question={content.question}
            options={content.options}
            explanation={content.explanation}
            onComplete={(correct) => handleComplete({ correct })}
          />
        );

      case 'GUIDED_READING':
        return (
          <GuidedReadingExercise
            steps={content.steps}
            onComplete={() => handleComplete({ completed: true })}
          />
        );

      case 'IDENTIFICATION':
        return (
          <IdentificationExercise
            question={content.question}
            cards={content.cards}
            correctCardId={content.correctCardId}
            explanation={content.explanation}
            onComplete={(correct) => handleComplete({ correct })}
          />
        );

      case 'INTERPRETATION':
        return (
          <InterpretationExercise
            question={content.question}
            cardName={content.cardName}
            cardImageUrl={content.cardImageUrl}
            context={content.context}
            minWords={content.minWords}
            onComplete={(interpretation) =>
              handleComplete({ interpretation })
            }
          />
        );

      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-400">Tipo de exercício não suportado</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-semibold">
                  {exercise.oracle.name}
                </span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold">
                  {exercise.difficulty}
                </span>
                {isCompleted && (
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    Concluído
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-white mb-2">
                {exercise.title}
              </h1>

              {exercise.description && (
                <p className="text-gray-400">{exercise.description}</p>
              )}
            </div>

            <div className="flex items-center gap-2 text-yellow-400">
              <Star className="w-5 h-5 fill-current" />
              <span className="font-bold text-lg">+{exercise.xpReward} XP</span>
            </div>
          </div>
        </div>

        {/* Exercise Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderExercise()}
        </motion.div>
      </div>
    </div>
  );
}
