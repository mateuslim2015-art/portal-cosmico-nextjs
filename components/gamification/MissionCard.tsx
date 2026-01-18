'use client';

import { Mission } from '@prisma/client';
import { motion } from 'framer-motion';
import { Trophy, Star, Calendar, Target, CheckCircle2 } from 'lucide-react';
import ProgressBar from './ProgressBar';
import { cn } from '@/lib/utils';

interface MissionCardProps {
  mission: Mission & {
    progress?: {
      current: number;
      target: number;
      percentage: number;
      completed: boolean;
    };
  };
  type?: 'daily' | 'weekly' | 'achievement';
}

const typeIcons = {
  daily: Calendar,
  weekly: Star,
  achievement: Trophy
};

const typeColors = {
  daily: 'from-blue-500 to-blue-600',
  weekly: 'from-purple-500 to-purple-600',
  achievement: 'from-yellow-500 to-orange-600'
};

const typeBorders = {
  daily: 'border-blue-500',
  weekly: 'border-purple-500',
  achievement: 'border-yellow-500'
};

export default function MissionCard({ mission, type = 'daily' }: MissionCardProps) {
  const Icon = typeIcons[type];
  const isCompleted = mission.progress?.completed || false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'relative bg-gray-800 rounded-lg p-4 border-2 transition-all',
        isCompleted
          ? 'border-green-500 bg-gray-800/50'
          : typeBorders[type],
        !isCompleted && 'hover:shadow-lg hover:scale-[1.02]'
      )}
    >
      {/* Completed Overlay */}
      {isCompleted && (
        <div className="absolute top-2 right-2">
          <CheckCircle2 className="w-6 h-6 text-green-500" />
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        {/* Icon */}
        <div
          className={cn(
            'flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center',
            'bg-gradient-to-br',
            typeColors[type]
          )}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>

        {/* Title and Description */}
        <div className="flex-1">
          <h3
            className={cn(
              'font-semibold text-lg',
              isCompleted ? 'text-gray-400 line-through' : 'text-white'
            )}
          >
            {mission.title}
          </h3>
          <p className="text-sm text-gray-400 mt-1">{mission.description}</p>
        </div>
      </div>

      {/* Progress */}
      {mission.progress && !isCompleted && (
        <div className="mb-3">
          <ProgressBar
            current={mission.progress.current}
            target={mission.progress.target}
            showPercentage={true}
            showNumbers={true}
            size="md"
            color={type === 'daily' ? 'blue' : type === 'weekly' ? 'purple' : 'yellow'}
          />
        </div>
      )}

      {/* Rewards */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-700">
        <div className="flex items-center gap-4">
          {mission.xpReward > 0 && (
            <div className="flex items-center gap-1">
              <Target className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-semibold text-yellow-400">
                +{mission.xpReward} XP
              </span>
            </div>
          )}
          {mission.crystalReward > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-sm">💎</span>
              <span className="text-sm font-semibold text-blue-400">
                +{mission.crystalReward}
              </span>
            </div>
          )}
        </div>

        {/* Badge Reward */}
        {mission.badgeReward && !isCompleted && (
          <div className="flex items-center gap-1 text-xs text-purple-400">
            <Trophy className="w-3 h-3" />
            <span>+ Badge</span>
          </div>
        )}

        {/* Completed Badge */}
        {isCompleted && (
          <span className="text-xs font-semibold text-green-500 uppercase">
            Completo
          </span>
        )}
      </div>
    </motion.div>
  );
}
