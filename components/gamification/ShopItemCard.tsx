'use client';

import { ShopItem } from '@prisma/client';
import { motion } from 'framer-motion';
import { ShoppingCart, Check, Lock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ShopItemCardProps {
  item: ShopItem & {
    purchased?: boolean;
    equipped?: boolean;
  };
  userCrystals: number;
  onPurchase: (itemId: string) => void;
  onEquip?: (itemId: string, equip: boolean) => void;
  purchasing?: boolean;
}

const rarityColors = {
  common: 'from-gray-500 to-gray-600',
  rare: 'from-blue-500 to-blue-600',
  epic: 'from-purple-500 to-purple-600',
  legendary: 'from-yellow-500 to-orange-600'
};

const rarityBorders = {
  common: 'border-gray-500',
  rare: 'border-blue-500',
  epic: 'border-purple-500',
  legendary: 'border-yellow-500'
};

const typeLabels: Record<string, string> = {
  deck_skin: '🃏 Deck',
  theme: '🎨 Tema',
  frame: '🖼️ Moldura',
  aura: '✨ Aura',
  title: '👑 Título',
  boost: '⚡ Boost',
  protection: '🛡️ Proteção'
};

export default function ShopItemCard({
  item,
  userCrystals,
  onPurchase,
  onEquip,
  purchasing = false
}: ShopItemCardProps) {
  const rarity = item.rarity as keyof typeof rarityColors;
  const canAfford = userCrystals >= item.price;
  const isFree = item.price === 0;

  const handlePurchase = () => {
    if (!item.purchased && (canAfford || isFree)) {
      onPurchase(item.id);
    }
  };

  const handleEquip = () => {
    if (onEquip && item.purchased) {
      onEquip(item.id, !item.equipped);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        'relative bg-gray-800 rounded-lg overflow-hidden border-2 transition-all',
        item.purchased ? 'border-green-500' : rarityBorders[rarity]
      )}
    >
      {/* Rarity Gradient Header */}
      <div className={cn('h-2 bg-gradient-to-r', rarityColors[rarity])} />

      {/* Content */}
      <div className="p-4">
        {/* Type Badge */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs bg-gray-700 px-2 py-1 rounded-full text-gray-300">
            {typeLabels[item.type] || item.type}
          </span>
          <span className="text-xs uppercase tracking-wider text-gray-400">
            {item.rarity}
          </span>
        </div>

        {/* Item Visual Preview */}
        <div className="flex justify-center mb-4">
          <div
            className={cn(
              'w-24 h-24 rounded-lg flex items-center justify-center text-4xl',
              'bg-gradient-to-br',
              rarityColors[rarity]
            )}
          >
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span>{typeLabels[item.type]?.split(' ')[0] || '🎁'}</span>
            )}
          </div>
        </div>

        {/* Name */}
        <h3 className="font-semibold text-white text-center mb-2">{item.name}</h3>

        {/* Description */}
        <p className="text-xs text-gray-400 text-center mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-center mb-4">
          {isFree ? (
            <span className="text-green-400 font-bold">GRÁTIS</span>
          ) : (
            <div className="flex items-center gap-1">
              <span className="text-2xl">💎</span>
              <span className="text-xl font-bold text-blue-400">{item.price}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-2">
          {!item.purchased ? (
            <Button
              onClick={handlePurchase}
              disabled={!canAfford && !isFree || purchasing}
              className={cn(
                'w-full',
                canAfford || isFree
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                  : 'bg-gray-700 cursor-not-allowed'
              )}
            >
              {purchasing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Comprando...
                </>
              ) : !canAfford && !isFree ? (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Cristais Insuficientes
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {isFree ? 'Obter' : 'Comprar'}
                </>
              )}
            </Button>
          ) : (
            <>
              {/* Purchased Badge */}
              <div className="flex items-center justify-center gap-2 bg-green-900/30 border border-green-500 rounded-lg py-2">
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-sm font-semibold text-green-400">
                  Adquirido
                </span>
              </div>

              {/* Equip Button (for cosmetics) */}
              {onEquip && item.category === 'cosmetic' && (
                <Button
                  onClick={handleEquip}
                  variant={item.equipped ? 'default' : 'outline'}
                  className={cn(
                    'w-full',
                    item.equipped
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : 'bg-gray-700 hover:bg-gray-600'
                  )}
                >
                  {item.equipped ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Equipado
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Equipar
                    </>
                  )}
                </Button>
              )}
            </>
          )}
        </div>

        {/* Discount Badge */}
        {item.discount > 0 && !item.purchased && (
          <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{item.discount}%
          </div>
        )}

        {/* Limited Badge */}
        {item.limited && (
          <div className="absolute top-4 left-4 bg-yellow-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            LIMITADO
          </div>
        )}

        {/* Seasonal Badge */}
        {item.seasonal && (
          <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            SAZONAL
          </div>
        )}
      </div>
    </motion.div>
  );
}
