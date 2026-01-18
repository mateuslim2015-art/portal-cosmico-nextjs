"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Crown, Sparkles, Zap, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export type UpsellType = "reading_limit" | "oracle_locked" | "premium_course" | "insufficient_crystals" | "general_benefits";

interface UpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: UpsellType;
  customData?: {
    oracleName?: string;
    courseName?: string;
    crystalsNeeded?: number;
  };
}

const upsellContent = {
  reading_limit: {
    icon: Crown,
    title: "Limite de Leituras Atingido",
    subtitle: "Desbloqueie leituras ilimitadas",
    benefits: [
      "Leituras ilimitadas por dia",
      "Todos os tipos de tiragem",
      "Análise de padrões com IA",
      "Histórico completo",
      "Sem anúncios",
    ],
    cta: "Assinar Premium",
    color: "from-purple-600 to-blue-600",
  },
  oracle_locked: {
    icon: Lock,
    title: "Oráculo Bloqueado",
    subtitle: "Acesse todos os oráculos",
    benefits: [
      "Tarot completo",
      "Baralho Cigano",
      "Runas Nórdicas",
      "I-Ching",
      "Novos oráculos mensais",
    ],
    cta: "Desbloquear Agora",
    color: "from-blue-600 to-cyan-600",
  },
  premium_course: {
    icon: Sparkles,
    title: "Curso Premium",
    subtitle: "Aprenda com os melhores",
    benefits: [
      "Todos os cursos inclusos",
      "Certificados de conclusão",
      "Workshops exclusivos",
      "Mentorias 1:1",
      "Material complementar",
    ],
    cta: "Acessar Cursos",
    color: "from-pink-600 to-purple-600",
  },
  insufficient_crystals: {
    icon: Zap,
    title: "Cristais Insuficientes",
    subtitle: "Ganhe mais cristais",
    benefits: [
      "+50% cristais em recompensas",
      "Bônus diário de 100 cristais",
      "Descontos na loja",
      "Itens exclusivos",
      "Sem limites de compra",
    ],
    cta: "Ganhar Mais Cristais",
    color: "from-yellow-600 to-orange-600",
  },
  general_benefits: {
    icon: Crown,
    title: "Desbloqueie Todo o Poder do Cosmos",
    subtitle: "Transforme sua jornada espiritual",
    benefits: [
      "Leituras e exercícios ilimitados",
      "Todos os oráculos disponíveis",
      "Cursos e workshops inclusos",
      "Análise de padrões com IA",
      "Suporte prioritário",
    ],
    cta: "Começar Agora",
    color: "from-purple-600 via-pink-600 to-blue-600",
  },
};

export default function UpsellModal({ isOpen, onClose, type, customData }: UpsellModalProps) {
  const router = useRouter();
  const content = upsellContent[type];
  const Icon = content.icon;

  const handleUpgrade = () => {
    router.push("/pricing");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop com blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-md"
            >
              {/* Card principal */}
              <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${content.color} p-[2px]`}>
                <div className="relative rounded-3xl bg-[#0A0E27] p-8">
                  {/* Botão fechar */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  {/* Ícone 3D animado */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="flex justify-center mb-6"
                  >
                    <div className={`relative p-6 rounded-full bg-gradient-to-br ${content.color}`}>
                      <Icon className="w-12 h-12 text-white" />
                      
                      {/* Efeito de brilho pulsante */}
                      <motion.div
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className={`absolute inset-0 rounded-full bg-gradient-to-br ${content.color}`}
                      />
                    </div>
                  </motion.div>

                  {/* Título */}
                  <h2 className="text-3xl font-bold text-white text-center mb-2" style={{ fontFamily: "var(--font-cinzel)" }}>
                    {content.title}
                  </h2>

                  {/* Subtítulo */}
                  <p className="text-white/70 text-center mb-6">
                    {customData?.oracleName && type === "oracle_locked"
                      ? `${customData.oracleName} está disponível apenas no plano Premium`
                      : customData?.courseName && type === "premium_course"
                      ? `${customData.courseName} é um curso premium`
                      : customData?.crystalsNeeded && type === "insufficient_crystals"
                      ? `Você precisa de ${customData.crystalsNeeded} cristais`
                      : content.subtitle}
                  </p>

                  {/* Lista de benefícios */}
                  <div className="space-y-3 mb-8">
                    {content.benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${content.color} flex items-center justify-center`}>
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-white/90">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Preço */}
                  <div className="text-center mb-6">
                    <div className="text-white/60 text-sm mb-1">A partir de</div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl font-bold text-white">R$ 19,90</span>
                      <span className="text-white/60">/mês</span>
                    </div>
                    <div className="text-purple-400 text-sm mt-1">7 dias grátis</div>
                  </div>

                  {/* Botões */}
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleUpgrade}
                      className={`w-full py-4 rounded-xl bg-gradient-to-r ${content.color} text-white font-bold text-lg shadow-lg hover:shadow-xl transition-shadow`}
                    >
                      {content.cta}
                    </motion.button>

                    <button
                      onClick={onClose}
                      className="w-full py-3 text-white/60 hover:text-white transition-colors text-sm"
                    >
                      Talvez depois
                    </button>
                  </div>
                </div>
              </div>

              {/* Partículas flutuantes ao redor */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-purple-500/30"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
