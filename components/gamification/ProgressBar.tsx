'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  target: number;
  label?: string;
  showPercentage?: boolean;
  showNumbers?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'purple' | 'green' | 'yellow' | 'gradient';
  className?: string;
}

const colorClasses = {
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  gradient: 'bg-gradient-to-r from-blue-500 to-purple-500'
};

const sizeClasses = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3'
};

export default function ProgressBar({
  current,
  target,
  label,
  showPercentage = true,
  showNumbers = true,
  size = 'md',
  color = 'gradient',
  className
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.round((current / target) * 100));

  return (
    <div className={cn('w-full', className)}>
      {/* Label and Stats */}
      {(label || showPercentage || showNumbers) && (
        <div className="flex items-center justify-between mb-1">
          {label && <span className="text-sm text-gray-300">{label}</span>}
          <div className="flex items-center gap-2">
            {showPercentage && (
              <span className="text-sm font-semibold text-white">
                {percentage}%
              </span>
            )}
            {showNumbers && (
              <span className="text-xs text-gray-400">
                {current} / {target}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className={cn('w-full bg-gray-700 rounded-full overflow-hidden', sizeClasses[size])}>
        <motion.div
          className={cn('h-full rounded-full', colorClasses[color])}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: 1,
            ease: 'easeOut'
          }}
        />
      </div>
    </div>
  );
}
