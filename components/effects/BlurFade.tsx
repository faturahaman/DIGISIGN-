"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: string;
}

/**
 * Scroll-reveal wrapper — pure CSS + IntersectionObserver, NO framer-motion.
 *
 * This component is used ~35× across the page; when it pulled in framer-motion's
 * `motion` + `useInView` each instance added hydration/runtime cost that blocked
 * the main thread (hurting TBT and LCP). Here we observe once, then toggle a
 * class that transitions transform/opacity/filter — all GPU-compositable — so
 * the reveal is essentially free and ships no animation-library JS.
 *
 * Honors prefers-reduced-motion (renders shown, no transition) and keeps the
 * exact same props API so callers are unchanged.
 */
export function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.6,
  yOffset = 20,
  inView = true,
  inViewMargin = "-50px",
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Start shown when we're not gating on viewport; otherwise reveal on intersect.
  const [shown, setShown] = useState(!inView);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: inViewMargin, threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView, inViewMargin]);

  const style: CSSProperties = {
    transitionProperty: "opacity, transform, filter",
    transitionDuration: `${duration}s`,
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    transitionDelay: `${delay}s`,
    opacity: shown ? 1 : 0,
    transform: shown ? "translateY(0)" : `translateY(${yOffset}px)`,
    filter: shown ? "blur(0px)" : "blur(8px)",
    willChange: "opacity, transform",
  };

  return (
    <div ref={ref} className={cn(className)} style={style}>
      {children}
    </div>
  );
}
