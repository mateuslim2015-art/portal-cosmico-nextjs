'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, BookOpen, ArrowRight } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  slug: string;
}

interface Oracle {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string | null;
  imageUrl: string | null;
  available: boolean;
  order: number;
  courses: Course[];
}

interface OraclesClientProps {
  oracles: Oracle[];
}

export default function OraclesClient({ oracles }: OraclesClientProps) {
  const router = useRouter();

  const handleSelectOracle = (oracle: Oracle) => {
    if (!oracle.available) {
      return;
    }

    // Se tem curso, redireciona para o curso
    if (oracle.courses.length > 0) {
      router.push(`/study/${oracle.slug}/${oracle.courses[0].slug}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-purple-950">
      {/* Header */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            📚 Área de Estudo
          </h1>
          <p className="text-xl text-purple-200">
            Escolha um oráculo para começar sua jornada de aprendizado
          </p>
        </div>

        {/* Grid de Oráculos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {oracles.map((oracle) => (
            <Card
              key={oracle.id}
              className={`bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur border-purple-500/30 hover:border-purple-400/50 transition-all ${
                oracle.available ? 'cursor-pointer hover:scale-105' : 'opacity-60'
              }`}
              onClick={() => handleSelectOracle(oracle)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-5xl">{oracle.icon || '🔮'}</div>
                  {!oracle.available && (
                    <div className="flex items-center gap-2 bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                      <Lock className="w-4 h-4" />
                      <span>Em breve</span>
                    </div>
                  )}
                  {oracle.available && (
                    <div className="flex items-center gap-2 bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                      <BookOpen className="w-4 h-4" />
                      <span>Disponível</span>
                    </div>
                  )}
                </div>
                <CardTitle className="text-2xl text-white">{oracle.name}</CardTitle>
                <CardDescription className="text-purple-200 text-base">
                  {oracle.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {oracle.available && oracle.courses.length > 0 ? (
                  <div className="space-y-3">
                    <div className="text-sm text-purple-300">
                      {oracle.courses.length} curso{oracle.courses.length > 1 ? 's' : ''} disponível
                      {oracle.courses.length > 1 ? 'is' : ''}
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold"
                      onClick={() => handleSelectOracle(oracle)}
                    >
                      Começar a Estudar
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                ) : oracle.available ? (
                  <div className="text-sm text-purple-400 text-center py-4">
                    Curso em desenvolvimento
                  </div>
                ) : (
                  <div className="text-sm text-purple-400 text-center py-4">
                    Este oráculo estará disponível em breve
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info adicional */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur border-indigo-500/30 max-w-2xl mx-auto">
            <CardContent className="py-6">
              <h3 className="text-xl font-bold text-white mb-2">
                🌟 Novos Oráculos em Breve
              </h3>
              <p className="text-purple-200">
                Estamos trabalhando para trazer mais oráculos para você! Baralho Cigano, Runas e
                I-Ching estarão disponíveis em breve.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
