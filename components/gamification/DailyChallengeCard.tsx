'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Flame, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

interface DailyChallengeCardProps {
  onComplete?: () => void;
}

export default function DailyChallengeCard({ onComplete }: DailyChallengeCardProps) {
  const [challenge, setChallenge] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userAnswer, setUserAnswer] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rewards, setRewards] = useState<any>(null);

  useEffect(() => {
    fetchChallenge();
  }, []);

  const fetchChallenge = async () => {
    try {
      const response = await fetch('/api/daily-challenge');
      const data = await response.json();
      setChallenge(data);
      setCompleted(data.completed);
      setUserAnswer(data.userAnswer || '');
      setFeedback(data.aiFeedback || '');
    } catch (error) {
      console.error('Erro ao buscar desafio:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!userAnswer.trim() || submitting) return;

    setSubmitting(true);

    try {
      const response = await fetch('/api/daily-challenge/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challengeId: challenge.challenge.id,
          userAnswer
        })
      });

      const data = await response.json();

      if (data.success !== undefined) {
        setCompleted(true);
        setFeedback(data.aiFeedback || '');
        setRewards({
          xp: data.xpEarned,
          crystals: data.crystalsEarned,
          badges: data.unlockedBadges
        });

        if (onComplete) {
          onComplete();
        }
      }
    } catch (error) {
      console.error('Erro ao completar desafio:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        </div>
      </Card>
    );
  }

  if (!challenge) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-2 border-purple-500/50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <h3 className="font-bold text-lg text-white">
                {challenge?.challenge?.title || 'Desafio Diário'}
              </h3>
            </div>
            <div className="flex items-center gap-4">
              {/* Streak */}
              <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-semibold text-white">
                  {challenge?.streak || 0} dias
                </span>
              </div>
              {/* Time Remaining */}
              <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
                <Clock className="w-4 h-4 text-blue-300" />
                <span className="text-sm text-white">
                  {challenge?.timeRemaining?.hours || 0}h {challenge?.timeRemaining?.minutes || 0}m
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Card Image (if available) */}
          {challenge.card && (
            <div className="flex justify-center mb-4">
              <div className="relative w-32 h-48 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={challenge.card.imageUrl}
                  alt={challenge.card.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Description */}
          <p className="text-gray-300 mb-4">{challenge?.challenge?.description || 'Carregando desafio...'}</p>

          {/* Question */}
          {challenge?.challenge?.question && (
            <div className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-gray-700">
              <p className="text-white font-medium italic">
                "{challenge?.challenge?.question}"
              </p>
            </div>
          )}

          {/* Answer Area */}
          {!completed ? (
            <div className="space-y-4">
              <Textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Escreva sua reflexão aqui... (mínimo 50 caracteres)"
                className="min-h-[120px] bg-gray-800 border-gray-700 text-white"
                disabled={submitting}
              />

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  {userAnswer.length} caracteres
                </span>
                <Button
                  onClick={handleSubmit}
                  disabled={userAnswer.length < 50 || submitting}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Resposta
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Completed Message */}
              <div className="bg-green-900/30 border border-green-500 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <h4 className="font-semibold text-green-400">
                    Desafio Completado!
                  </h4>
                </div>

                {/* Rewards */}
                {rewards && (
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 font-semibold">
                        +{rewards.xp} XP
                      </span>
                    </div>
                    {rewards.crystals > 0 && (
                      <div className="flex items-center gap-1">
                        <span>💎</span>
                        <span className="text-blue-400 font-semibold">
                          +{rewards.crystals}
                        </span>
                      </div>
                    )}
                    {rewards.badges && rewards.badges.length > 0 && (
                      <div className="flex items-center gap-1">
                        <span className="text-purple-400 font-semibold">
                          🏆 +{rewards.badges.length} Badge{rewards.badges.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* AI Feedback */}
              {feedback && (
                <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-400 mb-2">
                    💬 Feedback da IA
                  </h4>
                  <p className="text-gray-300 text-sm">{feedback}</p>
                </div>
              )}

              {/* User Answer */}
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <h4 className="font-semibold text-gray-400 mb-2 text-sm">
                  Sua Resposta:
                </h4>
                <p className="text-gray-300 text-sm">{userAnswer}</p>
              </div>
            </div>
          )}

          {/* Rewards Info */}
          {!completed && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Recompensa:</span>
                <div className="flex items-center gap-3">
                  <span className="text-yellow-400 font-semibold">
                    +{challenge.xpReward || 50} XP
                  </span>
                  {(challenge.crystalReward || 0) > 0 && (
                    <span className="text-blue-400 font-semibold">
                      💎 +{challenge.crystalReward || 0}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
