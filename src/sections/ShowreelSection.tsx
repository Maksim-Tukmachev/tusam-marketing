"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonPill } from "@/components/ui/ButtonPill";
import { STEPS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ShowreelSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    ScrollTrigger.batch(".step-card", {
      onEnter: (elements) => {
        gsap.fromTo(elements,
          { y: 40, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 1, ease: "power4.out", overwrite: true }
        );
      },
      start: "top 90%",
      once: true
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative z-20 px-4 md:px-9 py-16 sm:py-24 md:py-32 bg-white">
      <div className="max-w-[1520px] mx-auto">
        <div className="process-header mb-16 md:mb-24">
          <SectionLabel label="Процесс" />
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-bold tracking-[-0.05em] text-black mt-8">
            От нуля до заявок<br />
            <span className="text-[#747474]">за 14 дней.</span>
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mt-10">
            <p className="text-xl md:text-2xl font-medium tracking-tight text-[#747474] max-w-xl">
              Пошаговый процесс с конкретными сроками. <span className="text-black">Вы видите каждый этап.</span>
            </p>
            <ButtonPill href="/contact" variant="black">Начать с бесплатного аудита</ButtonPill>
          </div>
        </div>

        <div className="steps-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, index }: { step: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const handRef = useRef<SVGPathElement>(null);
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const { contextSafe } = useGSAP({ scope: cardRef });

  const onEnter = contextSafe(() => {
    gsap.to(handRef.current, {
      rotation: "+=360",
      duration: 1.5,
      repeat: -1,
      ease: "none",
      id: `clockRotation-${index}`
    });
    const card = cardRef.current;
    const textContent = card?.querySelectorAll(".text-content");
    const bgNumber = card?.querySelector(".bg-number");
    const tl = gsap.timeline({ id: `hoverEffect-${index}` });
    tl.to(card, { backgroundColor: "#0a0a0a", duration: 0.4, ease: "power2.out" }, 0)
      .to(dotsRef.current.slice(0, index + 1), {
        backgroundColor: "#bcff00",
        boxShadow: "0 0 12px rgba(188,255,0,0.5)",
        stagger: 0.05,
        duration: 0.3
      }, 0);
    if (textContent?.length) tl.to(textContent, { color: "#ffffff", duration: 0.3 }, 0);
    if (bgNumber) tl.to(bgNumber, { opacity: 0.12, duration: 0.4 }, 0);
  });

  const onLeave = contextSafe(() => {
    gsap.getById(`clockRotation-${index}`)?.kill();
    gsap.to(handRef.current, { rotation: 0, duration: 0.5, ease: "power2.out" });
    gsap.getById(`hoverEffect-${index}`)?.kill();
    const card = cardRef.current;
    const textContent = card?.querySelectorAll(".text-content");
    const bgNumber = card?.querySelector(".bg-number");
    gsap.to(card, { backgroundColor: "#f7f7f7", duration: 0.4 });
    gsap.to(dotsRef.current.slice(0, index + 1), {
      backgroundColor: "black",
      boxShadow: "none",
      duration: 0.3
    });
    if (textContent?.length) gsap.to(textContent, { color: (i: number) => i === 0 ? "#000000" : "#747474", duration: 0.3 });
    if (bgNumber) gsap.to(bgNumber, { opacity: 0.02, duration: 0.4 });
  });

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="step-card group relative bg-[#f7f7f7] rounded-[32px] p-5 sm:p-8 flex flex-col min-h-[320px] sm:min-h-[380px] cursor-default overflow-hidden will-change-colors"
    >
      <div className="flex items-center justify-between mb-12 relative z-10">
        <div className="flex gap-1.5">
          {[0, 1, 2, 3].map((d) => (
            <div
              key={d}
              ref={(el) => { if (el) dotsRef.current[d] = el; }}
              className={`w-2.5 h-2.5 rounded-full ${
                d <= index ? "bg-black" : "bg-black/10"
              }`}
            />
          ))}
        </div>
        <span className="text-content text-[10px] font-mono font-bold text-black/30 uppercase tracking-widest transition-none">
          Step_{step.number}
        </span>
      </div>

      <div className="flex-1 relative z-10">
        <h3 className="text-content text-2xl md:text-3xl font-bold tracking-tight text-black mb-5 transition-none">
          {step.title}
        </h3>
        <p className="text-content text-base md:text-lg font-medium text-[#747474] leading-relaxed transition-none">
          {step.description}
        </p>
      </div>

      <div className="pt-5 sm:pt-8 mt-auto border-t border-black/5 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="clock-wrapper relative w-5 h-5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#bcff00] w-full h-full">
              <circle cx="12" cy="12" r="9" className="opacity-20 stroke-current" />
              <path ref={handRef} d="M12 7v5l2 2" className="origin-[12px_12px] stroke-current" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-content text-sm font-bold tracking-tight text-[#747474]">
            {step.duration}
          </span>
        </div>

        <div className="w-2.5 h-2.5 rounded-full border border-black/10 bg-black/5 group-hover:bg-[#bcff00] group-hover:border-[#bcff00] group-hover:shadow-[0_0_12px_#bcff00] transition-all duration-300" />
      </div>

      <span className="bg-number absolute -bottom-4 -right-2 text-[80px] sm:text-[120px] font-bold text-black opacity-[0.02] leading-none pointer-events-none transition-none">
        {step.number}
      </span>
    </div>
  );
}
