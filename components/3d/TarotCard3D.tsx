'use client'

import { useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import Image from 'next/image'

interface TarotCard3DProps {
  name: string
  imageUrl: string
  arcana: string
  onClick?: () => void
  size?: 'small' | 'medium' | 'large'
  showName?: boolean
  glowColor?: string
}

const SIZE_CONFIG = {
  small: {
    width: 120,
    height: 200,
    fontSize: 'text-sm',
  },
  medium: {
    width: 180,
    height: 300,
    fontSize: 'text-base',
  },
  large: {
    width: 240,
    height: 400,
    fontSize: 'text-lg',
  },
}

export default function TarotCard3D({
  name,
  imageUrl,
  arcana,
  onClick,
  size = 'medium',
  showName = true,
  glowColor = '#9333ea',
}: TarotCard3DProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  // Mouse position for 3D effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  // Transform mouse position to rotation
  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15])
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15])
  
  const config = SIZE_CONFIG[size]

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = event.clientX - centerX
    const mouseY = event.clientY - centerY
    
    x.set(mouseX / rect.width)
    y.set(mouseY / rect.height)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <div className="perspective-1000">
      <motion.div
        className="relative cursor-pointer"
        style={{
          width: config.width,
          height: config.height,
          transformStyle: 'preserve-3d',
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {/* Card container */}
        <div
          className="relative w-full h-full rounded-2xl overflow-hidden"
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: isHovered
              ? `0 25px 50px -12px ${glowColor}80, 0 0 30px ${glowColor}60`
              : `0 10px 25px -5px rgba(0, 0, 0, 0.5)`,
          }}
        >
          {/* Card border/frame */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-600 via-yellow-700 to-yellow-800 p-2 rounded-2xl">
            {/* Inner card */}
            <div className="relative w-full h-full bg-gradient-to-br from-indigo-950 to-purple-950 rounded-xl overflow-hidden">
              {/* Card image */}
              <div className="relative w-full h-full">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes={`${config.width}px`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900">
                    <div className="text-center p-4">
                      <div className="text-6xl mb-4">🃏</div>
                      <div className="text-white font-cinzel">{name}</div>
                    </div>
                  </div>
                )}
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
              </div>

              {/* Card name at bottom */}
              {showName && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                  <h3 className={`font-cinzel text-white text-center ${config.fontSize} font-semibold`}>
                    {name}
                  </h3>
                  <p className="text-xs text-purple-300 text-center mt-1">
                    {arcana}
                  </p>
                </div>
              )}

              {/* Decorative corners */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-yellow-400/50 rounded-tl-lg" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-yellow-400/50 rounded-tr-lg" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-yellow-400/50 rounded-bl-lg" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-yellow-400/50 rounded-br-lg" />
            </div>
          </div>

          {/* Shine effect on hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)`,
              }}
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 1,
                ease: 'easeInOut',
              }}
            />
          )}

          {/* Holographic effect */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(147, 51, 234, 0.1) 2px,
                  rgba(147, 51, 234, 0.1) 4px
                )
              `,
            }}
          />
        </div>

        {/* Floating particles around card on hover */}
        {isHovered && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-purple-400"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: [0, (Math.cos((i * Math.PI * 2) / 8) * config.width) / 2],
                  y: [0, (Math.sin((i * Math.PI * 2) / 8) * config.height) / 2],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </>
        )}
      </motion.div>
    </div>
  )
}
