"use client";

const items = ["BRANDING", "WEBSITE", "UI/UX", "DEVELOPMENT", "DESIGN", "CREATIVE", "DIGITAL"];
const separator = " • ";

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const content = items.map((item) => item + separator).join("");
  const doubled = content + content;

  return (
    <div className="overflow-hidden py-2">
      <div
        className={`flex whitespace-nowrap ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ width: "max-content" }}
      >
        <span className="text-2xl font-bold tracking-widest text-slate-900/10 sm:text-3xl md:text-4xl lg:text-5xl">
          {doubled}
        </span>
      </div>
    </div>
  );
}

export function MarqueeSection() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-background py-3">
      {/* Gradient fades (light variant) */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-background to-transparent sm:w-32" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-background to-transparent sm:w-32" />

      <MarqueeRow />
      <MarqueeRow reverse />
    </section>
  );
}
