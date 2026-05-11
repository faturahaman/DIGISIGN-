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

export function SectionHeader({
  badge,
  title,
  titleHighlight,
  description,
  className,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-10 sm:mb-12 lg:mb-16", align === "center" ? "text-center" : "text-left", className)}>
      {badge && (
        <BlurFade delay={0}>
          <span className="mb-3 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 sm:mb-4">
            {badge}
          </span>
        </BlurFade>
      )}
      <BlurFade delay={0.1}>
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl xl:text-5xl">
          {title}{" "}
          {titleHighlight && (
            <span className="gradient-text">{titleHighlight}</span>
          )}
        </h2>
      </BlurFade>
      {description && (
        <BlurFade delay={0.2}>
          <p className="mx-auto mt-3 max-w-2xl text-base text-[#94A3B8] sm:mt-4 sm:text-lg">
            {description}
          </p>
        </BlurFade>
      )}
    </div>
  );
}
