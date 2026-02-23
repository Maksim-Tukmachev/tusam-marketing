import Image from "next/image";
import { ButtonPill } from "@/components/ui/ButtonPill";

const HERO_IMAGE = '/images/service.webp';

export function ServicesPageHero() {
  return (
    <section className="px-4 md:px-9 pt-10 md:pt-16 pb-16 md:pb-24 bg-white">
      <div className="max-w-[1520px] mx-auto">
        {/* Full-width hero card */}
        <div className="relative w-full min-h-[360px] sm:min-h-[420px] md:min-h-[560px] rounded-[20px] sm:rounded-[32px] overflow-hidden bg-[#111]">
          <Image
            src={HERO_IMAGE}
            alt="Рабочий процесс — лидогенерация"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1520px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

          <div className="absolute inset-0 p-5 sm:p-8 md:p-14 lg:p-20 flex flex-col justify-between z-10">
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-white/40">
              Услуги и цены
            </p>

            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.05em] text-white leading-[1] mb-3 sm:mb-5">
                Заявки<br />под ключ
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-lg leading-relaxed mb-5 sm:mb-8">
                Сайт → Трафик → CRM → Автоматизация. Один подрядчик. Фиксированная цена. Окупаемость за 2 недели.
              </p>
              <div className="flex flex-wrap gap-3">
                <ButtonPill href="/contact" variant="lime" className="py-4 px-10">
                  Получить бесплатный аудит
                </ButtonPill>
                <ButtonPill href="#packages" variant="black" className="py-4 px-10 bg-white/10 hover:bg-white/20 text-white border-0">
                  Смотреть пакеты
                </ButtonPill>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
