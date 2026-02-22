import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ButtonPill } from "@/components/ui/ButtonPill";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { SERVICES } from "@/data/services";
import { SITE_URL, CONTACT_EMAIL } from "@/lib/constants";
import type { ServiceItem } from "@/lib/types";

const TITLE_MAX = 60;
const DESCRIPTION_MAX = 160;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

function getService(slug: string): ServiceItem | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max - 3).trim() + "...";
}

function parsePriceFrom(priceFrom: string | undefined): number | undefined {
  if (!priceFrom) return undefined;
  const match = priceFrom.replace(/\s/g, "").match(/\d+/);
  return match ? parseInt(match[0], 10) : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Услуга не найдена" };

  const title = truncate(
    service.seo?.title ?? `${service.title} | Tusam Group`,
    TITLE_MAX
  );
  const description = truncate(
    service.seo?.description ?? service.description,
    DESCRIPTION_MAX
  );
  const url = `${SITE_URL}/services/${slug}`;

  return {
    title,
    description,
    keywords: service.seo?.keywords?.join(", "),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "Tusam Group",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ServiceSlugPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const paragraphs = service.fullDescription
    ? service.fullDescription.trim().split(/\n\n+/).filter(Boolean)
    : [service.description];

  const otherServices = SERVICES.filter((s) => s.slug !== slug).slice(0, 4);
  const priceNumber = parsePriceFrom(service.priceFrom);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service" as const,
    name: service.title,
    description: service.seo?.description ?? service.description,
    provider: {
      "@type": "Organization" as const,
      name: "Tusam Group",
      url: SITE_URL,
    },
    areaServed: "Россия",
    ...(priceNumber !== undefined && {
      offers: {
        "@type": "Offer" as const,
        priceSpecification: {
          "@type": "PriceSpecification" as const,
          price: String(priceNumber),
          priceCurrency: "RUB",
        },
      },
    }),
  };

  const faqJsonLd =
    service.faq && service.faq.length > 0
      ? {
          "@context": "https://schema.org" as const,
          "@type": "FAQPage" as const,
          mainEntity: service.faq.map((item) => ({
            "@type": "Question" as const,
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer" as const,
              text: item.answer,
            },
          })),
        }
      : null;

  const breadcrumbLd = {
    "@context": "https://schema.org" as const,
    "@type": "BreadcrumbList" as const,
    itemListElement: [
      { "@type": "ListItem" as const, position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem" as const, position: 2, name: "Услуги", item: `${SITE_URL}/services` },
      {
        "@type": "ListItem" as const,
        position: 3,
        name: service.title,
        item: `${SITE_URL}/services/${slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-[#b2ff00] selection:text-black">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      
      <Header />
      
      <main className="flex-1 min-h-0">
        <article className="max-w-[1520px] mx-auto px-4 md:px-9 pb-16 sm:pb-24 md:pb-32">
          
          {/* ── Breadcrumb (Как в кейсах) ── */}
          <div className="pt-6 sm:pt-8 md:pt-12 pb-4 sm:pb-6">
            <TransitionLink
              href="/services"
              label="Все услуги"
              subtitle="Услуги"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#999] hover:text-black transition-colors"
            >
              <span className="transition-transform group-hover:-translate-x-1">←</span>
              Все услуги
            </TransitionLink>
          </div>

          {/* ── Hero Section ── */}
          <header className="mb-10 sm:mb-16 md:mb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
            <div className="lg:col-span-8">
              <span className="px-3 sm:px-4 py-1.5 rounded-full bg-black text-white text-[10px] font-bold uppercase tracking-widest mb-6 inline-block">
                Услуга {service.number}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.05em] text-black leading-[0.95] mb-4 sm:mb-6">
                {service.title}
              </h1>
              <p className="text-sm sm:text-base md:text-xl font-medium text-black/60 tracking-tight max-w-2xl leading-snug">
                {service.description}
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-end">
              {service.priceFrom && (
                <div className="mb-6">
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-black/40 block mb-2">
                    Стартовая стоимость
                  </span>
                  <p className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-black leading-none">
                    {service.priceFrom}
                  </p>
                </div>
              )}
            </div>
          </header>

          {/* ── Content + Sidebar ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-20">
            
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-12 sm:space-y-16 md:space-y-24">
              
              {/* Описание (Типографика как в кейсах) */}
              <section className="space-y-6 sm:space-y-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-black">
                  О подходе
                </h2>
                {paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-base sm:text-lg md:text-xl font-medium text-[#333] tracking-[-0.01em] leading-[1.7]"
                  >
                    {p}
                  </p>
                ))}
              </section>

              {/* Что входит */}
              {service.includes && service.includes.length > 0 && (
                <section>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-black mb-6 sm:mb-8">
                    Что входит
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                    {service.includes.map((item, i) => (
                      <div key={i} className="rounded-[16px] sm:rounded-[20px] bg-[#f5f5f5] p-5 sm:p-6 md:p-8">
                        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-black/30 block mb-3">
                          0{i + 1}
                        </span>
                        <p className="text-base sm:text-lg font-bold tracking-tight text-black">{item}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Для кого подходит */}
              {service.forWhom && service.forWhom.length > 0 && (
                <section>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-black mb-6 sm:mb-8">
                    Для кого подходит
                  </h2>
                  <ul className="space-y-4 sm:space-y-6">
                    {service.forWhom.map((item, i) => (
                      <li key={i} className="flex items-center gap-4 sm:gap-6 py-4 border-b border-black/10 last:border-0">
                        <span className="w-2 h-2 rounded-full bg-[#b2ff00] shrink-0" />
                        <span className="text-base sm:text-lg md:text-xl text-black font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* FAQ */}
              {service.faq && service.faq.length > 0 && (
                <section>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-black mb-6 sm:mb-8">
                    Частые вопросы
                  </h2>
                  <div className="space-y-6 sm:space-y-8">
                    {service.faq.map((item, index) => (
                      <div key={item.id} className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-black/30 shrink-0 sm:pt-1">
                          Q{index + 1}
                        </span>
                        <div>
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-2 sm:mb-3">{item.question}</h3>
                          <p className="text-base sm:text-lg text-[#555] font-medium leading-[1.7]">{item.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Sidebar (Как в кейсах) */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-5">
                {/* Блок преимуществ */}
                {service.benefits && service.benefits.length > 0 && (
                  <div className="rounded-[20px] bg-[#0a0a0a] p-6 sm:p-8">
                    <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-white/40 mb-6">
                      Ключевые преимущества
                    </p>
                    <ul className="space-y-4 mb-8">
                      {service.benefits.map((item, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#b2ff00] mt-2 shrink-0" />
                          <span className="text-sm sm:text-base text-white/80 font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <ButtonPill href="/contact" variant="lime" className="w-full justify-center">
                      Начать работу
                    </ButtonPill>
                  </div>
                )}
                
                {/* Запасной контакт как в кейсах */}
                <div className="rounded-[20px] border border-black/10 p-5 bg-[#fafafa]">
                  <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#999] mb-3">
                    Или напишите
                  </p>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-black font-semibold hover:underline break-all text-sm">
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </aside>
          </div>

          {/* ── Other Services (Сетка и отступы как в Other Cases) ── */}
          <section className="mt-16 sm:mt-24 md:mt-32">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-black">
                Другие услуги
              </h2>
              <ButtonPill href="/services" variant="black">
                Все услуги
              </ButtonPill>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {otherServices.map((s) => (
                <TransitionLink
                  key={s.id}
                  href={`/services/${s.slug}`}
                  label={s.title}
                  className="group relative flex flex-col justify-between rounded-[20px] sm:rounded-[24px] bg-[#f5f5f5] hover:bg-[#0a0a0a] transition-all duration-300 p-5 sm:p-6 md:p-8 min-h-[200px] sm:min-h-[240px]"
                >
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-black/30 group-hover:text-white/40 transition-colors block">
                    Услуга {s.number}
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-black group-hover:text-white transition-colors tracking-tight mb-2">
                      {s.title}
                    </h3>
                    {s.priceFrom && (
                      <p className="text-sm font-semibold text-[#666] group-hover:text-[#b2ff00] transition-colors">
                        {s.priceFrom}
                      </p>
                    )}
                  </div>
                </TransitionLink>
              ))}
            </div>
          </section>

          {/* ── Final CTA (Один в один как в кейсах) ── */}
          <section className="mt-16 sm:mt-24 md:mt-32 rounded-[24px] sm:rounded-[32px] bg-[#0a0a0a] p-6 sm:p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-[-0.04em] text-white mb-2 sm:mb-3 leading-tight">
                Готовы обсудить проект?
              </h2>
              <p className="text-base sm:text-lg text-white/50 max-w-lg">
                Оставьте заявку — перезвоним за 15 минут. Подготовим персональный оффер и стратегию.
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-center gap-3 shrink-0 w-full sm:w-auto">
              <ButtonPill href="/contact" variant="lime" className="py-4 px-10 w-full sm:w-auto">
                Получить бесплатный аудит
              </ButtonPill>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sm text-white/40 font-medium hover:text-white/70 transition-colors"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </section>

        </article>
      </main>
      <Footer variant="compact" />
    </div>
  );
}