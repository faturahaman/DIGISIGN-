"use client";

import { motion } from "framer-motion";
import { ADVANTAGES } from "@/lib/constants";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { BlurFade } from "@/components/effects/BlurFade";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function WhyArvionSection() {
  const { t } = useLanguage();
  return (
    <section className="relative bg-white py-16 sm:py-20 lg:py-28">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/5 blur-[100px] md:h-96 md:w-96 md:blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t.why.badge}
          title={t.why.title}
          titleHighlight={t.why.titleHighlight}
          description={t.why.description}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES.map((advantage, i) => {
            const Icon = advantage.icon;
            return (
              <BlurFade key={advantage.id} delay={i * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.015, y: -3 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition-all duration-300 hover:border-orange-200 hover:shadow-md hover:bg-white"
                  data-testid="advantage-card"
                >
                  {/* Glow on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-orange-500/5 to-purple-500/5" />

                  {/* Number */}
                  <span className="absolute right-6 top-5 text-5xl font-black text-slate-100 select-none transition-colors duration-300 group-hover:text-orange-50">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 group-hover:border-orange-200 group-hover:bg-orange-50">
                      <Icon className="h-6 w-6 text-orange-500" />
                    </div>
                    <h3 className="mb-3 font-bold text-slate-900 text-lg">{advantage.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {advantage.description}
                    </p>
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-orange-500 to-purple-500 transition-all duration-500 group-hover:w-full" />
                </motion.div>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
