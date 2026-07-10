import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/sections/HeroSection";
import { ClientsSection } from "@/sections/ClientsSection";
import { AdvantagesSection } from "@/sections/AdvantagesSection";
import { AuditCtaSection } from "@/sections/AuditCtaSection";
import { ServicesSection } from "@/sections/ServicesSection";
import { SpeakerSection } from "@/sections/SpeakerSection";
import { ExpertiseSection } from "@/sections/ExpertiseSection";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { ShowreelSection } from "@/sections/ShowreelSection";
import { BlogSection } from "@/sections/BlogSection";
import { FaqSection } from "@/sections/FaqSection";
import { ContactSection } from "@/sections/ContactSection";
import { FAQ_ITEMS, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Асыльяр Бизнес-консалтинг | Стратегический консалтинг для бизнеса",
  description:
    "Разработаем пошаговую стратегию и выстроим управляемую систему роста по научной методологии Кандидата наук. Начните с экспресс-диагностики бизнеса.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Асыльяр Бизнес-консалтинг | Стратегия и рост прибыли",
    description:
      "Стратегический консалтинг для малого и среднего бизнеса. Диагностика, стратегия, внедрение, сопровождение. Измеримый финансовый результат.",
    url: SITE_URL,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Асыльяр Бизнес-консалтинг — стратегический консалтинг",
      },
    ],
  },
};

function HomeJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Асыльяр Бизнес-консалтинг",
    url: SITE_URL,
    description:
      "Стратегический консалтинг для малого и среднего бизнеса: экспресс-диагностика, разработка бизнес-стратегии, стратегическое сопровождение, госзакупки. Научная методология Кандидата наук.",
    priceRange: "от 9 900 ₽",
    areaServed: "Россия",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Услуги бизнес-консалтинга",
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
        <AuditCtaSection />
        <ServicesSection />
        <SpeakerSection />
        <ExpertiseSection />
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
