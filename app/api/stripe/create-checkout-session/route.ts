
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { stripe } from '@/lib/stripe';
import { STRIPE_PRODUCTS, TRIAL_PERIOD_DAYS } from '@/lib/stripe-products';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const { planType } = await req.json() as { planType: string };

    if (planType !== 'BASIC' && planType !== 'PREMIUM') {
      return NextResponse.json(
        { error: 'Plano inválido' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Verificar se já tem Stripe Customer ID
    let customerId = user.stripeCustomerId;

    if (!customerId) {
      // Criar novo customer no Stripe
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name || undefined,
        metadata: {
          userId: user.id,
        },
      });
      customerId = customer.id;

      // Salvar Customer ID no banco
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customerId },
      });
    }

    const plan = STRIPE_PRODUCTS[planType as keyof typeof STRIPE_PRODUCTS];
    const origin = req.headers.get('origin') || 'http://localhost:3000';

    // Criar Checkout Session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: plan.currency,
            product_data: {
              name: plan.name,
              description: plan.description,
            },
            recurring: {
              interval: plan.interval,
            },
            unit_amount: plan.amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${origin}/dashboard?canceled=true`,
      subscription_data: {
        trial_period_days: TRIAL_PERIOD_DAYS,
        metadata: {
          userId: user.id,
          planType,
        },
      },
      metadata: {
        userId: user.id,
        planType,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    console.error('Erro ao criar checkout session:', error);
    return NextResponse.json(
      { error: error?.message || 'Erro ao processar pagamento' },
      { status: 500 }
    );
  }
}
