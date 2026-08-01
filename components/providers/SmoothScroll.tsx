"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

/**
 * Global smooth-scroll wrapper powered by Lenis.
 *
 * - Uses `root` so the whole document scrolls smoothly.
 * - Bypassed for users who prefer reduced motion (accessibility).
 * - PERF: Lenis runs a rAF loop every frame and, if started during initial
 *   hydration, inflates Total Blocking Time. We therefore mount it only AFTER
 *   the page is interactive (requestIdleCallback / first interaction), so the
 *   main thread is free for hydration first. Children always render immediately
 *   — native scroll works in the meantime; smooth scroll enhances progressively.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Defer starting Lenis until the browser is idle (keeps it off the critical
  // hydration path). Falls back to a short timeout where rIC is unavailable.
  useEffect(() => {
    if (reduceMotion) return;
    type RIC = (cb: () => void, opts?: { timeout: number }) => number;
    const ric: RIC =
      (window as unknown as { requestIdleCallback?: RIC }).requestIdleCallback ??
      ((cb) => window.setTimeout(cb, 300) as unknown as number);
    const id = ric(() => setEnabled(true), { timeout: 2000 });
    return () => {
      const cic = (window as unknown as { cancelIdleCallback?: (id: number) => void })
        .cancelIdleCallback;
      if (cic) cic(id);
    };
  }, [reduceMotion]);

  if (reduceMotion || !enabled) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
