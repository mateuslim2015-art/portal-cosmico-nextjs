'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { HapticFeedback } from '../../lib/haptics';

interface FloatingActionButtonProps {
  icon: ReactNode;
  onClick: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  variant?: 'primary' | 'secondary';
  label?: string;
}

export default function FloatingActionButton({ 
  icon, 
  onClick,
  position = 'bottom-right',
  variant = 'primary',
  label
}: FloatingActionButtonProps) {
  const positionClasses = {
    'bottom-right': 'bottom-20 right-6',
    'bottom-left': 'bottom-20 left-6',
    'bottom-center': 'bottom-20 left-1/2 -translate-x-1/2',
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/50',
    secondary: 'bg-gray-700 shadow-lg',
  };

  const handleClick = () => {
    HapticFeedback.impact('medium');
    onClick();
  };

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      className={`
        fixed z-40
        ${positionClasses[position]}
        ${variantClasses[variant]}
        w-14 h-14
        rounded-full
        flex items-center justify-center
        text-white text-2xl
        transition-all
      `}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      {icon}
      {label && (
        <span className="sr-only">{label}</span>
      )}
    </motion.button>
  );
}
