import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Moon, Star, Gem, Users, Clock, BookOpen, Check, Zap, Crown, Gift, Target, TrendingUp, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  
  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen mystical-gradient">
      {/* Header */}
      <header className="relative z-10 px-4 py-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <div className="relative w-48 h-16">
              <Image 
                src="/logo-complete.png" 
                alt="Portal Cósmico"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <div className="space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:text-yellow-400">
                Entrar
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                Começar Agora
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <Badge className="bg-purple-900/60 text-yellow-400 border-yellow-400/40 px-4 py-2 text-sm">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              ✨ Seu Treinador de Oráculos com IA ✨
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Transforme-se de <span className="text-purple-300">Iniciante</span><br/>a <span className="text-yellow-400 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Praticante Avançado</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-purple-100 mb-4 max-w-3xl mx-auto leading-relaxed">
            Aprenda, pratique e domine os oráculos ancestrais com a orientação de Inteligência Artificial. 
          </p>
          <p className="text-lg text-purple-200 mb-8">
            <strong className="text-yellow-300">Tarot, Cigano, Runas e I-Ching</strong> em uma única plataforma revolucionária
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/register">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-6 text-lg cosmic-glow">
                <Gift className="w-5 h-5 mr-2" />
                Começar Teste Grátis de 7 Dias
              </Button>
            </Link>
          </div>

          <p className="text-sm text-purple-200 flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-green-400" />
            Sem compromisso • Cancele quando quiser • Acesso completo
          </p>

          {/* Social Proof */}
          <div className="mt-12 flex items-center justify-center gap-8 flex-wrap">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">4.8/5</div>
              <div className="text-sm text-purple-200 flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">10k+</div>
              <div className="text-sm text-purple-200">Praticantes Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">50k+</div>
              <div className="text-sm text-purple-200">Leituras Realizadas</div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-2 h-2 bg-purple-300 rounded-full twinkle"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-yellow-300 rounded-full twinkle" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-1 h-1 bg-blue-300 rounded-full twinkle" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-blue-300 rounded-full twinkle" style={{animationDelay: '0.5s'}}></div>
        </div>
      </section>

      {/* Pricing Section - HIGHLIGHT */}
      <section className="px-4 py-20 bg-gradient-to-b from-transparent via-purple-900/40 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-yellow-900/40 text-yellow-300 border-yellow-400/40 px-4 py-2 mb-4">
              🎁 Oferta Especial de Lançamento
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Escolha Seu Caminho Místico
            </h2>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Comece com 7 dias grátis em qualquer plano • Sem cartão necessário
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Plano Básico */}
            <Card className="bg-gradient-to-b from-purple-900/70 to-indigo-900/70 border-purple-500/40 hover:border-yellow-400/60 transition-all card-glow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-purple-700 text-white">Iniciante</Badge>
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                </div>
                <CardTitle className="text-2xl text-white">Básico</CardTitle>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-white">R$ 19</span>
                  <span className="text-purple-200">,90/mês</span>
                </div>
                <p className="text-purple-200 text-sm mt-2">Perfeito para começar sua jornada</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5" />
                    <span className="text-purple-100">Tarot de Marselha completo</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5" />
                    <span className="text-purple-100">Interpretações de IA ilimitadas</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5" />
                    <span className="text-purple-100">Biblioteca de significados</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5" />
                    <span className="text-purple-100">Histórico de leituras</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5" />
                    <span className="text-purple-100">Upload de fotos de jogos</span>
                  </div>
                </div>
                <Link href="/register" className="block">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-4">
                    Começar Grátis
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Plano Premium - DESTAQUE */}
            <Card className="bg-gradient-to-b from-yellow-900/40 to-purple-900/70 border-yellow-400/60 hover:border-yellow-400 transition-all relative card-glow scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-4 py-2 text-sm">
                  <Crown className="w-4 h-4 mr-1 inline" />
                  MAIS POPULAR
                </Badge>
              </div>
              <CardHeader className="pt-8">
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-yellow-700 text-white">Praticante</Badge>
                  <Zap className="w-6 h-6 text-yellow-400" />
                </div>
                <CardTitle className="text-2xl text-white">Premium</CardTitle>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-white">R$ 49</span>
                  <span className="text-purple-200">,90/mês</span>
                </div>
                <p className="text-purple-200 text-sm mt-2">Para quem busca profundidade</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <span className="text-white font-medium">Tudo do Básico, mais:</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <span className="text-purple-100">Todos os oráculos (Cigano, Runas, I-Ching)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <span className="text-purple-100">Análise de padrões com IA</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <span className="text-purple-100">Diário de prática guiado</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <span className="text-purple-100">Tiragens avançadas</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <span className="text-purple-100">Suporte prioritário</span>
                  </div>
                </div>
                <Link href="/register" className="block">
                  <Button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white mt-4">
                    <Crown className="w-4 h-4 mr-2" />
                    Começar Grátis
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Plano Pro */}
            <Card className="bg-gradient-to-b from-purple-900/70 to-indigo-900/70 border-purple-500/40 hover:border-yellow-400/60 transition-all card-glow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-gradient-to-r from-purple-700 to-pink-700 text-white">Mestre</Badge>
                  <Target className="w-6 h-6 text-yellow-400" />
                </div>
                <CardTitle className="text-2xl text-white">Pro</CardTitle>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-white">R$ 99</span>
                  <span className="text-purple-200">,90/mês</span>
                </div>
                <p className="text-purple-200 text-sm mt-2">Domínio completo dos oráculos</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5" />
                    <span className="text-white font-medium">Tudo do Premium, mais:</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5" />
                    <span className="text-purple-100">Workshops mensais ao vivo</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5" />
                    <span className="text-purple-100">Acesso a especialistas</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5" />
                    <span className="text-purple-100">Certificado de conclusão</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5" />
                    <span className="text-purple-100">Comunidade exclusiva</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5" />
                    <span className="text-purple-100">Lançamentos antecipados</span>
                  </div>
                </div>
                <Link href="/register" className="block">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-4">
                    Começar Grátis
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-purple-200">
              💳 <strong className="text-white">Garantia de 30 dias</strong> • Cancele a qualquer momento sem burocracia
            </p>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
            Como o Portal Cósmico Transforma Você
          </h2>
          <p className="text-center text-purple-100 mb-3 max-w-2xl mx-auto text-lg">
            Do curiosoqueriante ao praticante confiante em 3 pilares
          </p>
          <p className="text-center text-purple-300 mb-12 max-w-xl mx-auto">
            ✨ Método validado por mais de 10.000 alunos
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-b from-purple-900/60 to-indigo-900/60 border-yellow-500/40 card-glow hover:border-yellow-400/60">
              <CardContent className="p-8 text-center">
                <div className="mb-4">
                  <BookOpen className="w-14 h-14 text-yellow-400 mx-auto float" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">📚 Estudo</h3>
                <p className="text-purple-100 leading-relaxed">
                  Mergulhe na sabedoria ancestral. Biblioteca completa com significados profundos, 
                  simbolismos e a história por trás de cada carta
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-b from-purple-900/60 to-indigo-900/60 border-yellow-500/40 card-glow hover:border-yellow-400/60">
              <CardContent className="p-8 text-center">
                <div className="mb-4">
                  <Sparkles className="w-14 h-14 text-yellow-400 mx-auto float" style={{animationDelay: '0.5s'}} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">🎯 Prática</h3>
                <p className="text-purple-100 leading-relaxed">
                  Tire fotos dos seus jogos e receba feedback de IA. 
                  Exercícios guiados e acompanhamento da sua evolução
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-b from-purple-900/60 to-indigo-900/60 border-yellow-500/40 card-glow hover:border-yellow-400/60">
              <CardContent className="p-8 text-center">
                <div className="mb-4">
                  <Moon className="w-14 h-14 text-yellow-400 mx-auto float" style={{animationDelay: '1s'}} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">🔮 Leitura</h3>
                <p className="text-purple-100 leading-relaxed">
                  Interpretações profundas geradas por IA treinada em milhares de leituras. 
                  Histórico completo das suas jornadas místicas
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-4 py-20 bg-gradient-to-b from-transparent via-purple-900/30 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
            Por Que o Portal Cósmico é Único?
          </h2>
          <p className="text-center text-purple-100 mb-12 max-w-2xl mx-auto">
            Não somos apenas mais um app de Tarot. Somos seu treinador pessoal 24/7
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 border-purple-500/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-700/50 p-3 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">IA Como Seu Treinador</h3>
                    <p className="text-purple-100">
                      Nossa IA foi treinada com milhares de leituras reais. Ela não julga, apenas te guia 
                      com interpretações precisas e personalizadas para seu nível
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 border-purple-500/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-700/50 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Prática Ativa, Não Passiva</h3>
                    <p className="text-purple-100">
                      Você pratica com SEUS próprios jogos. Tire fotos e receba feedback instantâneo. 
                      É como ter um professor particular sempre disponível
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 border-purple-500/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-700/50 p-3 rounded-lg">
                    <Shield className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Evolução Rastreada</h3>
                    <p className="text-purple-100">
                      A IA identifica padrões nas suas leituras ao longo do tempo e te mostra 
                      onde você está progredindo e onde precisa focar mais
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 border-purple-500/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-700/50 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Múltiplos Oráculos</h3>
                    <p className="text-purple-100">
                      Comece com Tarot e expanda para Cigano, Runas e I-Ching. 
                      Uma única plataforma para toda sua jornada mística
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Oracles Section */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Todos os Oráculos em Um Só Lugar
          </h2>
          <p className="text-purple-100 mb-3 max-w-2xl mx-auto text-lg">
            Uma biblioteca completa de sabedoria ancestral
          </p>
          <p className="text-purple-300 mb-10 max-w-xl mx-auto">
            Comece com Tarot e expanda para outros oráculos conforme evolui
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-b from-purple-800/60 to-purple-900/60 border border-yellow-400/50 rounded-lg p-6 card-glow">
              <Moon className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Tarot</h3>
              <p className="text-purple-200 text-sm">78 cartas de sabedoria milenar</p>
              <Badge className="mt-3 bg-green-900/50 text-green-300 border-green-500/50">Disponível</Badge>
            </div>

            <div className="bg-gradient-to-b from-purple-800/60 to-purple-900/60 border border-purple-400/30 rounded-lg p-6 opacity-75">
              <Star className="w-10 h-10 text-purple-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Cigano</h3>
              <p className="text-purple-200 text-sm">36 cartas de tradição cigana</p>
              <Badge className="mt-3 bg-yellow-900/50 text-yellow-300 border-yellow-500/50">Premium</Badge>
            </div>

            <div className="bg-gradient-to-b from-purple-800/60 to-purple-900/60 border border-purple-400/30 rounded-lg p-6 opacity-75">
              <Gem className="w-10 h-10 text-purple-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Runas</h3>
              <p className="text-purple-200 text-sm">24 símbolos nórdicos ancestrais</p>
              <Badge className="mt-3 bg-yellow-900/50 text-yellow-300 border-yellow-500/50">Premium</Badge>
            </div>

            <div className="bg-gradient-to-b from-purple-800/60 to-purple-900/60 border border-purple-400/30 rounded-lg p-6 opacity-75">
              <Sparkles className="w-10 h-10 text-purple-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">I-Ching</h3>
              <p className="text-purple-200 text-sm">64 hexagramas da sabedoria</p>
              <Badge className="mt-3 bg-yellow-900/50 text-yellow-300 border-yellow-500/50">Premium</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-20 bg-gradient-to-b from-transparent via-purple-900/30 to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-purple-100 max-w-2xl mx-auto">
              Tudo o que você precisa saber sobre o Portal Cósmico
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem 
              value="item-1" 
              className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 border border-purple-500/30 rounded-lg px-6 data-[state=open]:border-yellow-400/50"
            >
              <AccordionTrigger className="text-white hover:text-yellow-400 text-left">
                Como funciona o período de teste gratuito?
              </AccordionTrigger>
              <AccordionContent className="text-purple-100">
                Você tem 7 dias de acesso completo e ilimitado a todos os recursos do plano escolhido. 
                Não pedimos cartão de crédito no cadastro, então você pode explorar tranquilamente. 
                Se gostar, pode assinar depois; se não, nada acontece.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem 
              value="item-2" 
              className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 border border-purple-500/30 rounded-lg px-6 data-[state=open]:border-yellow-400/50"
            >
              <AccordionTrigger className="text-white hover:text-yellow-400 text-left">
                Preciso saber ler Tarot para usar a plataforma?
              </AccordionTrigger>
              <AccordionContent className="text-purple-100">
                Não! O Portal Cósmico foi criado tanto para iniciantes quanto para praticantes avançados. 
                Nossa IA te guia passo a passo, começando do básico até interpretações mais complexas. 
                É como ter um professor particular disponível 24/7.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem 
              value="item-3" 
              className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 border border-purple-500/30 rounded-lg px-6 data-[state=open]:border-yellow-400/50"
            >
              <AccordionTrigger className="text-white hover:text-yellow-400 text-left">
                Como funciona a análise de fotos com IA?
              </AccordionTrigger>
              <AccordionContent className="text-purple-100">
                Você tira uma foto do seu jogo físico de cartas e faz upload na plataforma. 
                Nossa IA identifica as cartas, suas posições e gera uma interpretação completa 
                considerando o contexto da tiragem. Você também pode praticar com tiragens digitais.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem 
              value="item-4" 
              className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 border border-purple-500/30 rounded-lg px-6 data-[state=open]:border-yellow-400/50"
            >
              <AccordionTrigger className="text-white hover:text-yellow-400 text-left">
                Posso cancelar minha assinatura a qualquer momento?
              </AccordionTrigger>
              <AccordionContent className="text-purple-100">
                Sim, você pode cancelar quando quiser, sem burocracia e sem taxas. 
                Basta acessar as configurações da sua conta e clicar em cancelar. 
                Você ainda terá acesso até o fim do período pago.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem 
              value="item-5" 
              className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 border border-purple-500/30 rounded-lg px-6 data-[state=open]:border-yellow-400/50"
            >
              <AccordionTrigger className="text-white hover:text-yellow-400 text-left">
                Qual a diferença entre os planos?
              </AccordionTrigger>
              <AccordionContent className="text-purple-100">
                O <strong>Básico</strong> oferece Tarot completo com todas as funcionalidades essenciais. 
                O <strong>Premium</strong> adiciona outros oráculos (Cigano, Runas, I-Ching) e análise avançada de padrões. 
                O <strong>Pro</strong> inclui workshops ao vivo, acesso a especialistas e certificado de conclusão.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem 
              value="item-6" 
              className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 border border-purple-500/30 rounded-lg px-6 data-[state=open]:border-yellow-400/50"
            >
              <AccordionTrigger className="text-white hover:text-yellow-400 text-left">
                A plataforma funciona no celular?
              </AccordionTrigger>
              <AccordionContent className="text-purple-100">
                Sim! O Portal Cósmico é totalmente responsivo e funciona perfeitamente em celulares, 
                tablets e computadores. Você pode praticar onde e quando quiser.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem 
              value="item-7" 
              className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 border border-purple-500/30 rounded-lg px-6 data-[state=open]:border-yellow-400/50"
            >
              <AccordionTrigger className="text-white hover:text-yellow-400 text-left">
                Meus dados e leituras ficam salvos?
              </AccordionTrigger>
              <AccordionContent className="text-purple-100">
                Sim! Todas as suas leituras, fotos e progresso ficam salvos na sua conta. 
                Você pode acessar seu histórico completo a qualquer momento e acompanhar sua evolução ao longo do tempo.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem 
              value="item-8" 
              className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 border border-purple-500/30 rounded-lg px-6 data-[state=open]:border-yellow-400/50"
            >
              <AccordionTrigger className="text-white hover:text-yellow-400 text-left">
                Vocês oferecem suporte?
              </AccordionTrigger>
              <AccordionContent className="text-purple-100">
                Sim! Todos os planos incluem suporte por email. 
                Os planos Premium e Pro têm suporte prioritário com tempo de resposta mais rápido. 
                O plano Pro também oferece acesso direto a especialistas em oráculos.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="text-center mt-12">
            <p className="text-purple-200 mb-4">
              Ainda tem dúvidas? Estamos aqui para ajudar!
            </p>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                Começar Teste Grátis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <Sparkles className="w-16 h-16 text-yellow-400 mx-auto mb-4 float" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            O Universo Te Chama
          </h2>
          <p className="text-xl text-purple-100 mb-4">
            Mais de 10.000 pessoas já transformaram suas vidas através dos oráculos
          </p>
          <p className="text-lg text-purple-200 mb-8">
            🌙 7 dias de acesso completo • Sem cartão • Cancele quando quiser
          </p>
          
          <Link href="/register">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-xl cosmic-glow">
              <Moon className="w-6 h-6 mr-2" />
              Começar Minha Jornada Grátis
            </Button>
          </Link>

          <p className="text-purple-300 mt-6 text-sm">
            Junte-se a milhares de praticantes que confiam no Portal Cósmico
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-800/30 px-4 py-8">
        <div className="max-w-6xl mx-auto text-center text-purple-200">
          <p>© 2025 Portal Cósmico. Todos os direitos reservados.</p>
          <p className="mt-2 text-sm">Transformando curiosos em mestres dos oráculos</p>
        </div>
      </footer>
    </div>
  )
}
