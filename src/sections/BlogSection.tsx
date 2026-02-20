"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ButtonPill } from "@/components/ui/ButtonPill";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BLOG_POSTS, BLOG_HERO_IMAGE, BLOG_LOGO_WHITE } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function BlogSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".blog-header > *", {
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

    ScrollTrigger.batch(".blog-card", {
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          { y: 60, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 1.2, ease: "power4.out", overwrite: true }
        );
      },
      start: "top 85%",
      once: true,
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative z-20 px-4 md:px-9 py-16 sm:py-24 md:py-32 bg-white">
      <div className="max-w-[1520px] mx-auto">
        <div className="blog-header mb-10 sm:mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-3xl">
            <SectionLabel label="Блог" />
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.05em] leading-[1.1] text-black mt-8">
              Практика<br />
              <span className="text-[#747474]">и цифры.</span>
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-6">
            <p className="text-lg md:text-xl font-medium tracking-tight text-[#747474] max-w-sm md:text-right">
              Без теории. Только связки, настройки и результаты, которые приносят деньги.
            </p>
            <ButtonPill href="/blog" variant="black">
              Все статьи
            </ButtonPill>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          <div className="lg:col-span-7 flex flex-col gap-5 lg:gap-6">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="blog-card group flex flex-col sm:flex-row bg-[#f7f7f7] hover:bg-[#0a0a0a] rounded-[32px] p-3 transition-colors duration-500 ease-out"
              >
                <div className="relative w-full sm:w-[45%] aspect-[4/3] rounded-[24px] overflow-hidden bg-black/5">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-1000 ease-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full z-10">
                    <p className="text-[10px] font-mono font-bold text-black uppercase tracking-widest">
                      {post.date}
                    </p>
                  </div>
                </div>
                <div className="flex-1 py-6 px-4 sm:px-6 flex flex-col justify-center relative">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-black group-hover:text-white transition-colors duration-500 mb-4 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-base font-medium text-[#747474] group-hover:text-white/60 transition-colors duration-500 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-black/20 group-hover:text-[#bcff00] transition-colors duration-500">
                    <span className="text-xs font-bold uppercase tracking-wider">Читать</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transform group-hover:translate-x-2 transition-transform duration-500">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="lg:col-span-5">
            <Link
              href="/blog"
              className="blog-card group relative h-full min-h-[360px] sm:min-h-[480px] lg:min-h-full rounded-[32px] overflow-hidden flex flex-col justify-between p-6 sm:p-8 md:p-10"
            >
              <Image
                src={BLOG_HERO_IMAGE}
                alt="Блог"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

              <div className="relative z-10 flex justify-between items-start w-full">
                <div className="relative w-28 h-8">
                  <Image
                    src={BLOG_LOGO_WHITE || "/logo-white.svg"}
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

              <div className="relative z-10 w-full flex flex-col items-end text-right mt-auto pt-20">
                <p className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-widest mb-4">
                  Блог
                </p>
                <p className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] text-white mb-8">
                  Только<br />
                  <span className="text-[#bcff00] inline-block group-hover:-translate-y-2 transition-transform duration-500 ease-out">
                    практика.
                  </span>
                </p>
                <div className="w-16 h-16 rounded-full bg-[#bcff00] text-black flex items-center justify-center group-hover:scale-110 group-hover:bg-white transition-all duration-500 ease-out">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
