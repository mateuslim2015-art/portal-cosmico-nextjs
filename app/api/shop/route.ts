export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/shop
 * Retorna todos os itens da loja com status de compra do usuário
 */

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        inventory: {
          include: {
            item: true
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Busca todos os itens disponíveis
    const allItems = await prisma.shopItem.findMany({
      where: { available: true },
      orderBy: [{ category: 'asc' }, { order: 'asc' }]
    });

    // Marca itens já comprados
    const purchasedItemIds = new Set(user.inventory.map((inv) => inv.item.id));

    const itemsWithStatus = allItems.map((item) => ({
      ...item,
      purchased: purchasedItemIds.has(item.id),
      equipped: user.inventory.find((inv) => inv.item.id === item.id)?.equipped || false
    }));

    // Agrupa por categoria
    const itemsByCategory = {
      cosmetic: itemsWithStatus.filter((i) => i.category === 'cosmetic'),
      benefit: itemsWithStatus.filter((i) => i.category === 'benefit'),
      content: itemsWithStatus.filter((i) => i.category === 'content'),
      special: itemsWithStatus.filter((i) => i.category === 'special')
    };

    // Agrupa cosméticos por tipo
    const cosmeticsByType = {
      deck_skin: itemsWithStatus.filter((i) => i.type === 'deck_skin'),
      theme: itemsWithStatus.filter((i) => i.type === 'theme'),
      frame: itemsWithStatus.filter((i) => i.type === 'frame'),
      aura: itemsWithStatus.filter((i) => i.type === 'aura')
    };

    return NextResponse.json({
      items: itemsWithStatus,
      itemsByCategory,
      cosmeticsByType,
      userCrystals: user.crystals
    });
  } catch (error) {
    console.error('Erro ao buscar itens da loja:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar itens da loja' },
      { status: 500 }
    );
  }
}
