'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Info } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface TarotCard {
  id: string
  name: string
  arcana: string
  image: string
  keywords: string[]
  upright: string
  reversed: string
  description: string
}

export default function CardOfTheDay() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [cardOfDay, setCardOfDay] = useState<TarotCard | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCardOfDay()
  }, [])

  const fetchCardOfDay = async () => {
    try {
      setLoading(true)
      // Simular fetch da API - substituir por chamada real
      const response = await fetch('/api/card-of-day')
      if (response.ok) {
        const data = await response.json()
        setCardOfDay(data.card)
      } else {
        // Fallback para carta mock
        setCardOfDay(getMockCard())
      }
    } catch (error) {
      console.error('Erro ao buscar carta do dia:', error)
      setCardOfDay(getMockCard())
    } finally {
      setLoading(false)
    }
  }

  const getMockCard = (): TarotCard => {
    return {
      id: '0',
      name: 'O Louco',
      arcana: 'Arcano Maior',
      image: '/tarot/fool.jpg',
      keywords: ['Novos começos', 'Aventura', 'Inocência', 'Espontaneidade'],
      upright: 'Novos começos, aventura, inocência, liberdade',
      reversed: 'Imprudência, risco desnecessário, falta de direção',
      description: 'O Louco representa novos começos e a jornada do herói. É o início de uma aventura espiritual.',
    }
  }

  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true)
    }
  }

  const handleOpenModal = () => {
    if (isFlipped) {
      setShowModal(true)
    }
  }

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border-purple-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-48">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-8 h-8 text-purple-400" />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!cardOfDay) return null

  return (
    <>
      <Card className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border-purple-500/30 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-cinzel text-purple-200 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              Carta do Dia
            </h3>
            {isFlipped && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleOpenModal}
                className="text-purple-300 hover:text-purple-100"
              >
                <Info className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* 3D Card Container */}
          <div
            className="relative w-full aspect-[2/3] max-w-[200px] mx-auto cursor-pointer perspective-1000"
            onClick={handleFlip}
          >
            <motion.div
              className="relative w-full h-full"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              {/* Card Back */}
              <div
                className="absolute inset-0 backface-hidden rounded-lg overflow-hidden"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="w-full h-full bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 p-4 flex items-center justify-center relative">
                  {/* Mystical pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
                  </div>
                  
                  {/* Center symbol */}
                  <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                      scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                    }}
                    className="relative"
                  >
                    <Sparkles className="w-16 h-16 text-yellow-300" />
                  </motion.div>

                  {/* Border decoration */}
                  <div className="absolute inset-2 border-2 border-yellow-300/50 rounded-md" />
                </div>
              </div>

              {/* Card Front */}
              <div
                className="absolute inset-0 backface-hidden rounded-lg overflow-hidden"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <div className="w-full h-full bg-white relative">
                  {/* Card Image */}
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-100 to-blue-100 flex items-center justify-center">
                    {/* Placeholder - substituir por imagem real */}
                    <div className="text-center p-4">
                      <div className="text-6xl mb-4">🃏</div>
                      <h4 className="font-cinzel text-xl text-purple-900 mb-2">
                        {cardOfDay.name}
                      </h4>
                      <p className="text-sm text-purple-700">{cardOfDay.arcana}</p>
                    </div>
                  </div>

                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 5,
                      ease: 'easeInOut',
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Instructions */}
          {!isFlipped && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm text-purple-300 mt-4"
            >
              Toque para revelar sua carta
            </motion.p>
          )}

          {/* Card Name */}
          {isFlipped && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-center"
            >
              <h4 className="font-cinzel text-lg text-purple-100 mb-1">
                {cardOfDay.name}
              </h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {cardOfDay.keywords.slice(0, 3).map((keyword, index) => (
                  <span
                    key={index}
                    className="text-xs bg-purple-500/30 text-purple-200 px-2 py-1 rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Interpretation Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-gradient-to-br from-purple-950 to-blue-950 border-purple-500/50 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-cinzel text-2xl text-purple-200 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              {cardOfDay.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* Arcana */}
            <div>
              <p className="text-sm text-purple-300 mb-1">Arcano</p>
              <p className="text-purple-100">{cardOfDay.arcana}</p>
            </div>

            {/* Description */}
            <div>
              <p className="text-sm text-purple-300 mb-1">Descrição</p>
              <p className="text-purple-100 leading-relaxed">{cardOfDay.description}</p>
            </div>

            {/* Keywords */}
            <div>
              <p className="text-sm text-purple-300 mb-2">Palavras-chave</p>
              <div className="flex flex-wrap gap-2">
                {cardOfDay.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="text-sm bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Upright */}
            <div>
              <p className="text-sm text-purple-300 mb-1">Posição Normal</p>
              <p className="text-purple-100 leading-relaxed">{cardOfDay.upright}</p>
            </div>

            {/* Reversed */}
            <div>
              <p className="text-sm text-purple-300 mb-1">Posição Invertida</p>
              <p className="text-purple-100 leading-relaxed">{cardOfDay.reversed}</p>
            </div>

            {/* CTA */}
            <Button
              onClick={() => setShowModal(false)}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Entendi
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </>
  )
}
