'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export default function Skeleton({ className = '', variant = 'rectangular' }: SkeletonProps) {
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  return (
    <motion.div
      className={`bg-gradient-to-r from-gray-700/50 via-gray-600/50 to-gray-700/50 ${variantClasses[variant]} ${className}`}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        backgroundSize: '200% 100%',
      }}
    />
  );
}

// Skeleton presets para cards comuns
export function CardSkeleton() {
  return (
    <div className="p-6 bg-gray-800/50 rounded-2xl space-y-4">
      <Skeleton className="h-6 w-3/4" variant="text" />
      <Skeleton className="h-4 w-full" variant="text" />
      <Skeleton className="h-4 w-5/6" variant="text" />
      <Skeleton className="h-10 w-32 mt-4" />
    </div>
  );
}

export function AvatarSkeleton() {
  return <Skeleton className="w-12 h-12" variant="circular" />;
}
