"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { BlurFade } from "@/components/effects/BlurFade";
import { ServiceModal } from "@/components/shared/ServiceModal";
import { cn } from "@/lib/utils";

type ServiceItem = (typeof SERVICES)[number];

export function ServicesSection() {
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);

  return (
    <>
      <section id="services" className="relative bg-[#050816] py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Our Services"
            title="Everything You Need to"
            titleHighlight="Stand Out"
            description="Dari desain grafis yang memukau hingga website yang powerful — kami menghadirkan solusi digital lengkap untuk bisnis Anda."
          />

          {/* Bento Grid */}
          <div className="grid auto-rows-[minmax(160px,auto)] grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              const isLarge = service.size === "large";

              return (
                <BlurFade key={service.id} delay={i * 0.06}>
                  <motion.article
                    whileHover={{ scale: 1.015, y: -2 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => setActiveService(service)}
                    className={cn(
                      "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#0B1120] p-5 cursor-pointer",
                      "transition-all duration-300",
                      "hover:border-blue-500/25 hover:shadow-[0_8px_40px_rgba(37,99,235,0.12)]",
                      isLarge && "sm:col-span-2 sm:p-6"
                    )}
                    data-testid="service-card"
                  >
                    {/* Gradient background on hover */}
                    <div
                      className={cn(
                        "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                        `bg-gradient-to-br ${service.gradient}`
                      )}
                    />

                    {/* Top row: icon + arrow */}
                    <div className="relative mb-4 flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-blue-500/30 group-hover:bg-blue-500/10 sm:h-12 sm:w-12">
                        <Icon className="h-5 w-5 text-blue-400 sm:h-6 sm:w-6" />
                      </div>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/8 bg-white/3 text-[#94A3B8] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:border-blue-500/30 group-hover:text-blue-400">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>

                    {/* Content */}
                    <div className="relative mt-auto">
                      <h3 className={cn("font-semibold text-white", isLarge ? "text-lg sm:text-xl" : "text-base")}>
                        {service.title}
                      </h3>
                      <p className={cn("mt-2 leading-relaxed text-[#94A3B8]", isLarge ? "text-sm sm:text-base" : "text-sm")}>
                        {service.description}
                      </p>

                      {/* Starting price badge */}
                      <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 opacity-0 transition-all duration-300 group-hover:opacity-100">
                        <span className="text-xs font-medium text-blue-300">
                          Mulai {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(service.startingPrice)}
                        </span>
                        <span className="text-[10px] text-blue-400/60">· Lihat detail</span>
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500 group-hover:w-full" />
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
