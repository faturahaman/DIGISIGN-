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

  // Lenis is a SIBLING of the children, never a wrapper.
  //
  // This used to return `<>{children}</>` until idle and then switch to
  // `<ReactLenis>{children}</ReactLenis>`. Those are different element types in
  // the same tree position, so the moment `enabled` flipped React threw the
  // entire subtree away and mounted a fresh one — and since this provider sits
  // above LanguageProvider, ChatProvider and the whole page, "the entire
  // subtree" meant the site. Every section unmounted and remounted a few
  // hundred milliseconds after first paint: entry animations replayed, scroll
  // observers reset, chat state was lost, and the Google Sheets fetches in
  // Services, Testimonials, Portfolio and Footer all ran a second time. That is
  // the double flash on load, and it happened in production too — not just
  // under Strict Mode.
  //
  // Keeping `children` in a fixed slot means it is never reconciled away. With
  // `root`, ReactLenis renders no wrapper element of its own and drives
  // document.documentElement, so it does not need to enclose anything; it also
  // publishes its context to a module-level store, so a future `useLenis()`
  // anywhere in the tree still resolves.
  return (
    <>
      {enabled && !reduceMotion && (
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
        />
      )}
      {children}
    </>
  );
}
