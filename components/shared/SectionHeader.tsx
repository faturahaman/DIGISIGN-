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
          <span className="mb-3 inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-sm font-bold text-orange-600 sm:mb-4 shadow-sm">
            {badge}
          </span>
        </BlurFade>
      )}
      <BlurFade delay={0.1}>
        <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl xl:text-5xl">
          {title}{" "}
          {titleHighlight && (
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-purple-500">{titleHighlight}</span>
          )}
        </h2>
      </BlurFade>
      {description && (
        <BlurFade delay={0.2}>
          <p className="mx-auto mt-3 max-w-2xl text-base font-medium text-slate-600 sm:mt-4 sm:text-lg">
            {description}
          </p>
        </BlurFade>
      )}
    </div>
  );
}
