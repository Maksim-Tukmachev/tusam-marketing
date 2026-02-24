"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonPill } from "@/components/ui/ButtonPill";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { SERVICES, YELLOW_ICON, SERVICES_BG_IMAGE } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ServicesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  // При монтировании открываем первый пункт
  useEffect(() => {
    const first = contentRefs.current[0];
    if (first) {
      gsap.set(first, { height: "auto", opacity: 1 });
    }
  }, []);

  useGSAP(() => {
    // 1. Появление секции
    gsap.from(".service-item", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        once: true,
      },
    });

    // 2. Легкий параллакс фона
    gsap.to(".services-bg", {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: containerRef });

  // Плавное открытие/закрытие через GSAP
  const toggleService = (index: number) => {
    if (activeIndex === index) return;

    const prevContent = contentRefs.current[activeIndex];
    const nextContent = contentRefs.current[index];
    if (!prevContent || !nextContent) return;

    setActiveIndex(index);

    const duration = 0.5;
    const ease = "power3.inOut";

    const tl = gsap.timeline();
    tl.to(prevContent, {
      height: 0,
      opacity: 0,
      duration,
      ease,
      overflow: "hidden",
    }).to(
      nextContent,
      {
        height: "auto",
        opacity: 1,
        duration,
        ease,
        overflow: "hidden",
      },
      "-=0.25"
    );
  };

  return (
    <section 
      ref={containerRef} 
      className="relative z-20 px-[5px] pb-[5px] bg-white"
    >
      <div className="relative rounded-[30px] overflow-hidden bg-[#0a0a0a] min-h-[800px]">
        
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src={SERVICES_BG_IMAGE}
            alt=""
            fill
            priority
            className="services-bg object-cover object-center brightness-[0.7] scale-110"
          />
          <GrainOverlay />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-60" />
        </div>

        {/* Content Layer — в сетке max-w-[1520px], на адаптиве свой отступ */}
        <div className="relative z-10 max-w-[1520px] mx-auto w-full px-4 md:px-9 2xl:px-0 py-12 sm:py-20 md:py-28">
          
          {/* Header — сетка: заголовок и описание в одну линию, выровнены */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-8 mb-10 sm:mb-16 md:mb-20 items-start">
            <div className="lg:col-span-5">
              <SectionLabel label="Как мы строим поток заявок" dark />
              <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.05em] text-white mt-6">
                Не реклама. Система<span className="text-[#bcff00]">.</span>
              </h2>
            </div>
            <div className="lg:col-span-7 max-w-xl">
              <p className="text-base sm:text-xl md:text-2xl font-medium tracking-tight text-white/70 leading-relaxed">
                <span className="text-white">Сайт → Трафик → CRM → Автоматизация.</span> Единая система, где каждый элемент усиливает следующий.
              </p>
            </div>
          </div>

          {/* Accordion List — в столбец */}
          <div className="flex flex-col border-t border-white/10">
            {SERVICES.map((service, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={service.id}
                  className="service-item border-b border-white/10 group cursor-pointer"
                  onClick={() => toggleService(index)}
                >
                  <div className="flex items-center justify-between gap-3 sm:gap-4 py-8 md:py-10">
                    <div className="flex items-center gap-4 sm:gap-6 md:gap-12 min-w-0 flex-1">
                      <span className={`text-sm font-bold font-mono shrink-0 transition-colors duration-500 ${isActive ? "text-[#bcff00]" : "text-white/30"}`}>
                        0{index + 1}
                      </span>
                      <h3 className={`text-2xl md:text-4xl lg:text-5xl font-semibold tracking-[-0.04em] transition-all duration-500 break-words min-w-0 ${isActive ? "text-white translate-x-2" : "text-white/40 group-hover:text-white/70"}`}>
                        {service.title}
                      </h3>
                    </div>

                    {/* Стрелочка: по умолчанию зелёная, при наведении и при нажатии — белая */}
                    <div
                      className={`relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full border flex shrink-0 items-center justify-center transition-all duration-500 ${
                        isActive
                          ? "bg-white border-white rotate-90"
                          : "bg-[#bcff00]/20 border-black rotate-0 group-hover:bg-white/15 group-hover:border-white"
                      }`}
                    >
                      <div className={`relative w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 transition-all duration-500 ${isActive ? "scale-110 brightness-0" : "scale-100"}`}>
                        <Image
                          src={YELLOW_ICON}
                          alt=""
                          fill
                          className={`object-cover rounded-full ${!isActive ? "opacity-90" : ""}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Expandable Content Area — отступ слева 70px (на мобилке меньше), кнопка под тегами */}
                  <div
                    ref={(el) => { contentRefs.current[index] = el; }}
                    className="overflow-hidden"
                    style={{ height: 0, opacity: 0 }}
                  >
                    <div className="pb-10 md:pb-16 pl-10 sm:pl-14 lg:pl-[75px] flex flex-col gap-8">
                        <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-4 py-1.5 rounded-full border border-white/10 text-xs font-bold text-white/40 uppercase tracking-widest"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <TransitionLink
                          href={`/services/${service.slug}`}
                          label={service.title}
                          className="inline-flex w-full sm:w-auto"
                        >
                          <span className="inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-[50px] px-8 py-4 text-sm font-semibold tracking-[-0.02em] leading-[100%] bg-[#b2ff00] text-black shadow-[0_2px_20px_rgba(178,255,0,0.25)] hover:shadow-[0_4px_30px_rgba(178,255,0,0.45)] transition-all duration-300 overflow-hidden group/btn">
                            <span className="relative">Перейти на услугу</span>
                            <span className="relative w-2.5 h-2.5 rounded-full bg-black shrink-0 transition-transform duration-300 group-hover/btn:scale-125" aria-hidden />
                          </span>
                        </TransitionLink>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA — вниз, отступ слева как у контента */}
          <div className="mt-20 md:mt-24 pl-4 sm:pl-6 lg:pl-[70px] flex justify-center sm:justify-start">
            <ButtonPill href="/contact" variant="lime">
              Запустить систему
            </ButtonPill>
          </div>
        </div>
      </div>
    </section>
  );
}