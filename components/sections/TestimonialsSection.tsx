"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import Image from "next/image";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GridPattern } from "@/components/effects/GridPattern";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { TESTIMONIALS as FALLBACK_TESTIMONIALS } from "@/lib/constants";
import { fetchTestimonials, type Testimonial } from "@/lib/testimonials";


// Static fallback when Google Sheets is unreachable or empty
const FALLBACK: Testimonial[] = FALLBACK_TESTIMONIALS.map((t) => ({
  id: t.id,
  name: t.name,
  role: t.role,
  company: t.company,
  message: t.review,
  rating: t.rating,
  avatar: undefined,
}));

// ─── Tilt Card ────────────────────────────────────────────────────────────────

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({ name, avatarUrl }: { name: string; avatarUrl?: string }) {
  const [imgError, setImgError] = useState(false);
  const initial = name.charAt(0).toUpperCase();

  if (avatarUrl && !imgError) {
    return (
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-amber-200 shadow-sm">
        <Image
          src={avatarUrl}
          alt={name}
          fill
          className="object-cover"
          onError={() => setImgError(true)}
          sizes="48px"
        />
      </div>
    );
  }

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-violet-500 text-lg font-bold text-white ring-2 ring-amber-200 shadow-sm">
      {initial}
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
      {/* Quote icon placeholder */}
      <div className="mb-4 h-8 w-8 animate-pulse rounded-md bg-slate-100" />
      {/* Stars */}
      <div className="mb-5 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-4 w-4 animate-pulse rounded-sm bg-slate-100" />
        ))}
      </div>
      {/* Text lines */}
      <div className="mb-2 h-4 w-full animate-pulse rounded-md bg-slate-100" />
      <div className="mb-2 h-4 w-5/6 animate-pulse rounded-md bg-slate-100" />
      <div className="mb-2 h-4 w-4/6 animate-pulse rounded-md bg-slate-100" />
      <div className="mb-6 h-4 w-3/6 animate-pulse rounded-md bg-slate-100" />
      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 animate-pulse rounded-full bg-slate-100" />
        <div className="flex flex-col gap-2">
          <div className="h-4 w-32 animate-pulse rounded-md bg-slate-100" />
          <div className="h-3 w-24 animate-pulse rounded-md bg-slate-100" />
        </div>
      </div>
    </div>
  );
}

// ─── Nav Button ───────────────────────────────────────────────────────────────

function NavButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={label}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600"
    >
      {/* Glow ring on hover */}
      <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 shadow-[0_0_16px_2px_rgba(245,158,11,0.2)] transition-opacity duration-300 group-hover:opacity-100" />
      {children}
    </motion.button>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export function TestimonialsSection() {
  const { t } = useLanguage();

  // Data state
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Carousel state
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Fetch from Google Sheets ────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const mapped = await fetchTestimonials();

        if (cancelled) return;

        if (mapped.length > 0) {

          setTestimonials(mapped);
        } else {
          setTestimonials(FALLBACK);
        }
      } catch {
        if (!cancelled) {
          setError(true);
          setTestimonials(FALLBACK);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Carousel helpers ────────────────────────────────────────────────────────
  const total = testimonials.length;

  const goNext = useCallback(() => {
    if (total === 0) return;
    setDirection("next");
    setActiveIndex((i) => (i + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    if (total === 0) return;
    setDirection("prev");
    setActiveIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > activeIndex ? "next" : "prev");
      setActiveIndex(index);
    },
    [activeIndex]
  );

  // ── Autoplay ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isPaused || total === 0) return;
    autoplayRef.current = setInterval(goNext, 5000);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isPaused, goNext, total]);

  // ── Slide variants ──────────────────────────────────────────────────────────
  const slideVariants = {
    enter: (dir: "next" | "prev") => ({
      opacity: 0,
      x: dir === "next" ? 60 : -60,
      scale: 0.97,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: (dir: "next" | "prev") => ({
      opacity: 0,
      x: dir === "next" ? -60 : 60,
      scale: 0.97,
    }),
  };

  const current = testimonials[activeIndex];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-32"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* One concentrated glow behind the card */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.1),rgba(139,92,246,0.06)_50%,transparent_72%)] blur-[90px]" />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        {/* Section header */}
        <SectionHeader
          badge={t.testimonials.badge}
          title={t.testimonials.title}
          titleHighlight={t.testimonials.titleHighlight}
          description={t.testimonials.description}
        />

        {/* ── Card area ── */}
        <div className="relative mt-12">
          {loading ? (
            <SkeletonCard />
          ) : (
            <AnimatePresence mode="wait" custom={direction}>
              {current && (
                <motion.div
                  key={current.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <TiltCard className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl sm:p-10">
                    {/* Grid texture + concentrated corner glow */}
                    <GridPattern className="stroke-slate-900/[0.02]" width={44} height={44} />
                    <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.16),transparent_70%)] blur-2xl" />

                    {/* Quote icon */}
                    <Quote className="relative mb-5 h-9 w-9 text-amber-300" />

                    {/* Stars */}
                    <div className="relative mb-5 flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4 transition-colors",
                            i < current.rating
                              ? "fill-amber-400 text-amber-400"
                              : "fill-slate-200 text-slate-200"
                          )}
                        />
                      ))}
                    </div>

                    {/* Testimonial text */}
                    <p className="relative text-lg leading-relaxed text-slate-700 sm:text-xl font-medium">
                      &ldquo;{current.message}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="relative mt-8 flex items-center gap-4">
                      <Avatar name={current.name} avatarUrl={current.avatar} />
                      <div>
                        <div className="text-sm font-bold text-slate-900 sm:text-base">
                          {current.name}
                        </div>
                        <div className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                          {current.role}
                          {current.role && current.company && (
                            <span className="mx-1.5 text-slate-300">—</span>
                          )}
                          {current.company}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* ── Navigation ── */}
          {!loading && total > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <NavButton onClick={goPrev} label={t.testimonials.prev}>
                <ChevronLeft className="h-5 w-5" />
              </NavButton>

              {/* Pagination dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`${t.testimonials.goTo} ${i + 1}`}
                    className={cn(
                      "h-2 rounded-full transition-all duration-400",
                      i === activeIndex
                        ? "w-7 bg-gradient-to-r from-amber-400 to-violet-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]"
                        : "w-2 bg-slate-200 hover:bg-slate-300"
                    )}
                  />
                ))}
              </div>

              <NavButton onClick={goNext} label={t.testimonials.next}>
                <ChevronRight className="h-5 w-5" />
              </NavButton>
            </div>
          )}

          {/* Error notice (non-blocking) */}
          {error && (
            <p className="mt-4 text-center text-xs text-slate-500">
              Showing cached testimonials
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

