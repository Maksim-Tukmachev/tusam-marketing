"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CONTACT_EMAIL } from "@/lib/constants";
import { ButtonPill } from "@/components/ui/ButtonPill";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  { num: "01", title: "Звонок за 15 минут", text: "Перезвоним и разберёмся в задаче. Без скриптов." },
  { num: "02", title: "Аудит за 24 часа", text: "Прогноз: сколько заявок, по какой цене, какой ROI." },
  { num: "03", title: "Старт без рисков", text: "Нет результата — возвращаем деньги. Пункт договора." },
];

export function ContactPageCta() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".contact-cta-step", {
      y: 24,
      opacity: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 88%" },
    });
  }, { scope: ref });

  return (
    <section
      ref={ref}
      className="px-4 md:px-9 py-12 sm:py-24 md:py-32 bg-[#f7f7f7]"
    >
      <div className="max-w-[1520px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-black/30 mb-4">
              Контакты
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.05em] text-black leading-[1.1] mb-4 sm:mb-6">
              Не ждите — напишите сейчас
            </h2>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-xl md:text-2xl font-semibold text-[#0a0a0a] hover:text-[#747474] transition-colors block mb-2"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="text-sm font-medium text-[#747474]">
              Перезваниваем в течение 15 минут. Без менеджеров-роботов — живой разговор.
            </p>
            <div className="mt-8">
              <ButtonPill href="#form" variant="black">
                Вернуться к форме
              </ButtonPill>
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-black/30 mb-6">
              Что будет после заявки
            </p>
            <div className="flex flex-col gap-6 md:gap-8">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="contact-cta-step flex gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8 rounded-[16px] sm:rounded-[24px] bg-white border border-black/5 hover:border-[#bcff00]/30 transition-colors"
                >
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#bcff00] shrink-0">
                    {step.num}
                  </span>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-black mb-1">
                      {step.title}
                    </h3>
                    <p className="text-[#747474] font-medium">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
