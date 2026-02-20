import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { BLOG_POSTS } from "@/lib/constants";
import { ContactSection } from "@/sections/ContactSection";

export const metadata: Metadata = {
  title: "Блог | Практика лидогенерации: связки, цифры, результаты",
  description:
    "Без теории. Как снизить стоимость заявки в 4 раза, настроить Яндекс Директ и не слить бюджет, внедрить CRM и перестать терять лиды.",
  alternates: { canonical: "https://tusam.group/blog" },
  openGraph: {
    title: "Блог Tusam Group | Практика лидогенерации",
    description:
      "Связки, настройки, цифры. Только то, что приносит деньги. Снижаем стоимость заявки в 4 раза.",
    url: "https://tusam.group/blog",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
        <main className="flex-1 min-h-0 pt-8 pb-16 sm:pt-12 sm:pb-24 md:pt-16 md:pb-32">
        <div className="max-w-[1520px] mx-auto px-4 md:px-9 w-full mb-12 sm:mb-20">
          <header className="mb-10 sm:mb-16 md:mb-24">
            <SectionLabel label="Блог" />
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.05em] leading-[1.1] text-black mt-6 sm:mt-8">
              Практика<br />
              <span className="text-[#747474]">и цифры.</span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl font-medium tracking-tight text-[#747474] mt-5 sm:mt-8 max-w-2xl">
              Без теории. Только связки, настройки и результаты, которые приносят деньги.
            </p>
          </header>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 list-none p-0 m-0">
            {BLOG_POSTS.map((post) => (
              <li key={post.slug}>
                <TransitionLink
                  href={`/blog/${post.slug}`}
                  label={post.title}
                  subtitle="Блог"
                  className="group block bg-[#f7f7f7] hover:bg-[#0a0a0a] rounded-[20px] sm:rounded-[32px] overflow-hidden transition-colors duration-500"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full z-10">
                      <span className="text-[10px] font-mono font-bold text-black uppercase tracking-widest">
                        {post.date}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 md:p-8">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-black group-hover:text-white transition-colors duration-500 line-clamp-2 mb-3">
                      {post.title}
                    </h2>
                    <p className="text-sm md:text-base font-medium text-[#747474] group-hover:text-white/70 transition-colors duration-500 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 mt-4 text-xs font-bold uppercase tracking-wider text-black/40 group-hover:text-[#bcff00] transition-colors duration-500">
                      Читать
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transform group-hover:translate-x-1 transition-transform">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </TransitionLink>
              </li>
            ))}
          </ul>
        </div>
        <ContactSection />
      </main>
      <Footer variant="compact" />
    </div>
  );
}
