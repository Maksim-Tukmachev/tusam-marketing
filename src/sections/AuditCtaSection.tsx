import { ButtonPill } from "@/components/ui/ButtonPill";
import { CONTACT_EMAIL } from "@/lib/constants";

type AuditCtaSectionProps = {
  className?: string;
};

export function AuditCtaSection({ className = "" }: AuditCtaSectionProps) {
  return (
    <section className="relative z-20 bg-white px-4 md:px-9 pb-12 sm:pb-24 md:pb-32">
      <div className={` max-w-[1520px] mx-auto relative z-20 rounded-[24px] sm:rounded-[32px] bg-[#0a0a0a] p-6 sm:p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-8 md:gap-16 ${className}`.trim()}>
      <div className="flex-1">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-[-0.04em] text-white mb-2 sm:mb-3 leading-tight">
          Готовы к таким же цифрам?
        </h2>
        <p className="text-base sm:text-lg text-white/50 max-w-lg">
          Оставьте заявку — перезвоним за 15 минут. Бесплатный аудит за 24 часа.
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
      </div>
    </section>
  );
}
