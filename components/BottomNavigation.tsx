'use client'

import { motion } from 'framer-motion'
import { Home, Target, Sparkles, ShoppingBag, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavItem {
  id: string
  label: string
  icon: React.ElementType
  href: string
  badge?: number
}

const navItems: NavItem[] = [
  {
    id: 'home',
    label: 'Início',
    icon: Home,
    href: '/dashboard',
  },
  {
    id: 'practice',
    label: 'Prática',
    icon: Target,
    href: '/practice',
  },
  {
    id: 'reading',
    label: 'Leitura',
    icon: Sparkles,
    href: '/reading',
  },
  {
    id: 'shop',
    label: 'Loja',
    icon: ShoppingBag,
    href: '/shop',
  },
  {
    id: 'profile',
    label: 'Perfil',
    icon: User,
    href: '/dashboard/analytics',
  },
]

export default function BottomNavigation() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-purple-950/95 to-purple-900/90 backdrop-blur-lg border-t border-purple-500/30 safe-area-bottom">
      <div className="max-w-screen-xl mx-auto px-2">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)

            return (
              <Link
                key={item.id}
                href={item.href}
                className="relative flex flex-col items-center justify-center flex-1 h-full group"
              >
                {/* Active indicator */}
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-purple-500/20 rounded-xl"
                    initial={false}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}

                {/* Icon container */}
                <div className="relative flex flex-col items-center justify-center gap-1">
                  {/* Badge */}
                  {item.badge && item.badge > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {item.badge > 9 ? '9+' : item.badge}
                    </motion.div>
                  )}

                  {/* Icon with animation */}
                  <motion.div
                    animate={{
                      scale: active ? 1.1 : 1,
                      y: active ? -2 : 0,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 17,
                    }}
                  >
                    <Icon
                      className={cn(
                        'w-6 h-6 transition-colors duration-200',
                        active
                          ? 'text-purple-300'
                          : 'text-gray-400 group-hover:text-purple-400'
                      )}
                    />
                  </motion.div>

                  {/* Label */}
                  <span
                    className={cn(
                      'text-xs font-medium transition-colors duration-200',
                      active
                        ? 'text-purple-300'
                        : 'text-gray-400 group-hover:text-purple-400'
                    )}
                  >
                    {item.label}
                  </span>
                </div>

                {/* Ripple effect on tap */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                />
              </Link>
            )
          })}
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
    </nav>
  )
}
