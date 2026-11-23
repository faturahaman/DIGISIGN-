"use client";

import { ArrowUpRight, ArrowRight } from "lucide-react";
import { HERO_STATS } from "@/data/siteContent";
import { HeroAnimation } from "@/components/shared/HeroAnimation";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function HeroSection() {
  const { lang } = useLanguage();
  const copy =
    lang === "id"
      ? {
          badge: "STUDIO DIGITAL KREATIF",
          subtitle: "KAMI MERANCANG. KAMI MEMBANGUN. KAMI BERKREASI.",
          description:
            "Arvion Creative membantu brand tumbuh melalui pengalaman digital strategis, visual yang kuat, dan solusi kreatif yang dirancang untuk menghasilkan dampak nyata.",
          primary: "Lihat Karya Kami",
          secondary: "Mulai Proyek",
        }
      : {
          badge: "CREATIVE DIGITAL STUDIO",
          subtitle: "WE DESIGN. WE BUILD. WE CREATE.",
          description:
            "Arvion Creative helps brands grow through strategic digital experiences, strong visuals, and creative solutions designed to deliver meaningful results.",
          primary: "Explore Our Work",
          secondary: "Start a Project",
        };
  const stats =
    lang === "id"
      ? ["Tahun Pengalaman", "Proyek Selesai", "Klien Puas"]
      : ["Years Experience", "Projects Completed", "Happy Clients"];

  const title =
    lang === "id" ? (
      <>Ide Jadi <br /><span className="text-[#F47721]">Dampak Nyata.</span></>
    ) : (
      <>Ideas into <br /><span className="text-[#F47721]">Impact.</span></>
    );

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden bg-white"
    >
      <div className="container-arvion">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Content & CTAs (as in Reference Photo 1) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Small Pill Badge */}
            <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF3E9] border border-[#FFE2CC] text-[#F47721] text-xs font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#F47721]" />
              <span>{copy.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-[4.25rem] font-extrabold text-[#171A22] tracking-tight leading-[1.06] mb-5">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="text-sm font-bold tracking-[0.16em] text-[#171A22] uppercase mb-4">
              {copy.subtitle}
            </p>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#707581] leading-relaxed max-w-xl mb-9">
              {copy.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-12">
              <button
                onClick={() => handleScrollTo("projects")}
                className="inline-flex items-center justify-center gap-2 bg-[#F47721] hover:bg-[#e06512] text-white font-bold text-sm sm:text-base py-3 px-6 rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <span>{copy.primary}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleScrollTo("contact")}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FFFAF6] border border-[#ECEEF1] hover:border-[#F47721] text-[#171A22] hover:text-[#F47721] font-bold text-sm sm:text-base py-3 px-6 rounded-xl transition-all"
              >
                <span>{copy.secondary}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Statistics Row */}
            <div className="w-full pt-8 border-t border-[#ECEEF1] grid grid-cols-3 gap-6 max-w-lg">
              {HERO_STATS.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#171A22] tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm text-[#707581] font-medium mt-1">
                    {stats[idx] ?? stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Mockup matching Reference Photo 1 */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <HeroAnimation />
          </div>
        </div>
      </div>
    </section>
  );
}
