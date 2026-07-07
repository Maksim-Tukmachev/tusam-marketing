import { SERVICES } from "@/lib/constants";
import { TransitionLink } from "@/components/transition/TransitionLink";

export function ServicesPageList() {
  return (
    <section className="px-4 md:px-9 bg-white">
      <div className="max-w-[1520px] mx-auto">
        {SERVICES.map((service, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <TransitionLink
              key={service.id}
              href={`/services/${service.slug}`}
              label={service.title}
              className={`block group relative border-t border-black/8 last:border-b py-10 md:py-16 ${
                isEven ? "" : ""
              }`}
            >
              {/* Hover background slide */}
              <div className="absolute inset-0 bg-[#0a0a0a] rounded-[20px] scale-[0.98] opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 -z-0" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4 sm:gap-6 md:gap-0 px-2 md:px-6">
                {/* Left: number */}
                <div className="md:w-24 shrink-0">
                  <span className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-black/6 group-hover:text-[#b2ff00] transition-colors duration-500 leading-none select-none">
                    {service.number}
                  </span>
                </div>

                {/* Center: title + description */}
                <div className="flex-1 md:px-14">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-black group-hover:text-white transition-colors duration-500 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#777] group-hover:text-white/50 leading-relaxed transition-colors duration-500 max-w-xl mb-4">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full border border-black/8 text-[10px] font-bold uppercase tracking-wider text-[#aaa] group-hover:border-white/15 group-hover:text-white/50 transition-colors duration-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: price + arrow */}
                <div className="flex items-center gap-5 shrink-0 md:pl-8">
                  {service.priceFrom && (
                    <div className="flex flex-col items-end">
                      <span className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-black group-hover:text-white transition-colors duration-500 whitespace-nowrap">
                        {service.priceFrom}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-[#bbb] group-hover:text-white/30 transition-colors duration-500">
                        за проект
                      </span>
                    </div>
                  )}
                  <div className="w-12 h-12 rounded-full bg-[#f3f3f3] group-hover:bg-[#b2ff00] flex items-center justify-center shrink-0 transition-all duration-500">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-black/30 group-hover:text-black group-hover:rotate-45 transition-all duration-500"
                    >
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </TransitionLink>
          );
        })}
      </div>
    </section>
  );
}
