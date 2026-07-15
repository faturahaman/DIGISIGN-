"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PROCESS_STEPS } from "@/lib/constants";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { BlurFade } from "@/components/effects/BlurFade";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function ProcessSection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const isLineInView = useInView(lineRef, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section className="relative bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t.process.badge}
          title={t.process.title}
          titleHighlight={t.process.titleHighlight}
          description={t.process.description}
        />

        {/* Mobile: left-line timeline. Desktop: center alternating */}
        <div className="relative mt-8" ref={lineRef}>

          {/* Mobile vertical line (left side) */}
          <div className="absolute left-[19px] top-0 h-full w-px bg-slate-200 md:hidden">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isLineInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full origin-top bg-gradient-to-b from-orange-500 via-purple-500 to-transparent"
            />
          </div>

          {/* Desktop vertical line (center) */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-slate-200 md:block">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isLineInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full origin-top bg-gradient-to-b from-orange-500 via-purple-500 to-transparent"
              style={{ boxShadow: "0 0 10px rgba(245, 158, 11, 0.3)" }}
            />
          </div>

          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            {PROCESS_STEPS.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <BlurFade key={step.number} delay={i * 0.1}>

                  {/* Mobile layout: dot on left, card on right */}
                  <div className="flex items-start gap-5 md:hidden" data-testid="process-step">
                    {/* Dot */}
                    <div className="relative z-10 mt-5 flex h-10 w-10 shrink-0 items-center justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={isLineInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ delay: i * 0.15 + 0.3, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="h-4 w-4 rounded-full border-2 border-orange-500 bg-white shadow-[0_0_12px_rgba(245,158,11,0.4)]"
                      />
                    </div>
                    {/* Card */}
                    <div className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition-all duration-300 hover:border-orange-200 hover:bg-white hover:shadow-md">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-3xl font-black text-slate-200" data-testid="step-number">
                          {step.number}
                        </span>
                        <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-600">{step.description}</p>
                    </div>
                  </div>

                  {/* Desktop layout: alternating sides */}
                  <div
                    className={`relative hidden items-center md:flex ${isEven ? "flex-row" : "flex-row-reverse"}`}
                    data-testid="process-step"
                  >
                    {/* Content side */}
                    <div className={`flex flex-1 ${isEven ? "justify-end pr-12" : "justify-start pl-12"}`}>
                      <div
                        className={`w-full max-w-[340px] rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition-all duration-300 hover:border-orange-200 hover:bg-white hover:shadow-md ${isEven ? "text-right" : "text-left"}`}
                      >
                        <div className={`mb-3 flex items-center gap-3 ${isEven ? "flex-row-reverse" : ""}`}>
                          <span className="text-4xl font-black text-slate-200" data-testid="step-number">
                            {step.number}
                          </span>
                          <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-600">{step.description}</p>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="relative z-10 flex shrink-0 items-center justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={isLineInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ delay: i * 0.15 + 0.3, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="h-5 w-5 rounded-full border-4 border-white bg-orange-500 shadow-[0_0_15px_rgba(245,158,11,0.5)] ring-1 ring-slate-200"
                      />
                    </div>

                    {/* Empty side */}
                    <div className="flex-1" />
                  </div>

                </BlurFade>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
