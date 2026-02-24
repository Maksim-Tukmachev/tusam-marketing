import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/sections/HeroSection";
import { ClientsSection } from "@/sections/ClientsSection";
import { AdvantagesSection } from "@/sections/AdvantagesSection";
import { ServicesSection } from "@/sections/ServicesSection";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { ShowreelSection } from "@/sections/ShowreelSection";
import { BlogSection } from "@/sections/BlogSection";
import { FaqSection } from "@/sections/FaqSection";
import { ContactSection } from "@/sections/ContactSection";
import { FAQ_ITEMS, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Tusam Group | Система лидогенерации под ключ — от 49 ₽ за заявку",
  description:
    "Сайт + Яндекс Директ + CRM + автоворонки. Окупаемость за 14 дней. Бесплатный аудит за 24 часа.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Tusam Group | Заявки от 49 ₽. Система под ключ.",
    description: "...",
    url: SITE_URL,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Tusam Group — система лидогенерации",
      },
    ],
  },
};

function HomeJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Tusam Group",
    url: SITE_URL,
    description:
      "Система лидогенерации под ключ: конверсионный сайт, Яндекс Директ, CRM, автоворонки. Заявки от 49 ₽. Окупаемость за 14 дней.",
    priceRange: "от 90 000 ₽",
    areaServed: "Россия",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Услуги лидогенерации",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "445",
      bestRating: "5",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function FaqJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <HomeJsonLd />
      <FaqJsonLd />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ClientsSection />
        <AdvantagesSection />
        <ServicesSection />
        <ProjectsSection />
        <ShowreelSection />
        <BlogSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
