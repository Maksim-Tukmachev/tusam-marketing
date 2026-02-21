"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ButtonPill } from "@/components/ui/ButtonPill";
import { HERO_VIDEO_URL, CONTACT_PHONE, CONTACT_PHONE_HREF } from "@/lib/constants";

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
              Сайт + Яндекс Директ + Vk Ads + Avito = система лидогенерации, которая окупается за 3 недели.
            </p>
          </div>

          <div className="hidden lg:flex absolute right-16 top-1/2 -translate-y-1/2 flex-col gap-2 text-right">
            {["Продающие сайты", "Яндекс Директ", "Vk Ads", "Avito под ключ", "Маркетинг для малого и среднего бизнеса"].map((item) => (
              <span key={item} className="text-white text-lg font-semibold tracking-tight hover:text-[#bcff00] cursor-pointer transition-colors">
                {item}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-col lg:flex-row items-start lg:items-end justify-between gap-5 md:gap-6 lg:gap-8">
            <div className="hidden lg:block max-w-md">
              <p className="text-base lg:text-xl text-[#999797] leading-[1.3] tracking-tight">
                Приводим 50+ лидов в месяц. Средний ROI 300%. <span className="text-white font-semibold">Система окупается за 3 недели.</span>
              </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-1.5 p-2 lg:p-1.5 bg-[#f5f5f5] dark:bg-[#1a1a1a] rounded-2xl lg:rounded-full shadow-lg border border-gray-200/50 dark:border-white/10 w-full lg:w-max mx-auto lg:mx-0 items-stretch lg:items-center">
              <ButtonPill
                href="/contact"
                label="Оставить заявку"
                variant="lime"
                className="w-full lg:w-auto flex-1 lg:flex-none min-w-0 h-12 flex items-center justify-center px-5 sm:px-6 text-sm font-semibold tracking-tight rounded-full transition-transform active:scale-95"
              >
                Оставить заявку
              </ButtonPill>
              <a
                href={CONTACT_PHONE_HREF}
                className="w-full lg:w-auto flex-1 lg:flex-none min-w-0 min-h-[48px] h-12 flex items-center justify-center py-3.5 px-5 sm:px-6 text-sm font-semibold text-[#0a0a0a] dark:text-white bg-white dark:bg-white/5 hover:bg-[#b2ff00] hover:text-black rounded-full transition-all shrink-0 lg:shrink-0 whitespace-nowrap box-border"
                aria-label="Позвонить"
              >
                <span className="lg:hidden">{CONTACT_PHONE}</span>
                <svg className="hidden lg:block shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </a>
              <ButtonPill
                href="/projects"
                label="Смотреть кейсы"
                variant="black"
                className="w-full lg:w-auto flex-1 lg:flex-none min-w-0 h-12 flex items-center justify-center px-5 sm:px-6 text-sm font-medium rounded-full transition-transform active:scale-95"
              >
                Смотреть кейсы
              </ButtonPill>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
