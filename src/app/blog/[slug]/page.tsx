import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ButtonPill } from "@/components/ui/ButtonPill";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { getKeywordsForClusters } from "@/data/keywords";
import { BLOG_POSTS, SITE_URL } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Запись не найдена" };
  const description = post.metaDescription ?? post.excerpt;
  const title = `${post.title} | Блог Tusam Group`;
  const url = `${SITE_URL}/blog/${slug}`;
  return {
    title,
    description,
    keywords: getKeywordsForClusters([11, 12]),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.date,
      siteName: "Tusam Group",
      images: post.imageUrl
        ? [{ url: post.imageUrl, width: 1200, height: 630, alt: post.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.imageUrl ? [post.imageUrl] : undefined,
    },
  };
}

function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const paragraphs = post.content
    ? post.content.trim().split(/\n\n+/).filter(Boolean)
    : [];

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription ?? post.excerpt,
    image: post.imageUrl,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "Tusam Group",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Tusam Group",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${slug}`,
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Блог",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Header />
      <main className="flex-1 min-h-0">
        <article className="max-w-[1520px] mx-auto px-4 md:px-9 w-full pb-16 sm:pb-24 md:pb-32">
          {/* Breadcrumb */}
          <div className="pt-8 md:pt-12 pb-6">
            <TransitionLink
              href="/blog"
              label="Все статьи"
              subtitle="Блог"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#999] hover:text-black transition-colors"
            >
              <span className="transition-transform group-hover:-translate-x-1">←</span>
              Все статьи
            </TransitionLink>
          </div>

          {/* Hero Image */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] max-h-[480px] rounded-[16px] sm:rounded-[28px] overflow-hidden bg-[#111] mb-8 sm:mb-10 md:mb-14">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1520px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-10">
              <time
                className="text-[10px] font-mono font-bold text-white/60 uppercase tracking-widest block mb-2 sm:mb-3"
                dateTime={post.date}
              >
                {post.date}
              </time>
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-[-0.05em] text-white leading-[1.1] max-w-4xl">
                {post.title}
              </h1>
            </div>
          </div>

          {/* Lead */}
          <p className="text-base sm:text-xl md:text-2xl font-medium tracking-tight text-[#555] max-w-3xl leading-relaxed mb-8 sm:mb-12 md:mb-16">
            {post.excerpt}
          </p>

          {/* Content + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Article text */}
            <div className="lg:col-span-8">
              {paragraphs.length > 0 ? (
                <div className="space-y-0">
                  {paragraphs.map((paragraph, i) => {
                    const isFirst = i === 0;
                    const isHighlight = i > 0 && i % 3 === 0;

                    if (isHighlight) {
                      return (
                        <div
                          key={i}
                          className="my-10 md:my-14 pl-6 md:pl-8 border-l-[3px] border-[#b2ff00]"
                        >
                          <p className="text-lg md:text-xl font-semibold text-[#111] leading-[1.6] tracking-[-0.01em]">
                            {paragraph}
                          </p>
                        </div>
                      );
                    }

                    return (
                      <p
                        key={i}
                        className={`text-[17px] md:text-[19px] text-[#333] leading-[1.8] tracking-[-0.01em] mb-6 md:mb-8 ${
                          isFirst ? "first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none first-letter:text-black" : ""
                        }`}
                      >
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              ) : (
                <p className="text-lg text-[#999]">Текст статьи скоро появится.</p>
              )}
            </div>

            {/* Sticky sidebar: other posts */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24">
                <p className="text-xs font-bold uppercase tracking-widest text-[#999] mb-5">
                  Читайте также
                </p>
                <div className="flex flex-col gap-4">
                  {otherPosts.map((p) => (
                    <TransitionLink
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      label={p.title}
                      subtitle="Блог"
                      className="group flex gap-4 items-start"
                    >
                      <div className="relative w-20 h-20 rounded-[12px] overflow-hidden bg-[#eee] shrink-0">
                        <Image
                          src={p.imageUrl}
                          alt={p.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-black leading-snug line-clamp-2 group-hover:text-[#555] transition-colors">
                          {p.title}
                        </p>
                        <time className="text-[10px] text-[#aaa] font-medium mt-1 block">
                          {p.date}
                        </time>
                      </div>
                    </TransitionLink>
                  ))}
                </div>
                <div className="mt-6">
                  <ButtonPill href="/blog" variant="black" className="w-full justify-center">
                    Все статьи
                  </ButtonPill>
                </div>
              </div>
            </aside>
          </div>

          {/* CTA */}
          <div className="mt-12 sm:mt-20 md:mt-28 rounded-[20px] sm:rounded-[32px] bg-[#0a0a0a] p-6 sm:p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-8 md:gap-16">
            <div className="flex-1">
              <p className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight text-white leading-tight mb-2">
                Хотите столько же заявок?
              </p>
              <p className="text-base text-white/50">
                Бесплатный аудит за 24 часа. Перезвоним через 15 минут.
              </p>
            </div>
            <ButtonPill href="/contact" variant="lime" className="shrink-0 py-4 px-10">
              Получить аудит бесплатно
            </ButtonPill>
          </div>
        </article>
      </main>
      <Footer variant="compact" />
    </div>
  );
}
