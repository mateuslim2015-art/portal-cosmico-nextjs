"use client";

import { useState, useEffect } from "react";
import { UpsellType } from "@/components/UpsellModal";

interface UpsellConfig {
  type: UpsellType;
  customData?: any;
}

export function useUpsell() {
  const [upsellConfig, setUpsellConfig] = useState<UpsellConfig | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Mostrar popup após splash screen (apenas primeira vez)
  useEffect(() => {
    const hasSeenWelcomeUpsell = localStorage.getItem("hasSeenWelcomeUpsell");
    const splashShown = sessionStorage.getItem("splashShown");

    if (!hasSeenWelcomeUpsell && splashShown) {
      // Aguardar 1 segundo após splash screen
      const timer = setTimeout(() => {
        showUpsell("general_benefits");
        localStorage.setItem("hasSeenWelcomeUpsell", "true");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const showUpsell = (type: UpsellType, customData?: any) => {
    setUpsellConfig({ type, customData });
    setIsOpen(true);
  };

  const closeUpsell = () => {
    setIsOpen(false);
    setTimeout(() => setUpsellConfig(null), 300);
  };

  return {
    upsellConfig,
    isOpen,
    showUpsell,
    closeUpsell,
  };
}
