"use client";

import { cn } from "@/lib/utils";
import { useRef, type ReactNode } from "react";

/**
 * Card mouse-tracking gradient (Hyprland §8.2), ported to React.
 *
 * `CardsContainer` is the mouse broker: ONE mousemove listener writes CSS vars
 * (--cx/--cy for the container-wide border glow, --mx/--my per hovered card)
 * straight to the DOM via refs — never React state — so cursor movement repaints
 * gradients without re-rendering the tree (the §10.2 rule). rAF-throttled to
 * one write per frame. All disabled under 640px in CSS.
 */

export function CardsContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = ref.current;
    if (!container) return;
    const cx = e.clientX;
    const cy = e.clientY;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const rect = container.getBoundingClientRect();
      container.style.setProperty("--cx", `${cx - rect.left}px`);
      container.style.setProperty("--cy", `${cy - rect.top}px`);
      container.style.setProperty("--card-active", "1");

      // Per-card fill blob position (relative to each card).
      const cards = container.querySelectorAll<HTMLElement>("[data-glow-card]");
      cards.forEach((card) => {
        const cr = card.getBoundingClientRect();
        const inside =
          cx >= cr.left && cx <= cr.right && cy >= cr.top && cy <= cr.bottom;
        card.style.setProperty("--mx", `${cx - cr.left}px`);
        card.style.setProperty("--my", `${cy - cr.top}px`);
        card.style.setProperty("--hover", inside ? "1" : "0");
      });
    });
  };

  const onLeave = () => {
    const container = ref.current;
    if (!container) return;
    cancelAnimationFrame(raf.current);
    container.style.setProperty("--card-active", "0");
    container
      .querySelectorAll<HTMLElement>("[data-glow-card]")
      .forEach((card) => card.style.setProperty("--hover", "0"));
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={className}>
      {children}
    </div>
  );
}

/**
 * A single glowing card. Structure mirrors the reference: a border ring layer +
 * cursor-following fill blob behind a solid inner surface, so the gradients read
 * as a lit border rather than a flat fill. Must live inside a CardsContainer.
 */
export function MouseGlowCard({
  children,
  className,
  innerClassName,
  as: Tag = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  as?: "div" | "article" | "button";
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Tag data-glow-card className={cn("glow-card group", className)} {...rest}>
      <span className="glow-card-border" aria-hidden />
      <span className="glow-card-fill" aria-hidden />
      <div className={cn("glow-card-inner", innerClassName)}>{children}</div>
    </Tag>
  );
}
