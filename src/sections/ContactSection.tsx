"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ContactForm } from "@/components/forms/ContactForm";
import { CONTACT_VIDEO_URL } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".reveal-el", {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      },
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative z-20 px-4 md:px-9 py-12 sm:py-24 md:py-32 bg-white rounded-b-[30px] sm:rounded-b-[60px] shadow-[0_-40px_100px_rgba(0,0,0,0.03)]"
    >
      <div className="max-w-[1520px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 sm:gap-16 lg:gap-24">
          <div className="lg:col-span-5 flex flex-col">
            <div className="reveal-el mb-8 sm:mb-12">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-black/30 block mb-4 sm:mb-6">
                Заявка
              </span>
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-[-0.06em] text-black leading-[0.85]">
                Хватит терять<br />
                <span className="text-[#747474]">деньги на рекламу.</span>
              </h2>
            </div>
            <div className="reveal-el">
              <ContactForm />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between reveal-el">
            <div className="relative h-full min-h-[580px] sm:min-h-[720px] rounded-[24px] sm:rounded-[40px] md:rounded-[60px] overflow-hidden bg-[#0a0a0a] p-5 sm:p-10 md:p-16 flex flex-col">
              <div className="absolute inset-0">
                <video
                  src={CONTACT_VIDEO_URL}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover object-center opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-transparent" />
              </div>

              <div className="relative z-10 flex flex-col h-full gap-10 sm:gap-14">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="h-[2px] w-12 bg-[#bcff00]" />
                    <p className="text-white/40 text-[10px] font-mono uppercase tracking-[0.5em]">
                      Старт за 14 дней
                    </p>
                  </div>
                  <div className="text-white/20 font-mono text-xs">tusam group</div>
                </div>

                <div className="mt-auto">
                  <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tighter leading-tight">
                    Оставьте номер — <span className="text-[#bcff00]">перезвоним</span> за 15 минут.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
