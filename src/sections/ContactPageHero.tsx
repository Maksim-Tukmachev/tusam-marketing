"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const items = [
  {
    title: "Ответ за 5 минут",
    desc: "Перезваниваем сразу после заявки. Работаем без выходных.",
    label: "Скорость",
  },
  {
    title: "Аудит бесплатно",
    desc: "Разбираем нишу, конкурентов и рекламу. Прогноз по заявкам и прибыли за 24 часа.",
    label: "Без обязательств",
  },
  {
    title: "Гарантия в договоре",
    desc: "50+ заявок в месяц или вернём деньги. Не обещания — пункт договора.",
    label: "Гарантия",
  },
];

export function ContactPageHero() {
  const container = useRef<HTMLElement>(null);
  const { contextSafe } = useGSAP({ scope: container });

  // Эффект наклона карточек при движении мыши
  const onMouseMove = contextSafe((e: React.MouseEvent, target: HTMLDivElement) => {
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = x - xc;
    const dy = y - yc;

    gsap.to(target, {
      rotateX: -dy / 10,
      rotateY: dx / 10,
      duration: 0.5,
      ease: "power2.out",
    });
  });

  const onMouseLeave = contextSafe((target: HTMLDivElement) => {
    gsap.to(target, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  });

  useGSAP(() => {
    // Влет заголовка
    gsap.from(".reveal-text", {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: "expo.out",
    });

    // Появление карточек
    gsap.from(".contact-hero-card", {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: "power4.out",
      delay: 0.4,
    });
  }, { scope: container });

  return (
    <section
      ref={container}
      className="relative px-4 md:px-9 pt-12 pb-12 sm:pt-24 sm:pb-20 md:pt-32 md:pb-32 bg-white overflow-hidden"
    >
      {/* Декоративный элемент фона */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f7f7f7] -z-10 translate-x-1/4 skew-x-[-12deg]" />

      <div className="max-w-[1520px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-16 md:mb-20 gap-6 sm:gap-8">
          <div className="max-w-4xl">
            <div className="reveal-text mb-12">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-black/30 block mb-6">
                Заявка
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-[-0.06em] text-black leading-[0.85]">
                Сколько стоит заявка<br />
                <span className="text-[#747474]">в вашей нише?</span>
              </h1>
            </div>
          </div>

          <div className="reveal-text">
             <p className="text-base sm:text-xl md:text-2xl font-medium tracking-tight text-[#747474] max-w-sm">
               Оставьте номер — за 24 часа дадим точный прогноз по заявкам и окупаемости.
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8 perspective-1000">
          {items.map((item, i) => (
            <div
              key={i}
              onMouseMove={(e) => onMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => onMouseLeave(e.currentTarget)}
              className="contact-hero-card transform-gpu preserve-3d group relative rounded-[20px] sm:rounded-[32px] bg-[#f7f7f7] hover:bg-[#0a0a0a] p-5 sm:p-8 md:p-10 transition-colors duration-500 flex flex-col min-h-[260px] sm:min-h-[320px] cursor-pointer"
            >
              <div className="flex justify-between items-start mb-auto">
                <span className="text-[10px] font-mono font-bold text-black/20 group-hover:text-[#bcff00] uppercase tracking-widest transition-colors">
                  {item.label}
                </span>
                <div className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center group-hover:border-white/10 transition-colors">
                   <div className="w-1.5 h-1.5 rounded-full bg-black group-hover:bg-[#bcff00] transition-colors" />
                </div>
              </div>

              <div className="mt-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter text-black group-hover:text-white transition-colors mb-4">
                  {item.title}
                </h2>
                <p className="text-base md:text-lg font-medium text-[#747474] group-hover:text-white/50 leading-snug transition-colors">
                  {item.desc}
                </p>
              </div>

              {/* Номер шага на фоне */}
              <span className="absolute bottom-6 right-8 text-6xl font-bold text-black/[0.03] group-hover:text-white/[0.05] transition-colors pointer-events-none">
                0{i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}