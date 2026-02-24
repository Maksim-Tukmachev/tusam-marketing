"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ButtonPill } from "@/components/ui/ButtonPill";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FAQ_ITEMS } from "@/lib/constants";
import { FAQ_HERO_IMAGE, BLOG_LOGO_WHITE } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export function FaqSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  useGSAP(() => {
    gsap.from(".faq-header > *", {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "expo.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        once: true,
      },
    });

    gsap.from(".faq-card", {
      y: 60,
      opacity: 0,
      scale: 0.98,
      stagger: 0.1,
      duration: 1,
      ease: "power4.out",
      overwrite: true,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 88%",
        once: true,
      },
    });
  }, { scope: containerRef });

  return (
    <section
      id="faq"
      ref={containerRef}
      className="relative z-20 px-4 md:px-9 py-16 sm:py-24 md:py-32 bg-white"
      aria-label="Часто задаваемые вопросы о лидогенерации и настройке рекламы"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-[1520px] mx-auto">
        <div className="faq-header mb-10 sm:mb-16 md:mb-24 flex flex-col md:flex-row justify-between lg:items-end gap-8">
          <div className="max-w-3xl">
            <SectionLabel label="FAQ" />
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.05em] leading-[1.1] text-black mt-8">
              Частые вопросы<br />
              <span className="text-[#747474]">о деньгах и заявках.</span>
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-6">
            <p className="text-lg md:text-xl font-medium tracking-tight text-[#747474] max-w-sm md:text-right">
              Не нашли ответ? Напишите — перезвоним за 15 минут.
            </p>
          </div>
        </div>

        {/* Вопросы — ответы на всю ширину */}
        <div className="flex flex-col gap-3 mb-12 lg:mb-20">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;
              return (
                <article
                  key={item.id}
                  className="faq-card group rounded-[24px] overflow-hidden bg-[#f7f7f7] hover:bg-[#0a0a0a] transition-colors duration-500"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="w-full text-left py-5 px-4 sm:py-6 sm:px-6 md:py-7 md:px-8 flex items-start justify-between gap-4"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    id={`faq-question-${item.id}`}
                  >
                    <h3
                      className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-black group-hover:text-white transition-colors duration-500 pr-4"
                      itemProp="name"
                    >
                      {item.question}
                    </h3>
                    <span
                      className={`shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? "bg-white border-white rotate-180"
                          : "bg-transparent border-black/20 group-hover:border-white"
                      }`}
                      aria-hidden
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={`transition-colors duration-500 ${isOpen ? "text-black" : "text-black group-hover:text-white"}`}>
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-question-${item.id}`}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div
                        className="pb-6 px-6 md:pb-7 md:px-8 pt-0"
                        itemScope
                        itemProp="acceptedAnswer"
                        itemType="https://schema.org/Answer"
                      >
                        <p
                          className="text-base md:text-lg font-medium text-[#747474] group-hover:text-white/80 leading-relaxed"
                          itemProp="text"
                        >
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
        </div>

        {/* CTA «Остались вопросы?» на всю ширину внизу */}
        <Link
          href="/contact"
          className="faq-card group relative block w-full min-h-[140px] sm:min-h-[160px] md:min-h-[190px] rounded-[32px] overflow-hidden flex flex-col justify-between p-5 sm:p-6 md:p-8"
          aria-label="Остались вопросы? Перейти к форме заявки"
        >
          <Image
            src={FAQ_HERO_IMAGE}
            alt=""
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

          <div className="relative z-10 flex justify-between items-start w-full">
            <div className="relative w-28 h-8">
              <Image
                src={"/icons/white.svg"}
                alt=""
                fill
                className="object-contain object-left"
              />
            </div>
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-md overflow-hidden">
              <Image
                src="https://framerusercontent.com/images/cyocIIxmfHraQKroedozYMmy7XQ.svg?width=320&height=320"
                alt=""
                width={48}
                height={48}
                className="object-cover scale-110 group-hover:rotate-12 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="relative z-10 w-full flex flex-col items-start text-left mt-auto pt-6 sm:pt-8">
            <p className="text-[10px] font-mono font-bold text-white/70 uppercase tracking-widest mb-2">
              Остались вопросы?
            </p>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter leading-[1.05] text-white mb-4">
              Напишите <br />
              <span className="text-[#bcff00] inline-block group-hover:-translate-y-2 transition-transform duration-500 ease-out">
                нам.
              </span>
            </p>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#bcff00] text-black flex items-center justify-center group-hover:scale-110 group-hover:bg-white transition-all duration-500 ease-out">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-500"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
