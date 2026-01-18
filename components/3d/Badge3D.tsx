'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface Badge3DProps {
  icon: LucideIcon
  name: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  size?: 'small' | 'medium' | 'large'
  unlocked?: boolean
  onClick?: () => void
}

const RARITY_CONFIG = {
  common: {
    gradient: 'from-gray-400 to-gray-600',
    glow: 'rgba(156, 163, 175, 0.6)',
    shine: 'rgba(255, 255, 255, 0.3)',
  },
  rare: {
    gradient: 'from-blue-400 to-cyan-600',
    glow: 'rgba(59, 130, 246, 0.6)',
    shine: 'rgba(147, 197, 253, 0.4)',
  },
  epic: {
    gradient: 'from-purple-400 to-pink-600',
    glow: 'rgba(168, 85, 247, 0.6)',
    shine: 'rgba(216, 180, 254, 0.4)',
  },
  legendary: {
    gradient: 'from-yellow-400 to-orange-600',
    glow: 'rgba(251, 191, 36, 0.8)',
    shine: 'rgba(254, 240, 138, 0.5)',
  },
}

const SIZE_CONFIG = {
  small: {
    container: 'w-16 h-16',
    icon: 'w-6 h-6',
    text: 'text-xs',
  },
  medium: {
    container: 'w-24 h-24',
    icon: 'w-10 h-10',
    text: 'text-sm',
  },
  large: {
    container: 'w-32 h-32',
    icon: 'w-14 h-14',
    text: 'text-base',
  },
}

export default function Badge3D({
  icon: Icon,
  name,
  rarity,
  size = 'medium',
  unlocked = true,
  onClick,
}: Badge3DProps) {
  const rarityConfig = RARITY_CONFIG[rarity]
  const sizeConfig = SIZE_CONFIG[size]

  return (
    <div className="inline-block perspective-1000">
      <motion.div
        className="relative"
        style={{
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          scale: 1.1,
          rotateY: 15,
          rotateX: -10,
        }}
        whileTap={{ scale: 0.95 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
        onClick={onClick}
      >
        {/* Badge container */}
        <div
          className={`relative ${sizeConfig.container} ${
            onClick ? 'cursor-pointer' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full blur-xl"
            style={{
              background: rarityConfig.glow,
            }}
            animate={
              unlocked
                ? {
                    opacity: [0.4, 0.8, 0.4],
                    scale: [1, 1.2, 1],
                  }
                : {}
            }
            transition={
              unlocked
                ? {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
                : {}
            }
          />

          {/* Badge body */}
          <div
            className={`relative w-full h-full rounded-full ${
              unlocked
                ? `bg-gradient-to-br ${rarityConfig.gradient}`
                : 'bg-gradient-to-br from-gray-700 to-gray-900'
            } shadow-2xl flex items-center justify-center`}
            style={{
              transform: 'translateZ(20px)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Icon */}
            <Icon
              className={`${sizeConfig.icon} ${
                unlocked ? 'text-white' : 'text-gray-500'
              } drop-shadow-lg relative z-10`}
              style={{
                transform: 'translateZ(10px)',
              }}
            />

            {/* Hexagon pattern overlay */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 20% 50%, transparent 20%, rgba(255,255,255,0.3) 21%, rgba(255,255,255,0.3) 34%, transparent 35%, transparent),
                    radial-gradient(circle at 60% 50%, transparent 20%, rgba(255,255,255,0.3) 21%, rgba(255,255,255,0.3) 34%, transparent 35%, transparent),
                    radial-gradient(circle at 40% 80%, transparent 20%, rgba(255,255,255,0.3) 21%, rgba(255,255,255,0.3) 34%, transparent 35%, transparent)
                  `,
                  backgroundSize: '50px 50px',
                }}
              />
            </div>

            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `linear-gradient(135deg, transparent 30%, ${rarityConfig.shine} 50%, transparent 70%)`,
                transform: 'translateZ(5px)',
              }}
              animate={
                unlocked
                  ? {
                      rotate: [0, 360],
                    }
                  : {}
              }
              transition={
                unlocked
                  ? {
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }
                  : {}
              }
            />

            {/* Inner ring */}
            <div
              className={`absolute inset-2 rounded-full border-2 ${
                unlocked ? 'border-white/30' : 'border-gray-600/30'
              }`}
              style={{
                transform: 'translateZ(15px)',
              }}
            />

            {/* Outer ring */}
            <div
              className={`absolute -inset-1 rounded-full border-2 ${
                unlocked ? 'border-white/20' : 'border-gray-600/20'
              }`}
              style={{
                transform: 'translateZ(25px)',
              }}
            />

            {/* Lock overlay for locked badges */}
            {!unlocked && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full"
                style={{
                  transform: 'translateZ(30px)',
                }}
              >
                <div className="text-4xl">🔒</div>
              </div>
            )}

            {/* Sparkles for unlocked badges */}
            {unlocked && (
              <>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: 'translateZ(35px)',
                    }}
                    animate={{
                      x: [
                        0,
                        Math.cos((i * Math.PI * 2) / 8) * 40,
                      ],
                      y: [
                        0,
                        Math.sin((i * Math.PI * 2) / 8) * 40,
                      ],
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </>
            )}
          </div>

          {/* Shadow */}
          <div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-3 bg-black/40 rounded-full blur-lg"
            style={{
              transform: 'translateZ(-10px)',
            }}
          />
        </div>

        {/* Badge name */}
        <motion.div
          className={`mt-3 text-center ${sizeConfig.text} font-semibold ${
            unlocked ? 'text-white' : 'text-gray-500'
          }`}
          style={{
            transform: 'translateZ(10px)',
          }}
        >
          {name}
        </motion.div>
      </motion.div>
    </div>
  )
}
