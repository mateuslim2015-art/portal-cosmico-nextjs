
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Gem, ArrowLeft, Search, BookOpen } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface CardsClientProps {
  cards: any[]
}

export default function CardsClient({ cards }: CardsClientProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterSuit, setFilterSuit] = useState<string>('all')

  // Filter cards based on search term and filters
  const filteredCards = cards.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.keywords?.some((keyword: string) => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesType = filterType === 'all' || card.type === filterType
    
    const matchesSuit = filterSuit === 'all' || 
                       (filterSuit === 'major' && card.type === 'major') ||
                       card.suit === filterSuit

    return matchesSearch && matchesType && matchesSuit
  })

  // Group cards by type
  const majorArcana = filteredCards.filter(card => card.type === 'major')
  const minorArcana = filteredCards.filter(card => card.type === 'minor')

  const suits = ['cups', 'wands', 'swords', 'pentacles']
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

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
            <BookOpen className="w-10 h-10 mr-3 text-yellow-400" />
            Biblioteca de Cartas
          </h1>
          <p className="text-purple-100 text-lg max-w-2xl mx-auto">
            Explore os 78 arcanos do Tarot e descubra seus significados profundos
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 bg-gradient-to-b from-purple-900/80 to-indigo-900/80 border-purple-500/30">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
                <Input
                  placeholder="Buscar cartas por nome ou palavra-chave..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-purple-900/50 border-purple-500/30 text-white placeholder-purple-300"
                />
              </div>
              
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-48 bg-purple-900/50 border-purple-500/30 text-white">
                  <SelectValue placeholder="Tipo de Arcano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Tipos</SelectItem>
                  <SelectItem value="major">Arcanos Maiores</SelectItem>
                  <SelectItem value="minor">Arcanos Menores</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterSuit} onValueChange={setFilterSuit}>
                <SelectTrigger className="w-full md:w-48 bg-purple-900/50 border-purple-500/30 text-white">
                  <SelectValue placeholder="Naipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Naipes</SelectItem>
                  <SelectItem value="major">Arcanos Maiores</SelectItem>
                  <SelectItem value="cups">Copas</SelectItem>
                  <SelectItem value="wands">Paus</SelectItem>
                  <SelectItem value="swords">Espadas</SelectItem>
                  <SelectItem value="pentacles">Ouros</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-purple-100">
            Mostrando {filteredCards.length} de {cards.length} cartas
          </p>
        </div>

        {/* Major Arcana */}
        {majorArcana.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Arcanos Maiores</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {majorArcana.map((card) => (
                <Link key={card.id} href={`/cards/${card.id}`}>
                  <div className="group cursor-pointer">
                    <div className="tarot-card w-full aspect-[2/3] mb-2 card-glow relative">
                      {card.imageUrl ? (
                        <Image
                          src={card.imageUrl}
                          alt={card.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-b from-purple-800 to-indigo-900 rounded-lg flex items-center justify-center">
                          <span className="text-yellow-400 text-xs text-center p-2">{card.name}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-white text-sm font-medium text-center group-hover:text-yellow-400 transition-colors">
                      {card.number !== null ? `${card.number}. ` : ''}{card.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Minor Arcana by Suit */}
        {suits.map(suit => {
          const suitCards = minorArcana.filter(card => card.suit === suit)
          if (suitCards.length === 0) return null

          return (
            <div key={suit} className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">
                {suitNames[suit as keyof typeof suitNames]}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {suitCards.map((card) => (
                  <Link key={card.id} href={`/cards/${card.id}`}>
                    <div className="group cursor-pointer">
                      <div className="tarot-card w-full aspect-[2/3] mb-2 card-glow relative">
                        {card.imageUrl ? (
                          <Image
                            src={card.imageUrl}
                            alt={card.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-b from-purple-800 to-indigo-900 rounded-lg flex items-center justify-center">
                            <span className="text-yellow-400 text-xs text-center p-2">{card.name}</span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-white text-sm font-medium text-center group-hover:text-yellow-400 transition-colors">
                        {card.name}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}

        {/* Empty State */}
        {filteredCards.length === 0 && (
          <Card className="bg-gradient-to-b from-purple-900/60 to-indigo-900/60 border-purple-500/30">
            <CardContent className="p-8 text-center">
              <Search className="w-16 h-16 text-yellow-400 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-white mb-2">Nenhuma carta encontrada</h3>
              <p className="text-purple-100">
                Tente ajustar os filtros ou termos de busca para encontrar as cartas que procura.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
