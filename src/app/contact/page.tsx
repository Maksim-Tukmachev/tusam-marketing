import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactPageHero } from "@/sections/ContactPageHero";
import { ContactSection } from "@/sections/ContactSection";
import { ContactPageCta } from "@/sections/ContactPageCta";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Контакты | Запишитесь на экспресс-диагностику бизнеса",
  description:
    "Оставьте контакты — свяжемся и согласуем удобное время. Первый шаг к системному росту — экспресс-диагностика бизнеса с Доктором наук.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Контакты Асыльяр Бизнес-консалтинг | Запись на диагностику",
    description:
      "Свяжемся и согласуем время. Начните с экспресс-диагностики бизнеса.",
    url: `${SITE_URL}/contact`,
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 min-h-0">
        
        <div id="form">
          <ContactSection />
        </div>
        <ContactPageHero />
      </main>
      <Footer variant="compact" />
    </div>
  );
}
