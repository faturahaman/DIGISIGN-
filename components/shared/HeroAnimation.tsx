"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const CODE_LINES = [
  { text: "const arvion = createStudio({", color: "text-[#707581]" },
  { text: '  mission: "Ideas into Impact",', color: "text-[#F47721] font-semibold" },
  { text: '  design: "pixel-perfect",', color: "text-[#171A22]" },
  { text: '  develop: "high-performance",', color: "text-[#FF9B4A]" },
  { text: "});", color: "text-[#707581]" },
  { text: "arvion.deliver(results);", color: "text-[#F47721] font-bold" },
];

export function HeroAnimation() {
  const [activeLine, setActiveLine] = useState(0);

  // Cycling code typing animation on the laptop screen
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLine((prev) => (prev + 1) % (CODE_LINES.length + 1));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[620px] mx-auto aspect-[1.25/1] flex items-center justify-center select-none">
      {/* ────────────────────────────────────────────────────────────────────────
          BACKGROUND CONCENTRIC ORBIT RINGS & ORNAMENTS (Exact to reference image)
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        {/* Outer orbital ellipse */}
        <div className="absolute w-[520px] h-[400px] rounded-[50%] border border-[#FCD9BD]/50" />

        {/* Middle orbital ellipse */}
        <div className="absolute w-[420px] h-[330px] rounded-[50%] border border-[#FCD9BD]/70" />

        {/* Inner orbital ellipse */}
        <div className="absolute w-[300px] h-[240px] rounded-[50%] border border-[#FCD9BD]/80" />

        {/* Soft radial peach warmth in center */}
        <div className="absolute w-[260px] h-[200px] bg-gradient-to-tr from-[#FFEBDC]/80 via-[#FFF4EB]/40 to-transparent rounded-full blur-2xl" />

        {/* Curved swoosh line crossing the orbit */}
        <svg
          viewBox="0 0 500 400"
          className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
          fill="none"
        >
          <path
            d="M 250 10 C 250 120, 480 200, 480 380"
            stroke="#FCD9BD"
            strokeWidth="1.2"
          />
        </svg>

        {/* Left Orbit Ring Dot (Orange with outer ring as in image) */}
        <div className="absolute left-6 sm:left-12 top-1/2 -translate-y-1/2 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full border border-[#F47721] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#F47721]" />
          </div>
        </div>

        {/* Right Orbit Ring Dot (Small dark dot with outer ring) */}
        <div className="absolute right-12 sm:right-16 top-[58%] flex items-center justify-center">
          <div className="w-3.5 h-3.5 rounded-full border border-slate-300 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#171A22]" />
          </div>
        </div>

        {/* 8-point Asterisk Star (Top Right) */}
        <div className="absolute top-6 right-10 sm:right-16 text-[#F47721]/80 text-2xl font-light">
          ✻
        </div>

        {/* 4-point Diamond Star (Bottom Left) */}
        <div className="absolute bottom-10 left-6 sm:left-10 text-[#F47721] text-lg font-bold">
          ✦
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────────────────
          MAIN CENTER LAPTOP ILLUSTRATION (Perspectived & Tilted as in image)
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="relative flex flex-col items-center justify-center pt-2">
        {/* Laptop Container with slight tilt */}
        <motion.div
          animate={{
            y: [-3, 4, -3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative flex flex-col items-center transform -rotate-1"
        >
          {/* Laptop Screen Bezel */}
          <div className="relative w-[280px] sm:w-[350px] md:w-[380px] h-[190px] sm:h-[230px] md:h-[250px] bg-[#1E232D] rounded-[24px] sm:rounded-[28px] p-2.5 sm:p-3 shadow-2xl border-[3px] border-[#171A22] flex flex-col justify-between">
            {/* Screen Inner Display Frame (White/Cream border then Peach/Warm screen) */}
            <div className="relative w-full h-full bg-gradient-to-b from-[#FFF5EC] to-[#FFE9D9] rounded-[18px] sm:rounded-[22px] overflow-hidden p-3.5 sm:p-4 flex flex-col justify-between border-2 border-white shadow-inner">
              
              {/* Screen Top Header: Window Controls & Mini Tab */}
              <div className="flex items-center justify-between pb-2 border-b border-[#FFE0C9]/80">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#F47721]/80" />
                  <span className="w-2 h-2 rounded-full bg-[#FF9B4A]/80" />
                  <span className="w-2 h-2 rounded-full bg-slate-300" />
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/70 border border-[#FFE2CC] text-[10px] font-mono font-bold text-[#F47721]">
                  <span>&lt;/&gt;</span>
                  <span className="text-[#171A22] font-sans font-medium text-[9px]">studio.ts</span>
                </div>
                <div className="w-8" />
              </div>

              {/* Code Screen Body with Dynamic Typing Effect */}
              <div className="my-auto font-mono text-[9.5px] sm:text-[11.5px] leading-[1.65] text-[#171A22] pl-1">
                {CODE_LINES.map((line, idx) => {
                  const isVisible = idx <= activeLine;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{
                        opacity: isVisible ? 1 : 0.25,
                        x: isVisible ? 0 : -2,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`flex items-center gap-1.5 ${line.color}`}
                    >
                      <span className="text-[8px] text-[#A6ACBA] select-none w-3 text-right">
                        {idx + 1}
                      </span>
                      <span>{line.text}</span>
                      {idx === activeLine && (
                        <span className="inline-block w-1.5 h-3 bg-[#F47721] animate-pulse ml-0.5" />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Screen Bottom Bar with Subtle Glowing Code Bracket */}
              <div className="pt-2 border-t border-[#FFE0C9]/80 flex items-center justify-between text-[9px] font-mono text-[#707581]">
                <div className="flex items-center gap-1 text-[9px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Build Success</span>
                </div>
                <span className="text-[#F47721] font-bold">100% Impact</span>
              </div>
            </div>
          </div>

          {/* Laptop Bottom Base (Perspective wedge matching reference image) */}
          <div className="relative -mt-1 w-[290px] sm:w-[365px] md:w-[395px] h-[14px] sm:h-[18px] bg-[#64748B] rounded-b-xl shadow-md border-t border-slate-400/80 flex items-center justify-center transform -skew-x-12">
            <div className="w-14 h-1 bg-slate-400 rounded-full opacity-60" />
          </div>

          {/* Warm Peach Ground Shadow Ellipse (as in reference image) */}
          <div className="absolute -bottom-4 w-[280px] sm:w-[360px] h-3 bg-gradient-to-r from-transparent via-[#E89D71]/50 to-transparent rounded-[100%] blur-sm pointer-events-none" />

          {/* Two Orange Leaves Accent at Bottom Right of Laptop (as in reference image) */}
          <div className="absolute -bottom-3 right-6 sm:right-8 flex items-center gap-1 z-10 pointer-events-none">
            {/* Wooden/cream block base */}
            <div className="w-6 h-1.5 bg-[#D4A373] rounded-xs" />
            {/* Leaf 1 */}
            <div className="w-3.5 h-7 rounded-full bg-[#F47721] transform rotate-45 -translate-y-3 shadow-xs" />
            {/* Leaf 2 */}
            <div className="w-3 h-6 rounded-full bg-[#FF9B4A] transform rotate-75 -translate-y-1.5 -translate-x-1 shadow-xs" />
          </div>
        </motion.div>

        {/* ────────────────────────────────────────────────────────────────────────
            FLOATING CARDS (Exact match to reference image)
        ──────────────────────────────────────────────────────────────────────── */}

        {/* Floating Card 1 (Top Left): "Creative thinking / Ideas with purpose" */}
        <motion.div
          animate={{
            y: [-4, 4, -4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-3 sm:top-2 -left-2 sm:left-0 z-30 bg-white/95 backdrop-blur-md px-4 sm:px-5 py-3 rounded-2xl border border-[#ECEEF1] shadow-xl shadow-orange-500/5 flex items-start gap-3"
        >
          {/* Rounded soft orange icon box */}
          <div className="w-6 h-6 rounded-lg bg-[#FFF3E9] text-[#F47721] flex items-center justify-center text-sm font-bold mt-0.5">
            ✦
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-[#171A22] tracking-tight">
              Creative thinking
            </div>
            <div className="text-[11px] text-[#707581] mt-0.5">
              Ideas with purpose
            </div>
          </div>
        </motion.div>

        {/* Floating Card 2 (Bottom Right): "Digital solutions / Built to make an impact" */}
        <motion.div
          animate={{
            y: [4, -4, 4],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
          className="absolute -bottom-4 sm:bottom-0 -right-2 sm:right-0 z-30 bg-white/95 backdrop-blur-md px-4 sm:px-5 py-3 rounded-2xl border border-[#ECEEF1] shadow-xl shadow-orange-500/5 flex items-start gap-3"
        >
          {/* Rounded soft orange icon box */}
          <div className="w-6 h-6 rounded-lg bg-[#FFF3E9] text-[#F47721] flex items-center justify-center text-sm font-bold mt-0.5">
            <ArrowUpRight className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-[#171A22] tracking-tight">
              Digital solutions
            </div>
            <div className="text-[11px] text-[#707581] mt-0.5">
              Built to make an impact
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
