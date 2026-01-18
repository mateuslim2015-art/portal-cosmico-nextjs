// Haptic Feedback para dispositivos móveis

export type HapticStyle = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';

export class HapticFeedback {
  private static isSupported(): boolean {
    return 'vibrate' in navigator;
  }

  static trigger(style: HapticStyle = 'light'): void {
    if (!this.isSupported()) return;

    const patterns = {
      light: [10],
      medium: [20],
      heavy: [30],
      success: [10, 50, 10],
      warning: [20, 100, 20],
      error: [30, 100, 30, 100, 30],
    };

    navigator.vibrate(patterns[style]);
  }

  static impact(intensity: 'light' | 'medium' | 'heavy' = 'medium'): void {
    this.trigger(intensity);
  }

  static notification(type: 'success' | 'warning' | 'error' = 'success'): void {
    this.trigger(type);
  }

  static selection(): void {
    this.trigger('light');
  }
}

// Hook para usar haptic feedback
export function useHaptic() {
  return {
    impact: HapticFeedback.impact,
    notification: HapticFeedback.notification,
    selection: HapticFeedback.selection,
  };
}
