'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowLeft, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ShopItemCard from '@/components/gamification/ShopItemCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

export default function ShopPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [shop, setShop] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);

  useEffect(() => {
    fetchShop();
  }, []);

  const fetchShop = async () => {
    try {
      const response = await fetch('/api/shop');
      const data = await response.json();
      setShop(data);
    } catch (error) {
      console.error('Erro ao buscar loja:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (itemId: string) => {
    setPurchasing(itemId);

    try {
      const response = await fetch('/api/shop/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId })
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: '✅ Compra realizada!',
          description: `${data.item.name} foi adicionado ao seu inventário.`
        });
        fetchShop(); // Atualiza a loja
      } else {
        toast({
          title: '❌ Erro na compra',
          description: data.error || 'Não foi possível completar a compra.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: '❌ Erro',
        description: 'Erro ao processar compra.',
        variant: 'destructive'
      });
    } finally {
      setPurchasing(null);
    }
  };

  const handleEquip = async (itemId: string, equip: boolean) => {
    try {
      const response = await fetch('/api/shop/equip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, equip })
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: equip ? '✨ Item equipado!' : '📦 Item desequipado',
          description: data.message
        });
        fetchShop(); // Atualiza a loja
      } else {
        toast({
          title: '❌ Erro',
          description: data.error,
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: '❌ Erro',
        description: 'Erro ao equipar/desequipar item.',
        variant: 'destructive'
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-700 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!shop) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-8 px-6 shadow-xl">
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
                <ShoppingBag className="w-10 h-10" />
                Loja de Recompensas
              </h1>
              <p className="text-pink-100 mt-2">
                Use seus Cristais Lunares para desbloquear itens exclusivos
              </p>
            </div>

            {/* Crystals Balance */}
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-3xl">💎</span>
                  <div className="text-3xl font-bold text-white">
                    {shop.userCrystals}
                  </div>
                </div>
                <div className="text-sm text-pink-100">Cristais Lunares</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gray-800 mb-8">
            <TabsTrigger value="all">
              Todos ({shop.items?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="cosmetic">
              🎨 Cosméticos ({shop.itemsByCategory?.cosmetic?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="benefit">
              ⚡ Benefícios ({shop.itemsByCategory?.benefit?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="content">
              📚 Conteúdo ({shop.itemsByCategory?.content?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="special">
              ⭐ Especial ({shop.itemsByCategory?.special?.length || 0})
            </TabsTrigger>
          </TabsList>

          {/* All Items */}
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {shop.items?.map((item: any) => (
                <ShopItemCard
                  key={item.id}
                  item={item}
                  userCrystals={shop.userCrystals}
                  onPurchase={handlePurchase}
                  onEquip={handleEquip}
                  purchasing={purchasing === item.id}
                />
              ))}
            </div>
          </TabsContent>

          {/* Cosmetics */}
          <TabsContent value="cosmetic">
            {/* Decks */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                🃏 Decks de Cartas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {shop.cosmeticsByType?.deck_skin?.map((item: any) => (
                  <ShopItemCard
                    key={item.id}
                    item={item}
                    userCrystals={shop.userCrystals}
                    onPurchase={handlePurchase}
                    onEquip={handleEquip}
                    purchasing={purchasing === item.id}
                  />
                ))}
              </div>
            </div>

            {/* Themes */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                🎨 Temas do App
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {shop.cosmeticsByType?.theme?.map((item: any) => (
                  <ShopItemCard
                    key={item.id}
                    item={item}
                    userCrystals={shop.userCrystals}
                    onPurchase={handlePurchase}
                    onEquip={handleEquip}
                    purchasing={purchasing === item.id}
                  />
                ))}
              </div>
            </div>

            {/* Frames */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                🖼️ Molduras de Perfil
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {shop.cosmeticsByType?.frame?.map((item: any) => (
                  <ShopItemCard
                    key={item.id}
                    item={item}
                    userCrystals={shop.userCrystals}
                    onPurchase={handlePurchase}
                    onEquip={handleEquip}
                    purchasing={purchasing === item.id}
                  />
                ))}
              </div>
            </div>

            {/* Auras */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                ✨ Efeitos de Aura
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {shop.cosmeticsByType?.aura?.map((item: any) => (
                  <ShopItemCard
                    key={item.id}
                    item={item}
                    userCrystals={shop.userCrystals}
                    onPurchase={handlePurchase}
                    onEquip={handleEquip}
                    purchasing={purchasing === item.id}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Benefits */}
          <TabsContent value="benefit">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {shop.itemsByCategory?.benefit?.map((item: any) => (
                <ShopItemCard
                  key={item.id}
                  item={item}
                  userCrystals={shop.userCrystals}
                  onPurchase={handlePurchase}
                  purchasing={purchasing === item.id}
                />
              ))}
            </div>
          </TabsContent>

          {/* Content */}
          <TabsContent value="content">
            {shop.itemsByCategory?.content && shop.itemsByCategory.content.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {shop.itemsByCategory.content.map((item: any) => (
                  <ShopItemCard
                    key={item.id}
                    item={item}
                    userCrystals={shop.userCrystals}
                    onPurchase={handlePurchase}
                    purchasing={purchasing === item.id}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Sparkles className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">
                  Nenhum conteúdo disponível no momento
                </p>
              </div>
            )}
          </TabsContent>

          {/* Special */}
          <TabsContent value="special">
            {shop.itemsByCategory?.special && shop.itemsByCategory.special.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {shop.itemsByCategory.special.map((item: any) => (
                  <ShopItemCard
                    key={item.id}
                    item={item}
                    userCrystals={shop.userCrystals}
                    onPurchase={handlePurchase}
                    purchasing={purchasing === item.id}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Sparkles className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">
                  Nenhum item especial disponível no momento
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
