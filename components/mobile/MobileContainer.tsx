'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MobileContainerProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
  fullHeight?: boolean;
}

export default function MobileContainer({ 
  children, 
  className = '',
  noPadding = false,
  fullHeight = false
}: MobileContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`
        w-full
        max-w-screen-xl
        mx-auto
        ${!noPadding ? 'px-4 sm:px-6' : ''}
        ${fullHeight ? 'min-h-screen' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
