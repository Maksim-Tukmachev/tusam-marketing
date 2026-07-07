"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { useRouter } from "next/navigation";

type TransitionState = {
  isTransitioning: boolean;
  label: string;
  subtitle: string;
};

type TransitionContextValue = TransitionState & {
  navigate: (href: string, label?: string, subtitle?: string) => void;
  onAnimationComplete: () => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function usePageTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("usePageTransition must be used within TransitionProvider");
  return ctx;
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [state, setState] = useState<TransitionState>({
    isTransitioning: false,
    label: "",
    subtitle: "",
  });
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  const navigate = useCallback((href: string, label = "", subtitle = "") => {
    setState({ isTransitioning: true, label, subtitle });
    setPendingHref(href);
  }, []);

  const onAnimationComplete = useCallback(() => {
    if (pendingHref) {
      router.push(pendingHref);
      setPendingHref(null);
      setTimeout(() => {
        setState({ isTransitioning: false, label: "", subtitle: "" });
      }, 400);
    }
  }, [pendingHref, router]);

  return (
    <TransitionContext.Provider value={{ ...state, navigate, onAnimationComplete }}>
      {children}
    </TransitionContext.Provider>
  );
}
