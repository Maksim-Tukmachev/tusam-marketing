"use client";

import { useState } from "react";

type SubmitState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [companyName, setCompanyName] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) return;
    setSubmitState("loading");
    setErrorMessage("");
    const url = process.env.NEXT_PUBLIC_TUSAM_API_URL;
    const apiKey = process.env.NEXT_PUBLIC_TUSAM_API_KEY;
    if (!url || !apiKey) {
      setErrorMessage("Форма не настроена");
      setSubmitState("error");
      return;
    }
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/ld+json",
          "Content-Type": "application/ld+json",
          "X-API-KEY": apiKey,
        },
        body: JSON.stringify({
          companyName: companyName.trim() || "",
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || "",
          message: message.trim() || "",
          consent: true,
          source: "website",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrorMessage(data.error ?? "Не удалось отправить заявку");
        setSubmitState("error");
        return;
      }
      setSubmitState("success");
    } catch {
      setErrorMessage("Ошибка сети. Попробуйте ещё раз.");
      setSubmitState("error");
    }
  }

  const inputClass =
    "w-full bg-transparent border-0 border-b border-[#dbd9d9] py-3 text-[#0a0a0a] placeholder:text-[#999] text-base font-medium tracking-[-0.04em] focus:outline-none focus:border-[#0a0a0a]";

  if (submitState === "success") {
    return (
      <div className="bg-white rounded-[18px] p-6 text-center">
        <div className="w-14 h-14 rounded-full bg-[#b2ff00] mx-auto mb-4 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M5 13L9 17L19 7" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-xl font-bold text-[#0a0a0a] mb-1">Заявка отправлена</p>
        <p className="text-base text-[#0a0a0a]/60">Перезвоним в течение 15 минут</p>
      </div>
    );
  }

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
            Согласен на обработку персональных данных в соответствии с{" "}
            <a
              href="/docs/policy_tusamgroup.ru_2026-02-18.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#0a0a0a]"
            >
              политикой конфиденциальности
            </a>
            .
          </span>
        </label>
      </div>
      {submitState === "error" && errorMessage && (
        <p className="text-sm text-red-600 font-medium">{errorMessage}</p>
      )}
      <button
        type="submit"
        disabled={!consent || submitState === "loading"}
        className="w-full bg-[#0a0a0a] text-white rounded-[50px] py-4 text-lg font-semibold tracking-[-0.04em] hover:bg-[#1a1a1a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitState === "loading" ? "Отправка…" : "Получить заявки сейчас"}
      </button>
    </form>
  );
}
