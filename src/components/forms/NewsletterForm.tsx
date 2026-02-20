"use client";

import { useState } from "react";
import { ButtonPill } from "@/components/ui/ButtonPill";

export function NewsletterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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
      <ButtonPill type="submit" variant="black">
        Subscribe
      </ButtonPill>
    </form>
  );
}
