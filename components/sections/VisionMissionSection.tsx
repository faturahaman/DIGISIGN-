"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { BlurFade } from "@/components/effects/BlurFade";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function VisionMissionSection() {
  const { t } = useLanguage();

  return (
    <section id="vision" className="relative bg-slate-50 py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t.visionMission.badge}
          title={t.visionMission.title}
          titleHighlight={t.visionMission.titleHighlight}
          description={t.visionMission.description}
        />

        <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          <BlurFade>
            <div className="rounded-4xl border border-slate-200 bg-white p-8 shadow-sm ring-1 ring-slate-200/50 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <span className="inline-flex rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600">
                {t.visionMission.vision.title}
              </span>
              <h3 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {t.visionMission.vision.highlight}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                {t.visionMission.vision.description}
              </p>

              <ul className="mt-8 space-y-4">
                {t.visionMission.vision.items.map((item, index) => (
                  <li key={index} className="flex gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-slate-600">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </BlurFade>

          <BlurFade>
            <div className="rounded-4xl border border-slate-200 bg-white p-8 shadow-sm ring-1 ring-slate-200/50 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <span className="inline-flex rounded-full bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-600">
                {t.visionMission.mission.title}
              </span>
              <h3 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {t.visionMission.mission.highlight}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                {t.visionMission.mission.description}
              </p>

              <ol className="mt-8 space-y-4">
                {t.visionMission.mission.points.map((point, index) => (
                  <li key={index} className="flex gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-slate-600">{point}</p>
                  </li>
                ))}
              </ol>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
