"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonPill } from "@/components/ui/ButtonPill";
import { EXPERTISE_ITEMS, RUTUBE_CHANNEL_URL } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ExpertiseSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".expertise-card", {
      y: 36,
      opacity: 0,
      stagger: 0.1,
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 78%",
        once: true,
      },
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="expertise"
      className="relative z-20 px-4 md:px-9 py-16 sm:py-24 md:py-32 bg-white scroll-mt-[72px]"
    >
      <div className="max-w-[1520px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <div className="max-w-3xl">
            <SectionLabel label="Научная экспертиза" />
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.05em] text-black mt-6 leading-[1.05]">
              Диссертации,<br />
              <span className="text-[#747474]">статьи и выступления.</span>
            </h2>
          </div>
          <p className="text-lg md:text-xl font-medium tracking-tight text-[#747474] max-w-md md:text-right">
            Научная база и практика — в одном подходе. Материалы, которые подтверждают экспертность.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
            {EXPERTISE_ITEMS.map((item) => (
              <div
                key={item.type}
                className="expertise-card rounded-[20px] sm:rounded-[24px] bg-[#f7f7f7] border border-black/5 p-5 sm:p-6 md:p-8 flex flex-col justify-between min-h-[200px]"
              >
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-black/35 mb-4">
                  {item.type}
                </p>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-black mb-2">
                    {item.type}
                  </h3>
                  <p className="text-sm font-medium text-[#747474] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <a
            href={RUTUBE_CHANNEL_URL}
            className="expertise-card lg:col-span-5 group relative rounded-[24px] sm:rounded-[32px] bg-[#0a0a0a] overflow-hidden min-h-[280px] sm:min-h-[320px] flex flex-col justify-between p-6 sm:p-8 md:p-10"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#1C5E3C] rounded-full blur-[100px] opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
            <div className="relative z-10">
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-white/40 mb-4">
                Видео
              </p>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Rutube<br />
                <span className="text-[#1C5E3C]">канал</span>
              </h3>
            </div>
            <div className="relative z-10 flex items-end justify-between gap-4 mt-auto pt-8">
              <p className="text-sm sm:text-base text-white/50 max-w-xs leading-relaxed">
                Записи выступлений, разборы кейсов и экспертные комментарии по закупкам и управлению.
              </p>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1C5E3C] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </a>
        </div>

        <div className="mt-10 md:mt-14 text-center">
          <ButtonPill href="#contact" variant="black">
            Обсудить сотрудничество
          </ButtonPill>
        </div>
      </div>
    </section>
  );
}
