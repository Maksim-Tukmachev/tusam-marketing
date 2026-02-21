import { SERVICE_PACKAGES } from "@/lib/constants";
import { ButtonPill } from "@/components/ui/ButtonPill";

function formatRub(n: number) {
  return new Intl.NumberFormat("ru-RU").format(n) + " ₽";
}

export function ServicesPagePackages() {
  return (
    <section id="packages" className="px-4 md:px-9 py-16 sm:py-24 md:py-32 bg-white scroll-mt-16">
      <div className="max-w-[1520px] mx-auto">
        <p className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-black/30 mb-6">
          Тарифы
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-[-0.05em] text-black mb-4">
          Выберите свой масштаб роста
        </h2>
        <p className="text-base sm:text-lg text-[#666] max-w-xl mb-10 sm:mb-14 md:mb-20">
          Каждый пакет — полная система, а не набор отдельных услуг. Один подрядчик, один результат.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch pt-6">
          {SERVICE_PACKAGES.map((pkg) => {
            const isPopular = !!pkg.popular;
            const isDark = isPopular;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-[20px] sm:rounded-[28px] p-6 sm:p-8 md:p-10 flex flex-col transition-all duration-300 ${
                  isDark
                    ? "bg-[#0a0a0a] text-white shadow-2xl shadow-black/20"
                    : "bg-[#f5f5f5] text-black hover:shadow-xl hover:bg-[#efefef]"
                }`}
              >
                {isPopular && (
                  <span className="absolute -top-3.5 left-8 px-4 py-1.5 rounded-full bg-[#b2ff00] text-black text-[10px] font-bold uppercase tracking-widest">
                    Популярный
                  </span>
                )}

                <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                  {pkg.name}
                </h3>

                <p className={`text-sm leading-relaxed mb-8 ${isDark ? "text-white/60" : "text-[#777]"}`}>
                  {pkg.description}
                </p>

                <div className="mb-8">
                  {pkg.priceOld != null && (
                    <span className={`text-base font-semibold line-through mr-2 ${isDark ? "text-white/30" : "text-[#aaa]"}`}>
                      {formatRub(pkg.priceOld)}
                    </span>
                  )}
                  <span className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${isDark ? "text-white" : "text-black"}`}>
                    {formatRub(pkg.price)}
                  </span>
                </div>

                <ul className="space-y-3.5 mb-10 flex-1">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-medium">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold ${
                        isDark ? "bg-[#b2ff00] text-black" : "bg-black text-white"
                      }`}>
                        ✓
                      </span>
                      <span className={isDark ? "text-white/80" : "text-[#333]"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <ButtonPill
                  href="/contact"
                  variant={isDark ? "lime" : "black"}
                  className="w-full justify-center py-4"
                >
                  Оставить заявку
                </ButtonPill>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
