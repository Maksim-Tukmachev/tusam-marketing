import Image from "next/image";
import { PROJECTS } from "@/lib/constants";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonPill } from "@/components/ui/ButtonPill";
import { TransitionLink } from "@/components/transition/TransitionLink";
import type { ProjectItem } from "@/lib/types";

export function ProjectsSection() {
  return (
    <section className="relative z-20 px-[5px] py-20 bg-white">
      <div className="max-w-[1520px] mx-auto px-4 md:px-9">
        <div className="mb-16 md:mb-24">
          <SectionLabel label="Кейсы" />
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-bold tracking-[-0.05em] text-black mt-8">
            Результаты, которые окупают<span className="text-[#b2ff00]">.</span>
          </h2>
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-8 mt-8">
            <p className="text-xl md:text-2xl font-medium tracking-tight text-[#747474] max-w-xl">
              Средний ROI — 300%. Заявка — от 490 ₽ <span className="text-black">при рыночной цене 2 000 ₽</span>.
            </p>
            <ButtonPill href="/contact" variant="black">Получить такой результат</ButtonPill>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="mt-14 md:mt-20 text-center">
          <ButtonPill href="/projects" variant="black">
            Смотреть все кейсы
          </ButtonPill>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: ProjectItem }) {
  const fakeUrl = `${project.name.toLowerCase().replace(/\s+/g, "-")}.ru`;
  const tags = project.categories;
  const stats = project.stats?.slice(0, 2) ?? [];

  return (
    <TransitionLink href={`/projects/${project.slug}`} label={project.name} subtitle={project.sector} className="block group/card">
      <div className="rounded-[24px] overflow-hidden bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)] group-hover/card:shadow-[0_20px_60px_rgba(0,0,0,0.12)] group-hover/card:-translate-y-1 transition-all duration-500">
        <div className="p-2.5 flex flex-col gap-2.5">
          {/* macOS Header */}
          <div className="h-10 rounded-xl bg-[#f5f5f5] flex items-center px-4">
            <div className="flex gap-2 w-1/4">
              <div className="w-3 h-3 rounded-full bg-[#e0e0e0] group-hover/card:bg-[#ff5f57] transition-colors duration-300" />
              <div className="w-3 h-3 rounded-full bg-[#e0e0e0] group-hover/card:bg-[#febc2e] transition-colors duration-300 delay-75" />
              <div className="w-3 h-3 rounded-full bg-[#e0e0e0] group-hover/card:bg-[#28c840] transition-colors duration-300 delay-100" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-black/5 group-hover/card:bg-black/[0.08] rounded-md px-3 py-1 w-full max-w-[240px] flex items-center gap-1.5 transition-colors duration-300">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-black/30 shrink-0">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span className="text-[10px] font-mono text-black/40 truncate">{fakeUrl}</span>
              </div>
            </div>
            <div className="w-1/4 flex justify-end">
              <span className="text-[10px] font-mono text-black/20 hidden sm:inline">2026</span>
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#0a0a0a]">
            <Image
              src={project.imageUrl}
              alt={project.name}
              fill
              className="object-cover transition-all duration-700 ease-out group-hover/card:scale-110 group-hover/card:brightness-[0.35] group-hover/card:blur-[2px]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Logo (center, appears on hover) */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <div className="relative w-40 h-16 opacity-0 translate-y-4 scale-95 group-hover/card:opacity-100 group-hover/card:translate-y-0 group-hover/card:scale-100 transition-all duration-500 ease-out delay-100">
                <Image
                  src={project.logoUrl}
                  alt={project.name}
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
            </div>

            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

            {/* Bottom content — appears on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 z-20 pointer-events-none">
              <div className="flex justify-between items-end w-full">
                <div className="space-y-3">
                  {/* Title & sector */}
                  <div className="opacity-0 translate-y-4 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-500 ease-out">
                    <p className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{project.sector}</p>
                    <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">{project.name}</h3>
                  </div>

                  {/* Stats */}
                  {stats.length > 0 && (
                    <div className="flex gap-6 opacity-0 translate-y-4 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-500 ease-out delay-75">
                      {stats.map((s) => (
                        <div key={s.label} className="flex flex-col gap-0.5">
                          <span className="text-lg font-bold text-white">{s.value}</span>
                          <span className="text-[9px] uppercase tracking-wider text-white/40 font-medium">{s.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 opacity-0 translate-y-4 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-500 ease-out delay-150">
                    {tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-white/60 text-[10px] font-medium tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="opacity-0 translate-y-4 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-500 ease-out delay-100 w-14 h-14 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm group-hover/card:bg-[#b2ff00] group-hover/card:border-[#b2ff00] shrink-0 pointer-events-auto">
                  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" className="text-white group-hover/card:text-black transition-colors duration-300">
                    <path d="M4.5 13.5L13.5 4.5M13.5 4.5H6.75M13.5 4.5V11.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TransitionLink>
  );
}
