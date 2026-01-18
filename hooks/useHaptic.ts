import { useCallback } from 'react'

type HapticStyle = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error'

export function useHaptic() {
  const vibrate = useCallback((style: HapticStyle = 'light') => {
    // Check if vibration API is supported
    if (!('vibrate' in navigator)) {
      return
    }

    // Different vibration patterns for different styles
    const patterns = {
      light: [10],
      medium: [20],
      heavy: [30],
      success: [10, 50, 10],
      warning: [20, 100, 20],
      error: [30, 100, 30, 100, 30],
    }

    navigator.vibrate(patterns[style])
  }, [])

  return { vibrate }
}
