import Link from "next/link";
import Image from "next/image";
import { ButtonPill } from "@/components/ui/ButtonPill";
import { SidebarContactForm } from "@/components/forms/SidebarContactForm";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { PROJECTS, CONTACT_EMAIL } from "@/lib/constants";
import type { ProjectItem } from "@/lib/types";

type Props = {
  project: ProjectItem;
  paragraphs: string[];
};

export function ProjectCaseContent({ project, paragraphs }: Props) {
  const otherProjects = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 2);
  const stats = project.stats ?? [];

  return (
    <article className="max-w-[1520px] mx-auto px-4 md:px-9 pb-16 sm:pb-24 md:pb-32">
      {/* ── Breadcrumb ── */}
      <div className="pt-6 sm:pt-8 md:pt-12 pb-4 sm:pb-6">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-[#999] hover:text-black transition-colors"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          Все кейсы
        </Link>
      </div>

      {/* ── Badges ── */}
      <div className="flex flex-wrap items-center gap-2 mb-6 sm:mb-8">
        <span className="px-3 sm:px-4 py-1.5 rounded-full bg-black text-white text-[10px] font-bold uppercase tracking-widest">
          {project.sector}
        </span>
        {project.categories.slice(0, 2).map((cat) => (
          <span
            key={cat}
            className="px-3 py-1.5 rounded-full border border-black/10 text-[10px] font-bold uppercase tracking-widest text-[#666]"
          >
            {cat}
          </span>
        ))}
      </div>

      {/* ── Hero Image ── */}
      <section className="mb-10 sm:mb-16 md:mb-24">
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[21/9] rounded-[20px] sm:rounded-[28px] overflow-hidden bg-[#111]">
          <Image
            src={project.imageUrl}
            alt={project.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1520px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-10 lg:p-14 z-10">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.05em] text-white leading-[0.95] max-w-4xl mb-2 sm:mb-4">
              {project.name}
            </h1>
            <p className="text-sm sm:text-base md:text-xl font-medium text-white/60 tracking-tight max-w-2xl leading-snug">
              {project.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      {stats.length > 0 && (
        <section className="mb-10 sm:mb-16 md:mb-24">
          <div className="rounded-[20px] sm:rounded-[28px] bg-[#0a0a0a] p-5 sm:p-8 md:p-12">
            <div
              className={`grid gap-6 sm:gap-y-8 ${
                stats.length === 1 ? "grid-cols-1" :
                stats.length === 2 ? "grid-cols-2" :
                stats.length === 3 ? "grid-cols-1 sm:grid-cols-3" :
                "grid-cols-2 md:grid-cols-4"
              }`}
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className={`flex flex-col gap-1 sm:gap-2 px-0 sm:px-5 md:px-8 ${
                    i > 0 ? "sm:border-l border-white/25" : ""
                  }`}
                >
                  <span className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter text-white leading-none">
                    {stat.value}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-white/40">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Content + Sidebar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-20">
        <div className="lg:col-span-8">
          {paragraphs.length > 0 ? (
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-black">
                Задача и решение
              </h2>
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-base sm:text-lg md:text-xl font-medium text-[#333] tracking-[-0.01em] leading-[1.7]"
                >
                  {p}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-lg text-[#999]">Описание кейса скоро появится.</p>
          )}

          {/* ── Gallery ── */}
          {project.galleryImages && project.galleryImages.length > 0 && (
            <div className="mt-12 sm:mt-16 md:mt-20">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-black mb-4 sm:mb-6">
                Скриншоты и материалы
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                {project.galleryImages.map((url, i) => (
                  <div
                    key={i}
                    className="relative aspect-video rounded-[16px] sm:rounded-[20px] overflow-hidden bg-[#eee] group"
                  >
                    <Image
                      src={url}
                      alt={`${project.name} — ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Sidebar ── */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-5">
            <SidebarContactForm />

            <div className="rounded-[20px] border border-black/10 p-5 bg-[#fafafa]">
              <p className="text-xs font-bold uppercase tracking-widest text-[#999] mb-3">
                Или напишите
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-black font-semibold hover:underline break-all text-sm"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </aside>
      </div>

      {/* ── Other Cases ── */}
      {otherProjects.length > 0 && (
        <section className="mt-16 sm:mt-24 md:mt-32">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-black">
              Другие кейсы
            </h2>
            <ButtonPill href="/projects" variant="black">
              Все кейсы
            </ButtonPill>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {otherProjects.map((p) => (
              <TransitionLink
                key={p.slug}
                href={`/projects/${p.slug}`}
                label={p.name}
                subtitle={p.sector}
                className="group relative block rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#111] aspect-[4/3] sm:aspect-[16/10]"
              >
                <Image
                  src={p.imageUrl}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 p-5 sm:p-6 md:p-8 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest text-white/90 border border-white/10">
                      {p.sector}
                    </span>
                    <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover:bg-white group-hover:text-black group-hover:border-white group-hover:rotate-45 transition-all duration-500">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
                      {p.name}
                    </h3>
                    {p.stats && p.stats.length > 0 && (
                      <div className="flex gap-4 sm:gap-5 opacity-0 translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                        {p.stats.slice(0, 2).map((s) => (
                          <div key={s.label} className="flex flex-col gap-0.5">
                            <span className="text-base sm:text-lg font-bold text-white">{s.value}</span>
                            <span className="text-[9px] uppercase tracking-wider text-white/50">{s.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </TransitionLink>
            ))}
          </div>
        </section>
      )}

      {/* ── Final CTA ── */}
      <section className="mt-16 sm:mt-24 md:mt-32 rounded-[24px] sm:rounded-[32px] bg-[#0a0a0a] p-6 sm:p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-8 md:gap-16">
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-[-0.04em] text-white mb-2 sm:mb-3 leading-tight">
            Готовы к таким же цифрам?
          </h2>
          <p className="text-base sm:text-lg text-white/50 max-w-lg">
            Оставьте заявку — перезвоним за 5 минут. Бесплатный аудит за 24 часа.
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
  );
}
