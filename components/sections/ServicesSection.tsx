"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SERVICES as FALLBACK_SERVICES } from "@/lib/constants";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { BlurFade } from "@/components/effects/BlurFade";
import { ServiceModal } from "@/components/shared/ServiceModal";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { fetchServices, type ServiceItem } from "@/lib/services";

export function ServicesSection() {
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const [services, setServices] = useState<ServiceItem[]>(FALLBACK_SERVICES);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    let cancelled = false;

    fetchServices()
      .then((data) => {
        if (!cancelled && data.length > 0) setServices(data);
      })
      .catch(() => {
        // Keep fallback services on error
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (

    <>
      <section id="services" className="relative bg-slate-50 py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeader
            badge={t.services.badge}
            title={t.services.title}
            titleHighlight={t.services.titleHighlight}
            description={t.services.description}
          />

          {/* Bento Grid */}
          <div className="grid auto-rows-[minmax(140px,auto)] grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {isLoading && services.length === 0
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={`service-skeleton-${i}`}
                    className="h-full min-h-[140px] animate-pulse rounded-xl border border-slate-200 bg-white"
                  />
                ))
              : null}
            {services.map((service, i) => {

              const Icon = service.icon;
              const isLarge = service.size === "large";

              return (
                <BlurFade key={service.id} delay={i * 0.06}>
                  <motion.article
                    whileHover={{ scale: 1.015, y: -2 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => setActiveService(service)}
                    className={cn(
                      "group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-4 sm:p-5 cursor-pointer shadow-sm",
                      "transition-all duration-300",
                      "hover:border-orange-200 hover:shadow-md hover:bg-white",
                      isLarge && "col-span-1 sm:col-span-2 sm:p-6"
                    )}
                    data-testid="service-card"
                  >
                    {/* Gradient background on hover */}
                    <div
                      className={cn(
                        "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-10",
                        `bg-gradient-to-br from-orange-500 to-purple-500`
                      )}
                    />

                    {/* Top row: icon + arrow */}
                    <div className="relative mb-4 flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 shadow-sm transition-all duration-300 group-hover:border-orange-200 group-hover:bg-orange-50 sm:h-12 sm:w-12">
                        <Icon className="h-5 w-5 text-orange-500 sm:h-6 sm:w-6" />
                      </div>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:border-orange-200 group-hover:text-orange-500 sm:h-8 sm:w-8 shadow-sm">
                        <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </span>
                    </div>

                    {/* Content */}
                    <div className="relative mt-auto">
                      <h3 className={cn("font-bold text-slate-900 leading-tight", isLarge ? "text-base sm:text-lg lg:text-xl" : "text-sm sm:text-base")}>
                        {service.title}
                      </h3>
                      <p className={cn("mt-2 leading-snug text-slate-600 line-clamp-2", isLarge ? "text-xs sm:text-sm lg:text-base" : "text-xs sm:text-sm")}>
                        {service.description}
                      </p>

                      {/* Starting price badge - hidden on mobile default, show on hover or small enough */}
                      <div className="mt-3 hidden sm:inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-2.5 py-0.5 opacity-0 transition-all duration-300 group-hover:opacity-100 shadow-sm">
                        <span className="text-[11px] font-bold text-orange-600">
                          {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(service.startingPrice)}
                        </span>
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-orange-500 to-purple-500 transition-all duration-500 group-hover:w-full" />
                  </motion.article>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Modal */}
      <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
    </>
  );
}
