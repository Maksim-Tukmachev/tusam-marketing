"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { CONTACT_EMAIL, COPYRIGHT, LEGAL_LINKS, FOOTER_NAV } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type FooterProps = { variant?: "default" | "compact" };

export function Footer({ variant = "default" }: FooterProps) {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isCompact = variant === "compact";

  useGSAP(() => {
    if (isCompact) return;
    const trigger = containerRef.current;
    const content = contentRef.current;
    if (!trigger || !content) return;

    gsap.fromTo(
      content,
      { y: 200, scale: 0.92, opacity: 0 },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top bottom",
          end: "top 15%",
          scrub: 2,
        },
      }
    );
  }, { scope: containerRef, dependencies: [isCompact] });

  return (
    <footer 
      ref={containerRef}
      className={
        isCompact
          ? "w-full bg-[#0a0a0a] text-white flex flex-col"
          : "sticky bottom-0 min-h-[calc(100vh-72px)] w-full bg-[#0a0a0a] text-white z-10 flex flex-col justify-between overflow-hidden"
      }
    >
      <div 
        ref={contentRef} 
        className={`flex flex-col max-w-[1520px] mx-auto w-full px-4 md:px-9 ${isCompact ? "py-12 md:py-16" : "flex-1 justify-between py-10 sm:py-20"}`}
      >
        {/* Top Part */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-start">
          <div className="flex flex-col gap-6 sm:gap-10">
            <h2 className="text-[8vw] lg:text-[100px] font-semibold tracking-[-0.05em] leading-[0.9]">
              Готовы к стабильному<br /> <span className="text-[#bcff00]">потоку клиентов?</span>
            </h2>
            <a 
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-xl sm:text-2xl md:text-[42px] font-bold tracking-tight hover:underline underline-offset-8 transition-all"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:gap-12 lg:pl-20">
            {FOOTER_NAV.slice(0, 2).map((group) => (
              <div key={group.title} className="flex flex-col gap-8">
                <span className="text-xs font-bold text-white/30 uppercase tracking-[0.2em]">{group.title}</span>
                <ul className="flex flex-col gap-4">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <TransitionLink href={link.href} label={link.label} className="text-base sm:text-xl font-medium hover:text-[#bcff00] transition-colors">
                        {link.label}
                      </TransitionLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Part: Clean & Minimal */}
        <div className="flex flex-col gap-6 sm:gap-12">
          {/* Убрали гигантские буквы, оставили стильный заголовок в ряд */}
          <div className="flex items-baseline justify-between border-b border-white/10 pb-6 sm:pb-10">
            <h2 className="text-[12vw] font-bold tracking-[-0.06em] leading-none opacity-10">
              TUSAM
            </h2>
          </div>

            <div className="flex flex-col md:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
            <p>{COPYRIGHT}</p>
            <div className="flex flex-wrap gap-4 sm:gap-10">
              {LEGAL_LINKS.map((link) => (
                <TransitionLink key={link.href} href={link.href} label={link.label} className="hover:text-white">
                  {link.label}
                </TransitionLink>
              ))}
            </div>
            <div className="flex gap-4 items-center">
              <span>EN</span>
              <div className="w-[1px] h-3 bg-white/20" />
              <span className="opacity-30">NL</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}