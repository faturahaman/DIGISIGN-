"use client";

import { BlurFade } from "@/components/effects/BlurFade";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface PanelProps {
  index: string;
  label: string;
  statement: string;
  description: string;
  points: readonly string[];
  /** Hyprland-style: a saturated colour glow bleeding behind the heading. */
  glow: string;
  /** Secondary-color accent blob for the two-tone bleed. */
  accent: string;
  numeral: string;
}

/**
 * A full-width panel in the Hyprland idiom: a big bold statement sitting over a
 * concentrated, vivid colour glow (grain-textured) contained inside a rounded
 * glass card — eyecandy focused in one place rather than scattered.
 */
function Panel({ index, label, statement, description, points, glow, accent, numeral }: PanelProps) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      {/* The signature glow — a big, saturated blurred blob behind the heading,
          plus a smaller second-colour accent for the two-tone bleed. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -left-28 -top-28 h-[30rem] w-[30rem] rounded-full blur-[90px] ${glow}`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute -top-16 left-40 h-64 w-64 rounded-full blur-[90px] ${accent}`}
      />

      <div className="relative grid gap-x-14 gap-y-10 p-8 sm:p-12 lg:grid-cols-[1.1fr_1fr] lg:p-16">
        {/* Left — statement over the glow */}
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500">
            <span className="text-slate-900">{index}</span>
            <span className="mx-2 text-slate-300">/</span>
            {label}
          </p>
          <h2 className="mt-6 text-[2.5rem] font-extrabold leading-[1] tracking-tight text-slate-900 sm:text-6xl lg:text-[4rem]">
            {statement}
          </h2>
          <p className="mt-7 max-w-md text-base leading-relaxed text-slate-600 sm:text-lg">
            {description}
          </p>
        </div>

        {/* Right — numbered points, hairline separated */}
        <ol className="flex flex-col justify-center divide-y divide-slate-200">
          {points.map((point, i) => (
            <li key={i} className="group flex gap-5 py-4 first:pt-0 last:pb-0">
              <span className={`shrink-0 pt-0.5 font-mono text-sm font-medium tabular-nums ${numeral}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[0.95rem] leading-snug text-slate-700 transition-colors duration-200 group-hover:text-slate-950 sm:text-base">
                {point}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function VisionMissionSection() {
  const { t } = useLanguage();
  const vm = t.visionMission;

  return (
    <section id="vision" className="relative py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        {/* Intro */}
        <BlurFade>
          <div className="mx-auto max-w-2xl text-center">
            <p className="flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-slate-500">
              <span className="h-px w-8 bg-slate-300" />
              {vm.badge}
              <span className="h-px w-8 bg-slate-300" />
            </p>
            <p className="mt-6 text-xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-2xl">
              {vm.description}
            </p>
          </div>
        </BlurFade>

        {/* Panels */}
        <div className="mt-14 space-y-6 lg:mt-20 lg:space-y-8">
          <BlurFade>
            <Panel
              index="01"
              label={vm.vision.title}
              statement={vm.vision.highlight}
              description={vm.vision.description}
              points={vm.vision.items}
              glow="bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.4),rgba(251,146,60,0.16)_45%,transparent_72%)]"
              accent="bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.25),transparent_70%)]"
              numeral="text-amber-500"
            />
          </BlurFade>

          <BlurFade>
            <Panel
              index="02"
              label={vm.mission.title}
              statement={vm.mission.highlight}
              description={vm.mission.description}
              points={vm.mission.points}
              glow="bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.4),rgba(217,70,239,0.16)_45%,transparent_72%)]"
              accent="bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.22),transparent_70%)]"
              numeral="text-violet-500"
            />
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
