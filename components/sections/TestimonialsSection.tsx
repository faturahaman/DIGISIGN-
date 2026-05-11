"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { cn } from "@/lib/utils";

function TiltCard({
  children,
  className,
  testId,
}: {
  children: React.ReactNode;
  className?: string;
  testId?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
      data-testid={testId}
    >
      {children}
    </motion.div>
  );
}

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActiveIndex((i) => (i + 1) % TESTIMONIALS.length);

  return (
    <section id="testimonials" className="relative bg-[#050816] py-16 sm:py-20 lg:py-28">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-blue-600/5 blur-[100px] md:h-96 md:w-96 md:blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-violet-600/5 blur-[100px] md:h-96 md:w-96 md:blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Testimonials"
          title="What Our"
          titleHighlight="Clients Say"
          description="Kepercayaan klien adalah aset terbesar kami. Inilah yang mereka katakan tentang pengalaman bekerja bersama DiGiSign."
        />

        <div className="relative">
          {/* Cards */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard
                  testId={`testimonial-card-${activeIndex}`}
                  className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg sm:p-8"
                >
                  {/* Quote icon */}
                  <Quote className="mb-3 h-7 w-7 text-blue-500/40 sm:mb-4 sm:h-8 sm:w-8" />

                  {/* Stars */}
                  <div className="mb-3 flex gap-1 sm:mb-4">
                    {Array.from({ length: TESTIMONIALS[activeIndex].rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Review */}
                  <p className="text-base leading-relaxed text-[#F8FAFC] sm:text-lg">
                    &ldquo;{TESTIMONIALS[activeIndex].review}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="mt-5 flex items-center gap-3 sm:mt-6 sm:gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-base font-bold text-white sm:h-12 sm:w-12 sm:text-lg">
                      {TESTIMONIALS[activeIndex].name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white sm:text-base">{TESTIMONIALS[activeIndex].name}</div>
                      <div className="text-xs text-[#94A3B8] sm:text-sm">
                        {TESTIMONIALS[activeIndex].role} — {TESTIMONIALS[activeIndex].company}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-center gap-3 sm:mt-8 sm:gap-4">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10 hover:border-white/20 sm:h-10 sm:w-10"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === activeIndex
                      ? "w-6 bg-blue-500"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  )}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10 hover:border-white/20 sm:h-10 sm:w-10"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
