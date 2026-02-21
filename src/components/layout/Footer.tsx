"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TransitionLink } from "@/components/transition/TransitionLink";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  COPYRIGHT,
  LEGAL_LINKS,
  FOOTER_NAV,
} from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MARQUEE_TEXTS = [
  "ПОЛУЧИТЬ ЗАЯВКИ",
  "ЛИДЫ ОТ 49 ₽",
  "ОКУПАЕМОСТЬ ЗА 3 НЕДЕЛИ",
  "ЯНДЕКС ДИРЕКТ",
  "САЙТ + РЕКЛАМА + CRM",
  "БЕСПЛАТНЫЙ АУДИТ",
];
const MARQUEE_REPEAT = 12;

type FooterProps = { variant?: "default" | "compact" };

export function Footer({ variant = "default" }: FooterProps) {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isCompact = variant === "compact";

  useGSAP(() => {
    if (isCompact) return;
    const ctx = containerRef.current;
    if (!ctx) return;

    const marquee = ctx.querySelector(".footer-marquee");
    const cta = ctx.querySelector(".footer-cta");
    const nav = ctx.querySelector(".footer-nav");
    const bottom = ctx.querySelector(".footer-bottom");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ctx,
        start: "top 85%",
        once: true,
      },
    });

    if (marquee) {
      tl.fromTo(marquee, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power3.inOut" });
    }
    if (cta) {
      tl.fromTo(cta, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.4");
    }
    if (nav) {
      tl.fromTo(nav, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5");
    }
    if (bottom) {
      tl.fromTo(bottom, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.4");
    }
  }, { scope: containerRef, dependencies: [isCompact] });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={containerRef}
      className={
        isCompact
          ? "w-full bg-[#0a0a0a] text-white flex flex-col"
          : "relative w-full bg-[#0a0a0a] text-white z-10 flex flex-col overflow-hidden"
      }
    >
      <div
        ref={contentRef}
        className="flex flex-col"
      >
        {/* ── Marquee Ticker ── */}
        <div className="footer-marquee relative overflow-hidden border-b border-white/[0.06] py-3 sm:py-4 origin-left">
          <div className="flex animate-marquee whitespace-nowrap">
            {Array.from({ length: MARQUEE_REPEAT }).map((_, i) => (
              <span key={i} className="flex items-center gap-4 sm:gap-6 mx-3 sm:mx-4">
                <span className="w-2 h-2 rounded-full bg-[#bcff00] shrink-0" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-white/40">
                  {MARQUEE_TEXTS[i % MARQUEE_TEXTS.length]}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="max-w-[1520px] mx-auto w-full px-4 md:px-9 flex flex-col py-10 sm:py-16 md:py-20 gap-12 sm:gap-16 md:gap-20">

          {/* ── CTA Block ── */}
          <div className="footer-cta flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 sm:gap-10">
            <div>
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-white/30 mb-4 sm:mb-6">
                Свяжитесь с нами
              </p>
              <h2 className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[100px] font-bold tracking-[-0.06em] leading-[0.9] text-white">
                Давайте<br />
                работать{" "}
                <span className="text-[#bcff00]">вместе.</span>
              </h2>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-4 sm:gap-6 shrink-0">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group flex items-center gap-3"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#bcff00] group-hover:scale-150 transition-transform duration-300" />
                <span className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-[#bcff00] transition-colors duration-300">
                  {CONTACT_EMAIL}
                </span>
              </a>
              <a
                href={CONTACT_PHONE_HREF}
                className="group flex items-center gap-3"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#bcff00] group-hover:scale-150 transition-transform duration-300" />
                <span className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-[#bcff00] transition-colors duration-300">
                  {CONTACT_PHONE}
                </span>
              </a>
              <TransitionLink
                href="/contact"
                label="Оставить заявку"
                className="inline-flex items-center gap-3 rounded-full px-6 sm:px-8 py-3 sm:py-4 bg-[#bcff00] text-black text-xs sm:text-sm font-bold tracking-tight hover:bg-white transition-colors duration-300"
              >
                Оставить заявку
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transform -rotate-45">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </TransitionLink>
            </div>
          </div>

          {/* ── Navigation + Dashboard ── */}
          <div className="footer-nav grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-6">
            {FOOTER_NAV.map((group) => (
              <div key={group.title} className="lg:col-span-2 flex flex-col gap-5 sm:gap-6">
                <span className="text-[10px] font-bold text-white/25 uppercase tracking-[0.25em]">
                  {group.title}
                </span>
                <ul className="flex flex-col gap-2.5 sm:gap-3">
                  {group.links.map((link) =>
                    link.external ? (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm sm:text-base font-medium text-white/60 hover:text-[#bcff00] transition-colors duration-300"
                        >
                          {link.label}
                        </a>
                      </li>
                    ) : (
                      <li key={link.label}>
                        <TransitionLink
                          href={link.href}
                          label={link.label}
                          className="text-sm sm:text-base font-medium text-white/60 hover:text-[#bcff00] transition-colors duration-300"
                        >
                          {link.label}
                        </TransitionLink>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}

            {/* Stats Dashboard Card */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-6 lg:pl-8">
              <div className="relative rounded-[20px] sm:rounded-[24px] bg-white/[0.04] border border-white/[0.06] overflow-hidden group hover:border-[#bcff00]/20 transition-colors duration-500">
                {/* Header */}
                <div className="flex items-center justify-between px-5 sm:px-8 pt-5 sm:pt-7 pb-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#bcff00] animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                      Tusam в цифрах
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                    <div className="w-2 h-2 rounded-full bg-[#bcff00]/40" />
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 divide-x divide-white/[0.06]">
                  {[
                    { value: "300%", label: "Средний ROI", trend: "+12%" },
                    { value: "490 ₽", label: "Стоимость лида", trend: "−40%" },
                    { value: "14", label: "Дней до запуска", trend: "дней" },
                    { value: "50+", label: "в месяц", trend: "заявок" },
                  ].map((stat, i) => (
                    <div
                      key={stat.label}
                      className={`px-5 sm:px-8 py-4 sm:py-5 ${i < 2 ? "border-b border-white/[0.06]" : ""}`}
                    >
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
                          {stat.value}
                        </span>
                        <span className={`text-[10px] font-bold tracking-wide ${
                          stat.trend.startsWith("+") || stat.trend.startsWith("−")
                            ? stat.trend.startsWith("+") ? "text-[#bcff00]" : "text-[#bcff00]"
                            : "text-white/25"
                        }`}>
                          {stat.trend}
                        </span>
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-medium text-white/30 uppercase tracking-wider">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer strip */}
                <div className="px-5 sm:px-8 py-3 sm:py-4 bg-[#bcff00]/[0.04] flex items-center justify-between">
                  <TransitionLink
                    href="/projects"
                    label="Кейсы"
                    className="text-[10px] font-bold text-[#bcff00] uppercase tracking-wider hover:text-white transition-colors"
                  >
                    Смотреть кейсы →
                  </TransitionLink>
                </div>
              </div>
            </div>
          </div>

          {/* ── Bottom Bar ── */}
          <div className="footer-bottom flex flex-col gap-6 sm:gap-8">
            {/* Giant logotype + back to top */}
            <div className="flex items-end justify-between border-b border-white/[0.06] pb-5 sm:pb-8">
              <div className="flex items-baseline gap-1">
                {"TUSAM".split("").map((char, i) => (
                  <span
                    key={i}
                    className="text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[140px] font-bold tracking-[-0.06em] leading-none text-white/[0.04] select-none"
                  >
                    {char}
                  </span>
                ))}
              </div>
              <button
                onClick={scrollToTop}
                className="group flex flex-col items-center gap-2 mb-2 sm:mb-4 shrink-0"
                aria-label="Наверх"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#bcff00] group-hover:bg-[#bcff00] transition-all duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white/40 group-hover:text-black transition-colors duration-300 rotate-180">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20 group-hover:text-white/60 transition-colors hidden sm:block">
                  Наверх
                </span>
              </button>
            </div>

            {/* Legal row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[10px] font-bold text-white/25 uppercase tracking-[0.15em]">
              <p>{COPYRIGHT}</p>
              <div className="flex flex-wrap gap-3 sm:gap-8">
                {LEGAL_LINKS.map((link) => (
                  <TransitionLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    className="hover:text-white/60 transition-colors"
                  >
                    {link.label}
                  </TransitionLink>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#bcff00] animate-pulse" />
                <span className="text-white/40 normal-case tracking-normal text-[10px]">
                  Мы онлайн
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
