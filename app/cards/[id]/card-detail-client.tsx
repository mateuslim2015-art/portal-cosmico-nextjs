
'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gem, ArrowLeft, Star, BookOpen, Hash } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface CardDetailClientProps {
  card: any
}

export default function CardDetailClient({ card }: CardDetailClientProps) {
  const suitNames = {
    cups: 'Copas',
    wands: 'Paus',
    swords: 'Espadas',
    pentacles: 'Ouros'
  }

  return (
    <div className="min-h-screen mystical-gradient">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-purple-900/20 border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/cards" className="flex items-center space-x-3 text-white hover:text-yellow-400 transition-colors">
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
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Card Image */}
          <div className="flex justify-center">
            <div className="tarot-card w-80 aspect-[2/3] cosmic-glow relative">
              {card.imageUrl ? (
                <Image
                  src={card.imageUrl}
                  alt={card.name}
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-purple-800 to-indigo-900 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-400 text-lg font-bold text-center p-4">{card.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Card Information */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                {card.type === 'major' ? (
                  <Star className="w-6 h-6 text-yellow-400" />
                ) : (
                  <Hash className="w-6 h-6 text-yellow-400" />
                )}
                <h1 className="text-3xl font-bold text-white">
                  {card.number !== null ? `${card.number}. ` : ''}{card.name}
                </h1>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="bg-purple-600 text-white">
                  {card.type === 'major' ? 'Arcano Maior' : 'Arcano Menor'}
                </Badge>
                {card.suit && (
                  <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                    {suitNames[card.suit as keyof typeof suitNames]}
                  </Badge>
                )}
                {card.element && (
                  <Badge variant="outline" className="border-purple-500 text-purple-300">
                    Elemento: {card.element}
                  </Badge>
                )}
                {card.astrology && (
                  <Badge variant="outline" className="border-blue-500 text-blue-300">
                    {card.astrology}
                  </Badge>
                )}
              </div>

              <p className="text-purple-100 text-lg leading-relaxed">
                {card.shortMeaning}
              </p>
            </div>

            {/* Keywords */}
            {card.keywords && card.keywords.length > 0 && (
              <Card className="bg-gradient-to-b from-purple-900/50 to-indigo-900/50 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Palavras-Chave</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {card.keywords.map((keyword: string, index: number) => (
                      <Badge key={index} variant="secondary" className="bg-purple-700 text-purple-100">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Detailed Meaning */}
            <Card className="bg-gradient-to-b from-purple-900/50 to-indigo-900/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-yellow-400" />
                  Significado Detalhado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none">
                  <p className="text-purple-100 whitespace-pre-wrap leading-relaxed">
                    {card.longMeaning}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Link href="/cards">
                <Button variant="outline" className="border-purple-500/30 text-white hover:bg-purple-600">
                  Voltar à Biblioteca
                </Button>
              </Link>
              <Link href="/reading">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Fazer uma Leitura
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
