"use client";

import { LayoutGrid, Command, Smartphone, Pen, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const SERVICES_DATA = [
  {
    icon: LayoutGrid,
    title: "UI/UX Design",
    description: "Intuitive interfaces and meaningful user experiences.",
  },
  {
    icon: Command,
    title: "Web Development",
    description: "Responsive websites built for performance and growth.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Design",
    description: "Beautiful, functional mobile experiences.",
  },
  {
    icon: Pen,
    title: "Branding & Identity",
    description: "Distinctive visual identities that tell your story.",
  },
  {
    icon: Sparkles,
    title: "Creative Strategy",
    description: "Ideas and direction that move brands forward.",
  },
];

export function ServicesSection() {
  const { lang } = useLanguage();
  const titles =
    lang === "id"
      ? ["Desain UI/UX", "Pengembangan Website", "Desain Aplikasi Mobile", "Branding & Identitas", "Strategi Kreatif"]
      : ["UI/UX Design", "Web Development", "Mobile App Design", "Branding & Identity", "Creative Strategy"];
  const descriptions =
    lang === "id"
      ? [
          "Antarmuka intuitif dan pengalaman pengguna yang bermakna.",
          "Website responsif yang dibangun untuk performa dan pertumbuhan.",
          "Pengalaman aplikasi mobile yang indah dan fungsional.",
          "Identitas visual khas yang menceritakan kisah brand Anda.",
          "Ide dan arahan yang membawa brand Anda melangkah maju.",
        ]
      : [
          "Intuitive interfaces and meaningful user experiences.",
          "Responsive websites built for performance and growth.",
          "Beautiful, functional mobile experiences.",
          "Distinctive visual identities that tell your story.",
          "Ideas and direction that move brands forward.",
        ];
  return (
    <section id="services" className="py-20 sm:py-24 bg-white border-t border-[#ECEEF1]">
      <div className="container-arvion">
        {/* Section Header matching Reference Photo 3 */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171A22] tracking-tight mb-3">
            {lang === "id" ? "Layanan Kreatif" : "Creative Services"}
          </h2>
          <p className="text-sm sm:text-base text-[#707581] max-w-xl">
            {lang === "id"
              ? "Dari ide awal hingga produk digital yang matang."
              : "From the first spark of an idea to a polished digital product."}
          </p>
        </div>

        {/* 5-Column Horizontal Cards matching Reference Photo 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {SERVICES_DATA.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#ECEEF1] p-6 flex flex-col justify-between hover:border-[#F47721]/40 hover:shadow-md transition-all duration-300 group"
              >
                <div>
                  {/* Soft Orange Rounded Square with Orange Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#FFF3E9] text-[#F47721] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-[#171A22] mb-2 group-hover:text-[#F47721] transition-colors">
                    {titles[index] ?? service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#707581] leading-relaxed">
                    {descriptions[index] ?? service.description}
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
