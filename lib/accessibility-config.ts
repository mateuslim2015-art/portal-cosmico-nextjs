// Configurações de acessibilidade visual para mobile

export const ACCESSIBILITY_COLORS = {
  // Contraste mínimo WCAG AA: 4.5:1 para texto normal, 3:1 para texto grande
  text: {
    primary: 'text-white',           // Contraste máximo
    secondary: 'text-gray-300',      // Alto contraste
    muted: 'text-gray-400',          // Contraste moderado
    disabled: 'text-gray-600',       // Baixo contraste (desabilitado)
  },
  background: {
    primary: 'bg-gray-900',
    secondary: 'bg-gray-800',
    elevated: 'bg-gray-700',
  },
  interactive: {
    primary: 'bg-purple-600 hover:bg-purple-500',
    secondary: 'bg-blue-600 hover:bg-blue-500',
    danger: 'bg-red-600 hover:bg-red-500',
    success: 'bg-green-600 hover:bg-green-500',
  },
  focus: {
    ring: 'focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900',
    outline: 'focus:outline-none focus:ring-2 focus:ring-purple-500',
  },
};

export const ACCESSIBILITY_SIZES = {
  // Tamanhos mínimos recomendados
  touch: {
    min: '44px',      // Apple HIG
    comfortable: '48px',
    large: '56px',
  },
  text: {
    xs: '0.75rem',    // 12px - Apenas para labels
    sm: '0.875rem',   // 14px - Texto secundário
    base: '1rem',     // 16px - Texto principal (mínimo recomendado)
    lg: '1.125rem',   // 18px - Texto destacado
    xl: '1.25rem',    // 20px - Títulos pequenos
    '2xl': '1.5rem',  // 24px - Títulos médios
    '3xl': '1.875rem',// 30px - Títulos grandes
  },
  spacing: {
    tight: '0.25rem',   // 4px
    normal: '0.5rem',   // 8px
    relaxed: '1rem',    // 16px
    loose: '1.5rem',    // 24px
  },
};

// Classes utilitárias de acessibilidade
export const a11yClasses = {
  // Esconder visualmente mas manter para screen readers
  srOnly: 'sr-only',
  
  // Foco visível
  focusVisible: 'focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2',
  
  // Contraste alto
  highContrast: 'text-white bg-gray-900',
  
  // Tamanho de toque adequado
  touchTarget: 'min-h-[44px] min-w-[44px]',
  
  // Espaçamento adequado para leitura
  readableSpacing: 'leading-relaxed tracking-wide',
};

// Verificar se o contraste é adequado (simplificado)
export function hasGoodContrast(foreground: string, background: string): boolean {
  // Implementação simplificada - em produção, usar biblioteca como 'color-contrast-checker'
  const darkBackgrounds = ['bg-gray-900', 'bg-gray-800', 'bg-black'];
  const lightText = ['text-white', 'text-gray-100', 'text-gray-200'];
  
  return darkBackgrounds.some(bg => background.includes(bg)) && 
         lightText.some(txt => foreground.includes(txt));
}
