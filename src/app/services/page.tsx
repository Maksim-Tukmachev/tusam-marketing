import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServicesPageHero } from "@/sections/ServicesPageHero";
import { ServicesPageList } from "@/sections/ServicesPageList";
import { ServicesPagePackages } from "@/sections/ServicesPagePackages";
import { ServicesPageCta } from "@/sections/ServicesPageCta";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Услуги и цены | Бизнес-консалтинг от 9 900 ₽",
  description:
    "Экспресс-диагностика, разработка бизнес-стратегии, стратегическое сопровождение и госзакупки. Продуктовая линейка Асыльяр Бизнес-консалтинг с прозрачными ценами.",
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    title: "Услуги и цены | Бизнес-консалтинг от 9 900 ₽",
    description:
      "Диагностика → Стратегия → Внедрение → Сопровождение. Научная методология Доктора наук.",
    url: `${SITE_URL}/services`,
    type: "website",
  },
};

function ServicesJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Бизнес-консалтинг для малого и среднего бизнеса",
    provider: {
      "@type": "Organization",
      name: "Асыльяр Бизнес-консалтинг",
      url: SITE_URL,
    },
    description:
      "Экспресс-диагностика, разработка бизнес-стратегии, стратегическое сопровождение и сопровождение по госзакупкам.",
    areaServed: "Россия",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Пакеты услуг",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Экспресс-диагностика",
          price: "9900",
          priceCurrency: "RUB",
          description: "Онлайн-сессия 1,5 часа: карта слабых мест и план действий",
        },
        {
          "@type": "Offer",
          name: "Бизнес-Стратегия",
          price: "185000",
          priceCurrency: "RUB",
          description: "SWOT и PESTEL, оцифровка финмодели, оргструктура, дорожная карта",
        },
        {
          "@type": "Offer",
          name: "Стратегическое сопровождение",
          price: "95000",
          priceCurrency: "RUB",
          description:
            "Еженедельный контроль внедрения, аудит KPI, поддержка при масштабировании",
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
