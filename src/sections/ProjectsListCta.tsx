"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ButtonPill } from "@/components/ui/ButtonPill";
import { CONTACT_EMAIL } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProjectsListCta() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".projects-cta-inner", {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative z-20 px-4 md:px-9 py-16 md:py-24 bg-white">
      <div className="max-w-[1520px] mx-auto">
        <div className="projects-cta-inner rounded-[24px] sm:rounded-[40px] bg-[#0a0a0a] p-6 sm:p-10 md:p-16 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#bcff00] rounded-full blur-[120px] opacity-20" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-[-0.05em] text-white mb-2 sm:mb-3">
                Нет вашей ниши в кейсах?
              </h2>
              <p className="text-base sm:text-lg text-white/60 max-w-xl">
                Это не значит, что мы не можем помочь. Оставьте заявку — за 24 часа дадим прогноз по заявкам и окупаемости именно для вашего бизнеса.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center shrink-0">
              <ButtonPill href="/contact" variant="lime" className="w-full sm:w-auto justify-center py-4 px-8">
                Получить бесплатный аудит
              </ButtonPill>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-[#bcff00] font-semibold hover:underline text-center sm:text-left"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
