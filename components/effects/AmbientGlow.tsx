import { cn } from "@/lib/utils";

/**
 * Section ambient glow (Hyprland §8.9). An absolutely-positioned, grain-textured
 * radial light pool, double-masked so it fades to nothing at the edges — giving
 * each section its own pool of coloured light without hard seams. Pure CSS, no JS.
 */
export function AmbientGlow({
  className,
  color = "rgba(245, 158, 11, 0.22)",
  accent = "rgba(139, 92, 246, 0.12)",
  size = "60% 60% at 50% 40%",
}: {
  className?: string;
  /** Primary glow colour (rgba). */
  color?: string;
  /** Secondary accent colour bled in for the two-tone look (rgba). */
  accent?: string;
  /** Radial extent/position, e.g. "70% 800px at 50% 0%". */
  size?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 [contain:strict]",
        className
      )}
      style={{
        WebkitMaskImage: `radial-gradient(${size}, white 60%, transparent)`,
        maskImage: `radial-gradient(${size}, white 60%, transparent)`,
        backgroundImage: `var(--grain), radial-gradient(${size}, ${color}, transparent), radial-gradient(50% 50% at 30% 70%, ${accent}, transparent)`,
      }}
    />
  );
}
