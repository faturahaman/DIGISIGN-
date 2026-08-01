"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
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
      className="relative overflow-hidden py-24 sm:py-28 lg:py-36"
    >
      {/* Background — grid texture + one concentrated two-tone glow */}
      <GridPattern className="stroke-slate-900/[0.03]" width={44} height={44} />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.2),rgba(139,92,246,0.1)_50%,transparent_72%)] blur-[90px]"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">
        <BlurFade delay={0}>
          <p className="mb-6 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-slate-500">
            <span className="h-px w-8 bg-slate-300" />
            {t.cta.badge}
            <span className="h-px w-8 bg-slate-300" />
          </p>
        </BlurFade>

        <BlurFade delay={0.1}>
          <h2 className="text-4xl font-extrabold leading-[1.0] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
            {t.cta.title1}{" "}
            <span className="hyprgradient bg-clip-text text-transparent">{t.cta.titleHighlight}</span>{" "}
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
              className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-amber-500 px-7 py-3.5 text-base font-bold text-white shadow-[0_12px_30px_-8px_rgba(245,158,11,0.6)] transition-all hover:bg-amber-600 hover:shadow-[0_16px_40px_-8px_rgba(245,158,11,0.75)] sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
            >
              {/* Shine effect */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <MessageCircle className="h-5 w-5" />
              {t.cta.primaryBtn}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </motion.a>

            <motion.a
              href="mailto:digitalidsign@gmail.com"
              whileHover={{ scale: 1.02 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-slate-200 bg-white px-7 py-3.5 text-base font-bold text-slate-700 shadow-sm transition-all hover:border-amber-300 hover:bg-amber-50/50 hover:text-amber-600 sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
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
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              {t.cta.trust.consultation}
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
              {t.cta.trust.quality}
            </span>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
