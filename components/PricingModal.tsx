'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ChevronLeft, ChevronRight } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const benefits = [
  {
    id: 1,
    title: 'Leituras Ilimitadas',
    description: 'Consulte as cartas quantas vezes quiser, sem limites diários',
    illustration: '🔮',
  },
  {
    id: 2,
    title: 'Todos os Oráculos',
    description: 'Acesso completo a Tarot, Baralho Cigano, Runas e I-Ching',
    illustration: '🎴',
  },
  {
    id: 3,
    title: 'Cursos Premium',
    description: 'Aprenda com cursos avançados e certificados profissionais',
    illustration: '📚',
  },
  {
    id: 4,
    title: 'Sem Anúncios',
    description: 'Aproveite todo o conteúdo sem interrupções',
    illustration: '✨',
  },
];

const plans = [
  {
    id: 'monthly',
    name: 'MENSAL',
    price: 19.90,
    pricePerWeek: 4.98,
    trial: '7 DIAS GRÁTIS',
    discount: null,
    popular: false,
  },
  {
    id: 'quarterly',
    name: 'TRIMESTRAL',
    price: 49.90,
    pricePerWeek: 3.84,
    trial: null,
    discount: 17,
    popular: false,
  },
  {
    id: 'yearly',
    name: 'ANUAL',
    price: 99.90,
    pricePerWeek: 1.92,
    trial: null,
    discount: 58,
    popular: true,
  },
];

export default function PricingModal({ isOpen, onClose }: PricingModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState('yearly');

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % benefits.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + benefits.length) % benefits.length);
  };

  const handleContinue = () => {
    // Redirecionar para checkout do Stripe
    window.location.href = '/checkout?plan=' + selectedPlan;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0A0E27] rounded-3xl shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-10 p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Restaurar
          </button>

          {/* Carousel */}
          <div className="relative h-96 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
              >
                {/* Illustration */}
                <div className="text-9xl mb-6 animate-float">
                  {benefits[currentSlide].illustration}
                </div>

                {/* Title */}
                <h2 className="text-3xl font-bold text-white mb-4 font-cinzel">
                  {benefits[currentSlide].title}
                </h2>

                {/* Description */}
                <p className="text-lg text-gray-300 max-w-md">
                  {benefits[currentSlide].description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors"
            >
              <ChevronRight size={32} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {benefits.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? 'bg-white w-8'
                      : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="p-8">
            <p className="text-sm text-gray-400 mb-4 uppercase tracking-wider">
              OFERTA ESPECIAL...
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative p-6 rounded-2xl border-2 transition-all ${
                    selectedPlan === plan.id
                      ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/50'
                      : 'border-gray-700 bg-[#1E2749]/50 hover:border-gray-600'
                  }`}
                >
                  {/* Plan Name */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {plan.name}
                  </h3>

                  {/* Trial or Price */}
                  {plan.trial ? (
                    <div className="mb-2">
                      <p className="text-2xl font-bold text-white mb-1">
                        {plan.trial}
                      </p>
                      <p className="text-sm text-yellow-400">
                        depois
                      </p>
                      <p className="text-lg text-white">
                        R$ {plan.price.toFixed(2)} / mês
                      </p>
                    </div>
                  ) : (
                    <div className="mb-2">
                      <p className="text-3xl font-bold text-white mb-1">
                        R$ {plan.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-400">
                        R$ {plan.pricePerWeek.toFixed(2)} / semana
                      </p>
                    </div>
                  )}

                  {/* Discount Badge */}
                  {plan.discount && (
                    <div className="mt-4">
                      <span className="inline-block px-4 py-2 bg-yellow-400 text-black text-sm font-bold rounded-lg">
                        Guardar {plan.discount}%
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Guarantee */}
            <div className="flex items-start gap-3 mb-6 text-sm text-gray-400">
              <Check size={20} className="text-gray-500 flex-shrink-0 mt-0.5" />
              <p>
                Segurança garantida. Cancele a qualquer momento sem taxas.
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleContinue}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-lg font-bold rounded-2xl transition-all shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/70"
            >
              CONTINUAR
            </button>

            {/* Legal Text */}
            <p className="text-center text-xs text-gray-500 mt-4 mb-2">
              Cobrado anualmente, a assinatura é opcional e com renovação automática
            </p>

            {/* Links */}
            <div className="flex justify-center gap-2 text-xs text-gray-600">
              <a href="/terms" className="hover:text-gray-400">
                Termos de Serviço
              </a>
              <span>•</span>
              <a href="/privacy" className="hover:text-gray-400">
                Política de Privacidade
              </a>
              <span>•</span>
              <a href="/subscription" className="hover:text-gray-400">
                Termos de Assinatura
              </a>
            </div>
          </div>
        </motion.div>

        <style jsx>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>
      </div>
    </AnimatePresence>
  );
}
