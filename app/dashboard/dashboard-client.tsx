
'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Gem, Moon, BookOpen, Sparkles, Clock, LogOut, Play, History, Crown, CreditCard, Trophy, Target, ShoppingBag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { PricingModal } from '@/components/pricing-modal'
import NewPricingModal from '@/components/PricingModal'
import { SubscriptionBadge } from '@/components/subscription-badge'
import { LevelProgress } from '@/components/level-progress'
import DailyChallengeCard from '@/components/gamification/DailyChallengeCard'
import CardOfTheDay from '@/components/dashboard/CardOfTheDay'
import MoonPhase from '@/components/dashboard/MoonPhase'
import CosmicParticles from '@/components/dashboard/CosmicParticles'
import ActiveMissions from '@/components/gamification/ActiveMissions'
import RecentBadges from '@/components/gamification/RecentBadges'
import StreakCalendar from '@/components/gamification/StreakCalendar'
import ActivityGraph from '@/components/gamification/ActivityGraph'
import OnboardingTour from '@/components/onboarding/OnboardingTour'
import { dashboardOnboardingSteps } from '@/lib/onboarding-steps'
import Crystal3D from '@/components/3d/Crystal3D'

interface DashboardClientProps {
  user: any
  trialActive: boolean
  daysRemaining: number
  readings: any[]
}

