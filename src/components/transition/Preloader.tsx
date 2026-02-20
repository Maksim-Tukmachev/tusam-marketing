"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";

const loadingPhrases = [
  "ИНИЦИАЛИЗАЦИЯ...",
  "ПОДКЛЮЧАЕМ КАНАЛЫ...",
  "СЧИТАЕМ КОНВЕРСИЮ...",
  "ОПТИМИЗИРУЕМ ВОРОНКУ...",
  "ГОТОВО."
];

export function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    // Плавная анимация счетчика от 0 до 100
    const controls = animate(0, 100, {
      duration: 2.8,
      ease: [0.76, 0, 0.24, 1], // Идеальный ease (сначала быстро, в конце замедляется)
      onUpdate: (latest) => {
        setCount(Math.round(latest));
        
        // Меняем фразы в зависимости от процента
        if (latest < 20) setPhraseIndex(0);
        else if (latest < 45) setPhraseIndex(1);
        else if (latest < 75) setPhraseIndex(2);
        else if (latest < 95) setPhraseIndex(3);
        else setPhraseIndex(4);
      },
      onComplete: () => {
        // Небольшая пауза на 100%, чтобы пользователь успел прочитать "READY"
        setTimeout(() => setDone(true), 400);
      }
    });

    return () => controls.stop();
  }, []);

  if (hidden) return null;

  return (
    <AnimatePresence onExitComplete={() => setHidden(true)}>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col justify-between p-6 md:p-12 overflow-hidden"
          // Экран стильно уезжает вверх
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Верхняя панель (Техническая инфа) */}
          <div className="flex justify-between items-start text-white/40 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] overflow-hidden">
            <motion.span 
              initial={{ y: "100%" }} 
              animate={{ y: 0 }} 
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Performance Operations
            </motion.span>
            <motion.span 
              initial={{ y: "100%" }} 
              animate={{ y: 0 }} 
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Global / EST. 2024
            </motion.span>
          </div>

          {/* Центральный гигантский счетчик */}
          <div className="flex flex-col items-center justify-center relative flex-1">
            <div className="flex items-baseline overflow-hidden h-[25vw] md:h-[18vw]">
              <motion.span 
                className="text-[30vw] md:text-[22vw] font-bold text-white leading-none tracking-tighter"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {count}
              </motion.span>
              <motion.span 
                className="text-[6vw] md:text-[4vw] font-bold text-[#bcff00] leading-none mb-8 md:mb-16"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                %
              </motion.span>
            </div>
          </div>

          {/* Нижняя панель (Прогресс и статусы) */}
          <div className="w-full space-y-4">
            <div className="flex justify-between items-end overflow-hidden">
              <motion.span 
                key={phraseIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="text-[10px] md:text-xs font-mono font-bold text-[#bcff00] uppercase tracking-widest"
              >
                {loadingPhrases[phraseIndex]}
              </motion.span>
              <span className="text-[10px] md:text-xs font-mono text-white/30 uppercase tracking-widest hidden md:block">
                DO NOT CLOSE
              </span>
            </div>

            {/* Тончайшая прогресс-линия */}
            <div className="h-[1px] w-full bg-white/10 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-white"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}