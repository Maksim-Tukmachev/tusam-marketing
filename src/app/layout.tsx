import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { TransitionProvider } from "@/components/transition/TransitionContext";
import { TransitionOverlay } from "@/components/transition/TransitionOverlay";
import { Preloader } from "@/components/transition/Preloader";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const SITE_NAME = "Tusam Group";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tusam Group | Система лидогенерации под ключ — от 49 ₽ за заявку",
    template: "%s | Tusam Group",
  },
  description:
    "Сайт + Яндекс Директ + CRM + автоворонки. Окупаемость за 2 недели. Бесплатный аудит за 24 часа.",
  keywords: [
    "лидогенерация",
    "заявки под ключ",
    "Яндекс Директ",
    "CRM",
    "автоворонки",
    "маркетинговое агентство",
    "лиды для бизнеса",
    "настройка рекламы",
    "конверсионный сайт",
    "Tusam Group",
    "tusam",
    "увеличить продажи",
    "стоимость заявки",
    "ROI 300%",
    "генерация лидов",
    "маркетинг под ключ",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Tusam Group | Система лидогенерации под ключ",
    description:
      "Сайт → Трафик → CRM → Автоматизация. Окупаемость за 2 недели.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Tusam Group — система лидогенерации",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tusam Group | Система лидогенерации под ключ",
    description:
      "Сайт + Яндекс Директ + CRM + автоворонки. Окупаемость за 2 недели",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Tusam Group — система лидогенерации",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // yandex: "YOUR_YANDEX_VERIFICATION_CODE",
    // google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "Система лидогенерации под ключ: сайт, реклама, CRM, автоворонки",
    email: "director@tusamgroup.ru",
    sameAs: ["https://t.me/tusam_group", "https://wa.me/tusam_group"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "director@tusamgroup.ru",
      availableLanguage: ["Russian"],
    },
    foundingDate: "2024",
    areaServed: {
      "@type": "Country",
      name: "Russia",
    },
    knowsAbout: [
      "Лидогенерация",
      "Яндекс Директ",
      "CRM-системы",
      "Конверсионные сайты",
      "Маркетинг под ключ",
      "Автоворонки продаж",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Услуги лидогенерации",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Быстрый старт",
            description:
              "Конверсионный сайт + Яндекс Директ + CRM. Первые заявки за 14 дней.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Рост x2",
            description:
              "Полная система лидогенерации с автоворонками и ретаргетингом.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Под ключ",
            description:
              "Максимальный пакет: стратегия, 10 рекламных кампаний, CRM, автоматизация, персональный менеджер.",
          },
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

function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Система лидогенерации под ключ для малого и среднего бизнеса",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    inLanguage: "ru-RU",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-[#f5f5f5]`}>
        <TransitionProvider>
          <Preloader />
          {children}
          <TransitionOverlay />
        </TransitionProvider>
        <CookieConsent />
      </body>
    </html>
  );
}
