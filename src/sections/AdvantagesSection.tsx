"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonPill } from "@/components/ui/ButtonPill";
import { ADVANTAGES_IMAGE, PROJECTS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
export const CASE_SLIDES = [
  {
    id: "01",
    pill: "Строительство",
    title: "150 заявок в месяц и снижение CPL почти в 2 раза",
    subtitle:
      "Запустили таргет с квизом, настроили ретаргетинг и CRM. Доля квалифицированных лидов на постройку коттеджей выросла до 58%.",
    image: PROJECTS[0]?.imageUrl ?? ADVANTAGES_IMAGE,
    imageAlt: "Кейс: строительство коттеджей под ключ",
    focusMetric: "3,8%",
    focusMetricLabel: "конверсия в договор",
    stats: [
      { label: "Стоимость лида", value: "850–1000 ₽" },
      { label: "Квал. заявки", value: "до 58%" },
      { label: "Лидов в месяц", value: "150" },
    ],
  },
  {
    id: "02",
    pill: "Медицина",
    title: "Удвоили доход клиники и ушли от скидочных купонов",
    subtitle:
      "Упаковали конкретные чек-апы, запустили таргет и внедрили сегментацию. Клиника получает стабильный поток пациентов без агрессивного дисконта.",
    image: PROJECTS[3]?.imageUrl ?? ADVANTAGES_IMAGE,
    imageAlt: "Кейс: частный медицинский центр",
    focusMetric: "×2",
    focusMetricLabel: "рост дохода за 3 месяца",
    stats: [
      { label: "Повторные визиты", value: "32%" },
      { label: "Стоимость лида", value: "250–350 ₽" },
      { label: "Заявок в месяц", value: "180–200" },
    ],
  },
  {
    id: "03",
    pill: "EdTech",
    title: "Удвоили продажи курса при CPL 380–450 ₽",
    subtitle:
      "Пересобрали креативы, разделили трафик на холодный и теплый, внедрили автоворонку. Рост продаж произошел без раздувания бюджета.",
    image: PROJECTS[4]?.imageUrl ?? ADVANTAGES_IMAGE,
    imageAlt: "Кейс: онлайн-школа",
    focusMetric: "8–9%",
    focusMetricLabel: "конверсия в оплату",
    stats: [
      { label: "Рост продаж", value: "×2 за 2 мес." },
      { label: "Стоимость заявки", value: "380–450 ₽" },
      { label: "Чек курса", value: "до 35 000 ₽" },
    ],
  },
] as const;
const AUTOPLAY_MS = 8500;

export function AdvantagesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const goToSlide = (index: number) => {
    setActiveSlide(index);
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % CASE_SLIDES.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + CASE_SLIDES.length) % CASE_SLIDES.length);
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setActiveSlide((prev) => (prev + 1) % CASE_SLIDES.length);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(timeoutId);
  }, [activeSlide]);

  useGSAP(() => {
    const ctx = containerRef.current;
    if (!ctx) return;
    const mainTitle = ctx.querySelector(".main-title");
    const listPanel = ctx.querySelector(".list-panel");
    const sliderPanel = ctx.querySelector(".slider-panel");
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
    if (listPanel || sliderPanel) {
      tl.fromTo(
        [listPanel, sliderPanel].filter(Boolean),
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
      className="relative z-20 px-4 md:px-9 py-12 sm:py-20 md:py-32 bg-white"
    >
      <div className="max-w-[1520px] mx-auto">
        <div className="mb-8">
          <SectionLabel label="Кейсы и результаты" />
        </div>

        <h2 className="main-title text-3xl sm:text-4xl md:text-[60px] lg:text-[84px] font-semibold tracking-[-0.05em] leading-[1.05] text-black mb-8 sm:mb-10 md:mb-16 lg:mb-24 max-w-[1200px]">
          Реальные кейсы: как растут заявки, выручка и ROI
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <div className="lg:col-span-4 list-panel">
            <div className="h-full rounded-[16px] sm:rounded-[24px] bg-[#f5f5f5] border border-black/5 p-3 sm:p-5">
              <div className="relative flex flex-col gap-1.5 sm:gap-2">
                <div className="absolute left-[15px] top-2 bottom-2 w-px bg-black/10 hidden sm:block" />
              {CASE_SLIDES.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={`relative text-left rounded-[12px] sm:rounded-[16px] p-3 sm:p-4 transition-all duration-300 border ${
                    index === activeSlide
                      ? "bg-white border-black/15 shadow-[0_14px_30px_rgba(0,0,0,0.08)]"
                      : "bg-transparent border-transparent hover:bg-white/70 hover:border-black/10"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 z-10 flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full text-[10px] sm:text-xs font-semibold transition-colors ${
                        index === activeSlide
                          ? "bg-[#0a0a0a] text-white"
                          : "bg-white border border-black/10 text-black/55"
                      }`}
                    >
                      {slide.id}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-black/45">
                          {slide.pill}
                        </span>
                        {index === activeSlide && <span className="h-1.5 w-1.5 rounded-full bg-[#b2ff00]" />}
                      </div>
                      <p className="mt-1 text-[15px] sm:text-base font-semibold tracking-[-0.02em] leading-[1.25] text-black">
                        {slide.title}
                      </p>
                      <p className="mt-1 text-xs sm:text-sm leading-[1.4] text-[#747474]">
                        {slide.stats[0].label}: {slide.stats[0].value}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 slider-panel">
            <div
              className="relative h-full rounded-[16px] sm:rounded-[24px] bg-[#f5f5f5] border border-black/5 p-3 sm:p-5 lg:p-8 overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-[3px] bg-black/10">
                <motion.div
                  key={activeSlide}
                  className="h-full bg-[#b2ff00]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                />
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeSlide}
                  className="h-full flex flex-col gap-4 sm:gap-6 lg:gap-7"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold text-black/50 uppercase tracking-[0.12em]">
                      Кейс {CASE_SLIDES[activeSlide].id}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Previous slide"
                        onClick={prevSlide}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M9 3L4 7L9 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        aria-label="Next slide"
                        onClick={nextSlide}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black text-white border border-black flex items-center justify-center hover:bg-[#1a1a1a] transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M5 3L10 7L5 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
                    <div className="md:col-span-5">
                      <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-[12px] sm:rounded-[18px] overflow-hidden">
                        <Image
                          src={CASE_SLIDES[activeSlide].image}
                          alt={CASE_SLIDES[activeSlide].imageAlt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 40vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0" />
                        <div className="absolute left-3 bottom-3 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-black">
                          <span className="w-2 h-2 rounded-full bg-[#b2ff00]" />
                          {CASE_SLIDES[activeSlide].pill}
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-7">
                      <p className="text-lg sm:text-xl md:text-2xl lg:text-[32px] font-semibold tracking-[-0.035em] leading-[1.2] text-black">
                        {CASE_SLIDES[activeSlide].title}
                      </p>
                      <p className="mt-2 sm:mt-4 text-xs sm:text-sm md:text-base lg:text-lg font-medium tracking-[-0.02em] leading-[1.5] text-[#747474]">
                        {CASE_SLIDES[activeSlide].subtitle}
                      </p>

                      <div className="stat-card mt-3 sm:mt-5 rounded-[12px] sm:rounded-[16px] bg-white border border-black/10 p-3 sm:p-5 inline-block">
                        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.05em] leading-none text-black">
                          {CASE_SLIDES[activeSlide].focusMetric}
                        </p>
                        <p className="mt-2 text-xs sm:text-sm font-medium text-[#747474]">
                          {CASE_SLIDES[activeSlide].focusMetricLabel}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-auto">
                    {CASE_SLIDES[activeSlide].stats.map((item) => (
                      <div key={item.label} className="stat-card rounded-[10px] sm:rounded-[16px] bg-white border border-black/10 p-2.5 sm:p-4">
                        <p className="text-[9px] sm:text-xs uppercase tracking-[0.12em] text-black/45 font-semibold truncate">{item.label}</p>
                        <p className="mt-1 sm:mt-2 text-base sm:text-xl md:text-2xl font-semibold tracking-[-0.03em] text-black">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {CASE_SLIDES.map((slide, index) => (
                        <button
                          key={slide.id}
                          type="button"
                          aria-label={`Go to case ${slide.id}`}
                          onClick={() => goToSlide(index)}
                          className={`h-2.5 rounded-full transition-all duration-300 ${
                            index === activeSlide ? "w-8 bg-black" : "w-2.5 bg-black/20 hover:bg-black/40"
                          }`}
                        />
                      ))}
                    </div>

                    <ButtonPill
                      href="/contact"
                      variant="black"
                      className="px-4 sm:px-6 py-2.5 sm:py-3.5 text-xs sm:text-sm"
                    >
                      Получить план роста
                    </ButtonPill>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}