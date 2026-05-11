"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface MeteorsProps {
  number?: number;
  className?: string;
}

// Deterministic positions — no Math.random() to avoid hydration mismatch
const METEOR_SEEDS = Array.from({ length: 25 }, (_, i) => ({
  top: ((i * 37 + 13) % 100) + "%",
  left: ((i * 53 + 7) % 100) + "%",
  animationDelay: ((i * 0.3) % 1.2 + 0.2).toFixed(2) + "s",
  animationDuration: ((i * 0.7) % 8 + 2).toFixed(1) + "s",
}));

export function Meteors({ number = 20, className }: MeteorsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Render same wrapper div on server and client to avoid tree mismatch
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
      suppressHydrationWarning
    >
      {mounted &&
        METEOR_SEEDS.slice(0, number).map((style, idx) => (
          <span
            key={idx}
            className="animate-meteor absolute h-0.5 w-0.5 rotate-[215deg] rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]"
            style={{
              top: style.top,
              left: style.left,
              animationDelay: style.animationDelay,
              animationDuration: style.animationDuration,
            }}
          >
            <span className="absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
          </span>
        ))}
    </div>
  );
}
