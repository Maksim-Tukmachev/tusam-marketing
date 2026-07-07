"use client";

import { useState, useEffect, useCallback } from "react";
import Script from "next/script";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "cookie-consent";
const METRIKA_ID = 106939368;

type ConsentStatus = "accepted" | "declined" | null;

function getStoredConsent(): ConsentStatus {
  if (typeof window === "undefined") return null;
  const val = localStorage.getItem(STORAGE_KEY);
  if (val === "accepted" || val === "declined") return val;
  return null;
}

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentStatus>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      setConsent(stored);
    } else {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setConsent("accepted");
    setVisible(false);
  }, []);

  const decline = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setConsent("declined");
    setVisible(false);
  }, []);

  return (
    <>
      {/* Yandex.Metrika — only when accepted */}
      {consent === "accepted" && (
        <>
          <Script
            id="yandex-metrika"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${METRIKA_ID}', 'ym');
                ym(${METRIKA_ID}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
              `,
            }}
          />
          <noscript>
            <div>
              <img
                src={`https://mc.yandex.ru/watch/${METRIKA_ID}`}
                style={{ position: "absolute", left: "-9999px" }}
                alt=""
              />
            </div>
          </noscript>
        </>
      )}

      {/* Banner */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[440px] z-[50]"
          >
            <div className="rounded-[20px] bg-[#0a0a0a] border border-white/[0.08] p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#bcff00]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#bcff00]">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm0-4V7h2v6h-2z" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-white tracking-tight mb-1">
                    Мы используем cookie
                  </p>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Мы используем cookie для аналитики и улучшения сайта.{" "}
                    <a
                      href="/docs/Cookie_Notification.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#bcff00] hover:text-white underline underline-offset-2 transition-colors"
                    >
                      Подробнее
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={accept}
                  className="flex-1 bg-[#bcff00] text-black text-xs font-bold py-2.5 rounded-full hover:bg-white transition-colors duration-200"
                >
                  Принять
                </button>
                <button
                  type="button"
                  onClick={decline}
                  className="flex-1 bg-white/[0.06] text-white/60 text-xs font-bold py-2.5 rounded-full border border-white/[0.08] hover:bg-white/10 hover:text-white transition-colors duration-200"
                >
                  Отклонить
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
