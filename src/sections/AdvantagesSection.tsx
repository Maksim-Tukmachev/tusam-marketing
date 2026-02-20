"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ADVANTAGES_IMAGE } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AdvantagesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const ctx = containerRef.current;
    if (!ctx) return;
    const mainTitle = ctx.querySelector(".main-title");
    const leftImage = ctx.querySelector(".left-image-wrapper");
    const rightContent = ctx.querySelector(".right-content");
    const statCards = ctx.querySelectorAll(".stat-card");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ctx,
        start: "top 75%",
        toggleActions: "play none none reverse",
      }
    });

    if (mainTitle) {
      tl.fromTo(mainTitle, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
    }
    if (leftImage || rightContent) {
      tl.fromTo(
        [leftImage, rightContent].filter(Boolean),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" },
        "-=0.4"
      );
    }
    if (statCards?.length) {
      tl.fromTo(
        statCards,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
        "-=0.2"
      );
    }
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative z-20 px-4 md:px-9 py-20 md:py-32 bg-white"
    >
      <div className="max-w-[1520px] mx-auto">
        {/* Метка секции */}
        <div className="mb-8">
          <SectionLabel label="Цифры" />
        </div>

        {/* Огромный заголовок сверху */}
        <h2 className="main-title text-[7vw] md:text-[60px] lg:text-[84px] font-semibold tracking-[-0.05em] leading-[1.05] text-black mb-10 md:mb-16 lg:mb-24 max-w-[1200px]">
          Вложили 90 000 ₽ — вернули 360 000 ₽
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Слева: Вертикальное изображение как на скриншоте */}
          <div className="lg:col-span-4 left-image-wrapper">
            <div className="relative aspect-[4/3] lg:aspect-[3/4] rounded-[24px] overflow-hidden group">
              <Image
                src={ADVANTAGES_IMAGE} // Твое фото с командой/офисом
                alt="Our Team"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Маленькая иконка со стрелочкой в углу */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-[#bcff00] rounded-full flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 11L11 3M11 3H5M11 3V9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Справа: Текст и карточки */}
          <div className="lg:col-span-8 right-content flex flex-col gap-12 h-full">
            
            <div className="max-w-xl">
              <p className="text-base sm:text-xl md:text-2xl font-medium tracking-[-0.03em] leading-[1.4] text-[#747474]">
                <span className="text-black font-semibold">Мебельная компания: 53 заявки = +1,1 млн выручки.</span> Бюджет на рекламу — 26 000 ₽. Стоимость лида — 490 ₽. ROI — 340%. Система окупилась на 12-й день.
              </p>
              
              {/* Кнопка с точкой */}
              <button className="mt-8 bg-black text-white px-6 py-3 rounded-full flex items-center gap-4 hover:bg-[#222] transition-colors group">
                <span className="text-xs sm:text-sm font-semibold">Рассчитать мою окупаемость</span>
                <span className="w-2 h-2 rounded-full bg-[#bcff00] group-hover:animate-pulse"></span>
              </button>
            </div>

            {/* Два блока в столбец: в каждом сверху цифра, снизу текст, без gap внутри */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
              {/* Блок 01: столбец, без зазора между карточками */}
              <div className="flex flex-col gap-0 rounded-[24px] overflow-hidden h-full">
                <div className="stat-card bg-[#f5f5f5] rounded-[24px] p-5 sm:p-8 hover:bg-white border border-transparent hover:border-gray-200 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <span className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.05em]">50+</span>
                    <span className="text-xs font-bold opacity-30">01</span>
                  </div>
                </div>
                <div className="stat-card bg-[#f5f5f5] rounded-[24px] p-5 sm:p-8 hover:bg-white border border-transparent hover:border-gray-200 transition-all duration-300 border-t-0 flex-1 flex items-start">
                  <div>
                    <p className="text-sm font-bold mb-4">50+ заявок в месяц. Гарантия в договоре — или возврат денег</p>
                    <p className="text-sm text-[#747474] font-medium leading-relaxed">
                      4 кейса с цифрами. Партнёр Яндекс. 5-звёздочный рейтинг.
                    </p>
                  </div>
                </div>
              </div>

              {/* Блок 02: столбец, без зазора между карточками */}
              <div className="flex flex-col gap-0 rounded-[24px] overflow-hidden h-full">
                <div className="stat-card bg-[#f5f5f5] rounded-[24px] p-5 sm:p-8 hover:bg-white border border-transparent hover:border-gray-200 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <span className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.05em]">300%</span>
                    <span className="text-xs font-bold opacity-30">02</span>
                  </div>
                </div>
                <div className="stat-card bg-[#f5f5f5] rounded-[24px] p-5 sm:p-8 hover:bg-white border border-transparent hover:border-gray-200 transition-all duration-300 border-t-0 flex-1 flex items-start">
                  <div>
                    <p className="text-sm font-bold mb-6">Средний ROI наших клиентов — 300%</p>
                    <div className="flex items-center gap-4 grayscale opacity-60">
                      <Image src="/logos/backstage.svg" alt="Backstage" width={80} height={20} className="object-contain" />
                      <Image src="/logos/bdrgh.svg" alt="BDRGH" width={60} height={20} className="object-contain" />
                      <Image src="/logos/kovvar.svg" alt="Kovvar" width={70} height={20} className="object-contain" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}