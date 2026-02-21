"use client";

import { useState } from "react";
import Link from "next/link";

export function ContactForm() {
  const [companyName, setCompanyName] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) return;
    // Stub: log or send to API
  }

  const inputClass =
    "w-full bg-transparent border-0 border-b border-[#dbd9d9] py-3 text-[#0a0a0a] placeholder:text-[#999] text-base font-medium tracking-[-0.04em] focus:outline-none focus:border-[#0a0a0a]";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-[18px] flex flex-col gap-6"
    >
      <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[#0a0a0a]/80">
        Оставьте номер — <span className="text-[#0a0a0a]/60">перезвоним за 15 минут.</span>
      </h2>
      <div className="flex flex-col gap-4">
        <label className="block">
          <input
            type="text"
            name="CompanyName"
            placeholder="Название компании"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="block">
          <input
            type="text"
            name="Name"
            placeholder="Имя*"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="block">
          <input
            type="tel"
            name="PhoneNumber"
            placeholder="Телефон*"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="block">
          <input
            type="email"
            name="E-mail"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="block">
          <input
            type="text"
            name="Message"
            placeholder="Сообщение"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={inputClass}
          />
        </label>

        <label className="flex items-start gap-3 cursor-pointer mt-2">
          <input
            type="checkbox"
            name="consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            className="mt-1 w-4 h-4 rounded border-[#dbd9d9] text-[#0a0a0a] focus:ring-[#0a0a0a] shrink-0"
          />
          <span className="text-sm text-[#0a0a0a]/70 leading-relaxed">
            Согласен на{" "}
            <Link href="/privacy" className="underline hover:text-[#0a0a0a]">
              обработку персональных данных
            </Link>{" "}
            в соответствии с политикой конфиденциальности.
          </span>
        </label>
      </div>
      <button
        type="submit"
        disabled={!consent}
        className="w-full bg-[#0a0a0a] text-white rounded-[50px] py-4 text-lg font-semibold tracking-[-0.04em] hover:bg-[#1a1a1a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Получить заявки сейчас
      </button>
    </form>
  );
}
