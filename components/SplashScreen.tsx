"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [particles, setParticles] = useState<Array<{ id: number; angle: number; radius: number; speed: number; size: number }>>([]);

  useEffect(() => {
    // Gerar partículas do portal
    const particleCount = 60;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      angle: (i / particleCount) * Math.PI * 2,
      radius: 120 + Math.random() * 40,
      speed: 0.5 + Math.random() * 0.5,
      size: 3 + Math.random() * 5,
    }));
    setParticles(newParticles);

    // Completar após 3 segundos
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#0A0E27] via-[#1a1f3a] to-[#0A0E27]"
    >
      {/* Portal de partículas */}
      <div className="relative w-80 h-80">
        {/* Partículas animadas */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              background: `radial-gradient(circle, ${
                particle.id % 3 === 0
                  ? "#a78bfa"
                  : particle.id % 3 === 1
                  ? "#818cf8"
                  : "#60a5fa"
              }, transparent)`,
              boxShadow: `0 0 ${particle.size * 2}px ${
                particle.id % 3 === 0
                  ? "#a78bfa"
                  : particle.id % 3 === 1
                  ? "#818cf8"
                  : "#60a5fa"
              }`,
            }}
            animate={{
              x: [
                Math.cos(particle.angle) * particle.radius,
                Math.cos(particle.angle + Math.PI * 2) * particle.radius,
              ],
              y: [
                Math.sin(particle.angle) * particle.radius,
                Math.sin(particle.angle + Math.PI * 2) * particle.radius,
              ],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 / particle.speed,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Logo central */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              animate={{
                textShadow: [
                  "0 0 20px #a78bfa, 0 0 40px #a78bfa",
                  "0 0 30px #818cf8, 0 0 60px #818cf8",
                  "0 0 20px #a78bfa, 0 0 40px #a78bfa",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-4xl font-bold text-white tracking-[0.3em]"
              style={{
                fontFamily: "'Cinzel', serif",
              }}
            >
              PORTAL
            </motion.div>
            <motion.div
              animate={{
                textShadow: [
                  "0 0 20px #60a5fa, 0 0 40px #60a5fa",
                  "0 0 30px #818cf8, 0 0 60px #818cf8",
                  "0 0 20px #60a5fa, 0 0 40px #60a5fa",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="text-4xl font-bold text-white tracking-[0.3em]"
              style={{
                fontFamily: "'Cinzel', serif",
              }}
            >
              CÓSMICO
            </motion.div>
          </div>
        </motion.div>

        {/* Círculo de brilho central */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-64 h-64 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent 70%)",
            }}
          />
        </motion.div>
      </div>

      {/* Barra de progresso */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 3, ease: "linear" }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full"
        style={{ width: "200px" }}
      />
    </motion.div>
  );
}
