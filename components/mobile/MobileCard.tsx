'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MobileCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'glass' | 'gradient';
}

export default function MobileCard({ 
  children, 
  className = '',
  onClick,
  variant = 'default'
}: MobileCardProps) {
  const variantClasses = {
    default: 'bg-gray-800/50 backdrop-blur-sm',
    glass: 'bg-white/5 backdrop-blur-md border border-white/10',
    gradient: 'bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-sm',
  };

  const Component = onClick ? motion.button : motion.div;

  return (
    <Component
      onClick={onClick}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      className={`
        w-full
        rounded-2xl
        p-4 sm:p-6
        ${variantClasses[variant]}
        shadow-lg
        ${onClick ? 'cursor-pointer active:shadow-xl transition-shadow' : ''}
        ${className}
      `}
    >
      {children}
    </Component>
  );
}
