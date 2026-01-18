import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * POST /api/shop/purchase
 * Compra um item da loja usando cristais
 */
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
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
        inventory: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { itemId } = body;

    if (!itemId) {
      return NextResponse.json(
        { error: 'Item ID não fornecido' },
        { status: 400 }
      );
    }

    // Busca o item
    const item = await prisma.shopItem.findUnique({
      where: { id: itemId }
    });

    if (!item) {
      return NextResponse.json(
        { error: 'Item não encontrado' },
        { status: 404 }
      );
    }

    if (!item.available) {
      return NextResponse.json(
        { error: 'Item não disponível' },
        { status: 400 }
      );
    }

    // Verifica se já possui o item
    const alreadyPurchased = user.inventory.find((inv) => inv.itemId === itemId);
    if (alreadyPurchased) {
      return NextResponse.json(
        { error: 'Você já possui este item' },
        { status: 400 }
      );
    }

    // Verifica se tem cristais suficientes
    if (user.crystals < item.price) {
      return NextResponse.json(
        {
          error: 'Cristais insuficientes',
          required: item.price,
          current: user.crystals,
          missing: item.price - user.crystals
        },
        { status: 400 }
      );
    }

    // Realiza a compra
    await prisma.$transaction([
      // Deduz cristais
      prisma.user.update({
        where: { id: user.id },
        data: {
          crystals: { decrement: item.price }
        }
      }),
      // Adiciona ao inventário
      prisma.userInventory.create({
        data: {
          userId: user.id,
          itemId: item.id,
          equipped: false
        }
      })
    ]);

    // Busca usuário atualizado
    const updatedUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        crystals: true
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Item comprado com sucesso!',
      item,
      crystalsRemaining: updatedUser?.crystals || 0
    });
  } catch (error: any) {
    console.error('Erro ao comprar item:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao comprar item' },
      { status: 500 }
    );
  }
}
