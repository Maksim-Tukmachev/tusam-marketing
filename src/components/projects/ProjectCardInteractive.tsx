import Image from "next/image";
import { TransitionLink } from "@/components/transition/TransitionLink";
import type { ProjectItem } from "@/lib/types";

export function ProjectCardInteractive({ project }: { project: ProjectItem }) {
  const stats = project.stats?.slice(0, 3) ?? [];

  return (
    <TransitionLink
      href={`/projects/${project.slug}`}
      label={project.name}
      subtitle={project.sector}
      className="group relative block w-full aspect-[4/3] overflow-hidden rounded-[16px] sm:rounded-[24px] bg-[#111]"
    >
      {/* Image with zoom */}
      <Image
        src={project.imageUrl}
        alt={project.name}
        fill
        className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-110"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />

      {/* Overlay darkens on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-opacity duration-500 group-hover:from-black/90 group-hover:via-black/50 group-hover:to-black/20" />

      {/* Content layer */}
      <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-between z-10">
        {/* Top row: sector badge + arrow */}
        <div className="flex items-start justify-between">
          <span className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest text-white/90 border border-white/10">
            {project.sector}
          </span>

          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 transition-all duration-500 group-hover:bg-white group-hover:text-black group-hover:border-white group-hover:rotate-45">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Bottom content */}
        <div className="flex flex-col gap-4">
          {/* Always visible: title */}
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
              {project.name}
            </h3>
          </div>

          {/* Hover-only: excerpt */}
          <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-md opacity-0 translate-y-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 line-clamp-2">
            {project.excerpt ?? project.categories.join(" · ")}
          </p>

          {/* Hover-only: stats row */}
          {stats.length > 0 && (
            <div className="flex gap-6 opacity-0 translate-y-4 transition-all duration-500 ease-out delay-75 group-hover:opacity-100 group-hover:translate-y-0">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-0.5">
                  <span className="text-lg md:text-xl font-bold text-white">{s.value}</span>
                  <span className="text-[10px] uppercase tracking-wider text-white/50 font-medium">{s.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Hover-only: divider + CTA */}
          <div className="flex items-center gap-4 opacity-0 translate-y-4 transition-all duration-500 ease-out delay-150 group-hover:opacity-100 group-hover:translate-y-0">
            <div className="flex flex-wrap gap-1.5">
              {project.categories.slice(0, 2).map((cat) => (
                <span key={cat} className="text-[10px] font-semibold uppercase tracking-wider text-white/40 px-2.5 py-1 border border-white/10 rounded-full">
                  {cat}
                </span>
              ))}
            </div>
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-white whitespace-nowrap">
              Смотреть кейс →
            </span>
          </div>
        </div>
      </div>
    </TransitionLink>
  );
}
