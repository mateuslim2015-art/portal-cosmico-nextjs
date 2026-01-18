"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SplashScreen from "./SplashScreen";
import BottomNavigation from "./BottomNavigation";

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);
  const [hasShownSplash, setHasShownSplash] = useState(false);

  useEffect(() => {
    // Verificar se já mostrou o splash nesta sessão
    const splashShown = sessionStorage.getItem("splashShown");
    if (splashShown) {
      setShowSplash(false);
      setHasShownSplash(true);
    }
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem("splashShown", "true");
    setShowSplash(false);
    setHasShownSplash(true);
  };

  if (showSplash && !hasShownSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  const pathname = usePathname();
  
  // Páginas onde o BottomNavigation deve aparecer
  const showBottomNav = pathname.startsWith('/dashboard') || 
                        pathname.startsWith('/practice') || 
                        pathname.startsWith('/reading') || 
                        pathname.startsWith('/shop');

  return (
    <>
      {children}
      {showBottomNav && <div data-tour="bottom-nav"><BottomNavigation /></div>}
    </>
  );
}
