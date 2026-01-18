// Configurações de responsividade mobile

export const MOBILE_BREAKPOINTS = {
  xs: 320,  // iPhone SE
  sm: 375,  // iPhone 12/13 mini
  md: 390,  // iPhone 12/13/14
  lg: 428,  // iPhone 12/13/14 Pro Max
  xl: 768,  // iPad mini
};

export const TOUCH_TARGETS = {
  min: 44,  // Tamanho mínimo recomendado pela Apple (44x44px)
  comfortable: 48,  // Tamanho confortável
  large: 56,  // Tamanho grande para ações principais
};

export const MOBILE_SPACING = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
};

export const MOBILE_FONT_SIZES = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem',// 30px
  '4xl': '2.25rem', // 36px
};

// Hook para detectar se está em mobile
export function useIsMobile() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < MOBILE_BREAKPOINTS.xl;
}

// Utilitário para classes responsivas
export const mobileClasses = {
  container: 'px-4 sm:px-6 md:px-8',
  card: 'p-4 sm:p-6',
  button: 'min-h-[44px] px-4 py-2 text-base',
  input: 'min-h-[44px] px-4 text-base',
  heading: 'text-2xl sm:text-3xl md:text-4xl',
  subheading: 'text-xl sm:text-2xl',
  body: 'text-base sm:text-lg',
  small: 'text-sm',
};
