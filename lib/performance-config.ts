// Configurações de otimização de performance para mobile

// Lazy loading de imagens
export const imageOptimization = {
  quality: 75,  // Qualidade de compressão (0-100)
  formats: ['webp', 'avif'],  // Formatos modernos
  sizes: {
    thumbnail: 64,
    small: 256,
    medium: 512,
    large: 1024,
  },
};

// Debounce para inputs
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle para scroll events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Intersection Observer para lazy loading
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',  // Carregar 50px antes de entrar na viewport
    threshold: 0.1,
  };

  return new IntersectionObserver(callback, { ...defaultOptions, ...options });
}

// Verificar se está em modo de economia de dados
export function isDataSaverMode(): boolean {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    return connection?.saveData === true;
  }
  return false;
}

// Verificar tipo de conexão
export function getConnectionType(): 'slow' | 'fast' | 'unknown' {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    const effectiveType = connection?.effectiveType;
    
    if (effectiveType === 'slow-2g' || effectiveType === '2g') {
      return 'slow';
    } else if (effectiveType === '3g' || effectiveType === '4g') {
      return 'fast';
    }
  }
  return 'unknown';
}

// Prefetch de recursos
export function prefetchResource(url: string, type: 'script' | 'style' | 'image' = 'script') {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.as = type;
  link.href = url;
  document.head.appendChild(link);
}

// Virtual scrolling config
export const virtualScrollConfig = {
  itemHeight: 80,  // Altura estimada de cada item
  overscan: 3,     // Número de itens extras para renderizar fora da viewport
  buffer: 200,     // Buffer em pixels
};
