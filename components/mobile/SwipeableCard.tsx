'use client';

import { ReactNode, useState } from 'react';
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';

interface SwipeableCardProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  leftAction?: {
    icon: ReactNode;
    color: string;
    label: string;
  };
  rightAction?: {
    icon: ReactNode;
    color: string;
    label: string;
  };
}

export default function SwipeableCard({ 
  children,
  onSwipeLeft,
  onSwipeRight,
  leftAction,
  rightAction
}: SwipeableCardProps) {
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);

  const leftOpacity = useTransform(x, [-100, 0], [1, 0]);
  const rightOpacity = useTransform(x, [0, 100], [0, 1]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    setIsDragging(false);
    
    if (info.offset.x < -100 && onSwipeLeft) {
      onSwipeLeft();
      x.set(-300);
      setTimeout(() => x.set(0), 300);
    } else if (info.offset.x > 100 && onSwipeRight) {
      onSwipeRight();
      x.set(300);
      setTimeout(() => x.set(0), 300);
    } else {
      x.set(0);
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Left Action */}
      {leftAction && (
        <motion.div
          style={{ opacity: leftOpacity }}
          className={`absolute inset-y-0 left-0 w-24 flex items-center justify-start pl-6 ${leftAction.color}`}
        >
          <div className="flex flex-col items-center gap-1">
            <div className="text-2xl">{leftAction.icon}</div>
            <div className="text-xs font-medium">{leftAction.label}</div>
          </div>
        </motion.div>
      )}

      {/* Right Action */}
      {rightAction && (
        <motion.div
          style={{ opacity: rightOpacity }}
          className={`absolute inset-y-0 right-0 w-24 flex items-center justify-end pr-6 ${rightAction.color}`}
        >
          <div className="flex flex-col items-center gap-1">
            <div className="text-2xl">{rightAction.icon}</div>
            <div className="text-xs font-medium">{rightAction.label}</div>
          </div>
        </motion.div>
      )}

      {/* Card Content */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        style={{ x }}
        className={`relative bg-gray-800 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
