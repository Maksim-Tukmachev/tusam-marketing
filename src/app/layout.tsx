import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { TransitionProvider } from "@/components/transition/TransitionContext";
import { TransitionOverlay } from "@/components/transition/TransitionOverlay";
import { Preloader } from "@/components/transition/Preloader";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { SITE_URL } from "@/lib/constants";
import { ROOT_KEYWORDS } from "@/data/keywords";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const SITE_NAME = "Асыльяр Бизнес-консалтинг";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Асыльяр Бизнес-консалтинг | Рост чистой прибыли по научной методологии",
    template: "%s | Асыльяр Бизнес-консалтинг",
  },
  description:
    "Стратегический консалтинг для малого и среднего бизнеса. Разработка бизнес-стратегии, управление рисками и вывод собственника из операционки по научной методологии Кандидата наук.",
  keywords: [...ROOT_KEYWORDS],
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
    title: "Асыльяр Бизнес-консалтинг | Стратегия и рост прибыли для бизнеса",
    description:
      "Диагностика → Стратегия → Внедрение → Сопровождение. Научная методология Кандидата наук и практический опыт управления. Измеримый финансовый результат.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Асыльяр Бизнес-консалтинг — стратегический консалтинг для бизнеса",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Асыльяр Бизнес-консалтинг | Стратегия и рост прибыли",
    description:
      "Стратегический консалтинг для МСБ по научной методологии Кандидата наук. Диагностика, стратегия, внедрение, сопровождение.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Асыльяр Бизнес-консалтинг — стратегический консалтинг для бизнеса",
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
      "Стратегический консалтинг для малого и среднего бизнеса: диагностика, разработка стратегии, сопровождение внедрения, госзакупки",
    email: "info@asylyar.ru",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "info@asylyar.ru",
      availableLanguage: ["Russian"],
    },
    foundingDate: "2024",
    areaServed: {
      "@type": "Country",
      name: "Russia",
    },
    knowsAbout: [
      "Бизнес-консалтинг",
      "Разработка бизнес-стратегии",
      "SWOT и PESTEL анализ",
      "Оцифровка финансовой модели",
      "Оптимизация бизнес-процессов",
      "Сопровождение по госзакупкам",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Услуги бизнес-консалтинга",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Экспресс-диагностика бизнеса",
            description:
              "Онлайн-сессия 1,5 часа: карта слабых мест, точки роста и план действий.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Разработка бизнес-стратегии",
            description:
              "SWOT и PESTEL анализ, оцифровка финмодели, оптимизация оргструктуры, дорожная карта.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Стратегическое сопровождение",
            description:
              "Еженедельный контроль внедрения, аудит KPI и поддержка при масштабировании.",
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
      "Стратегический консалтинг для малого и среднего бизнеса по научной методологии",
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
