
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/db';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    // Verificar assinatura do webhook
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Processar eventos
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdate(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaid(invoice);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentFailed(invoice);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;
  const planType = session.metadata?.planType;

  if (!userId) {
    console.error('No userId in session metadata');
    return;
  }

  // Atualizar usuário com subscription ID
  if (session.subscription) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        stripeSubscriptionId: session.subscription as string,
        subscriptionStatus: 'trialing',
        subscriptionPlan: planType || 'BASIC',
      },
    });
  }

  console.log(`✅ Checkout completed for user ${userId}`);
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId;

  if (!userId) {
    // Buscar por subscription ID
    const user = await prisma.user.findFirst({
      where: { stripeSubscriptionId: subscription.id },
    });

    if (!user) {
      console.error('No user found for subscription:', subscription.id);
      return;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        subscriptionStatus: subscription.status,
        subscriptionPlan: subscription.metadata?.planType || user.subscriptionPlan,
      },
    });
  } else {
    await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionStatus: subscription.status,
        subscriptionPlan: subscription.metadata?.planType || 'BASIC',
      },
    });
  }

  console.log(`✅ Subscription updated for user ${userId || 'unknown'}`);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const user = await prisma.user.findFirst({
    where: { stripeSubscriptionId: subscription.id },
  });

  if (!user) {
    console.error('No user found for subscription:', subscription.id);
    return;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      subscriptionStatus: 'canceled',
    },
  });

  console.log(`✅ Subscription deleted for user ${user.id}`);
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const subscription = (invoice as any).subscription;
  const subscriptionId = typeof subscription === 'string' 
    ? subscription 
    : subscription?.id;

  if (!subscriptionId) return;

  const user = await prisma.user.findFirst({
    where: { stripeSubscriptionId: subscriptionId },
  });

  if (!user) {
    console.error('No user found for subscription:', subscriptionId);
    return;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      subscriptionStatus: 'active',
    },
  });

  console.log(`✅ Invoice paid for user ${user.id}`);
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const subscription = (invoice as any).subscription;
  const subscriptionId = typeof subscription === 'string' 
    ? subscription 
    : subscription?.id;

  if (!subscriptionId) return;

  const user = await prisma.user.findFirst({
    where: { stripeSubscriptionId: subscriptionId },
  });

  if (!user) {
    console.error('No user found for subscription:', subscriptionId);
    return;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      subscriptionStatus: 'past_due',
    },
  });

  console.log(`⚠️ Invoice payment failed for user ${user.id}`);
}
