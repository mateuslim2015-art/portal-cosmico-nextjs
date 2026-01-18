'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Filter, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import BadgeCard from '@/components/gamification/BadgeCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function BadgesPage() {
  const router = useRouter();
  const [badges, setBadges] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchBadges();
  }, []);

  const fetchBadges = async () => {
    try {
      const response = await fetch('/api/badges');
      const data = await response.json();
      setBadges(data);
    } catch (error) {
      console.error('Erro ao buscar badges:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-700 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!badges) {
    return null;
  }

  const filteredBadges = badges.badges.filter((badge: any) => {
    if (filter === 'unlocked' && !badge.unlocked) return false;
    if (filter === 'locked' && badge.unlocked) return false;
    if (selectedCategory !== 'all' && badge.category !== selectedCategory) return false;
    return true;
  });

  const categories = [
    { value: 'all', label: 'Todos', icon: '🏆' },
    { value: 'streak', label: 'Streak', icon: '🔥' },
    { value: 'study', label: 'Estudo', icon: '📚' },
    { value: 'practice', label: 'Prática', icon: '🔮' },
    { value: 'performance', label: 'Performance', icon: '🎯' },
    { value: 'collection', label: 'Coleção', icon: '🃏' },
    { value: 'special', label: 'Especial', icon: '⭐' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-8 px-6 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white flex items-center gap-3">
                <Trophy className="w-10 h-10" />
                Meus Badges
              </h1>
              <p className="text-blue-100 mt-2">
                Conquiste badges completando desafios e missões
              </p>
            </div>

            {/* Stats */}
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {badges.stats.unlocked}/{badges.stats.total}
                </div>
                <div className="text-sm text-blue-100">Desbloqueados</div>
                <div className="text-xs text-blue-200 mt-1">
                  {badges.stats.percentage}% completo
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Filters */}
        <div className="mb-8">
          <Tabs value={filter} onValueChange={(v: any) => setFilter(v)}>
            <TabsList className="bg-gray-800">
              <TabsTrigger value="all">Todos ({badges.badges.length})</TabsTrigger>
              <TabsTrigger value="unlocked">
                Desbloqueados ({badges.stats.unlocked})
              </TabsTrigger>
              <TabsTrigger value="locked">
                Bloqueados ({badges.stats.total - badges.stats.unlocked})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-gray-400 font-semibold">Categoria:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.value)}
                className={
                  selectedCategory === category.value
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                }
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Badges Grid */}
        {filteredBadges.length > 0 ? (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {filteredBadges.map((badge: any, index: number) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <BadgeCard badge={badge} size="lg" showProgress={!badge.unlocked} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              Nenhum badge encontrado com esses filtros
            </p>
          </div>
        )}

        {/* Categories Breakdown */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(badges.badgesByCategory).map(([category, categoryBadges]: [string, any]) => {
            if (categoryBadges.length === 0) return null;

            const unlocked = categoryBadges.filter((b: any) => b.unlocked).length;
            const total = categoryBadges.length;
            const percentage = Math.round((unlocked / total) * 100);

            const categoryInfo = categories.find((c) => c.value === category);

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{categoryInfo?.icon}</span>
                    <h3 className="font-semibold text-white capitalize">
                      {categoryInfo?.label || category}
                    </h3>
                  </div>
                  <span className="text-sm text-gray-400">
                    {unlocked}/{total}
                  </span>
                </div>

                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <p className="text-xs text-gray-400 text-center">{percentage}% completo</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
