"use client";

import { Target, Sparkles, Zap, ArrowRight } from "lucide-react";

export function AboutSection() {
  const pillars = [
    {
      icon: Target,
      title: "Strategic Insight",
      desc: "Every design decision starts with understanding your business objectives, target audience, and market positioning.",
    },
    {
      icon: Sparkles,
      title: "Pixel-Perfect Craft",
      desc: "Meticulous attention to typography, micro-interactions, layout balance, and brand consistency that elevates credibility.",
    },
    {
      icon: Zap,
      title: "Performance & Impact",
      desc: "Modern, lightweight, and accessible codebases built to convert visitors into loyal customers without lag or friction.",
    },
  ];

  return (
    <section id="about" className="section-spacing bg-[#FFFAF6] border-y border-[#ECEEF1]">
      <div className="container-arvion">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: About Summary */}
          <div className="lg:col-span-5">
            <span className="section-label">ABOUT ARVION</span>
            <h2 className="section-heading mb-4">
              Crafting Digital Experiences with Purpose
            </h2>
            <p className="text-[#707581] leading-relaxed mb-6">
              Arvion Creative is an independent creative studio partnering with ambitious brands and innovative businesses. We bridge thoughtful design with cutting-edge digital technology to deliver meaningful, memorable results.
            </p>
            <div className="p-4 rounded-xl bg-white border border-[#ECEEF1] flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#FFF3E9] flex items-center justify-center text-[#F47721] shrink-0 font-extrabold text-xl">
                A+
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#171A22]">
                  Dedicated Creative Direction
                </h4>
                <p className="text-xs text-[#707581] mt-0.5">
                  Tailored solutions with direct collaborative communication.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Three Pillars Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="arvion-card p-6 flex flex-col justify-between h-full bg-white"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#FFF3E9] text-[#F47721] flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-[#171A22] mb-2">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#707581] leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#ECEEF1] flex items-center justify-between text-xs font-bold text-[#F47721]">
                    <span>Pillar 0{idx + 1}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F47721]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
