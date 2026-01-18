
'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Gem, ArrowLeft, Moon, History, Calendar, Eye, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ReadingsClientProps {
  readings: any[]
}

export default function ReadingsClient({ readings }: ReadingsClientProps) {
  const [expandedReadings, setExpandedReadings] = useState<Set<string>>(new Set())

  const toggleReading = (readingId: string) => {
    setExpandedReadings(prev => {
      const newSet = new Set(prev)
      if (newSet.has(readingId)) {
        newSet.delete(readingId)
      } else {
        newSet.add(readingId)
      }
      return newSet
    })
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getSpreadName = (type: string) => {
    const types = {
      'single': 'Carta Única',
      'three-card': '3 Cartas',
      'celtic-cross': 'Cruz Celta'
    }
    return types[type as keyof typeof types] || type
  }

  return (
    <div className="min-h-screen mystical-gradient">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-purple-900/20 border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-3 text-white hover:text-yellow-400 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <div className="relative w-40 h-10">
                <Image 
                  src="/logo-complete.png" 
                  alt="Portal Cósmico"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
            <History className="w-10 h-10 mr-3 text-yellow-400" />
            Histórico de Leituras
          </h1>
          <p className="text-purple-100 text-lg">
            {readings.length} {readings.length === 1 ? 'leitura realizada' : 'leituras realizadas'}
          </p>
        </div>

        {/* Readings List */}
        {readings.length > 0 ? (
          <div className="space-y-6">
            {readings.map((reading) => (
              <Card key={reading.id} className="bg-gradient-to-b from-purple-900/80 to-indigo-900/80 border-purple-500/30 card-glow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white flex items-center">
                        <Moon className="w-5 h-5 mr-2 text-yellow-400" />
                        {getSpreadName(reading.spreadType)}
                      </CardTitle>
                      <CardDescription className="text-purple-100">
                        {reading.question || "Consulta geral"}
                      </CardDescription>
                    </div>
                    <div className="text-right text-sm text-purple-300 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(reading.createdAt)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Cards Display */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {reading.cards?.map((readingCard: any, index: number) => (
                      <div
                        key={readingCard.id}
                        className="relative w-16 h-24 tarot-card rounded-lg flex-shrink-0"
                        title={readingCard.card?.name}
                      >
                        {readingCard.card?.imageUrl && (
                          <Image
                            src={readingCard.card.imageUrl}
                            alt={readingCard.card.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        )}
                        {readingCard.isReversed && (
                          <div className="absolute inset-0 bg-red-500/20 rounded-lg flex items-center justify-center">
                            <span className="text-red-300 text-xs font-bold rotate-180">↓</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Interpretation */}
                  <div className="bg-purple-800/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">Interpretação:</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleReading(reading.id)}
                        className="text-yellow-400 hover:text-yellow-300 hover:bg-purple-700/50"
                      >
                        {expandedReadings.has(reading.id) ? (
                          <>
                            <ChevronUp className="w-4 h-4 mr-1" />
                            Recolher
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4 mr-1" />
                            Ver Completa
                          </>
                        )}
                      </Button>
                    </div>
                    <div className={expandedReadings.has(reading.id) ? "" : "line-clamp-3"}>
                      <p className="text-purple-100 text-sm whitespace-pre-wrap">
                        {reading.interpretation}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty State */
          <Card className="bg-gradient-to-b from-purple-900/60 to-indigo-900/60 border-purple-500/30">
            <CardContent className="p-8 text-center">
              <History className="w-16 h-16 text-yellow-400 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-white mb-2">Nenhuma leitura ainda</h3>
              <p className="text-purple-100 mb-6">
                Você ainda não realizou nenhuma leitura. Que tal começar sua jornada mística agora?
              </p>
              <Link href="/reading">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Moon className="w-5 h-5 mr-2" />
                  Fazer Primeira Leitura
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Back to Dashboard */}
        <div className="text-center mt-8">
          <Link href="/dashboard">
            <Button variant="outline" className="border-purple-500/30 text-white hover:bg-purple-600">
              Voltar ao Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
