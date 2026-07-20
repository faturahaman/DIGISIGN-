"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { BlurFade } from "@/components/effects/BlurFade";
import { ServiceModal } from "@/components/shared/ServiceModal";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import Image from "next/image";

type ServiceItem = (typeof SERVICES)[number];

export function ServicesSection() {
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const { t } = useLanguage();

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
          <div className="grid auto-rows-[minmax(140px,auto)] grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              const isLarge = service.size === "large";

              return (
                <BlurFade key={service.id} delay={i * 0.06}>
                  <motion.article
                    whileHover={{ scale: 1.015, y: -3 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => setActiveService(service)}
                    className={cn(
                      "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4.5 cursor-pointer shadow-xs",
                      "transition-all duration-300 hover:border-orange-200 hover:shadow-md hover:bg-white",
                      isLarge && "col-span-2 sm:p-5"
                    )}
                    data-testid="service-card"
                  >
                    {/* Gradient background overlay on hover */}
                    <div
                      className={cn(
                        "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-[0.02]",
                        `bg-gradient-to-br from-orange-500 to-purple-500`
                      )}
                    />

                    <div className="flex flex-col h-full">
                      {/* Image section */}
                      <div className={cn(
                        "relative w-full overflow-hidden rounded-xl bg-slate-100 shrink-0 border border-slate-100/50 mb-3.5",
                        isLarge ? "h-44 sm:h-52" : "h-32 sm:h-40"
                      )}>
                        {service.imageUrl ? (
                          <Image
                            src={service.imageUrl}
                            alt={service.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 400px"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-purple-100 flex items-center justify-center">
                            <Icon className="h-10 w-10 text-orange-400 opacity-60" />
                          </div>
                        )}
                        
                        {/* Floating Icon badge */}
                        <div className="absolute top-2.5 left-2.5 flex h-9 w-9 items-center justify-center rounded-xl bg-white/95 backdrop-blur-xs shadow-sm border border-slate-200/50">
                          <Icon className="h-5 w-5 text-orange-500" />
                        </div>
                        
                        {/* Floating Arrow */}
                        <span className="absolute top-2.5 right-2.5 flex h-7.5 w-7.5 items-center justify-center rounded-full bg-white/95 text-slate-500 transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-sm border border-slate-100 hover:text-orange-500">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>

                      {/* Content Section */}
                      <div className="flex flex-col justify-between flex-1">
                        <div>
                          <h3 className={cn("font-bold text-slate-900 leading-tight tracking-tight mt-1", isLarge ? "text-base sm:text-lg lg:text-xl" : "text-sm sm:text-base")}>
                            {service.title}
                          </h3>
                          <p className={cn("mt-1.5 leading-relaxed text-slate-500", isLarge ? "text-xs sm:text-sm line-clamp-3 lg:line-clamp-4" : "text-xs sm:text-sm line-clamp-2")}>
                            {service.description}
                          </p>
                        </div>
                        
                        <div className="mt-3 flex items-center justify-between border-t border-slate-100/60 pt-2.5">
                          <div className="inline-flex items-center gap-1 rounded-full border border-orange-100 bg-orange-50/50 px-2.5 py-0.5 shadow-2xs">
                            <span className="text-[10px] font-medium text-orange-600">Mulai</span>
                            <span className="text-[11px] font-black text-orange-600">
                              {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(service.startingPrice)}
                            </span>
                          </div>
                          <span className="text-[10px] font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">
                            {service.deliveryTime}
                          </span>
                        </div>
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
