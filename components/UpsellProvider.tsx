"use client";

import { createContext, useContext, ReactNode } from "react";
import { useUpsell } from "@/hooks/useUpsell";
import UpsellModal, { UpsellType } from "./UpsellModal";

interface UpsellContextType {
  showUpsell: (type: UpsellType, customData?: any) => void;
}

const UpsellContext = createContext<UpsellContextType | undefined>(undefined);

export function UpsellProvider({ children }: { children: ReactNode }) {
  const { upsellConfig, isOpen, showUpsell, closeUpsell } = useUpsell();

  return (
    <UpsellContext.Provider value={{ showUpsell }}>
      {children}
      {upsellConfig && (
        <UpsellModal
          isOpen={isOpen}
          onClose={closeUpsell}
          type={upsellConfig.type}
          customData={upsellConfig.customData}
        />
      )}
    </UpsellContext.Provider>
  );
}

export function useUpsellContext() {
  const context = useContext(UpsellContext);
  if (!context) {
    throw new Error("useUpsellContext must be used within UpsellProvider");
  }
  return context;
}
