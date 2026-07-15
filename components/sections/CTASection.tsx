"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Meteors } from "@/components/effects/Meteors";
import { Spotlight } from "@/components/effects/Spotlight";
import { GridPattern } from "@/components/effects/GridPattern";
import { BlurFade } from "@/components/effects/BlurFade";
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function buildWhatsAppUrl(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function CTASection() {
  const { t } = useLanguage();
  const waUrl = buildWhatsAppUrl(WHATSAPP_NUMBER, WHATSAPP_MESSAGE);

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-slate-50 py-24 sm:py-28 lg:py-36"
    >
      {/* Background effects */}
      <GridPattern className="opacity-[0.03] stroke-slate-900" />
      <Spotlight className="-top-40 left-1/2 -translate-x-1/2" fill="rgba(249,115,22,0.15)" />
      
      {/* Keep the meteors, but ensure they contrast well against light background */}
      <div className="absolute inset-0 opacity-50">
        <Meteors number={20} />
      </div>

      {/* Gradient orbs */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[120px] md:h-[500px] md:w-[500px] md:blur-[150px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[120px] md:h-[500px] md:w-[500px] md:blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">
        <BlurFade delay={0}>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-sm font-bold text-orange-600 sm:mb-6 shadow-sm">
            <MessageCircle className="h-3.5 w-3.5" />
            {t.cta.badge}
          </span>
        </BlurFade>

        <BlurFade delay={0.1}>
          <h2 className="text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            {t.cta.title1}{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-purple-500">{t.cta.titleHighlight}</span>{" "}
            {t.cta.title2}
          </h2>
        </BlurFade>

        <BlurFade delay={0.2}>
          <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-relaxed text-slate-600 sm:mt-6 sm:text-lg">
            {t.cta.description}
          </p>
        </BlurFade>

        <BlurFade delay={0.3}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <motion.a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-orange-500 to-purple-500 px-7 py-3.5 text-base font-bold text-white shadow-md transition-shadow hover:shadow-lg sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
            >
              {/* Shine effect */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <MessageCircle className="h-5 w-5" />
              {t.cta.primaryBtn}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </motion.a>

            <motion.a
              href="mailto:digitalidsign@gmail.com"
              whileHover={{ scale: 1.02 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-base font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-orange-600 sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
            >
              {t.cta.secondaryBtn}
            </motion.a>
          </div>
        </BlurFade>

        {/* Trust indicators */}
        <BlurFade delay={0.4}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-slate-500 sm:gap-6">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              {t.cta.trust.response}
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              {t.cta.trust.consultation}
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
              {t.cta.trust.quality}
            </span>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
