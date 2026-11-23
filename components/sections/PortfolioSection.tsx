"use client";

import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function PortfolioSection() {
  const { lang } = useLanguage();
  const copy =
    lang === "id"
      ? {
          title: "Proyek Unggulan",
          description: "Pilihan pengalaman digital yang dibuat dengan tujuan dan perhatian pada detail.",
          contact: "Punya ide proyek?",
          study: "Lihat Studi Kasus",
        }
      : {
          title: "Featured Projects",
          description: "A selection of digital experiences crafted with purpose and attention to detail.",
          contact: "Have a project in mind?",
          study: "View Case Study",
        };
  const handleScrollToContact = () => {
    const el = document.getElementById("contact");
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
    <section id="projects" className="py-20 sm:py-24 bg-white border-t border-[#ECEEF1]">
      <div className="container-arvion">
        {/* Section Header matching Reference Photo 2 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171A22] tracking-tight">
              {copy.title}
            </h2>
            <p className="text-sm sm:text-base text-[#707581] mt-3 max-w-xl">
              {copy.description}
            </p>
          </div>

          <button
            onClick={handleScrollToContact}
            className="mt-4 md:mt-0 text-sm font-bold text-[#F47721] hover:text-[#e06512] inline-flex items-center gap-1.5 transition-colors self-start md:self-auto"
          >
            <span>{copy.contact}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4-Card Horizontal Grid matching Reference Photo 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: FinTrack Dashboard */}
          <div className="bg-white rounded-2xl border border-[#ECEEF1] p-4 flex flex-col justify-between hover:border-[#F47721]/40 hover:shadow-lg transition-all duration-300 group">
            {/* Visual Thumbnail: Dark Dashboard Browser Bar */}
            <div className="relative aspect-[16/11] w-full rounded-xl bg-[#F0F2F5] p-3 flex flex-col justify-between overflow-hidden">
              <div className="w-full h-full rounded-lg bg-[#1E232D] p-3 flex flex-col justify-between shadow-inner">
                {/* 3 browser dots */}
                <div className="flex items-center gap-1.5 pb-2">
                  <span className="w-2 h-2 rounded-full bg-[#F47721]" />
                  <span className="w-2 h-2 rounded-full bg-[#FF9B4A]" />
                  <span className="w-2 h-2 rounded-full bg-slate-600" />
                </div>
                {/* Dashboard wireframe boxes */}
                <div className="grid grid-cols-2 gap-2 my-auto">
                  <div className="h-9 rounded bg-[#2A313E] border border-slate-700/50" />
                  <div className="h-9 rounded bg-[#2A313E] border border-slate-700/50" />
                </div>
                {/* Bottom gradient area */}
                <div className="h-10 rounded bg-gradient-to-r from-[#F47721]/40 via-[#8A3D14] to-[#1E232D] border border-orange-500/20" />
              </div>
            </div>

            {/* Info & Link */}
            <div className="pt-4 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-base font-bold text-[#171A22] mb-1 group-hover:text-[#F47721] transition-colors">
                  FinTrack Dashboard
                </h3>
                <p className="text-xs text-[#707581] mb-4">
                  Dashboard Design · 2025
                </p>
              </div>
              <button
                onClick={handleScrollToContact}
                className="text-xs font-bold text-[#F47721] hover:text-[#e06512] inline-flex items-center gap-1 mt-auto"
              >
                <span>{copy.study}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Card 2: Luxora Interiors (Active orange outline in photo) */}
          <div className="bg-white rounded-2xl border-2 border-[#FFE2CC] shadow-md shadow-orange-500/5 p-4 flex flex-col justify-between hover:border-[#F47721] hover:shadow-lg transition-all duration-300 group">
            {/* Visual Thumbnail: Luxora Editorial Mockup */}
            <div className="relative aspect-[16/11] w-full rounded-xl bg-[#FFF9F4] p-3 flex flex-col justify-between overflow-hidden border border-[#FFE2CC]">
              <div className="w-full h-full rounded-lg bg-white p-3 flex flex-col justify-between shadow-xs">
                {/* 3 browser dots */}
                <div className="flex items-center justify-between pb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#F47721]" />
                    <span className="w-2 h-2 rounded-full bg-[#FF9B4A]" />
                    <span className="w-2 h-2 rounded-full bg-slate-300" />
                  </div>
                </div>
                {/* Luxora Brand text */}
                <div className="text-[11px] font-extrabold tracking-widest text-[#171A22] uppercase">
                  LUXORA
                </div>
                {/* Wireframe editorial boxes */}
                <div className="grid grid-cols-2 gap-2 my-auto">
                  <div className="h-9 rounded bg-[#F7EFE8]" />
                  <div className="h-9 rounded bg-[#F7EFE8]" />
                </div>
                {/* Bottom soft gradient bar */}
                <div className="h-7 rounded bg-gradient-to-r from-[#F47721]/70 to-[#FF9B4A]/60" />
              </div>
            </div>

            {/* Info & Link */}
            <div className="pt-4 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-base font-bold text-[#171A22] mb-1 group-hover:text-[#F47721] transition-colors">
                  Luxora Interiors
                </h3>
                <p className="text-xs text-[#707581] mb-4">
                  Website Design · 2025
                </p>
              </div>
              <button
                onClick={handleScrollToContact}
                className="text-xs font-bold text-[#F47721] hover:text-[#e06512] inline-flex items-center gap-1 mt-auto"
              >
                <span>{copy.study}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Card 3: MoveFit App (Duo smartphone mockup in photo) */}
          <div className="bg-white rounded-2xl border border-[#ECEEF1] p-4 flex flex-col justify-between hover:border-[#F47721]/40 hover:shadow-lg transition-all duration-300 group">
            {/* Visual Thumbnail: Phone Duo */}
            <div className="relative aspect-[16/11] w-full rounded-xl bg-[#F0F2F5] p-3 flex items-center justify-center gap-3 overflow-hidden">
              {/* Phone 1 */}
              <div className="w-16 h-28 rounded-xl bg-white border-2 border-[#171A22] p-1.5 flex flex-col justify-between shadow-md">
                <div className="w-6 h-1 bg-[#171A22] rounded-full mx-auto mb-1" />
                <div className="space-y-1 my-auto">
                  <div className="h-4 rounded bg-[#FFF0E4]" />
                  <div className="h-4 rounded bg-[#FFF0E4]" />
                  <div className="h-4 rounded bg-[#FFF0E4]" />
                </div>
              </div>
              {/* Phone 2 */}
              <div className="w-16 h-28 rounded-xl bg-white border-2 border-[#171A22] p-1.5 flex flex-col justify-between shadow-md">
                <div className="w-6 h-1 bg-[#171A22] rounded-full mx-auto mb-1" />
                <div className="space-y-1 my-auto">
                  <div className="h-4 rounded bg-[#FFF0E4]" />
                  <div className="h-4 rounded bg-[#FFF0E4]" />
                  <div className="h-4 rounded bg-[#FFF0E4]" />
                </div>
              </div>
            </div>

            {/* Info & Link */}
            <div className="pt-4 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-base font-bold text-[#171A22] mb-1 group-hover:text-[#F47721] transition-colors">
                  MoveFit App
                </h3>
                <p className="text-xs text-[#707581] mb-4">
                  Mobile App Design · 2024
                </p>
              </div>
              <button
                onClick={handleScrollToContact}
                className="text-xs font-bold text-[#F47721] hover:text-[#e06512] inline-flex items-center gap-1 mt-auto"
              >
                <span>{copy.study}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Card 4: Nova E-Commerce */}
          <div className="bg-white rounded-2xl border border-[#ECEEF1] p-4 flex flex-col justify-between hover:border-[#F47721]/40 hover:shadow-lg transition-all duration-300 group">
            {/* Visual Thumbnail: E-Commerce Layout */}
            <div className="relative aspect-[16/11] w-full rounded-xl bg-[#F0F2F5] p-3 flex flex-col justify-between overflow-hidden">
              <div className="w-full h-full rounded-lg bg-white p-3 flex flex-col justify-between shadow-xs">
                {/* 3 browser dots */}
                <div className="flex items-center gap-1.5 pb-1">
                  <span className="w-2 h-2 rounded-full bg-[#F47721]" />
                  <span className="w-2 h-2 rounded-full bg-[#FF9B4A]" />
                  <span className="w-2 h-2 rounded-full bg-slate-300" />
                </div>
                {/* Brand title */}
                <div className="text-[10px] font-extrabold tracking-wider text-[#171A22] uppercase">
                  NOVA E-COMMERCE
                </div>
                {/* Product boxes */}
                <div className="grid grid-cols-2 gap-2 my-auto">
                  <div className="h-9 rounded bg-[#F7EFE8]" />
                  <div className="h-9 rounded bg-[#F7EFE8]" />
                </div>
                {/* Bottom accent strip */}
                <div className="h-6 rounded bg-[#F47721]/80" />
              </div>
            </div>

            {/* Info & Link */}
            <div className="pt-4 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-base font-bold text-[#171A22] mb-1 group-hover:text-[#F47721] transition-colors">
                  Nova E-Commerce
                </h3>
                <p className="text-xs text-[#707581] mb-4">
                  Website Design · 2024
                </p>
              </div>
              <button
                onClick={handleScrollToContact}
                className="text-xs font-bold text-[#F47721] hover:text-[#e06512] inline-flex items-center gap-1 mt-auto"
              >
                <span>{copy.study}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
