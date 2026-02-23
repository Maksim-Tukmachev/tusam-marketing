"use client";

import { useState } from "react";
import { ButtonPill } from "@/components/ui/ButtonPill";

export function NewsletterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) return;
    // Stub
  }

  const inputClass =
    "w-full bg-transparent border-0 border-b border-black py-2 text-[#0a0a0a] placeholder:text-[#999] text-sm font-medium tracking-[-0.04em] focus:outline-none focus:border-[#0a0a0a]";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          name="Name"
          placeholder="Your name *"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
        <input
          type="email"
          name="Email"
          placeholder="Email *"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </div>
      <label className="flex items-start gap-2.5 cursor-pointer">
        <input
          type="checkbox"
          name="consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-0.5 w-4 h-4 rounded border-black/20 text-[#0a0a0a] focus:ring-[#0a0a0a] shrink-0"
        />
        <span className="text-xs text-[#0a0a0a]/70 leading-relaxed">
          Согласен на обработку данных в соответствии с{" "}
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
      <ButtonPill type="submit" variant="black" disabled={!consent}>
        Subscribe
      </ButtonPill>
    </form>
  );
}
