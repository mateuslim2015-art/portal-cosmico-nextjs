'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Calendar, Star, Trophy, ArrowLeft, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import MissionCard from '@/components/gamification/MissionCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function MissionsPage() {
  const router = useRouter();
  const [missions, setMissions] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchMissions();
  }, []);

  const fetchMissions = async () => {
    try {
      const response = await fetch('/api/missions');
      const data = await response.json();
      setMissions(data);
    } catch (error) {
      console.error('Erro ao buscar missões:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchMissions();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/3 mb-8"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-700 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!missions) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-8 px-6 shadow-xl">
        <div className="max-w-6xl mx-auto">
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
                <Target className="w-10 h-10" />
                Missões
              </h1>
              <p className="text-blue-100 mt-2">
                Complete missões para ganhar XP, cristais e badges
              </p>
            </div>

            <Button
              onClick={handleRefresh}
              disabled={refreshing}
              variant="outline"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6">
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800 mb-8">
            <TabsTrigger value="daily" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Diárias
              <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                {missions.stats.daily.completed}/{missions.stats.daily.total}
              </span>
            </TabsTrigger>
            <TabsTrigger value="weekly" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Semanais
              <span className="ml-2 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
                {missions.stats.weekly.completed}/{missions.stats.weekly.total}
              </span>
            </TabsTrigger>
            <TabsTrigger value="achievement" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Conquistas
              <span className="ml-2 bg-yellow-600 text-white text-xs px-2 py-0.5 rounded-full">
                {missions.stats.achievement.completed}/{missions.stats.achievement.total}
              </span>
            </TabsTrigger>
          </TabsList>

          {/* Daily Missions */}
          <TabsContent value="daily">
            <div className="mb-6">
              <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-400 flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5" />
                  Missões Diárias
                </h3>
                <p className="text-sm text-gray-300">
                  Missões que resetam todo dia às 6h da manhã. Complete todas para ganhar bônus!
                </p>
                <div className="mt-3 flex items-center gap-4">
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${(missions.stats.daily.completed / missions.stats.daily.total) * 100}%`
                      }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {Math.round((missions.stats.daily.completed / missions.stats.daily.total) * 100)}%
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {missions.missionsByType.daily.map((mission: any) => (
                  <MissionCard key={mission.id} mission={mission} type="daily" />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Weekly Missions */}
          <TabsContent value="weekly">
            <div className="mb-6">
              <div className="bg-purple-900/30 border border-purple-500 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-purple-400 flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5" />
                  Missões Semanais
                </h3>
                <p className="text-sm text-gray-300">
                  Missões que resetam toda segunda-feira. Recompensas maiores!
                </p>
                <div className="mt-3 flex items-center gap-4">
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${(missions.stats.weekly.completed / missions.stats.weekly.total) * 100}%`
                      }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {Math.round((missions.stats.weekly.completed / missions.stats.weekly.total) * 100)}%
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {missions.missionsByType.weekly.map((mission: any) => (
                  <MissionCard key={mission.id} mission={mission} type="weekly" />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Achievement Missions */}
          <TabsContent value="achievement">
            <div className="mb-6">
              <div className="bg-yellow-900/30 border border-yellow-500 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-yellow-400 flex items-center gap-2 mb-2">
                  <Trophy className="w-5 h-5" />
                  Conquistas
                </h3>
                <p className="text-sm text-gray-300">
                  Missões permanentes que testam sua dedicação. Algumas podem levar meses!
                </p>
                <div className="mt-3 flex items-center gap-4">
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-yellow-500 to-orange-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${(missions.stats.achievement.completed / missions.stats.achievement.total) * 100}%`
                      }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {Math.round((missions.stats.achievement.completed / missions.stats.achievement.total) * 100)}%
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {missions.missionsByType.achievement.map((mission: any) => (
                  <MissionCard key={mission.id} mission={mission} type="achievement" />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Overall Progress */}
        <div className="mt-12 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="font-semibold text-white text-lg mb-4">
            Progresso Geral
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">
                {missions.stats.daily.completed}/{missions.stats.daily.total}
              </div>
              <div className="text-sm text-gray-400 mt-1">Diárias Completas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">
                {missions.stats.weekly.completed}/{missions.stats.weekly.total}
              </div>
              <div className="text-sm text-gray-400 mt-1">Semanais Completas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">
                {missions.stats.achievement.completed}/{missions.stats.achievement.total}
              </div>
              <div className="text-sm text-gray-400 mt-1">Conquistas Desbloqueadas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
