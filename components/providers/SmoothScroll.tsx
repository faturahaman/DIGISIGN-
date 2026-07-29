"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

/**
 * Global smooth-scroll wrapper powered by Lenis.
 *
 * - Uses `root` so the whole document scrolls smoothly.
 * - Fully bypassed for users who prefer reduced motion (accessibility) — we
 *   render children directly, leaving native scrolling untouched.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (reduceMotion) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        // Native smooth scroll on touch devices feels better than JS-driven
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
