import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BLOG_POSTS } from "@/lib/constants";
import { ContactSection } from "@/sections/ContactSection";
import { BlogPostList } from "./BlogPostList";

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

          <BlogPostList posts={BLOG_POSTS} />
        </div>
        <ContactSection />
      </main>
      <Footer variant="compact" />
    </div>
  );
}
