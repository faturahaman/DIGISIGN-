"use client";

import { motion } from "framer-motion";
import { ADVANTAGES } from "@/lib/constants";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { BlurFade } from "@/components/effects/BlurFade";

export function WhyDigiSignSection() {
  return (
    <section className="relative bg-[#050816] py-16 sm:py-20 lg:py-28">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/5 blur-[100px] md:h-96 md:w-96 md:blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Why DiGiSign"
          title="Why Choose"
          titleHighlight="DiGiSign?"
          description="Kami bukan sekadar agency biasa. Kami adalah mitra strategis yang berkomitmen pada hasil nyata untuk bisnis Anda."
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {ADVANTAGES.map((advantage, i) => {
            const Icon = advantage.icon;
            return (
              <BlurFade key={advantage.id} delay={i * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.015, y: -3 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/5 p-5 backdrop-blur-md transition-all duration-300 hover:border-blue-500/25 hover:shadow-[0_8px_40px_rgba(37,99,235,0.1)] sm:p-6"
                  data-testid="advantage-card"
                >
                  {/* Glow on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-blue-500/5 to-violet-500/5" />

                  {/* Number */}
                  <span className="absolute right-5 top-4 text-5xl font-black text-white/4 select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-blue-500/30 group-hover:bg-blue-500/10 sm:h-12 sm:w-12">
                      <Icon className="h-5 w-5 text-blue-400 sm:h-6 sm:w-6" />
                    </div>
                    <h3 className="mb-2 font-semibold text-white">{advantage.title}</h3>
                    <p className="text-sm leading-relaxed text-[#94A3B8]">
                      {advantage.description}
                    </p>
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500 group-hover:w-full" />
                </motion.div>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