export default function DashboardClient({ user, trialActive, daysRemaining, readings }: DashboardClientProps) {
  const [pricingModalOpen, setPricingModalOpen] = useState(false)
  const [newPricingModalOpen, setNewPricingModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const trialProgress = ((7 - daysRemaining) / 7) * 100

  const hasActiveSubscription = user?.subscriptionStatus === 'active' || user?.subscriptionStatus === 'trialing'

  const handleManageSubscription = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
      })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Erro ao abrir portal:', error)
      alert('Erro ao abrir gerenciador de assinatura')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <CosmicParticles />
    <OnboardingTour steps={dashboardOnboardingSteps} />
    <PricingModal open={pricingModalOpen} onClose={() => setPricingModalOpen(false)} />
    <div className="min-h-screen mystical-gradient pb-20 relative z-10">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-purple-900/20 border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/dashboard" className="flex items-center">
              <div className="relative w-44 h-12">
                <Image 
                  src="/logo-complete.png" 
                  alt="Portal Cósmico"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <SubscriptionBadge plan={user?.subscriptionPlan} status={user?.subscriptionStatus} />
              
              {/* Cristais */}
              <div className="flex items-center">
                <Crystal3D amount={user?.crystals || 0} size="small" />
              </div>
              
              <Link href="/badges" className="text-white hover:text-yellow-400 transition-colors flex items-center">
                <Trophy className="w-4 h-4 mr-1" />
                Badges
              </Link>
              <Link href="/missions" className="text-white hover:text-yellow-400 transition-colors flex items-center">
                <Target className="w-4 h-4 mr-1" />
                Missões
              </Link>
              <Link href="/shop" className="text-white hover:text-yellow-400 transition-colors flex items-center">
                <ShoppingBag className="w-4 h-4 mr-1" />
                Loja
              </Link>
              <Link href="/ranking" className="text-white hover:text-yellow-400 transition-colors flex items-center">
                <Trophy className="w-4 h-4 mr-1" />
                Ranking
              </Link>
              <Link href="/practice" className="text-white hover:text-yellow-400 transition-colors flex items-center">
                <Target className="w-4 h-4 mr-1" />
                Prática
              </Link>
              <Link href="/practice/history" className="text-white hover:text-yellow-400 transition-colors flex items-center">
                <History className="w-4 h-4 mr-1" />
                Histórico
              </Link>
              <Link href="/reading" className="text-white hover:text-yellow-400 transition-colors">
                Fazer Leitura
              </Link>
              <Link href="/cards" className="text-white hover:text-yellow-400 transition-colors">
                Biblioteca de Cartas
              </Link>
              <Button 
                variant="ghost" 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-white hover:text-yellow-400"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Bem-vindo(a), {user?.firstName || 'Viajante Cósmico'}
          </h1>
          <p className="text-purple-100 text-lg">
            Estude, pratique e consulte o Tarot. Sua jornada mística te aguarda!
          </p>
          <p className="text-purple-300 text-sm mt-2">
            🌟 <span className="text-yellow-400 font-medium">Tarot disponível</span> • Cigano, Runas e I-Ching em breve
          </p>
        </div>

        {/* Subscription Status */}
        {hasActiveSubscription ? (
          <Card className="mb-8 bg-gradient-to-r from-purple-900/80 to-indigo-900/80 border-purple-500/30 cosmic-glow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white flex items-center">
                    {user?.subscriptionPlan === 'PREMIUM' ? (
                      <Crown className="w-5 h-5 mr-2 text-yellow-400" />
                    ) : (
                      <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
                    )}
                    Assinatura {user?.subscriptionPlan === 'PREMIUM' ? 'Premium' : 'Básica'}
                  </CardTitle>
                  <CardDescription className="text-purple-100">
                    {user?.subscriptionStatus === 'trialing' 
                      ? `Período de teste - ${daysRemaining} dias restantes`
                      : 'Assinatura ativa'
                    }
                  </CardDescription>
                </div>
                <Button
                  onClick={handleManageSubscription}
                  disabled={loading}
                  variant="outline"
                  className="border-purple-400 text-purple-100 hover:bg-purple-800"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  {loading ? 'Carregando...' : 'Gerenciar Assinatura'}
                </Button>
              </div>
            </CardHeader>
            {user?.subscriptionStatus === 'trialing' && (
              <CardContent>
                <Progress value={trialProgress} className="mb-2" />
                <p className="text-sm text-purple-200">
                  Após o período de teste, você será cobrado automaticamente
                </p>
              </CardContent>
            )}
          </Card>
        ) : (
          <Card className="mb-8 bg-gradient-to-r from-purple-900/80 to-pink-900/80 border-purple-500/30 cosmic-glow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-yellow-400" />
                    Período de Teste Gratuito
                  </CardTitle>
                  <CardDescription className="text-purple-100">
                    {trialActive 
                      ? `${daysRemaining} dias restantes do seu teste gratuito`
                      : "Seu teste gratuito expirou"
                    }
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-yellow-400">{daysRemaining}</div>
                  <div className="text-sm text-purple-100">dias</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={trialProgress} className="mb-4" />
              <div className="text-center mt-4">
                <p className="text-purple-100 mb-2">
                  {trialActive 
                    ? 'Assine agora e continue sua jornada mística sem interrupções!'
                    : 'Seu período de teste expirou. Assine para continuar acessando o Portal Cósmico!'
                  }
                </p>
                <p className="text-purple-200 text-sm mb-4">
                  ✨ Tarot completo • Cigano, Runas e I-Ching em breve
                </p>
                <Button 
                  onClick={() => setPricingModalOpen(true)}
                  className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Ver Planos e Assinar
                </Button>
                <Button 
                  onClick={() => setNewPricingModalOpen(true)}
                  className="ml-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Novo Pricing
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Desafio Diário */}
        <div className="mb-8" data-tour="daily-challenge">
          <DailyChallengeCard />
        </div>

        {/* Card of the Day & Moon Phase */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div data-tour="card-of-day">
            <CardOfTheDay />
          </div>
          <MoonPhase />
        </div>

        {/* Quick Actions - Three Pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-b from-purple-900/60 to-indigo-900/60 border-purple-500/30 card-glow">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">📚 Estudo</h3>
              <p className="text-purple-100 mb-4">
                Mergulhe nos mistérios dos 78 arcanos e desvende seus significados ancestrais
              </p>
              <Link href="/study">
                <Button variant="outline" className="w-full border-purple-500/30 text-white hover:bg-purple-600">
                  Começar a Estudar
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-b from-purple-900/60 to-indigo-900/60 border-purple-500/30 card-glow">
            <CardContent className="p-6 text-center">
              <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">🎯 Prática</h3>
              <p className="text-purple-100 mb-4">
                {readings?.length || 0} leituras realizadas • Aperfeiçoe sua intuição e conexão com as cartas
              </p>
              <Link href="/practice">
                <Button variant="outline" className="w-full border-purple-500/30 text-white hover:bg-purple-600">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Praticar Agora
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-b from-purple-900/60 to-indigo-900/60 border-purple-500/30 card-glow">
            <CardContent className="p-6 text-center">
              <Moon className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">🔮 Leitura</h3>
              <p className="text-purple-100 mb-4">
                Consulte o oráculo e receba orientações místicas guiadas por inteligência cósmica
              </p>
              <Link href="/reading">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Play className="w-4 h-4 mr-2" />
                  Nova Consulta
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions - Analytics */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-yellow-400" />
                Diário de Prática
              </CardTitle>
              <CardDescription className="text-purple-200">
                Registre suas reflexões e insights sobre suas práticas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/journal">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                  📝 Abrir Diário
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/60 to-pink-900/60 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-yellow-400" />
                Biblioteca de Cartas
              </CardTitle>
              <CardDescription className="text-purple-200">
                Explore e estude os significados de todas as cartas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/cards">
                <Button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700">
                  🃏 Explorar Cartas
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Level Progress */}
        <div className="mb-8">
          <LevelProgress 
            level={user?.level || 1}
            currentXP={user?.xp || 0}
            xpForNextLevel={100 * Math.pow(1.5, (user?.level || 1) - 1)}
            totalReadings={readings?.length || 0}
            streak={user?.streak || 0}
          />
        </div>

        {/* Gamification Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-cinzel text-purple-200 mb-6">🎮 Sua Jornada</h2>
          
          {/* Missions and Badges */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div data-tour="missions">
              <ActiveMissions />
            </div>
            <div data-tour="badges">
              <RecentBadges />
            </div>
          </div>
          
          {/* Calendar and Graph */}
          <div className="grid md:grid-cols-2 gap-6">
            <div data-tour="streak">
              <StreakCalendar />
            </div>
            <div data-tour="activity">
              <ActivityGraph />
            </div>
          </div>
        </div>

        {/* Recent Readings */}
        {readings && readings.length > 0 && (
          <Card className="bg-gradient-to-b from-purple-900/60 to-indigo-900/60 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Moon className="w-5 h-5 mr-2 text-yellow-400" />
                Leituras Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {readings.slice(0, 3).map((reading) => (
                  <div key={reading.id} className="flex items-center space-x-4 p-4 rounded-lg bg-purple-800/30">
                    <div className="flex -space-x-2">
                      {reading.cards?.slice(0, 3)?.map((readingCard: any, index: number) => (
                        <div
                          key={readingCard.id}
                          className="relative w-12 h-16 tarot-card rounded-lg flex-shrink-0"
                          style={{ zIndex: 3 - index }}
                        >
                          {readingCard.card?.imageUrl && (
                            <Image
                              src={readingCard.card.imageUrl}
                              alt={readingCard.card.name}
                              fill
                              className="object-cover rounded-lg"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium capitalize">
                        {reading.spreadType.replace('-', ' ')}
                      </h4>
                      <p className="text-purple-200 text-sm">
                        {reading.question || "Sem pergunta específica"}
                      </p>
                      <p className="text-purple-300 text-xs">
                        {new Date(reading.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {(!readings || readings.length === 0) && (
          <Card className="bg-gradient-to-b from-purple-900/60 to-indigo-900/60 border-purple-500/30">
            <CardContent className="p-8 text-center">
              <Moon className="w-16 h-16 text-yellow-400 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-white mb-2">Sua primeira leitura te aguarda</h3>
              <p className="text-purple-100 mb-6">
                As cartas estão prontas para revelar os segredos do universo. Comece sua jornada agora.
              </p>
              <Link href="/reading">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Fazer Primeira Leitura
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>

    <NewPricingModal isOpen={newPricingModalOpen} onClose={() => setNewPricingModalOpen(false)} />
    </>
  )
}
