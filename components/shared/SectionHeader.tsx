import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/effects/BlurFade";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

/**
 * Shared section header in the Hyprland dark idiom:
 *  - a monospace, letter-spaced eyebrow flanked by a hairline rule
 *  - a big, extrabold, tight-tracking white heading (the graphic element)
 *  - the highlight word carried in the amber→violet brand gradient
 */
export function SectionHeader({
  badge,
  title,
  titleHighlight,
  description,
  className,
  align = "center",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "mb-12 sm:mb-14 lg:mb-16",
        isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left",
        className
      )}
    >
      {badge && (
        <BlurFade delay={0}>
          <p
            className={cn(
              "flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-slate-500",
              isCenter && "justify-center"
            )}
          >
            <span className="h-px w-8 bg-slate-300" />
            {badge}
            {isCenter && <span className="h-px w-8 bg-slate-300" />}
          </p>
        </BlurFade>
      )}

      <BlurFade delay={0.1}>
        <h2 className="mt-5 text-3xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-4xl lg:text-[3rem]">
          {title}
          {titleHighlight && (
            <>
              {" "}
              <span className="hyprgradient bg-clip-text text-transparent">
                {titleHighlight}
              </span>
            </>
          )}
        </h2>
      </BlurFade>

      {description && (
        <BlurFade delay={0.2}>
          <p
            className={cn(
              "mt-5 text-base leading-relaxed text-slate-600 sm:text-lg",
              isCenter && "mx-auto max-w-xl"
            )}
          >
            {description}
          </p>
        </BlurFade>
      )}
    </div>
  );
}
