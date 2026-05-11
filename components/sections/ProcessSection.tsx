"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PROCESS_STEPS } from "@/lib/constants";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { BlurFade } from "@/components/effects/BlurFade";

export function ProcessSection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const isLineInView = useInView(lineRef, { once: true, margin: "-100px" });

  return (
    <section className="relative bg-[#050816] py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Our Process"
          title="How We"
          titleHighlight="Work"
          description="Proses kerja kami yang terstruktur memastikan setiap proyek berjalan lancar dari awal hingga peluncuran."
        />

        {/* Mobile: left-line timeline. Desktop: center alternating */}
        <div className="relative" ref={lineRef}>

          {/* Mobile vertical line (left side) */}
          <div className="absolute left-[19px] top-0 h-full w-px bg-white/5 md:hidden">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isLineInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full origin-top bg-gradient-to-b from-blue-500 via-violet-500 to-transparent"
            />
          </div>

          {/* Desktop vertical line (center) */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/5 md:block">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isLineInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full origin-top bg-gradient-to-b from-blue-500 via-violet-500 to-transparent"
              style={{ boxShadow: "0 0 10px rgba(37, 99, 235, 0.5)" }}
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
                        className="h-4 w-4 rounded-full border-2 border-blue-500 bg-[#050816] shadow-[0_0_12px_rgba(37,99,235,0.6)]"
                      />
                    </div>
                    {/* Card */}
                    <div className="flex-1 rounded-2xl border border-white/8 bg-[#0B1120] p-4 transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(37,99,235,0.1)]">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-3xl font-bold text-white/10" data-testid="step-number">
                          {step.number}
                        </span>
                        <h3 className="text-base font-semibold text-white">{step.title}</h3>
                      </div>
                      <p className="text-sm leading-relaxed text-[#94A3B8]">{step.description}</p>
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
                        className={`w-full max-w-[340px] rounded-2xl border border-white/8 bg-[#0B1120] p-6 transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(37,99,235,0.1)] ${isEven ? "text-right" : "text-left"}`}
                      >
                        <div className={`mb-2 flex items-center gap-3 ${isEven ? "flex-row-reverse" : ""}`}>
                          <span className="text-4xl font-bold text-white/10" data-testid="step-number">
                            {step.number}
                          </span>
                          <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                        </div>
                        <p className="text-sm leading-relaxed text-[#94A3B8]">{step.description}</p>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="relative z-10 flex shrink-0 items-center justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={isLineInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ delay: i * 0.15 + 0.3, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="h-4 w-4 rounded-full border-2 border-blue-500 bg-[#050816] shadow-[0_0_15px_rgba(37,99,235,0.6)]"
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
