
'use client';

import { Badge } from '@/components/ui/badge';
import { Crown, Sparkles } from 'lucide-react';

interface SubscriptionBadgeProps {
  plan?: string | null;
  status?: string | null;
}

export function SubscriptionBadge({ plan, status }: SubscriptionBadgeProps) {
  if (!plan || !status) return null;

  const isActive = status === 'active' || status === 'trialing';
  const isPremium = plan === 'PREMIUM';

  if (!isActive) return null;

  return (
    <Badge 
      className={`${
        isPremium 
          ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' 
          : 'bg-purple-600 text-white'
      } flex items-center gap-1`}
    >
      {isPremium ? <Crown className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
      {isPremium ? 'Premium' : 'Básico'}
      {status === 'trialing' && ' (Trial)'}
    </Badge>
  );
}
