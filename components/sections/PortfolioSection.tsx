"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import Image from "next/image";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { BlurFade } from "@/components/effects/BlurFade";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  fetchPortfolioItems,
  type PortfolioCategory,
  type PortfolioItem,
} from "@/lib/portfolio";


type FilterCategory = "all" | PortfolioCategory;

const GRADIENTS = [
  "from-amber-500/20 to-violet-500/20",
  "from-violet-500/20 to-fuchsia-500/20",
  "from-fuchsia-500/20 to-amber-500/20",
  "from-yellow-500/20 to-amber-500/20",
  "from-amber-500/20 to-rose-500/20",
  "from-rose-500/20 to-violet-500/20",
];

function PortfolioImage({ item, gradient, enhance }: { item: PortfolioItem; gradient: string; enhance?: boolean }) {
  const [hasImageError, setHasImageError] = useState(false);

  if (item.imageUrl && !hasImageError) {
    return (
      <Image
        src={item.imageUrl}
        alt={item.title}
        fill
        className={`object-cover transition-transform duration-500 group-hover:scale-105 ${enhance ? 'brightness-110' : ''}`}
        loader={({ src }) => src}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        unoptimized
        onError={() => setHasImageError(true)}
      />
    );
  }

  return (
    <div
      className={cn(
        "h-full w-full bg-gradient-to-br transition-transform duration-500 group-hover:scale-105",
        gradient
      )}
    />
  );
}

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { t } = useLanguage();

  const FILTERS: { label: string; value: FilterCategory }[] = [
    { label: t.portfolio.filters.all, value: "all" },
    { label: t.portfolio.filters.design, value: "design" },
    { label: t.portfolio.filters.website, value: "website" },
  ];

  const filtered =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  useEffect(() => {
    let cancelled = false;

    async function loadPortfolioItems() {
      try {
        const mapped = await fetchPortfolioItems();

        if (!cancelled) {
          setPortfolioItems(mapped);
          setHasError(false);
        }
      } catch {

        if (!cancelled) {
          setPortfolioItems([]);
          setHasError(true);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadPortfolioItems();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="portfolio" className="relative py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t.portfolio.badge}
          title={t.portfolio.title}
          titleHighlight={t.portfolio.titleHighlight}
          description={t.portfolio.description}
        />

        {/* Filter buttons */}
        <BlurFade delay={0.1}>
          <div className="mb-8 flex justify-center gap-2 sm:mb-10">
            {FILTERS.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-bold transition-all duration-200 sm:px-5",
                  activeFilter === filter.value
                    ? "bg-amber-500 text-white shadow-[0_8px_20px_-6px_rgba(245,158,11,0.5)]"
                    : "border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-amber-50 hover:text-amber-600"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </BlurFade>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {isLoading &&
              Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={`portfolio-skeleton-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="h-44 animate-pulse bg-slate-100 sm:h-48" />
                  <div className="p-4">
                    <div className="mb-3 h-4 w-20 animate-pulse rounded-full bg-slate-100" />
                    <div className="h-5 w-3/4 animate-pulse rounded-md bg-slate-100" />
                    <div className="mt-3 flex gap-1">
                      <div className="h-5 w-16 animate-pulse rounded-full bg-slate-100" />
                      <div className="h-5 w-20 animate-pulse rounded-full bg-slate-100" />
                    </div>
                  </div>
                </motion.div>
              ))}

            {!isLoading && filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
                data-testid="portfolio-item"
                data-category={item.category}
                className={cn(
                  "group relative cursor-pointer overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-amber-200 hover:shadow-xl",
                  item.size === "large" && "sm:col-span-2"
                )}
                onClick={() => setSelectedItem(item)}
              >
                {/* Image area */}
                <div
                  className={cn(
                    "relative overflow-hidden border-b border-slate-100",
                    item.size === "large" ? "h-52 sm:h-64" : "h-44 sm:h-48"
                  )}
                >
                  <PortfolioImage item={item} gradient={GRADIENTS[i % GRADIENTS.length]} />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-slate-900/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                        <ExternalLink className="h-3.5 w-3.5" />
                        {t.portfolio.viewProject}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <span className="mb-2 inline-block font-mono text-[11px] uppercase tracking-widest text-amber-500">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 sm:text-base">{item.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {!isLoading && filtered.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white px-5 py-10 text-center shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              {hasError
                ? "Portfolio belum bisa dimuat dari Google Sheets."
                : "Belum ada portfolio untuk filter ini."}

            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm"
              onClick={() => setSelectedItem(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-4 top-1/2 z-50 max-h-[90vh] w-auto max-w-2xl -translate-y-1/2 overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl sm:inset-x-auto sm:left-1/2 sm:w-full sm:-translate-x-1/2"
              role="dialog"
              aria-modal="true"
              aria-label={selectedItem.title}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden sm:h-64 border-b border-slate-100">
                <PortfolioImage
                  item={selectedItem}
                  gradient={
                    GRADIENTS[
                      Math.max(
                        0,
                        portfolioItems.findIndex((p) => p.id === selectedItem.id)
                      ) % GRADIENTS.length
                    ]
                  }
                    enhance
                />
                <div className="absolute inset-0 bg-white/10 pointer-events-none" />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-900 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <span className="mb-3 inline-block rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold capitalize text-amber-600">
                  {selectedItem.category}
                </span>
                <h2 className="text-xl font-black text-slate-900 sm:text-2xl">{selectedItem.title}</h2>
                <div className="mt-5 flex flex-wrap gap-2">
                  {selectedItem.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 sm:text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
