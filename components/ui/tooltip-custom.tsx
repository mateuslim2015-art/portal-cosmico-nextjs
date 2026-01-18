'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle } from 'lucide-react'

interface TooltipProps {
  content: string
  children?: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export function TooltipCustom({ content, children, position = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children || (
        <HelpCircle className="w-4 h-4 text-purple-300 hover:text-purple-100 cursor-help transition-colors" />
      )}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 ${positionClasses[position]}`}
          >
            <div className="bg-purple-900 text-white text-sm rounded-lg px-3 py-2 shadow-lg border border-purple-500/30 max-w-xs">
              {content}
              {/* Arrow */}
              <div
                className={`absolute w-2 h-2 bg-purple-900 border-purple-500/30 transform rotate-45 ${
                  position === 'top'
                    ? 'bottom-[-4px] left-1/2 -translate-x-1/2 border-b border-r'
                    : position === 'bottom'
                    ? 'top-[-4px] left-1/2 -translate-x-1/2 border-t border-l'
                    : position === 'left'
                    ? 'right-[-4px] top-1/2 -translate-y-1/2 border-r border-t'
                    : 'left-[-4px] top-1/2 -translate-y-1/2 border-l border-b'
                }`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
