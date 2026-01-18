'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { ArrowLeft, BookOpen, Plus, Calendar } from 'lucide-react'
import Link from 'next/link'

interface JournalEntry {
  id: string
  title: string
  content: string
  date: string
  mood: string
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      title: 'Primeira Leitura de Tarot',
      content: 'Hoje fiz minha primeira leitura de três cartas. Foi uma experiência incrível! As cartas que saíram foram O Louco, A Imperatriz e O Sol. Senti uma conexão profunda com a mensagem...',
      date: '2025-10-29',
      mood: '😊'
    },
    {
      id: '2',
      title: 'Reflexão sobre O Enforcado',
      content: 'Estudei O Enforcado hoje e percebi como essa carta fala sobre mudança de perspectiva. Isso me fez refletir sobre situações da minha vida onde preciso ver as coisas de outro ângulo...',
      date: '2025-10-28',
      mood: '🤔'
    }
  ])
  const [showNewEntry, setShowNewEntry] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [newMood, setNewMood] = useState('😊')

  const moods = ['😊', '😌', '🤔', '😮', '😢', '😤', '🥰', '✨']

  const handleSaveEntry = () => {
    if (!newTitle || !newContent) {
      alert('Preencha título e conteúdo')
      return
    }

    const entry: JournalEntry = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      date: new Date().toISOString().split('T')[0],
      mood: newMood
    }

    setEntries([entry, ...entries])
    setNewTitle('')
    setNewContent('')
    setNewMood('😊')
    setShowNewEntry(false)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen mystical-gradient p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard">
          <Button variant="ghost" className="text-white mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-yellow-400" />
            <div>
              <h1 className="text-4xl font-bold text-white">Diário de Prática</h1>
              <p className="text-purple-100">Registre suas reflexões e insights</p>
            </div>
          </div>
          <Button
            onClick={() => setShowNewEntry(!showNewEntry)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Entrada
          </Button>
        </div>

        {/* Nova Entrada */}
        {showNewEntry && (
          <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/50 mb-6">
            <CardHeader>
              <CardTitle className="text-white">Nova Entrada no Diário</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-white text-sm mb-2 block">Título</label>
                <Input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex: Reflexão sobre O Louco"
                  className="bg-black/30 border-purple-500/30 text-white"
                />
              </div>

              <div>
                <label className="text-white text-sm mb-2 block">Como você está se sentindo?</label>
                <div className="flex gap-2">
                  {moods.map((mood) => (
                    <button
                      key={mood}
                      onClick={() => setNewMood(mood)}
                      className={`text-3xl p-2 rounded-lg transition-all ${
                        newMood === mood
                          ? 'bg-purple-600 scale-110'
                          : 'bg-black/30 hover:bg-black/50'
                      }`}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-white text-sm mb-2 block">Conteúdo</label>
                <Textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Escreva suas reflexões, insights, sentimentos..."
                  className="bg-black/30 border-purple-500/30 text-white min-h-[200px]"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleSaveEntry}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Salvar Entrada
                </Button>
                <Button
                  onClick={() => setShowNewEntry(false)}
                  variant="outline"
                  className="border-purple-500/30 text-white hover:bg-purple-600"
                >
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Estatísticas */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-500/50">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-blue-400">{entries.length}</div>
              <div className="text-sm text-gray-300">Entradas</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/50">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-purple-400">
                {Math.ceil(entries.length / 7)}
              </div>
              <div className="text-sm text-gray-300">Semanas</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-pink-900/50 to-purple-900/50 border-pink-500/50">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-pink-400">
                {entries.length > 0 ? entries[0].mood : '✨'}
              </div>
              <div className="text-sm text-gray-300">Último Humor</div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Entradas */}
        <div className="space-y-4">
          {entries.length === 0 ? (
            <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/50">
              <CardContent className="p-12 text-center">
                <BookOpen className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Seu diário está vazio</h2>
                <p className="text-gray-300 mb-6">Comece a registrar suas reflexões e insights!</p>
                <Button
                  onClick={() => setShowNewEntry(true)}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Primeira Entrada
                </Button>
              </CardContent>
            </Card>
          ) : (
            entries.map((entry) => (
              <Card
                key={entry.id}
                className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-purple-500/50 hover:border-purple-400 transition-all"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{entry.mood}</span>
                      <div>
                        <CardTitle className="text-white text-lg">{entry.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                          <Calendar className="w-4 h-4" />
                          {formatDate(entry.date)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 whitespace-pre-wrap">{entry.content}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
