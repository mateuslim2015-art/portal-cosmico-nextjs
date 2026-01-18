'use client';

import { Badge } from '@prisma/client';
import { motion } from 'framer-motion';
import { Lock, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BadgeCardProps {
  badge: Badge & {
    unlocked?: boolean;
    earnedAt?: Date | null;
    progress?: {
      current: number;
      target: number;
      percentage: number;
    };
  };
  size?: 'sm' | 'md' | 'lg';
  showProgress?: boolean;
  onClick?: () => void;
}

const rarityColors = {
  common: 'from-gray-400 to-gray-600',
  rare: 'from-blue-400 to-blue-600',
  epic: 'from-purple-400 to-purple-600',
  legendary: 'from-yellow-400 to-orange-600'
};

const rarityBorders = {
  common: 'border-gray-400',
  rare: 'border-blue-400',
  epic: 'border-purple-400',
  legendary: 'border-yellow-400'
};

const sizeClasses = {
  sm: 'w-16 h-16 text-2xl',
  md: 'w-24 h-24 text-4xl',
  lg: 'w-32 h-32 text-5xl'
};

export default function BadgeCard({
  badge,
  size = 'md',
  showProgress = false,
  onClick
}: BadgeCardProps) {
  const isLocked = !badge.unlocked;
  const rarity = badge.rarity as keyof typeof rarityColors;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'relative cursor-pointer group',
        onClick && 'hover:shadow-lg transition-shadow'
      )}
    >
      {/* Badge Container */}
      <div
        className={cn(
          'relative rounded-full border-4 flex items-center justify-center',
          'bg-gradient-to-br',
          isLocked
            ? 'from-gray-700 to-gray-900 border-gray-600 opacity-50'
            : `${rarityColors[rarity]} ${rarityBorders[rarity]}`,
          sizeClasses[size]
        )}
      >
        {/* Badge Icon */}
        {isLocked ? (
          <Lock className="w-1/2 h-1/2 text-gray-400" />
        ) : (
          <span className="filter drop-shadow-lg">{badge.icon}</span>
        )}

        {/* Sparkle Effect for Unlocked */}
        {!isLocked && (
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                '0 0 0px rgba(255, 215, 0, 0)',
                '0 0 20px rgba(255, 215, 0, 0.5)',
                '0 0 0px rgba(255, 215, 0, 0)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        )}

        {/* Legendary Glow */}
        {!isLocked && rarity === 'legendary' && (
          <motion.div
            className="absolute -inset-1 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 opacity-75 blur-md"
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        )}
      </div>

      {/* Badge Name */}
      <div className="mt-2 text-center">
        <p
          className={cn(
            'font-semibold text-sm',
            isLocked ? 'text-gray-500' : 'text-white'
          )}
        >
          {badge.name}
        </p>

        {/* Rarity */}
        <p
          className={cn(
            'text-xs uppercase tracking-wider mt-1',
            isLocked ? 'text-gray-600' : 'text-gray-400'
          )}
        >
          {badge.rarity}
        </p>

        {/* Earned Date */}
        {badge.earnedAt && (
          <p className="text-xs text-gray-500 mt-1">
            {new Date(badge.earnedAt).toLocaleDateString('pt-BR')}
          </p>
        )}
      </div>

      {/* Progress Bar */}
      {showProgress && badge.progress && isLocked && (
        <div className="mt-2">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${badge.progress.percentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 text-center mt-1">
            {badge.progress.current} / {badge.progress.target}
          </p>
        </div>
      )}

      {/* Tooltip on Hover */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
        <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-xl border border-gray-700">
          <p className="font-semibold">{badge.name}</p>
          <p className="text-gray-400 mt-1">{badge.description}</p>
          {badge.xpReward > 0 && (
            <p className="text-yellow-400 mt-1">+{badge.xpReward} XP</p>
          )}
          {badge.crystalReward > 0 && (
            <p className="text-blue-400">+{badge.crystalReward} 💎</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
