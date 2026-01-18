
'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Gem, ArrowLeft, Shuffle, Sparkles, Moon, Star, Book, Camera, Upload } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { toast } from "@/hooks/use-toast"

interface ReadingClientProps {
  cards: any[]
}

export default function ReadingClient({ cards }: ReadingClientProps) {
  const [step, setStep] = useState<'setup' | 'method' | 'photo' | 'cards' | 'interpretation'>('setup')
  const [readingMethod, setReadingMethod] = useState<'manual' | 'photo' | ''>('')
  const [spreadType, setSpreadType] = useState('')
  const [question, setQuestion] = useState('')
  const [selectedCards, setSelectedCards] = useState<any[]>([])
  const [shuffledCards, setShuffledCards] = useState<any[]>([])
  const [interpretation, setInterpretation] = useState('')
  const [cardsIdentified, setCardsIdentified] = useState('')
  const [individualInterpretation, setIndividualInterpretation] = useState('')
  const [generalInterpretation, setGeneralInterpretation] = useState('')
  const [currentStatus, setCurrentStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const spreadTypes = [
    { value: 'single', label: 'Carta Única', description: 'Uma carta para insight geral', cards: 1 },
    { value: 'three-card', label: '3 Cartas', description: 'Passado, presente e futuro', cards: 3 },
    { value: 'celtic-cross', label: 'Cruz Celta', description: 'Leitura completa com 10 cartas', cards: 10 },
  ]

  const handleMethodChoice = () => {
    setStep('method')
  }

  const handleManualMethod = () => {
    setReadingMethod('manual')
    const shuffled = [...cards].sort(() => Math.random() - 0.5)
    setShuffledCards(shuffled)
    setStep('cards')
  }

  const handlePhotoMethod = () => {
    setReadingMethod('photo')
    setStep('photo')
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setPhotoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePhotoUpload = async () => {
    if (!photoFile) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma foto",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setStep('interpretation') // Move to interpretation screen

    try {
      // Upload photo
      const formData = new FormData()
      formData.append('photo', photoFile)

      const uploadResponse = await fetch('/api/reading/photo-upload', {
        method: 'POST',
        body: formData,
      })

      if (!uploadResponse.ok) {
        throw new Error('Erro ao enviar foto')
      }

      const { cloudStoragePath } = await uploadResponse.json()

      // Get interpretation from photo with streaming
      const interpretResponse = await fetch('/api/reading/interpret-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cloudStoragePath,
          spreadType,
          question,
        }),
      })

      if (!interpretResponse.ok) {
        throw new Error('Erro ao interpretar foto')
      }

      const reader = interpretResponse.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          
          const chunk = decoder.decode(value)
          const lines = chunk.split('\n\n')
          
          for (const line of lines) {
            if (line.trim()) {
              try {
                const data = JSON.parse(line)
                
                if (data.type === 'status') {
                  setCurrentStatus(data.content)
                } else if (data.type === 'cards') {
                  setCardsIdentified(data.content)
                  setCurrentStatus('')
                } else if (data.type === 'individual') {
                  setIndividualInterpretation(prev => prev + data.content)
                } else if (data.type === 'general') {
                  setGeneralInterpretation(prev => prev + data.content)
                } else if (data.type === 'done') {
                  setIsLoading(false)
                  setCurrentStatus('')
                  toast({
                    title: "✨ Leitura Completa!",
                    description: "Sua interpretação mística está pronta",
                  })
                } else if (data.type === 'error') {
                  throw new Error(data.content)
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível processar a foto",
        variant: "destructive",
      })
      setIsLoading(false)
      setStep('photo')
    }
  }

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5)
    setShuffledCards(shuffled)
    setStep('cards')
  }

  const selectCard = (card: any) => {
    const currentSpread = spreadTypes.find(s => s.value === spreadType)
    if (!currentSpread) return

    if (selectedCards.length < currentSpread.cards) {
      setSelectedCards([...selectedCards, card])
    }

    if (selectedCards.length + 1 === currentSpread.cards) {
      // All cards selected, get interpretation
      setTimeout(() => {
        getInterpretation([...selectedCards, card])
      }, 500)
    }
  }

  const getInterpretation = async (cards: any[]) => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/reading/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spreadType,
          question,
          cards: cards.map((card, index) => ({
            ...card,
            position: index,
            isReversed: Math.random() < 0.3 // 30% chance of being reversed
          }))
        }),
      })

      if (!response.ok) {
        throw new Error('Erro ao obter interpretação')
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullInterpretation = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          
          const chunk = decoder.decode(value)
          fullInterpretation += chunk
          setInterpretation(fullInterpretation)
        }
      }

      setStep('interpretation')
      toast({
        title: "Leitura Completa!",
        description: "Sua interpretação mística está pronta",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível obter a interpretação",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const resetReading = () => {
    setStep('setup')
    setReadingMethod('')
    setSpreadType('')
    setQuestion('')
    setSelectedCards([])
    setShuffledCards([])
    setInterpretation('')
    setCardsIdentified('')
    setIndividualInterpretation('')
    setGeneralInterpretation('')
    setCurrentStatus('')
    setPhotoFile(null)
    setPhotoPreview('')
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
            <div className="text-white">
              Leitura de Tarot
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {step === 'setup' && (
          <Card className="bg-gradient-to-b from-purple-900/80 to-indigo-900/80 border-purple-500/30 cosmic-glow">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-white flex items-center justify-center">
                <Moon className="w-8 h-8 mr-3 text-yellow-400" />
                Nova Leitura de Tarot
              </CardTitle>
              <p className="text-purple-100 mt-2">
                Configure sua consulta e deixe o universo guiar suas escolhas
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="spreadType" className="text-white">Tipo de Tiragem</Label>
                <select
                  id="spreadType"
                  value={spreadType}
                  onChange={(e) => {
                    console.log('Select changed:', e.target.value);
                    setSpreadType(e.target.value);
                  }}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-purple-500/30 bg-purple-900/50 px-3 py-2 text-sm text-white ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Escolha o tipo de leitura</option>
                  {spreadTypes.map((spread) => (
                    <option key={spread.value} value={spread.value} className="bg-purple-900 text-white">
                      {spread.label} - {spread.description}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="question" className="text-white">Pergunta (Opcional)</Label>
                <Textarea
                  id="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Faça uma pergunta específica ou deixe em branco para um insight geral..."
                  className="bg-purple-900/50 border-purple-500/30 text-white placeholder-purple-300"
                  rows={3}
                />
              </div>

              <div className="text-center pt-4">
                <Button
                  onClick={handleMethodChoice}
                  disabled={!spreadType}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Continuar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'method' && (
          <Card className="bg-gradient-to-b from-purple-900/80 to-indigo-900/80 border-purple-500/30 cosmic-glow">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-white flex items-center justify-center">
                <Star className="w-8 h-8 mr-3 text-yellow-400" />
                Escolha o Método de Leitura
              </CardTitle>
              <p className="text-purple-100 mt-2">
                Como deseja realizar sua consulta?
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Manual Method */}
                <button
                  onClick={handleManualMethod}
                  className="group relative p-8 rounded-xl border-2 border-purple-500/30 bg-purple-800/30 hover:bg-purple-700/40 hover:border-purple-400/50 transition-all"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Shuffle className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Leitura Virtual</h3>
                      <p className="text-purple-200">
                        Embaralhe as cartas digitalmente e escolha com sua intuição
                      </p>
                    </div>
                  </div>
                </button>

                {/* Photo Method */}
                <button
                  onClick={handlePhotoMethod}
                  className="group relative p-8 rounded-xl border-2 border-yellow-500/30 bg-yellow-900/20 hover:bg-yellow-800/30 hover:border-yellow-400/50 transition-all"
                >
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-xs font-bold bg-yellow-500 text-purple-900 rounded-full">
                      NOVIDADE
                    </span>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-600 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Camera className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Interpretar Foto</h3>
                      <p className="text-purple-200">
                        Tire uma foto da sua tiragem física e a IA fará a interpretação
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              <div className="text-center pt-4">
                <Button
                  onClick={() => setStep('setup')}
                  variant="outline"
                  className="border-purple-500/30 text-white hover:bg-purple-600"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'photo' && (
          <Card className="bg-gradient-to-b from-purple-900/80 to-indigo-900/80 border-purple-500/30 cosmic-glow">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-white flex items-center justify-center">
                <Camera className="w-8 h-8 mr-3 text-yellow-400" />
                Envie a Foto da Sua Tiragem
              </CardTitle>
              <p className="text-purple-100 mt-2">
                A IA irá identificar as cartas e fazer a interpretação mística
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Photo Upload Area */}
              <div className="space-y-4">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="relative border-2 border-dashed border-purple-500/30 rounded-lg p-8 hover:border-purple-400/50 transition-all cursor-pointer bg-purple-800/20"
                >
                  {photoPreview ? (
                    <div className="relative w-full aspect-video">
                      <Image
                        src={photoPreview}
                        alt="Preview"
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Upload className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                      <p className="text-white font-medium mb-2">
                        Clique para escolher uma foto
                      </p>
                      <p className="text-purple-300 text-sm">
                        ou arraste e solte aqui
                      </p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>

                {photoPreview && (
                  <div className="text-center">
                    <Button
                      onClick={() => {
                        setPhotoFile(null)
                        setPhotoPreview('')
                      }}
                      variant="outline"
                      size="sm"
                      className="border-purple-500/30 text-white hover:bg-purple-600"
                    >
                      Escolher Outra Foto
                    </Button>
                  </div>
                )}
              </div>

              {/* Tips */}
              <div className="bg-purple-800/30 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                  Dicas para melhor resultado:
                </h4>
                <ul className="text-purple-200 text-sm space-y-1 list-disc list-inside">
                  <li>Tire a foto em boa iluminação</li>
                  <li>Certifique-se que todas as cartas estão visíveis</li>
                  <li>Mantenha a câmera perpendicular às cartas</li>
                  <li>Evite sombras ou reflexos fortes</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 pt-4">
                <Button
                  onClick={() => setStep('method')}
                  variant="outline"
                  className="border-purple-500/30 text-white hover:bg-purple-600"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
                <Button
                  onClick={handlePhotoUpload}
                  disabled={!photoFile || isLoading}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Analisando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Interpretar Foto
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'cards' && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-b from-purple-900/80 to-indigo-900/80 border-purple-500/30">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white flex items-center justify-center">
                  <Star className="w-6 h-6 mr-2 text-yellow-400" />
                  Escolha {spreadTypes.find(s => s.value === spreadType)?.cards} 
                  {spreadTypes.find(s => s.value === spreadType)?.cards === 1 ? ' carta' : ' cartas'}
                </CardTitle>
                <p className="text-purple-100">
                  Confie na sua intuição e selecione as cartas que mais te chamam atenção
                </p>
                <div className="text-yellow-400 font-medium">
                  {selectedCards.length} de {spreadTypes.find(s => s.value === spreadType)?.cards} selecionadas
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-10 gap-2 mb-6">
                  {shuffledCards.slice(0, 30).map((card, index) => (
                    <button
                      key={`${card.id}-${index}`}
                      onClick={() => selectCard(card)}
                      disabled={selectedCards.length >= (spreadTypes.find(s => s.value === spreadType)?.cards || 0)}
                      className="tarot-card aspect-[2/3] bg-gradient-to-b from-purple-800 to-indigo-800 border-2 border-yellow-600 rounded-lg p-1 hover:border-yellow-400 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="w-full h-full bg-gradient-to-b from-purple-900 to-indigo-900 rounded border border-yellow-800 flex items-center justify-center">
                        <div className="text-yellow-400 text-xs font-bold writing-mode-vertical text-center">
                          TAROT
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {selectedCards.length > 0 && (
                  <div className="text-center">
                    <h3 className="text-white font-medium mb-4">Cartas Selecionadas:</h3>
                    <div className="flex justify-center space-x-4">
                      {selectedCards.map((card, index) => (
                        <div key={card.id} className="text-center">
                          <div className="tarot-card w-20 h-30 mb-2 cosmic-glow">
                            {card.imageUrl && (
                              <Image
                                src={card.imageUrl}
                                alt={card.name}
                                fill
                                className="object-cover rounded-lg"
                              />
                            )}
                          </div>
                          <p className="text-yellow-400 text-sm font-medium">{card.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'interpretation' && (
          <div className="space-y-6">
            {/* Photo Preview */}
            {readingMethod === 'photo' && photoPreview && (
              <Card className="bg-gradient-to-b from-purple-900/80 to-indigo-900/80 border-purple-500/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl text-white flex items-center justify-center">
                    <Camera className="w-5 h-5 mr-2 text-yellow-400" />
                    Foto da Sua Tiragem
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full max-w-3xl mx-auto aspect-video">
                    <Image
                      src={photoPreview}
                      alt="Tiragem fotografada"
                      fill
                      className="object-contain rounded-lg cosmic-glow"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Manual Cards Display */}
            {readingMethod === 'manual' && selectedCards.length > 0 && (
              <Card className="bg-gradient-to-b from-purple-900/80 to-indigo-900/80 border-purple-500/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl text-white flex items-center justify-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-400" />
                    Suas Cartas Escolhidas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center space-x-4 flex-wrap">
                    {selectedCards.map((card, index) => (
                      <div key={card.id} className="text-center mb-4">
                        <div className="tarot-card w-24 h-36 mb-2 cosmic-glow relative">
                          {card.imageUrl && (
                            <Image
                              src={card.imageUrl}
                              alt={card.name}
                              fill
                              className="object-cover rounded-lg"
                            />
                          )}
                        </div>
                        <p className="text-yellow-400 text-sm font-medium">{card.name}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Current Status */}
            {currentStatus && (
              <Card className="bg-gradient-to-r from-purple-800/50 to-indigo-800/50 border-purple-500/30">
                <CardContent className="py-6">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="animate-spin w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full"></div>
                    <p className="text-white font-medium">{currentStatus}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Cards Identified */}
            {cardsIdentified && readingMethod === 'photo' && (
              <Card className="bg-gradient-to-b from-purple-900/80 to-indigo-900/80 border-purple-500/30 cosmic-glow">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 mr-2" />
                    Cartas Identificadas pela IA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none">
                    <div className="text-purple-100 whitespace-pre-wrap leading-relaxed">
                      {cardsIdentified}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Individual Interpretations */}
            {individualInterpretation && (
              <Card className="bg-gradient-to-b from-purple-900/80 to-indigo-900/80 border-purple-500/30 cosmic-glow">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center">
                    <Book className="w-5 h-5 text-yellow-400 mr-2" />
                    Interpretação Individual das Cartas
                  </CardTitle>
                  <p className="text-purple-200 text-sm mt-2">
                    Análise detalhada de cada carta e seu significado nesta leitura
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none">
                    <div className="text-purple-100 whitespace-pre-wrap leading-relaxed">
                      {individualInterpretation}
                    </div>
                    {isLoading && !generalInterpretation && (
                      <div className="flex items-center space-x-2 mt-4 text-yellow-400">
                        <div className="animate-pulse">▋</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* General Interpretation */}
            {generalInterpretation && (
              <Card className="bg-gradient-to-b from-purple-900/80 to-indigo-900/80 border-purple-500/30 cosmic-glow">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center">
                    <Sparkles className="w-5 h-5 text-yellow-400 mr-2" />
                    Interpretação Geral da Leitura
                  </CardTitle>
                  <p className="text-purple-200 text-sm mt-2">
                    Conectando todas as cartas em uma visão completa
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none">
                    <div className="text-purple-100 whitespace-pre-wrap leading-relaxed">
                      {generalInterpretation}
                    </div>
                    {isLoading && (
                      <div className="flex items-center space-x-2 mt-4 text-yellow-400">
                        <div className="animate-pulse">▋</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Manual Reading Interpretation */}
            {readingMethod === 'manual' && interpretation && (
              <Card className="bg-gradient-to-b from-purple-900/80 to-indigo-900/80 border-purple-500/30 cosmic-glow">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center">
                    <Book className="w-5 h-5 text-yellow-400 mr-2" />
                    Interpretação da Leitura
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none">
                    <div className="text-purple-100 whitespace-pre-wrap leading-relaxed">
                      {interpretation}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Loading State */}
            {isLoading && !cardsIdentified && !individualInterpretation && !generalInterpretation && !interpretation && (
              <Card className="bg-gradient-to-b from-purple-900/80 to-indigo-900/80 border-purple-500/30">
                <CardContent className="py-12">
                  <div className="text-center">
                    <div className="animate-spin w-12 h-12 border-3 border-yellow-400 border-t-transparent rounded-full mx-auto mb-6"></div>
                    <p className="text-white text-lg font-medium mb-2">
                      Consultando as energias místicas...
                    </p>
                    <p className="text-purple-200 text-sm">
                      A IA está analisando sua tiragem com profundidade
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            {!isLoading && (cardsIdentified || interpretation) && (
              <div className="flex justify-center space-x-4 pt-6">
                <Button
                  onClick={resetReading}
                  variant="outline"
                  size="lg"
                  className="border-purple-500/30 text-white hover:bg-purple-600"
                >
                  <Shuffle className="w-4 h-4 mr-2" />
                  Nova Leitura
                </Button>
                <Link href="/dashboard">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar ao Dashboard
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
