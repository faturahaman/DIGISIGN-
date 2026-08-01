"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SERVICES as FALLBACK_SERVICES } from "@/lib/constants";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { BlurFade } from "@/components/effects/BlurFade";
import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { CardsContainer, MouseGlowCard } from "@/components/effects/MouseGlowCard";
import { ServiceModal } from "@/components/shared/ServiceModal";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import Image from "next/image";

import { fetchServices, type ServiceItem } from "@/lib/services";

export function ServicesSection() {
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const [services, setServices] = useState<ServiceItem[]>(FALLBACK_SERVICES);
  const [isLoading, setIsLoading] = useState(true);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
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
      <section id="services" className="relative py-16 sm:py-20 lg:py-28">
        <AmbientGlow size="65% 55% at 50% 12%" />
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeader
            badge={t.services.badge}
            title={t.services.title}
            titleHighlight={t.services.titleHighlight}
            description={t.services.description}
          />

          {/* Bento Grid — one shared mouse broker lights the whole grid. */}
          <CardsContainer className="grid auto-rows-[minmax(150px,auto)] grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {isLoading && services.length === 0
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={`service-skeleton-${i}`}
                    className="h-full min-h-[150px] animate-pulse rounded-3xl border border-slate-200 bg-white"
                  />
                ))
              : null}
            {services.map((service, i) => {
              const Icon = service.icon;
              const isLarge = service.size === "large";

              return (
                <BlurFade key={service.id} delay={i * 0.06} className={cn(isLarge && "sm:col-span-2 lg:col-span-1")}>
                  <MouseGlowCard
                    as="button"
                    onClick={() => setActiveService(service)}
                    className="h-full w-full cursor-pointer text-left transition-transform duration-300 hover:-translate-y-1.5"
                    innerClassName="flex flex-col p-2.5 sm:p-4"
                    data-testid="service-card"
                  >
                    {/* Image section */}
                    <div
                      className={cn(
                        "relative mb-3 w-full shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-slate-100",
                        isLarge ? "h-36 sm:h-44 lg:h-52" : "h-28 sm:h-36 lg:h-40"
                      )}
                    >
                      {service.imageUrl && !failedImages.has(service.id) ? (
                        <Image
                          src={service.imageUrl}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 400px"
                          onError={() =>
                            setFailedImages((prev) => new Set(prev).add(service.id))
                          }
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-100 to-violet-100">
                          <Icon className="h-10 w-10 text-amber-400" />
                        </div>
                      )}

                      {/* Floating Icon badge */}
                      <div className="absolute left-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/60 bg-white/90 backdrop-blur-sm">
                        <Icon className="h-5 w-5 text-amber-500" />
                      </div>

                      {/* Floating Arrow */}
                      <span className="absolute right-2.5 top-2.5 flex h-7.5 w-7.5 items-center justify-center rounded-full border border-slate-200/60 bg-white/90 text-slate-500 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:text-amber-500">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3
                          className={cn(
                            "mt-1 font-bold leading-tight tracking-tight text-slate-900",
                            isLarge ? "text-base sm:text-lg" : "text-sm sm:text-base"
                          )}
                        >
                          {service.title}
                        </h3>
                        <p
                          className={cn(
                            "mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm",
                            isLarge ? "line-clamp-2 sm:line-clamp-3" : "line-clamp-2"
                          )}
                        >
                          {service.description}
                        </p>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-2">
                        <div className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[9px] sm:text-[10px]">
                          <span className="font-medium text-amber-600/80">Mulai</span>
                          <span className="font-black text-amber-600">
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 0,
                            }).format(service.startingPrice)}
                          </span>
                        </div>
                        <span className="whitespace-nowrap rounded-md bg-violet-50 px-2 py-0.5 text-[9px] font-semibold text-violet-600 sm:text-[10px]">
                          {service.deliveryTime}
                        </span>
                      </div>
                    </div>
                  </MouseGlowCard>
                </BlurFade>
              );
            })}
          </CardsContainer>
        </div>
      </section>

      {/* Service Modal */}
      <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
    </>
  );
}
