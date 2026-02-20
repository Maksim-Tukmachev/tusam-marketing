import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonPill } from "@/components/ui/ButtonPill";
import { ProjectsListSection } from "@/sections/ProjectsListSection";
import { ProjectsListCta } from "@/sections/ProjectsListCta";

export const metadata: Metadata = {
  title: "Кейсы | Результаты клиентов: ROI 340%, заявка от 490 ₽",
  description:
    "Кейсы лидогенерации: мебель, рекрутинг, eCommerce, недвижимость. 53+ заявки в месяц, окупаемость за 11 дней, стоимость лида от 490 ₽.",
  alternates: { canonical: "https://tusam.group/projects" },
  openGraph: {
    title: "Кейсы | ROI 340%. Заявка от 490 ₽.",
    description:
      "Реальные цифры: мебель, рекрутинг, eCommerce, недвижимость. 53+ заявки в месяц за 11 дней.",
    url: "https://tusam.group/projects",
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
        <main className="flex-1 min-h-0 pt-8 pb-16 sm:pt-12 sm:pb-24 md:pt-16 md:pb-32">
        <div className="max-w-[1520px] mx-auto px-4 md:px-9">
          <header className="mb-8 sm:mb-12 md:mb-16">
            <SectionLabel label="Кейсы" />
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.05em] text-black mt-6 sm:mt-8 leading-[1.1]">
              Результаты, которые окупают<span className="text-[#bcff00]">.</span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl font-medium tracking-tight text-[#747474] mt-5 sm:mt-8 max-w-2xl">
              Средний ROI — 300%. Заявка — от 490 ₽ <span className="text-black">при рыночной цене 2 000 ₽</span>.
            </p>
            <div className="mt-10">
              <ButtonPill href="/contact" variant="black">
                Получить такой же результат
              </ButtonPill>
            </div>
          </header>
        </div>
        <ProjectsListSection />
        <ProjectsListCta />
      </main>
      <Footer variant="compact" />
    </div>
  );
}
