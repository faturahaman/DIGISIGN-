"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Clock, MessageCircle, ArrowRight, GraduationCap } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  imageUrl?: string;
  startingPrice: number;
  priceLabel: string;
  deliveryTime: string;
  features: string[];
  highlight: string;
  packages?: {
    name: string;
    price: string;
    target: string;
    features: string[];
  }[];
  studentPricing?: {
    name: string;
    price: string;
    features: string[];
  };
}

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function ServiceModal({ service, onClose }: ServiceModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (service) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [service, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (service) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [service]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleWhatsApp = () => {
    if (!service) return;
    const msg = encodeURIComponent(t.modal.orderMessage(service.title));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  const handlePackageOrder = (pkgName: string, price: string) => {
    if (!service) return;
    const msg = encodeURIComponent(t.modal.packageOrderMessage(pkgName, service.title, price));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <AnimatePresence>
      {service && (
        <>
          {/* Backdrop */}
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleOverlayClick}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#050816]/90"
            aria-modal="true"
            role="dialog"
            aria-label={`${service.title}`}
          >
            {/* Modal Panel */}
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[88vw] sm:max-w-lg max-h-[60vh] sm:max-h-[85vh] flex flex-col overflow-y-auto overflow-x-hidden rounded-2xl border border-white/10 bg-[#0B1120] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with Gradient & Background Image */}
              <div className="relative px-4 sm:px-6 pt-4 sm:pt-6 pb-4 sm:pb-5 shrink-0 overflow-hidden">
                {/* Background Layer */}
                <div className={cn("absolute inset-0 bg-gradient-to-br", service.gradient)} />
                
                {service.imageUrl && (
                  <div className="absolute inset-0">
                    <Image
                      src={service.imageUrl}
                      alt={service.title}
                      fill
                      priority
                      className="object-cover opacity-25"
                      sizes="(max-width: 768px) 100vw, 512px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/80 to-transparent" />
                  </div>
                )}

                {/* Header Content */}
                <div className="relative z-10">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg sm:text-xl font-bold text-white leading-tight drop-shadow-md">{service.title}</h2>
                      <p className="mt-1 text-xs sm:text-sm text-white/80 leading-tight drop-shadow-md">{service.description}</p>
                    </div>

                    {/* Close button */}
                    <button
                      onClick={onClose}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/80 transition-all hover:bg-white/20 hover:text-white"
                      aria-label={t.modal.closeModal}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Price Badge */}
                  <div className="mt-5 flex items-end gap-3">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-white/70 drop-shadow-md">
                        {service.priceLabel}
                      </p>
                      <p className="mt-0.5 text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">
                        {formatRupiah(service.startingPrice)}
                      </p>
                    </div>
                    <div className="mb-1 flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1">
                      <Clock className="h-3.5 w-3.5 text-white/80" />
                      <span className="text-xs font-medium text-white drop-shadow-md">{service.deliveryTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="px-6 py-5">
                {/* Highlight */}
                <p className="mb-4 text-xs sm:text-sm text-[#94A3B8] leading-relaxed border-l-2 border-blue-500/50 pl-3 italic">
                  {service.highlight}
                </p>

                {/* Packages Table */}
                {service.packages && (
                  <div className="mb-6 overflow-hidden rounded-xl border border-white/10 bg-[#050816]/60 shadow-inner">
                    <div className="bg-white/5 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white/50 border-b border-white/10 flex justify-between">
                      <span>{t.modal.packages}</span>
                      <span>{t.modal.marketPrice}</span>
                    </div>
                    <div className="divide-y divide-white/5">
                      {service.packages.map((pkg, i) => (
                        <div key={i} className="flex items-center justify-between p-4 hover:bg-white/5 transition-all group/pkg">
                          <div className="flex-1 pr-4">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-tighter ring-1 ring-blue-500/20">
                                {pkg.name}
                              </span>
                              <span className="text-white font-bold text-sm">{pkg.price}</span>
                            </div>
                            <p className="text-[11px] text-[#64748B] leading-tight line-clamp-1 group-hover/pkg:line-clamp-none transition-all">
                              {pkg.target}
                            </p>
                          </div>
                          <button 
                            onClick={() => handlePackageOrder(pkg.name, pkg.price)}
                            className="shrink-0 flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-2 rounded-lg text-xs font-bold transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)] active:scale-95"
                          >
                            {t.modal.order}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Student Pricing Section */}
                {service.studentPricing && (
                  <div className="mb-6 p-4 rounded-xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-blue-500/10 relative overflow-hidden group shadow-lg shadow-violet-900/20">
                    <div className="absolute -right-2 -bottom-2 opacity-10 group-hover:opacity-20 transition-all duration-500 rotate-12 group-hover:rotate-0">
                      <GraduationCap className="w-16 h-16 text-violet-400" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-500 text-white">
                          <GraduationCap className="h-3 w-3" />
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-violet-400">{t.modal.studentPricing}</span>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <h4 className="text-xl font-black text-white leading-none tracking-tight">{service.studentPricing.price}</h4>
                          <p className="text-[10px] text-violet-300/70 mt-1.5 font-medium italic">{t.modal.studentNote}</p>
                        </div>
                        <button 
                          onClick={() => handlePackageOrder("Pelajar (" + service.studentPricing!.name + ")", service.studentPricing!.price)}
                          className="flex items-center gap-2 bg-white text-violet-900 hover:bg-violet-50 text-xs px-4 py-2.5 rounded-lg font-black shadow-xl shadow-violet-900/40 transition-all active:scale-95"
                        >
                          <ArrowRight className="h-3.5 w-3.5" />
                          {t.modal.takePromo}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Features */}
                <div className="mb-6">
                  <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-[#475569]">
                    {t.modal.features}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-500/10 ring-1 ring-blue-500/20">
                          <Check className="h-2 w-2 text-blue-400" />
                        </span>
                        <span className="text-[12px] text-[#94A3B8] font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleWhatsApp}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#1E293B] border border-white/10 px-5 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-white/5 hover:border-white/20"
                  >
                    <MessageCircle className="h-4 w-4 text-blue-400" />
                    <span>{t.modal.consultOnly}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
