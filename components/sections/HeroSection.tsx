"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ChevronDown, TrendingUp, Users, Star, Zap, CheckCircle } from "lucide-react";
import Image from "next/image";
import { GridPattern } from "@/components/effects/GridPattern";
import { Spotlight } from "@/components/effects/Spotlight";
import { staggerContainer, fadeInUp, slideInRight } from "@/lib/animations";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const { t } = useLanguage();

  const stats = [
    { title: t.hero.stats.projects, value: "150+", icon: TrendingUp, color: "text-orange-500" },
    { title: t.hero.stats.clients, value: "80+", icon: Users, color: "text-purple-500" },
    { title: t.hero.stats.rating, value: "5.0 ★", icon: Star, color: "text-yellow-500" },
  ];

  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden bg-slate-50 pt-20"
      style={{ position: "relative" }}
    >
      {/* Background effects */}
      <GridPattern className="opacity-10" />
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="rgba(245,158,11,0.15)" />

      {/* Gradient orbs */}
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute -left-40 top-20 h-72 w-72 rounded-full bg-orange-500/10 blur-[100px] md:h-96 md:w-96 md:blur-[120px]"
      />
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute -right-40 top-40 h-72 w-72 rounded-full bg-purple-500/10 blur-[100px] md:h-96 md:w-96 md:blur-[120px]"
      />

      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="grid items-center gap-10 lg:grid-cols-5 lg:gap-16">

          {/* Left: Text content */}
          <motion.div
            className="text-center lg:col-span-3 lg:text-left"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="mb-5 flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-sm font-medium text-orange-600 shadow-sm">
                <Zap className="h-3.5 w-3.5" />
                {t.hero.badge}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeInUp}
              className="text-3xl font-bold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem]"
            >
              {t.hero.heading1}{" "}
              <span className="gradient-text">{t.hero.headingHighlight}</span>{" "}
              {t.hero.heading2}
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg lg:mx-0"
            >
              {t.hero.subheading}
            </motion.p>

            {/* Service pills */}
            <motion.div
              variants={fadeInUp}
              className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start"
            >
              {t.hero.services.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 shadow-sm"
                >
                  <CheckCircle className="h-3 w-3 text-orange-500" />
                  {s}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <button
                onClick={() => handleScroll("contact")}
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 px-7 py-3.5 font-bold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.03] sm:w-auto"
              >
                {t.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => handleScroll("portfolio")}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 font-bold text-slate-700 shadow-sm transition-all duration-300 hover:bg-slate-50 hover:border-slate-300 sm:w-auto"
              >
                {t.hero.ctaSecondary}
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-wrap justify-center gap-6 border-t border-slate-200 pt-8 lg:justify-start"
            >
              {stats.map((card) => (
                <div key={card.title} className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-100 bg-white shadow-sm">
                    <card.icon className={`h-6 w-6 ${card.color}`} />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-slate-900">{card.value}</div>
                    <div className="text-xs font-medium text-slate-500">{card.title}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Visual mockup */}
          <motion.div
            className="relative hidden md:block lg:col-span-2"
            variants={slideInRight}
            initial="hidden"
            animate="visible"
          >
            {/* Browser mockup */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden"
            >
              {/* Browser bar */}
              <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                </div>
                <div className="mx-auto flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 shadow-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  <span className="text-xs font-medium text-slate-500">arvion.design</span>
                </div>
              </div>

              {/* Page content mockup */}
              <div className="p-5 space-y-4">
                {/* Hero area with logo */}
                <div className="rounded-xl bg-gradient-to-br from-orange-50 to-purple-50 border border-slate-100 p-5 shadow-sm">
                  {/* Logo + brand */}
                  <div className="mb-4 flex items-center gap-2.5">
                    <Image
                      src="/arvion.png"
                      alt="Arvion"
                      width={42}
                      height={28}
                      className="h-7 w-auto object-contain"
                    />
                    <span className="text-sm font-bold text-slate-800">Arvion</span>
                  </div>
                  <div className="mb-2 h-3.5 w-3/4 rounded-full bg-slate-200" />
                  <div className="mb-4 h-2.5 w-1/2 rounded-full bg-slate-100" />
                  <div className="flex gap-2">
                    <div className="h-7 w-24 rounded-full bg-gradient-to-r from-orange-500/80 to-purple-500/80" />
                    <div className="h-7 w-20 rounded-full border border-slate-200 bg-white" />
                  </div>
                </div>

                {/* Cards row */}
                <div className="grid grid-cols-3 gap-2">
                  {["from-orange-50 to-yellow-50", "from-purple-50 to-pink-50", "from-blue-50 to-cyan-50"].map((g, i) => (
                    <div key={i} className={`rounded-xl border border-slate-100 bg-gradient-to-br ${g} p-3 shadow-sm`}>
                      <div className="mb-2 h-5 w-5 rounded-lg bg-white shadow-sm" />
                      <div className="h-2 w-full rounded-full bg-slate-200" />
                      <div className="mt-1 h-2 w-2/3 rounded-full bg-slate-100" />
                    </div>
                  ))}
                </div>

                {/* Stats row */}
                <div className="flex gap-3">
                  {["150+", "80+", "5.0★"].map((v, i) => (
                    <div key={i} className="flex-1 rounded-xl border border-slate-100 bg-slate-50 p-2 text-center shadow-sm">
                      <div className="text-sm font-bold text-slate-700">{v}</div>
                      <div className="mt-0.5 h-1.5 w-full rounded-full bg-slate-200" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating badge 1 */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -left-10 top-10 rounded-xl border border-slate-100 bg-white/95 px-3.5 py-2 backdrop-blur-sm shadow-xl"
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
                <span className="text-xs font-bold text-slate-700">{t.hero.floatingBadges.live}</span>
              </div>
            </motion.div>

            {/* Floating badge 2 */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              className="absolute -right-6 bottom-16 rounded-xl border border-slate-100 bg-white/95 px-3.5 py-2 backdrop-blur-sm shadow-xl"
            >
              <div className="flex items-center gap-2">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-bold text-slate-700">{t.hero.floatingBadges.rating}</span>
              </div>
            </motion.div>

            {/* Floating badge 3 */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute -right-4 top-6 rounded-xl border border-slate-100 bg-white/95 px-3.5 py-2 backdrop-blur-sm shadow-xl"
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="h-3.5 w-3.5 text-orange-500" />
                <span className="text-xs font-bold text-slate-700">{t.hero.floatingBadges.conversion}</span>
              </div>
            </motion.div>

            {/* Ambient glow */}
            <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-orange-500/10 to-purple-500/10 blur-2xl" />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => handleScroll("services")}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-400 transition-colors hover:text-orange-500"
        aria-label="Scroll to services"
      >
        <span className="text-xs font-bold tracking-widest uppercase">{t.hero.scroll}</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.button>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />
    </section>
  );
}
