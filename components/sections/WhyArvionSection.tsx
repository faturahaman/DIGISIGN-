"use client";

import { ADVANTAGES } from "@/lib/constants";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { BlurFade } from "@/components/effects/BlurFade";
import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { CardsContainer, MouseGlowCard } from "@/components/effects/MouseGlowCard";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function WhyArvionSection() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28">
      <AmbientGlow size="50% 45% at 50% 20%" color="rgba(139,92,246,0.18)" accent="rgba(245,158,11,0.12)" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t.why.badge}
          title={t.why.title}
          titleHighlight={t.why.titleHighlight}
          description={t.why.description}
        />

        <CardsContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES.map((advantage, i) => {
            const Icon = advantage.icon;
            return (
              <BlurFade key={advantage.id} delay={i * 0.08} className="h-full">
                <MouseGlowCard
                  className="h-full transition-transform duration-300 hover:-translate-y-1"
                  innerClassName="p-7"
                  data-testid="advantage-card"
                >
                  {/* Mono numeral */}
                  <span className="absolute right-6 top-6 font-mono text-sm tabular-nums text-slate-300 transition-colors duration-300 group-hover:text-amber-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 transition-all duration-300 group-hover:border-amber-200 group-hover:bg-amber-50">
                      <Icon className="h-6 w-6 text-amber-500" />
                    </div>
                    <h3 className="mb-3 text-lg font-bold text-slate-900">{advantage.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {advantage.description}
                    </p>
                  </div>
                </MouseGlowCard>
              </BlurFade>
            );
          })}
        </CardsContainer>
      </div>
    </section>
  );
}
