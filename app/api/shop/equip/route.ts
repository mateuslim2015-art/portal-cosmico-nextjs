import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * POST /api/shop/equip
 * Equipa ou desequipa um item cosmético
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

    const body = await request.json();
    const { itemId, equip } = body;

    if (!itemId) {
      return NextResponse.json(
        { error: 'Item ID não fornecido' },
        { status: 400 }
      );
    }

    // Verifica se o usuário possui o item
    const inventoryItem = user.inventory.find((inv) => inv.itemId === itemId);
    if (!inventoryItem) {
      return NextResponse.json(
        { error: 'Você não possui este item' },
        { status: 400 }
      );
    }

    const item = inventoryItem.item;

    // Desequipa outros itens do mesmo tipo (só pode ter 1 equipado por tipo)
    if (equip) {
      await prisma.userInventory.updateMany({
        where: {
          userId: user.id,
          item: {
            type: item.type
          }
        },
        data: {
          equipped: false
        }
      });
    }

    // Equipa ou desequipa o item
    await prisma.userInventory.update({
      where: {
        id: inventoryItem.id
      },
      data: {
        equipped: equip
      }
    });

    // Atualiza campos do usuário baseado no tipo de item
    const updateData: any = {};

    if (equip) {
      switch (item.type) {
        case 'frame':
          updateData.equippedFrame = item.slug;
          break;
        case 'aura':
          updateData.equippedAura = item.slug;
          break;
        case 'title':
          updateData.equippedTitle = item.slug;
          break;
      }
    } else {
      // Desequipa
      switch (item.type) {
        case 'frame':
          updateData.equippedFrame = null;
          break;
        case 'aura':
          updateData.equippedAura = null;
          break;
        case 'title':
          updateData.equippedTitle = null;
          break;
      }
    }

    if (Object.keys(updateData).length > 0) {
      await prisma.user.update({
        where: { id: user.id },
        data: updateData
      });
    }

    return NextResponse.json({
      success: true,
      message: equip ? 'Item equipado com sucesso!' : 'Item desequipado com sucesso!',
      item
    });
  } catch (error: any) {
    console.error('Erro ao equipar/desequipar item:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao equipar/desequipar item' },
      { status: 500 }
    );
  }
}
