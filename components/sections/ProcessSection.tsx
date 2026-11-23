"use client";

import { Search, Layers, Code, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const PROCESS_STEPS = [
  {
    icon: Search,
    number: "01",
    title: "Discover",
    description: "Understanding your goals, audience and needs.",
  },
  {
    icon: Layers,
    number: "02",
    title: "Design",
    description: "Creating wireframes and visual concepts.",
  },
  {
    icon: Code,
    number: "03",
    title: "Develop",
    description: "Bringing the design to life with clean code.",
  },
  {
    icon: Check,
    number: "04",
    title: "Deliver",
    description: "Testing, optimizing and delivering the final product.",
  },
];

export function ProcessSection() {
  const { lang } = useLanguage();
  const titles =
    lang === "id"
      ? ["Temukan", "Rancang", "Bangun", "Serahkan"]
      : ["Discover", "Design", "Develop", "Deliver"];
  const descriptions =
    lang === "id"
      ? [
          "Memahami tujuan, audiens, dan kebutuhan Anda.",
          "Membuat wireframe dan konsep visual.",
          "Mewujudkan desain dengan kode yang rapi.",
          "Menguji, mengoptimalkan, dan menyerahkan produk akhir.",
        ]
      : [
          "Understanding your goals, audience and needs.",
          "Creating wireframes and visual concepts.",
          "Bringing the design to life with clean code.",
          "Testing, optimizing and delivering the final product.",
        ];
  return (
    <section id="process" className="py-20 sm:py-24 bg-white border-t border-[#ECEEF1]">
      <div className="container-arvion">
        {/* Section Header matching Reference Photo 5 */}
        <div className="mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171A22] tracking-tight mb-3">
            {lang === "id" ? "Bagaimana Kami Mewujudkannya" : "How We Make It Happen"}
          </h2>
          <p className="text-sm sm:text-base text-[#707581] max-w-xl">
            {lang === "id"
              ? "Proses kolaboratif yang jelas untuk mengubah ide menjadi hasil nyata."
              : "A clear, collaborative process that turns ideas into outcomes."}
          </p>
        </div>

        {/* 4 Steps Horizontal Row matching Reference Photo 5 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {PROCESS_STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="flex items-start gap-4 group">
                {/* Outlined Circle Icon */}
                <div className="w-12 h-12 rounded-full border border-[#ECEEF1] bg-white group-hover:border-[#F47721] flex items-center justify-center text-[#F47721] shrink-0 transition-colors shadow-2xs">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Step Content */}
                <div>
                  <span className="text-xs font-bold text-[#F47721] block mb-1">
                    {step.number}
                  </span>
                  <h3 className="text-lg font-bold text-[#171A22] mb-1.5 group-hover:text-[#F47721] transition-colors">
                    {titles[index] ?? step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#707581] leading-relaxed">
                    {descriptions[index] ?? step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
