"use client";

import { cn } from "@/lib/utils";
import { useRef, type ReactNode } from "react";

/**
 * Cursor-spotlit grid backdrop (Hyprland §3 PatternBackground). A subtle SVG
 * grid on the dark canvas with a radial glow that follows the cursor and
 * spotlights the grid via `mix-blend-mode`. Mouse position is written to a CSS
 * var by ref (rAF-throttled) — no React state, so tracking never re-renders.
 * Masked to fade toward the bottom.
 */
export function PatternBackground({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const x = e.clientX;
    const y = e.clientY;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--px", `${x - rect.left}px`);
      el.style.setProperty("--py", `${y - rect.top}px`);
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, black 55%, transparent)",
        maskImage: "linear-gradient(to bottom, black 55%, transparent)",
      }}
    >
      {/* 30px grid */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      {/* Cursor-following spotlight (color-dodge picks out the grid lines). */}
      <div
        className="absolute inset-0"
        style={{
          mixBlendMode: "color-dodge",
          background:
            "radial-gradient(300px circle at var(--px, 50%) var(--py, 50%), rgba(245,158,11,0.5), rgba(139,92,246,0.15) 45%, transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}
