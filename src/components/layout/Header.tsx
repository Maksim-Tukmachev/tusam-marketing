"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { NAV_LINKS, CONTACT_EMAIL, LOGO_HEADER } from "@/lib/constants";

function BurgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect y="7" width="24" height="2" fill="currentColor" />
      <rect y="15" width="24" height="2" fill="currentColor" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur-[10px] bg-[#f5f5f5]/90 border-b border-transparent min-h-[72px] flex items-center">
        <div className="mx-auto w-full px-4 md:px-9">
          <nav className="flex items-center justify-between py-4">
            <TransitionLink href="/" label="Главная" className="shrink-0 z-[60]">
              <Image
                src={LOGO_HEADER}
                alt="Tusam — лидогенерация"
                width={140}
                height={32}
                className="h-6 md:h-8 w-auto"
                priority
              />
            </TransitionLink>

            <div className="flex items-center gap-3">
              <TransitionLink
                href="/contact"
                label="Оставить заявку"
                className="hidden sm:inline-flex items-center justify-center gap-2 rounded-[50px] px-6 py-2.5 text-xs font-semibold tracking-[-0.02em] leading-[100%] bg-[#b2ff00] text-black hover:bg-[#9de600] transition-colors"
              >
                Оставить заявку
                <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" aria-hidden />
              </TransitionLink>

              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="relative z-[60] w-10 h-10 flex items-center justify-center text-[#090909] hover:opacity-70 transition-opacity rounded-lg"
                aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
                aria-expanded={menuOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {menuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <CloseIcon />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="burger"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <BurgerIcon />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence onExitComplete={() => { document.body.style.overflow = ""; }}>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 bg-[#f8f8f8] flex flex-col justify-between pt-28 pb-8 px-6 md:px-12 overflow-hidden"
          >
            <nav className="flex flex-col items-center justify-center flex-1 gap-2">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.05 * index,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <TransitionLink
                    href={link.href}
                    label={link.label}
                    onClick={() => setMenuOpen(false)}
                    className="text-[#090909] text-4xl sm:text-5xl md:text-[80px] font-medium tracking-[-0.04em] leading-[1.1] hover:text-gray-500 transition-colors block"
                  >
                    {link.label}
                  </TransitionLink>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.05 * NAV_LINKS.length,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="mt-6"
              >
                <TransitionLink
                  href="/contact"
                  label="Оставить заявку"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-3 rounded-[50px] px-10 py-5 text-base font-semibold tracking-[-0.02em] bg-[#b2ff00] text-black hover:bg-[#9de600] transition-colors"
                >
                  Оставить заявку
                  <span className="w-2 h-2 rounded-full bg-black shrink-0" aria-hidden />
                </TransitionLink>
              </motion.div>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.25 }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0 w-full mx-auto"
            >
              <div className="flex flex-col items-start gap-1">
                <span className="text-[#747474] text-sm font-medium">Напишите нам</span>
                <div className="flex items-center gap-2 border-b border-[#090909] pb-1">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="bg-[#bcff00] rounded-full p-[2px]" aria-hidden>
                    <path d="M4 10L10 4M10 4H5.5M10 4V8.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-[#090909] text-xl md:text-2xl font-semibold tracking-[-0.03em] hover:opacity-70"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://t.me/tusam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#0a0a0a] flex items-center justify-center text-white hover:bg-[#b2ff00] hover:text-black transition-colors"
                  aria-label="Telegram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 1 0 24 12.056A12.014 12.014 0 0 0 11.944 0ZM16.906 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472c-.18 1.898-.962 6.502-1.36 8.627c-.168.9-.499 1.201-.82 1.23c-.696.065-1.225-.46-1.9-.902c-1.056-.693-1.653-1.124-2.678-1.8c-1.185-.78-.417-1.21.258-1.91c.177-.184 3.247-2.977 3.307-3.23c.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345c-.48.33-.913.49-1.302.48c-.428-.008-1.252-.241-1.865-.44c-.752-.245-1.349-.374-1.297-.789c.027-.216.325-.437.893-.663c3.498-1.524 5.83-2.529 6.998-3.014c3.332-1.386 4.025-1.627 4.476-1.635Z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/79001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#0a0a0a] flex items-center justify-center text-white hover:bg-[#b2ff00] hover:text-black transition-colors"
                  aria-label="WhatsApp"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52c.149-.174.198-.298.298-.497c.099-.198.05-.371-.025-.52c-.075-.149-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51c-.173-.008-.371-.01-.57-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413c.248-.694.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214l-3.741.982l.998-3.648l-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884c2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
