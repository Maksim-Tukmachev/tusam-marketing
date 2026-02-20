import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServicesPageHero } from "@/sections/ServicesPageHero";
import { ServicesPageList } from "@/sections/ServicesPageList";
import { ServicesPagePackages } from "@/sections/ServicesPagePackages";
import { ServicesPageCta } from "@/sections/ServicesPageCta";

export const metadata: Metadata = {
  title: "Услуги и цены | Система лидогенерации под ключ от 90 000 ₽",
  description:
    "Сайт + Яндекс Директ + CRM + автоворонки. Готовые пакеты: Быстрый старт 90 000 ₽, Рост x2 — 112 000 ₽, Под ключ — 290 000 ₽. 50+ заявок в месяц или возврат денег. Окупаемость за 2 недели.",
  alternates: { canonical: "https://tusam.group/services" },
  openGraph: {
    title: "Услуги и цены | Заявки под ключ от 90 000 ₽",
    description:
      "Сайт → Трафик → CRM → Автоматизация. Один подрядчик. Пакеты от 90 000 ₽. 50+ заявок в месяц или возврат денег.",
    url: "https://tusam.group/services",
    type: "website",
  },
};

function ServicesJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Система лидогенерации под ключ",
    provider: {
      "@type": "Organization",
      name: "Tusam Group",
      url: "https://tusam.group",
    },
    description:
      "Конверсионный сайт, Яндекс Директ, CRM-система, автоворонки. Первые заявки за 14 дней.",
    areaServed: "Россия",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Пакеты услуг",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Быстрый старт",
          price: "90000",
          priceCurrency: "RUB",
          description: "Конверсионный сайт + Яндекс Директ + CRM",
        },
        {
          "@type": "Offer",
          name: "Рост x2",
          price: "112000",
          priceCurrency: "RUB",
          description: "Полная система с автоворонками и ретаргетингом",
        },
        {
          "@type": "Offer",
          name: "Под ключ",
          price: "290000",
          priceCurrency: "RUB",
          description:
            "Максимальный пакет: стратегия, 10 кампаний, CRM, автоматизация",
        },
      ],
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ServicesJsonLd />
      <Header />
      <main className="flex-1 min-h-0">
        <ServicesPageHero />
        <ServicesPageList />
        <ServicesPagePackages />
        <ServicesPageCta />
      </main>
      <Footer variant="compact" />
    </div>
  );
}
