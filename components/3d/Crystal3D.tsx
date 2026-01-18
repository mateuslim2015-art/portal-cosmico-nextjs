'use client'

import { motion } from 'framer-motion'
import { Gem } from 'lucide-react'

interface Crystal3DProps {
  amount: number
  size?: 'small' | 'medium' | 'large'
  animated?: boolean
  onClick?: () => void
}

const SIZE_CONFIG = {
  small: {
    container: 'w-12 h-12',
    icon: 'w-6 h-6',
    text: 'text-xs',
  },
  medium: {
    container: 'w-16 h-16',
    icon: 'w-8 h-8',
    text: 'text-sm',
  },
  large: {
    container: 'w-24 h-24',
    icon: 'w-12 h-12',
    text: 'text-base',
  },
}

export default function Crystal3D({
  amount,
  size = 'medium',
  animated = true,
  onClick,
}: Crystal3DProps) {
  const config = SIZE_CONFIG[size]

  return (
    <div className="inline-flex items-center gap-2">
      {/* Crystal icon with 3D effect */}
      <motion.div
        className={`relative ${config.container} ${onClick ? 'cursor-pointer' : ''}`}
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={
          animated
            ? {
                rotateY: [0, 360],
                scale: [1, 1.1, 1],
              }
            : {}
        }
        transition={
          animated
            ? {
                rotateY: {
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                },
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }
            : {}
        }
        whileHover={
          onClick
            ? {
                scale: 1.2,
                rotateZ: [0, -10, 10, 0],
              }
            : {}
        }
        whileTap={onClick ? { scale: 0.9 } : {}}
        onClick={onClick}
      >
        {/* Crystal container */}
        <div
          className="relative w-full h-full rounded-lg"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateZ(20px)',
          }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg blur-xl opacity-60 animate-pulse" />

          {/* Crystal body */}
          <div className="relative w-full h-full bg-gradient-to-br from-purple-400 via-pink-400 to-purple-500 rounded-lg flex items-center justify-center shadow-2xl">
            <Gem className={`${config.icon} text-white drop-shadow-lg`} />

            {/* Facets */}
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              {/* Top facet */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0"
                style={{
                  borderLeft: '20px solid transparent',
                  borderRight: '20px solid transparent',
                  borderTop: '30px solid rgba(255, 255, 255, 0.3)',
                }}
              />

              {/* Side facets */}
              <div className="absolute top-1/4 left-0 w-1/3 h-1/2 bg-white/20 transform -skew-y-12" />
              <div className="absolute top-1/4 right-0 w-1/3 h-1/2 bg-white/10 transform skew-y-12" />

              {/* Bottom shine */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/30 to-transparent" />
            </div>

            {/* Sparkles */}
            {animated && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </>
            )}
          </div>

          {/* Reflection */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-lg pointer-events-none"
            style={{
              transform: 'translateZ(1px)',
            }}
          />
        </div>

        {/* Shadow */}
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-black/30 rounded-full blur-md"
          style={{
            transform: 'translateZ(-10px)',
          }}
        />
      </motion.div>

      {/* Amount text */}
      <motion.span
        className={`font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent ${config.text}`}
        animate={
          animated
            ? {
                scale: [1, 1.05, 1],
              }
            : {}
        }
        transition={
          animated
            ? {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : {}
        }
      >
        {amount.toLocaleString()}
      </motion.span>
    </div>
  )
}
