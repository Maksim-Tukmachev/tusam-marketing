"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonPill } from "@/components/ui/ButtonPill";
import { SPEAKER_PLATFORMS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SpeakerSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".speaker-card", {
      y: 40,
      opacity: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        once: true,
      },
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="speaker"
      className="relative z-20 px-4 md:px-9 py-16 sm:py-24 md:py-32 bg-[#f7f7f7] scroll-mt-[72px]"
    >
      <div className="max-w-[1520px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12 mb-12 md:mb-16">
          <div className="min-w-0 max-w-2xl">
            <SectionLabel label="Спикер и модератор" />
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.05em] text-black mt-6 leading-[1.05]">
              Федеральный<br />
              <span className="text-[#1C5E3C]">спикер.</span>
            </h2>
          </div>
          <div className="flex flex-col items-start lg:items-end gap-6 shrink-0 lg:max-w-md xl:max-w-lg">
            <p className="text-lg md:text-xl font-medium tracking-tight text-[#747474] lg:text-right">
              Выступления, модерация и экспертные сессии на деловых площадках по вопросам стратегии, управления и госзакупок.
            </p>
            <ButtonPill href="#contact" variant="black" className="w-fit">
              Пригласить на мероприятие
            </ButtonPill>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {SPEAKER_PLATFORMS.map((platform, index) => (
            <div
              key={platform.title}
              className="speaker-card group rounded-[20px] sm:rounded-[28px] bg-white border border-black/5 p-6 sm:p-8 md:p-10 hover:bg-[#0a0a0a] hover:border-transparent transition-colors duration-500"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-black/30 group-hover:text-white/40 transition-colors">
                  0{index + 1}
                </span>
                <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:border-white/20 group-hover:bg-[#1C5E3C] transition-all duration-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-black group-hover:text-white transition-colors">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-black group-hover:text-white transition-colors mb-3">
                {platform.title}
              </h3>
              <p className="text-sm sm:text-base font-medium text-[#747474] group-hover:text-white/60 leading-relaxed transition-colors">
                {platform.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
