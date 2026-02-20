"use client";

import { useState } from "react";
import Link from "next/link";

export function SidebarContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-[24px] bg-[#0a0a0a] p-6 md:p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-[#b2ff00] mx-auto mb-4 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 13L9 17L19 7" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="text-lg font-bold text-white mb-1">Заявка отправлена</p>
        <p className="text-sm text-white/50">Перезвоним в течение 5 минут</p>
      </div>
    );
  }

  const inputClass =
    "w-full bg-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 font-medium focus:outline-none focus:ring-1 focus:ring-[#b2ff00]/50 transition-shadow";

  return (
    <form onSubmit={handleSubmit} className="rounded-[24px] bg-[#0a0a0a] p-6 md:p-8">
      <p className="text-lg font-bold text-white tracking-tight mb-1">
        Обсудить задачу
      </p>
      <p className="text-xs text-white/40 mb-5">
        Перезвоним за 5 минут. Бесплатный аудит.
      </p>

      <div className="flex flex-col gap-3 mb-4">
        <input
          type="text"
          name="Name"
          placeholder="Ваше имя"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
        <input
          type="tel"
          name="Phone"
          placeholder="Телефон"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
        />
      </div>

      <label className="flex items-start gap-2.5 cursor-pointer mb-5">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-0.5 w-3.5 h-3.5 rounded border-white/20 bg-white/10 text-[#b2ff00] focus:ring-[#b2ff00]/30 shrink-0"
        />
        <span className="text-[11px] text-white/40 leading-relaxed">
          Согласен на{" "}
          <Link href="/privacy" className="underline hover:text-white/60">
            обработку данных
          </Link>
        </span>
      </label>

      <button
        type="submit"
        disabled={!consent}
        className="w-full bg-[#b2ff00] text-black rounded-xl py-3 text-sm font-bold tracking-tight hover:bg-[#a3e600] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Оставить заявку
      </button>
    </form>
  );
}
