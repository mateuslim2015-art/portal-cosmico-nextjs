
import webpush from 'web-push';

// Gerar chaves VAPID se não existirem
// Execute: const vapidKeys = webpush.generateVAPIDKeys();
// Salve as chaves no .env

const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '';
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY || '';
const vapidEmail = process.env.VAPID_EMAIL || 'mailto:contato@portalcosmico.com';

if (vapidPublicKey && vapidPrivateKey) {
  webpush.setVapidDetails(
    vapidEmail,
    vapidPublicKey,
    vapidPrivateKey
  );
}

export default webpush;
