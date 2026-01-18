'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from '../feedback/LoadingSpinner';

interface MobileButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  className?: string;
}

export default function MobileButton({ 
  children, 
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  className = ''
}: MobileButtonProps) {
  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50',
    secondary: 'bg-gray-700/50 text-white border border-gray-600',
    ghost: 'bg-transparent text-purple-400 hover:bg-purple-500/10',
    danger: 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg shadow-red-500/50',
  };

  const sizeClasses = {
    sm: 'min-h-[40px] px-4 text-sm',
    md: 'min-h-[48px] px-6 text-base',
    lg: 'min-h-[56px] px-8 text-lg',
  };

  const isDisabled = disabled || loading;

  return (
    <motion.button
      onClick={onClick}
      disabled={isDisabled}
      whileTap={{ scale: isDisabled ? 1 : 0.95 }}
      whileHover={{ scale: isDisabled ? 1 : 1.02 }}
      className={`
        ${fullWidth ? 'w-full' : ''}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        rounded-full
        font-semibold
        flex items-center justify-center gap-2
        transition-all duration-200
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'active:shadow-xl'}
        ${className}
      `}
    >
      {loading ? (
        <LoadingSpinner size="sm" color="text-white" />
      ) : (
        <>
          {icon && <span>{icon}</span>}
          <span>{children}</span>
        </>
      )}
    </motion.button>
  );
}
