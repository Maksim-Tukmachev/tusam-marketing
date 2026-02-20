"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonPill } from "@/components/ui/ButtonPill";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
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
            className="services-bg object-cover object-center brightness-[0.7] scale-110"
          />
          <GrainOverlay />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-60" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 px-5 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-20 md:py-28">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-10 sm:mb-16 md:mb-20">
            <div>
              <SectionLabel label="Как мы строим поток заявок" dark />
              <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.05em] text-white mt-6">
                Не реклама. Система<span className="text-[#bcff00]">.</span>
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-base sm:text-xl md:text-2xl font-medium tracking-tight text-white/70 leading-relaxed">
                <span className="text-white">Сайт → Трафик → CRM → Автоматизация.</span> Единая система, где каждый элемент усиливает следующий.
              </p>
            </div>
          </div>

          {/* Accordion List */}
          <div className="flex flex-col border-t border-white/10">
            {SERVICES.map((service, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={service.id}
                  className="service-item border-b border-white/10 group cursor-pointer"
                  onClick={() => toggleService(index)}
                >
                  <div className="flex items-center justify-between py-8 md:py-10">
                    <div className="flex items-center gap-4 sm:gap-6 md:gap-12">
                      <span className={`text-sm font-bold font-mono transition-colors duration-500 ${isActive ? "text-[#bcff00]" : "text-white/30"}`}>
                        0{index + 1}
                      </span>
                      <h3 className={`text-2xl md:text-4xl lg:text-5xl font-semibold tracking-[-0.04em] transition-all duration-500 ${isActive ? "text-white translate-x-2" : "text-white/40 group-hover:text-white/70"}`}>
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

                  {/* Expandable Content Area — высота и opacity только через GSAP */}
                  <div
                    ref={(el) => { contentRefs.current[index] = el; }}
                    className="overflow-hidden"
                    style={{ height: 0, opacity: 0 }}
                  >
                    <div className="pb-10 md:pb-16 pl-8 sm:pl-[50px] md:pl-[100px] flex flex-col md:flex-row gap-8 md:gap-20">
                      <p className="text-lg md:text-xl text-white/60 max-w-xl leading-relaxed">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2 h-fit">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-4 py-1.5 rounded-full border border-white/10 text-xs font-bold text-white/40 uppercase tracking-widest"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Button */}
          <div className="mt-16 flex justify-center md:justify-start">
            <ButtonPill href="/contact" variant="lime">
              Запустить систему
            </ButtonPill>
          </div>
        </div>
      </div>
    </section>
  );
}