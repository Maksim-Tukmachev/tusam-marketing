import { ButtonPill } from "@/components/ui/ButtonPill";

export function ServicesPageCta() {
  return (
    <section className="px-4 md:px-9 py-12 sm:py-20 md:py-28 bg-white">
      <div className="max-w-[1520px] mx-auto">
        <div className="rounded-[24px] sm:rounded-[32px] bg-[#0a0a0a] p-6 sm:p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-8 md:gap-16">
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-[-0.04em] text-white mb-2 sm:mb-3 leading-tight">
              Не уверены, какой пакет вам нужен?
            </h2>
            <p className="text-base sm:text-lg text-white/50 max-w-lg">
              Оставьте заявку — за 24 часа посчитаем, сколько заявок получите и какой пакет принесёт максимум прибыли.
            </p>
          </div>
          <ButtonPill href="/contact" variant="lime" className="shrink-0 py-4 px-10">
            Получить бесплатный аудит
          </ButtonPill>
        </div>
      </div>
    </section>
  );
}
