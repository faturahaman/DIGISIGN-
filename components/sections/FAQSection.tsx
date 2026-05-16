"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Sparkles, MousePointerClick } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useChat } from "@/lib/ChatContext";
import { BlurFade } from "@/components/effects/BlurFade";

const VISIBLE_COUNT = 5;   // rows shown (pill is always index 2)
const ACTIVE_INDEX  = 2;   // center slot
const INTERVAL_MS   = 2600;

// Visual weight per slot
const SLOT: Record<number, { opacity: number; scale: number }> = {
  0: { opacity: 0.12, scale: 0.93 },
  1: { opacity: 0.38, scale: 0.97 },
  2: { opacity: 1.00, scale: 1.00 },
  3: { opacity: 0.38, scale: 0.97 },
  4: { opacity: 0.12, scale: 0.93 },
};

// Smooth iOS-style deceleration
const EASE     = [0.25, 0.46, 0.45, 0.94] as const;
const DURATION = 0.55;

export function FAQSection() {
  const { t }        = useLanguage();
  const { sendMessage } = useChat();
  const questions    = t.faq.questions as readonly string[];
  const looped       = [...questions, ...questions, ...questions];

  const [offset,     setOffset]     = useState(0);
  const [isPaused,   setIsPaused]   = useState(false);
  const [flashActive, setFlashActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setOffset((prev) => {
      const next = prev + 1;
      return next >= questions.length * 2 ? next - questions.length : next;
    });
  }, [questions.length]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, INTERVAL_MS);
  }, [advance]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const pause  = () => { setIsPaused(true);  if (timerRef.current) clearInterval(timerRef.current); };
  const resume = () => { setIsPaused(false); startTimer(); };

  const handleClick = (question: string) => {
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 500);
    sendMessage(question);
  };

  // Build the 5 visible questions
  const items = Array.from({ length: VISIBLE_COUNT }, (_, i) => ({
    question: looped[(offset + i) % looped.length],
    key:      (offset + i) % looped.length,
    slot:     i,
    isActive: i === ACTIVE_INDEX,
  }));

  const activeQuestion = items[ACTIVE_INDEX].question;

  return (
    <section id="faq" className="relative bg-[#050816] py-14 sm:py-18 lg:py-24 overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/6 blur-[100px]" />

      <div className="relative mx-auto max-w-2xl px-5 sm:px-6 lg:px-8">

        {/* Header */}
        <BlurFade delay={0}>
          <div className="mb-8 text-center sm:mb-10">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-violet-400">
              <Sparkles className="h-3 w-3" />
              {t.faq.badge}
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              {t.faq.title}{" "}
              <span className="gradient-text">{t.faq.titleHighlight}</span>
            </h2>
            <p className="mx-auto mt-2.5 max-w-md text-sm leading-relaxed text-[#64748B]">
              {t.faq.description}
            </p>
          </div>
        </BlurFade>

        {/* Carousel */}
        <BlurFade delay={0.15}>
          <div
            className="relative mx-auto select-none"
            style={{ maxWidth: 480 }}
            onMouseEnter={pause}
            onMouseLeave={resume}
            onTouchStart={pause}
            onTouchEnd={resume}
          >
            {/* ── Inactive rows above ── */}
            <div className="flex flex-col items-center gap-0">
              {items.filter(it => it.slot < ACTIVE_INDEX).map(({ question, key, slot }) => (
                <div
                  key={slot}
                  className="w-full overflow-hidden"
                  style={{ height: 44 }}
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.button
                      key={key}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: SLOT[slot].opacity }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: DURATION, ease: EASE }}
                      onClick={() => handleClick(question)}
                      className="w-full text-center text-[13px] text-[#94A3B8] hover:text-white/80 transition-colors duration-300 truncate px-3 py-2 rounded-full hover:bg-white/3"
                      style={{ transform: `scale(${SLOT[slot].scale})` }}
                    >
                      {question}
                    </motion.button>
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* ── Active pill — static shell, text slides inside ── */}
            <motion.button
              onClick={() => handleClick(activeQuestion)}
              whileTap={{ scale: 0.975 }}
              className={[
                "group relative w-full flex items-center gap-3",
                "rounded-full border px-4 py-3 my-1",
                "bg-[#0D1526] border-violet-500/35",
                "shadow-[0_0_24px_rgba(139,92,246,0.12)]",
                "hover:border-violet-400/60 hover:shadow-[0_0_36px_rgba(139,92,246,0.22)]",
                "transition-colors transition-shadow duration-300 overflow-hidden",
                flashActive ? "border-violet-400 shadow-[0_0_40px_rgba(139,92,246,0.35)]" : "",
              ].join(" ")}
            >
              {/* Left icon — static */}
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500/12 border border-violet-500/25 group-hover:bg-violet-500/22 transition-colors duration-300 z-10">
                <Sparkles className="h-3 w-3 text-violet-400" />
              </span>

              {/* Text slot — only this part animates */}
              <span className="relative flex-1 overflow-hidden" style={{ height: "1.25rem" }}>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={items[ACTIVE_INDEX].key}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%",   opacity: 1 }}
                    exit={{    y: "-100%", opacity: 0 }}
                    transition={{ duration: DURATION, ease: EASE }}
                    className="absolute inset-0 flex items-center text-left text-[13px] font-medium text-violet-200 group-hover:text-white transition-colors duration-300 truncate leading-snug"
                  >
                    {activeQuestion}
                  </motion.span>
                </AnimatePresence>
              </span>

              {/* Right send badge — static */}
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-blue-600 shadow-[0_0_10px_rgba(139,92,246,0.45)] group-hover:shadow-[0_0_18px_rgba(139,92,246,0.65)] transition-shadow duration-300 z-10">
                <MessageCircle className="h-3 w-3 text-white" />
              </span>

              {/* Shine sweep */}
              <span className="pointer-events-none absolute inset-0 rounded-full overflow-hidden">
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/4 to-transparent group-hover:translate-x-full transition-transform duration-700" />
              </span>
            </motion.button>

            {/* ── Inactive rows below ── */}
            <div className="flex flex-col items-center gap-0">
              {items.filter(it => it.slot > ACTIVE_INDEX).map(({ question, key, slot }) => (
                <div
                  key={slot}
                  className="w-full overflow-hidden"
                  style={{ height: 44 }}
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.button
                      key={key}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: SLOT[slot].opacity }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: DURATION, ease: EASE }}
                      onClick={() => handleClick(question)}
                      className="w-full text-center text-[13px] text-[#94A3B8] hover:text-white/80 transition-colors duration-300 truncate px-3 py-2 rounded-full hover:bg-white/3"
                      style={{ transform: `scale(${SLOT[slot].scale})` }}
                    >
                      {question}
                    </motion.button>
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Pause dot */}
            {isPaused && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 h-1.5 w-1.5 rounded-full bg-violet-400/60"
              />
            )}
          </div>
        </BlurFade>

        {/* Bottom hint */}
        <BlurFade delay={0.28}>
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#475569]">
            <MousePointerClick className="h-3.5 w-3.5 shrink-0" />
            <span>
              {t.faq.askBtn} →{" "}
              <span className="text-violet-400/70">DigiMin AI</span>
            </span>
          </div>
        </BlurFade>

      </div>
    </section>
  );
}
