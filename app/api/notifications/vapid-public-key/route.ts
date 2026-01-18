import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Chave pública VAPID (você deve gerar um par de chaves VAPID)
  // Para gerar: npx web-push generate-vapid-keys
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || 
    'BEl62iUYgUivxIkv69yViEuiBIa-Ib37J8-fTnDw9CqSMQJHaLJgPIFvDPNMlJwGLGJKEpGAW3Qy7CxJkYCqaHI';

  return NextResponse.json({ publicKey });
}
