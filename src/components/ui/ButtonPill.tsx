"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { TransitionLink } from "@/components/transition/TransitionLink";

interface ButtonPillProps {
  href?: string;
  children: ReactNode;
  variant?: "black" | "lime";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export function ButtonPill({
  href,
  children,
  variant = "black",
  className = "",
  onClick,
  type = "button",
}: ButtonPillProps) {
  const base =
    "group/btn relative inline-flex items-center justify-center gap-3 rounded-[50px] px-8 py-4 text-sm font-semibold tracking-[-0.02em] leading-[100%] transition-all duration-300 overflow-hidden";
  const variants = {
    black:
      "bg-[#0a0a0a] text-white shadow-[0_2px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_30px_rgba(0,0,0,0.3)]",
    lime:
      "bg-[#b2ff00] text-black shadow-[0_2px_20px_rgba(178,255,0,0.25)] hover:shadow-[0_4px_30px_rgba(178,255,0,0.45)]",
  };
  const circleClass = variant === "black" ? "bg-[#b2ff00]" : "bg-black";
  const shimmerClass =
    variant === "black"
      ? "bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
      : "bg-gradient-to-r from-transparent via-white/20 to-transparent";

  const motionProps = {
    whileHover: { scale: 1.04 },
    whileTap: { scale: 0.97 },
    transition: { type: "spring" as const, stiffness: 400, damping: 25 },
  };

  const content = (
    <>
      <span
        className={`absolute inset-0 ${shimmerClass} translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700 ease-in-out`}
      />
      <span className="relative">{children}</span>
      <span
        className={`relative w-2.5 h-2.5 rounded-full ${circleClass} shrink-0 transition-transform duration-300 group-hover/btn:scale-125`}
        aria-hidden
      />
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");

    if (isExternal) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} ${variants[variant]} ${className}`}
          {...motionProps}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <motion.div {...motionProps} className="inline-flex">
        <TransitionLink
          href={href}
          className={`${base} ${variants[variant]} ${className}`}
        >
          {content}
        </TransitionLink>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
