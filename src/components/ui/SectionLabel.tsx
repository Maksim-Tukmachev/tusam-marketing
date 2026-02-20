import Image from "next/image";
import { YELLOW_ICON } from "@/lib/constants";

interface SectionLabelProps {
  label: string;
  dark?: boolean;
  className?: string;
}

export function SectionLabel({ label, dark = false, className = "" }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`relative w-7 h-7 shrink-0 rounded-[50px] overflow-hidden ${
          dark ? "bg-[#0a0a0a]" : "bg-[#0a0a0a]"
        }`}
      >
        <Image
          src={YELLOW_ICON}
          alt=""
          fill
          className="object-cover"
          sizes="28px"
        />
      </div>
      <p
        className={`text-sm font-semibold tracking-[-0.04em] leading-[110%] ${
          dark ? "text-white" : "text-[#0a0a0a]"
        }`}
      >
        {label}
      </p>
    </div>
  );
}
