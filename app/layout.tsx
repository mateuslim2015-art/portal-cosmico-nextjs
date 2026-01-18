
import { Inter, Cinzel } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from "sonner"
import { NotificationPrompt } from '@/components/notification-prompt'
import SessionProvider from '@/components/session-provider'
import AppWrapper from '@/components/AppWrapper'
import { UpsellProvider } from '@/components/UpsellProvider'
import '@/lib/init-scheduler' // Initialize notification scheduler

const inter = Inter({ subsets: ['latin'] })
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' })

export const dynamic = "force-dynamic"

export const metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: 'Portal Cósmico - Oráculos com Inteligência Artificial',
  description: 'Estude, pratique e consulte oráculos com IA. Tarot disponível agora. Cigano, Runas e I-Ching em breve. Teste grátis por 7 dias.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Portal Cósmico - Oráculos com Inteligência Artificial',
    description: 'Estude, pratique e consulte oráculos com IA. Tarot disponível agora. Cigano, Runas e I-Ching em breve. Teste grátis por 7 dias.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portal Cósmico - Oráculos com Inteligência Artificial',
    description: 'Estude, pratique e consulte oráculos com IA. Tarot disponível agora. Cigano, Runas e I-Ching em breve. Teste grátis por 7 dias.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${cinzel.variable}`}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <UpsellProvider>
              <AppWrapper>
                {children}
              </AppWrapper>
            </UpsellProvider>
            <NotificationPrompt />
            <Toaster richColors position="top-center" />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
