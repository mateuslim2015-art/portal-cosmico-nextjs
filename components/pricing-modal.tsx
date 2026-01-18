
'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Sparkles, Crown } from 'lucide-react';
import { STRIPE_PRODUCTS } from '@/lib/stripe-products';

interface PricingModalProps {
  open: boolean;
  onClose: () => void;
}

export function PricingModal({ open, onClose }: PricingModalProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planType: 'BASIC' | 'PREMIUM' | 'PRO') => {
    setLoading(planType);
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planType }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Erro ao criar checkout');
      }
    } catch (error) {
      console.error('Erro ao assinar:', error);
      alert('Erro ao processar assinatura. Tente novamente.');
      setLoading(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl bg-gradient-to-b from-purple-900/95 to-indigo-900/95 backdrop-blur border-purple-500/30">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center text-white mb-2">
            Escolha seu Plano
          </DialogTitle>
          <p className="text-purple-200 text-center text-sm">
            7 dias grátis • Cancele quando quiser
          </p>
        </DialogHeader>

        <div className="grid md:grid-cols-3 gap-6 mt-4">
          {/* Plano Básico */}
          <Card className="bg-gradient-to-b from-purple-800/40 to-indigo-800/40 backdrop-blur border-purple-500/30 hover:border-purple-400/50 transition-all">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Sparkles className="w-8 h-8 text-purple-400" />
                <span className="text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">
                  Popular
                </span>
              </div>
              <CardTitle className="text-2xl text-white">{STRIPE_PRODUCTS.BASIC.name}</CardTitle>
              <CardDescription className="text-purple-200">
                {STRIPE_PRODUCTS.BASIC.description}
              </CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-white">
                  R$ {(STRIPE_PRODUCTS.BASIC.amount / 100).toFixed(2)}
                </span>
                <span className="text-purple-300">/mês</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {STRIPE_PRODUCTS.BASIC.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-purple-100">
                    <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleSubscribe('BASIC')}
                disabled={loading !== null}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-6"
              >
                {loading === 'BASIC' ? 'Processando...' : 'Começar Teste Grátis'}
              </Button>
            </CardFooter>
          </Card>

          {/* Plano Premium */}
          <Card className="bg-gradient-to-b from-yellow-900/40 to-orange-900/40 backdrop-blur border-yellow-500/40 hover:border-yellow-400/60 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-500 to-orange-500 text-white px-4 py-1 rounded-bl-lg text-xs font-bold">
              MELHOR VALOR
            </div>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Crown className="w-8 h-8 text-yellow-400" />
              </div>
              <CardTitle className="text-2xl text-white">{STRIPE_PRODUCTS.PREMIUM.name}</CardTitle>
              <CardDescription className="text-yellow-100">
                {STRIPE_PRODUCTS.PREMIUM.description}
              </CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-white">
                  R$ {(STRIPE_PRODUCTS.PREMIUM.amount / 100).toFixed(2)}
                </span>
                <span className="text-yellow-200">/mês</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {STRIPE_PRODUCTS.PREMIUM.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-yellow-50">
                    <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleSubscribe('PREMIUM')}
                disabled={loading !== null}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-6"
              >
                {loading === 'PREMIUM' ? 'Processando...' : 'Começar Teste Grátis Premium'}
              </Button>
            </CardFooter>
          </Card>

          {/* Plano Pro */}
          <Card className="bg-gradient-to-b from-indigo-900/40 to-purple-900/40 backdrop-blur border-indigo-500/40 hover:border-indigo-400/60 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-indigo-500 to-purple-500 text-white px-4 py-1 rounded-bl-lg text-xs font-bold">
              VIP
            </div>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Crown className="w-8 h-8 text-indigo-400" />
              </div>
              <CardTitle className="text-2xl text-white">{STRIPE_PRODUCTS.PRO.name}</CardTitle>
              <CardDescription className="text-indigo-100">
                {STRIPE_PRODUCTS.PRO.description}
              </CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-white">
                  R$ {(STRIPE_PRODUCTS.PRO.amount / 100).toFixed(2)}
                </span>
                <span className="text-indigo-200">/mês</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {STRIPE_PRODUCTS.PRO.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-indigo-50">
                    <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleSubscribe('PRO')}
                disabled={loading !== null}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-6"
              >
                {loading === 'PRO' ? 'Processando...' : 'Começar Teste Grátis Pro'}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-6 text-center text-sm text-purple-300">
          <p>✨ 7 dias de teste grátis • Sem compromisso • Cancele quando quiser</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
