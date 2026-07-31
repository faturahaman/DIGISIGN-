"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useChat } from "@/lib/ChatContext";
import { BlurFade } from "@/components/effects/BlurFade";

interface FaqItem {
  q: string;
  a: string;
}

export function FAQSection() {
  const { t } = useLanguage();
  const { sendMessage } = useChat();
  const items = t.faq.items as readonly FaqItem[];

  // First item open by default so an answer is always visible on load.
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  const askDigiMin = (question: string) => {
    sendMessage(question);
  };

  return (
    <section id="faq" className="relative bg-slate-50 py-14 sm:py-18 lg:py-24 overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <BlurFade delay={0}>
          <div className="mb-8 text-center sm:mb-10">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-orange-600 shadow-sm">
              <Sparkles className="h-3 w-3" />
              {t.faq.badge}
            </span>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              {t.faq.title}{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-purple-500">
                {t.faq.titleHighlight}
              </span>
            </h2>
            <p className="mx-auto mt-2.5 max-w-md text-sm font-medium leading-relaxed text-slate-600">
              {t.faq.description}
            </p>
          </div>
        </BlurFade>

        {/* ── Accordion ──
            Rendered as a real list with all answers present in the DOM (not
            unmounted when collapsed) so search engines index every Q&A and the
            FAQPage schema matches the visible content. */}
        <BlurFade delay={0.15}>
          <ul className="space-y-3">
            {items.map((item, i) => {
              const isOpen = openIndex === i;
              const answerId = `faq-answer-${i}`;
              return (
                <li
                  key={item.q}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors hover:border-orange-200"
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => toggle(i)}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      className="flex w-full items-center gap-3 px-5 py-4 text-left"
                    >
                      <span className="flex-1 text-sm font-bold text-slate-900 sm:text-base">
                        {item.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </motion.span>
                    </button>
                  </h3>

                  {/* Answer stays mounted; height animates for UX, but the text
                      is always in the HTML for crawlers. */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={answerId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-4">
                          <p className="text-sm leading-relaxed text-slate-600">
                            {item.a}
                          </p>
                          <button
                            type="button"
                            onClick={() => askDigiMin(item.q)}
                            className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1.5 text-xs font-bold text-orange-600 transition-colors hover:bg-orange-100"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            {t.faq.askBtn}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </BlurFade>
      </div>
    </section>
  );
}
