"use client";

import { ArrowRight, ChevronDown, TrendingUp, Users, Star, CheckCircle } from "lucide-react";
import { HeroTiles } from "@/components/effects/HeroTiles";
import { useLanguage } from "@/lib/i18n/LanguageContext";

/**
 * Hero. Kept a Client Component so the language toggle still updates it, but the
 * headline (the LCP element) and all copy render VISIBLE in the HTML — no
 * `opacity:0`-until-hydration. Entry animation is pure CSS (tw-animate-css
 * `animate-in`), which runs on load without waiting for JS, so the browser
 * paints the LCP immediately instead of after framer-motion hydrates.
 * Scroll-driven fade was removed from the critical path for the same reason.
 */
export function HeroSection() {
  const { t } = useLanguage();

  const stats = [
    { title: t.hero.stats.projects, value: "150+", icon: TrendingUp },
    { title: t.hero.stats.clients, value: "80+", icon: Users },
    { title: t.hero.stats.rating, value: "5.0 ★", icon: Star },
  ];

  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-24"
    >
      {/* Signature hover-reveal tiling background (desktop only for perf). */}
      <div className="absolute inset-0 hidden md:block">
        <HeroTiles />
      </div>
      <div aria-hidden className="fancy-top-gradient md:hidden" />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-5 py-16 text-center sm:px-6">
        {/* Mono eyebrow */}
        <div className="mb-6 flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-backwards">
          <span className="flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em] text-slate-600 shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]" />
            {t.hero.badge}
          </span>
        </div>

        {/* Heading — the LCP element. Rendered visible in HTML; CSS-animated. */}
        <h1 className="text-4xl font-bold leading-[1] tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-backwards [animation-delay:100ms] sm:text-6xl md:text-7xl lg:text-[5rem]">
          <span className="text-fade-gradient">{t.hero.heading1}</span>{" "}
          <span className="hyprgradient bg-clip-text text-transparent">
            {t.hero.headingHighlight}
          </span>{" "}
          <span className="text-fade-gradient">{t.hero.heading2}</span>
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-backwards [animation-delay:250ms] sm:text-lg">
          {t.hero.subheading}
        </p>

        {/* Service pills */}
        <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-backwards [animation-delay:350ms]">
          {t.hero.services.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-slate-500"
            >
              <CheckCircle className="h-3 w-3 text-amber-500" />
              {s}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-backwards [animation-delay:450ms] sm:flex-row">
          <button
            onClick={() => handleScroll("contact")}
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-8 py-3.5 font-bold text-white shadow-[0_10px_28px_-8px_rgba(245,158,11,0.6)] transition-all duration-300 hover:scale-[1.02] hover:bg-amber-600 hover:shadow-[0_14px_36px_-8px_rgba(245,158,11,0.75)] sm:w-auto"
          >
            {t.hero.ctaPrimary}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => handleScroll("portfolio")}
            className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-slate-200 bg-white px-8 py-3.5 font-bold text-slate-800 shadow-sm transition-all duration-300 hover:border-amber-300 hover:bg-amber-50/50 sm:w-auto"
          >
            {t.hero.ctaSecondary}
          </button>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-12 flex max-w-lg flex-wrap justify-center gap-x-10 gap-y-5 border-t border-slate-200 pt-8 animate-in fade-in duration-700 fill-mode-backwards [animation-delay:600ms]">
          {stats.map((card) => (
            <div key={card.title} className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                <card.icon className="h-5 w-5 text-amber-500" />
              </div>
              <div className="text-left">
                <div className="text-lg font-bold text-slate-900">{card.value}</div>
                <div className="text-xs font-medium text-slate-500">{card.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => handleScroll("services")}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-slate-500 transition-colors hover:text-amber-500 animate-in fade-in duration-700 fill-mode-backwards [animation-delay:900ms]"
        aria-label="Scroll to services"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">{t.hero.scroll}</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </button>
    </section>
  );
}
