"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ButtonPill } from "@/components/ui/ButtonPill";
import { HERO_VIDEO_URL, HERO_AUDIT_IMAGE } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(".hero-content", {
      y: 100,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(visualRef.current, {
      scale: 0.98,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative z-20 w-full h-[calc(100dvh-72px)] md:h-[calc(100vh-72px)] sticky top-[72px] px-[5px] pt-[5px] pb-[5px] bg-white"
    >
      <div
        ref={visualRef}
        className="relative w-full h-full rounded-[25px] overflow-hidden bg-[#0a0a0a] flex flex-col"
      >
        <div className="absolute inset-0 z-0">
          <video
            src={HERO_VIDEO_URL}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover grayscale opacity-60"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="hero-content relative z-10 flex flex-col flex-1 px-5 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-8 md:py-10 lg:py-14">

          <div className="mb-5 sm:mb-6 md:mb-7 lg:mb-8">
            <h1 className="text-[11vw] sm:text-[10vw] md:text-[72px] lg:text-[100px] xl:text-[140px] font-semibold tracking-[-0.06em] leading-[1.06] md:leading-[0.92] text-white mb-3 sm:mb-5 md:mb-7 lg:mb-9">
              Забудьте про дорогие лиды! <span className="text-[#b2ff00]">Заявки от&nbsp;49₽</span>
            </h1>
            <p className="text-base sm:text-lg md:text-[24px] lg:text-[34px] xl:text-[42px] font-medium tracking-[-0.03em] text-white/90 mt-2 sm:mt-3 md:mt-4 max-w-2xl">
              Сайт + Яндекс Директ + система лидогенерации, которая окупается за 3 недели.
            </p>
          </div>

          <div className="hidden lg:flex absolute right-16 top-1/2 -translate-y-1/2 flex-col gap-2 text-right">
            {["Продающие сайты", "Яндекс Директ", "Google Ads", "CRM и воронки", "Заявки для малого и среднего бизнеса"].map((item) => (
              <span key={item} className="text-white text-lg font-semibold tracking-tight hover:text-[#bcff00] cursor-pointer transition-colors">
                {item}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-col lg:flex-row items-start lg:items-end justify-between gap-5 md:gap-6 lg:gap-8">
            <div className="hidden lg:block max-w-md mb-0 lg:mb-0">
              <p className="text-base lg:text-xl text-[#999797] leading-[1.3] tracking-tight">
                Приводим 50+ лидов в месяц. Средний ROI 300%. <span className="text-white font-semibold">Система окупается за 3 недели.</span>
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-5 lg:p-6 flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:max-w-[500px] shadow-2xl items-stretch sm:items-center">
              <div className="relative w-full h-32 sm:w-28 sm:h-32 md:w-28 md:h-32 lg:w-32 lg:h-36 rounded-xl overflow-hidden shrink-0">
                <Image src={HERO_AUDIT_IMAGE} alt="Аудит" fill className="object-cover" />
              </div>
              <div className="flex flex-col gap-2 sm:gap-3">
                <div>
                  <h3 className="text-black text-lg sm:text-xl md:text-xl lg:text-2xl font-bold tracking-tight">Получить аудит роста</h3>
                  <p className="text-[#666] text-xs sm:text-sm font-medium leading-snug mt-1">
                    Ближайший слот: сегодня. Анализ ниши и прогноз по заявкам за 24 часа.
                  </p>
                </div>
                <ButtonPill
                  href="/contact"
                  variant="black"
                  className="w-full mt-1 text-xs sm:text-sm md:text-[15px]"
                >
                  Получить аудит
                </ButtonPill>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
