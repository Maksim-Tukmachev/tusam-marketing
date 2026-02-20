import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactPageHero } from "@/sections/ContactPageHero";
import { ContactSection } from "@/sections/ContactSection";
import { ContactPageCta } from "@/sections/ContactPageCta";

export const metadata: Metadata = {
  title: "Контакты | Бесплатный аудит за 24 часа — перезвоним за 5 минут",
  description:
    "Оставьте номер — перезвоним за 5 минут. Бесплатный аудит: прогноз по заявкам и прибыли за 24 часа. 50+ заявок в месяц или возврат денег.",
  alternates: { canonical: "https://tusam.group/contact" },
  openGraph: {
    title: "Контакты Tusam Group | Аудит бесплатно за 24 часа",
    description:
      "Перезвоним за 5 минут. Прогноз заявок и прибыли — бесплатно. 50+ заявок в месяц или возврат денег.",
    url: "https://tusam.group/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 min-h-0">
        <ContactPageHero />
        <div id="form">
          <ContactSection />
        </div>
      </main>
      <Footer variant="compact" />
    </div>
  );
}
