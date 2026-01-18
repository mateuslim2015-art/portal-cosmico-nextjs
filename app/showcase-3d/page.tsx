import TarotCard3D from '@/components/3d/TarotCard3D'
import Crystal3D from '@/components/3d/Crystal3D'
import Badge3D from '@/components/3d/Badge3D'
import { Star, Crown, Flame, Moon, Trophy } from 'lucide-react'

export default function Showcase3DPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-cinzel text-white text-center mb-12">
          ✨ Componentes 3D - Portal Cósmico
        </h1>

        {/* TarotCard3D Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-cinzel text-purple-200 mb-6">
            🃏 TarotCard3D
          </h2>
          <div className="flex flex-wrap gap-8 justify-center">
            <TarotCard3D
              name="O Louco"
              imageUrl="/cards/fool.jpg"
              arcana="Arcano Maior 0"
              size="small"
            />
            <TarotCard3D
              name="A Imperatriz"
              imageUrl="/cards/empress.jpg"
              arcana="Arcano Maior III"
              size="medium"
            />
            <TarotCard3D
              name="O Mago"
              imageUrl="/cards/magician.jpg"
              arcana="Arcano Maior I"
              size="large"
            />
          </div>
        </section>

        {/* Crystal3D Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-cinzel text-purple-200 mb-6">
            💎 Crystal3D (Moeda Cósmica)
          </h2>
          <div className="flex flex-wrap gap-8 justify-center items-center bg-purple-900/20 p-8 rounded-2xl">
            <Crystal3D amount={50} size="small" />
            <Crystal3D amount={500} size="medium" />
            <Crystal3D amount={5000} size="large" />
            <Crystal3D amount={10000} size="large" animated={false} />
          </div>
        </section>

        {/* Badge3D Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-cinzel text-purple-200 mb-6">
            🏆 Badge3D (Conquistas)
          </h2>
          
          {/* Unlocked badges */}
          <div className="mb-8">
            <h3 className="text-lg text-purple-300 mb-4">Desbloqueados</h3>
            <div className="flex flex-wrap gap-8 justify-center bg-purple-900/20 p-8 rounded-2xl">
              <Badge3D
                icon={Star}
                name="Primeiro Passo"
                rarity="common"
                size="small"
              />
              <Badge3D
                icon={Moon}
                name="Estudante Lunar"
                rarity="rare"
                size="medium"
              />
              <Badge3D
                icon={Crown}
                name="Mestre das Cartas"
                rarity="epic"
                size="medium"
              />
              <Badge3D
                icon={Trophy}
                name="Lenda Cósmica"
                rarity="legendary"
                size="large"
              />
            </div>
          </div>

          {/* Locked badges */}
          <div>
            <h3 className="text-lg text-purple-300 mb-4">Bloqueados</h3>
            <div className="flex flex-wrap gap-8 justify-center bg-purple-900/20 p-8 rounded-2xl">
              <Badge3D
                icon={Flame}
                name="Chama Eterna"
                rarity="legendary"
                size="medium"
                unlocked={false}
              />
              <Badge3D
                icon={Star}
                name="Sábio Cósmico"
                rarity="epic"
                size="medium"
                unlocked={false}
              />
            </div>
          </div>
        </section>

        {/* Combined Example */}
        <section className="mb-16">
          <h2 className="text-2xl font-cinzel text-purple-200 mb-6">
            🎨 Exemplo Combinado
          </h2>
          <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 p-8 rounded-2xl border border-purple-500/30">
            <div className="flex flex-wrap gap-12 justify-center items-center">
              <div className="text-center">
                <TarotCard3D
                  name="A Estrela"
                  imageUrl="/cards/star.jpg"
                  arcana="Arcano Maior XVII"
                  size="medium"
                />
                <div className="mt-4 flex justify-center gap-4">
                  <Crystal3D amount={100} size="small" />
                  <Badge3D
                    icon={Star}
                    name="Iluminado"
                    rarity="epic"
                    size="small"
                  />
                </div>
              </div>

              <div className="text-center max-w-md">
                <h3 className="text-xl font-cinzel text-white mb-4">
                  Recompensa Desbloqueada!
                </h3>
                <p className="text-purple-200 mb-6">
                  Você completou a leitura e ganhou cristais cósmicos e uma nova conquista!
                </p>
                <div className="flex justify-center gap-4">
                  <Crystal3D amount={250} size="medium" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Info */}
        <section className="text-center text-purple-300 text-sm">
          <p>
            ✨ Todos os componentes usam CSS 3D transforms, Framer Motion e efeitos visuais avançados
          </p>
          <p className="mt-2">
            🎮 Interaja com os elementos para ver os efeitos 3D em ação!
          </p>
        </section>
      </div>
    </div>
  )
}
