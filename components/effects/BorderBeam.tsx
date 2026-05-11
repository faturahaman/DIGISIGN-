"use client";

import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export function BorderBeam({
  className,
  size = 200,
  duration = 15,
  colorFrom = "#2563EB",
  colorTo = "#7C3AED",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:1px_solid_transparent]",
        "[background:linear-gradient(var(--bg,#0B1120),var(--bg,#0B1120))_padding-box,linear-gradient(var(--angle),transparent_20%,var(--color-from),var(--color-to),transparent_80%)_border-box]",
        className
      )}
      style={
        {
          "--size": size,
          "--duration": duration,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--angle": "0deg",
          "--delay": `-${delay}s`,
          animation: `spin ${duration}s linear infinite`,
        } as React.CSSProperties
      }
    />
  );
}
