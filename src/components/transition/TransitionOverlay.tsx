"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePageTransition } from "./TransitionContext";

export function TransitionOverlay() {
  const { isTransitioning, label, subtitle, onAnimationComplete } = usePageTransition();

  return (
    <AnimatePresence mode="wait">
      {isTransitioning && (
        <motion.div
          key="transition-overlay"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a] pointer-events-auto"
          initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
          animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={(def) => {
            if (typeof def === "object" && "clipPath" in def) {
              const cp = def.clipPath as string;
              if (cp.includes("0 0, 100% 0, 100% 100%, 0 100%")) {
                onAnimationComplete();
              }
            }
          }}
        >
          {/* Decorative line */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px] bg-[#b2ff00]"
            initial={{ scaleX: 0, transformOrigin: "left" }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
          />

          <div className="text-center px-8">
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
                className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-white/40 mb-4"
              >
                {subtitle}
              </motion.p>
            )}
            {label && (
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.04em] text-white leading-tight max-w-4xl"
              >
                {label}
              </motion.h2>
            )}
            {!label && !subtitle && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.25 }}
                className="w-8 h-8 border-2 border-[#b2ff00] border-t-transparent rounded-full animate-spin"
              />
            )}
          </div>

          {/* Bottom dots */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#b2ff00] animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
