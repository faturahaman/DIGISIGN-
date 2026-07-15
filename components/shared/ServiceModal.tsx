"use client";

import { useEffect, useRef, useState } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  // Check screen width for mobile optimization
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  const modalVariants = {
    initial: {
      opacity: 0,
      y: isMobile ? 16 : 32,
      scale: isMobile ? 1 : 0.96,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: isMobile ? 0.18 : 0.22,
        ease: isMobile ? ([0.22, 1, 0.36, 1] as const) : ([0.22, 1, 0.36, 1] as const),
      },
    },
    exit: {
      opacity: 0,
      y: isMobile ? 12 : 24,
      scale: isMobile ? 1 : 0.96,
      transition: {
        duration: isMobile ? 0.14 : 0.18,
        ease: isMobile ? ([0.22, 1, 0.36, 1] as const) : ([0.22, 1, 0.36, 1] as const),
      },
    },
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
            transition={{ duration: isMobile ? 0.16 : 0.2 }}
            style={{ willChange: "opacity" }}
            onClick={handleOverlayClick}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm"
            aria-modal="true"
            role="dialog"
            aria-label={`${service.title}`}
          >
            {/* Modal Panel */}
            <motion.div
              variants={modalVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{ willChange: "transform, opacity" }}
              className="relative w-full max-w-[88vw] sm:max-w-lg max-h-[52vh] sm:max-h-[85vh] flex flex-col overflow-y-auto overflow-x-hidden rounded-2xl border border-border bg-white shadow-2xl transform-gpu"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with Gradient & Background Image */}
              <div className="relative px-4 sm:px-6 pt-4 sm:pt-6 pb-4 sm:pb-5 shrink-0 overflow-hidden text-slate-900">
                {/* Background Layer */}
                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-40 mix-blend-multiply", service.gradient)} />
                
                {service.imageUrl && (
                  <div className="absolute inset-0">
                      <Image
                        src={service.imageUrl}
                        alt={service.title}
                        fill
                        priority
                        className="object-cover opacity-70 brightness-105"
                        sizes="(max-width: 768px) 100vw, 512px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/30 to-transparent" />
                      <div className="absolute inset-0 bg-white/10 pointer-events-none" />
                    </div>
                )}

                {/* Header Content */}
                <div className="relative z-10">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-white/60">
                      <service.icon className="h-6 w-6 text-slate-700" />
                    </div>

                      <div className="flex-1 min-w-0">
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">{service.title}</h2>
                    </div>

                    {/* Close button */}
                    <button
                      onClick={onClose}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-white/60 text-slate-700 transition-all hover:bg-white/70"
                      aria-label={t.modal.closeModal}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Price Badge */}
                  <div className="mt-5 flex items-end gap-3">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-600">
                        {service.priceLabel}
                      </p>
                      <p className="mt-0.5 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        {formatRupiah(service.startingPrice)}
                      </p>
                    </div>
                    <div className="mb-1 flex items-center gap-1.5 rounded-full border border-border bg-white/60 px-3 py-1">
                      <Clock className="h-3.5 w-3.5 text-slate-700" />
                      <span className="text-xs font-medium text-slate-700">{service.deliveryTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="px-6 py-5">
                {/* Highlight */}
                <p className="mb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-l-2 border-blue-500/30 pl-3 italic">
                  {service.highlight}
                </p>

                {/* Packages Table */}
                {service.packages && (
                  <div className="mb-6 overflow-hidden rounded-xl border border-border bg-white/60">
                    <div className="bg-slate-100 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-slate-500 border-b border-border flex justify-between">
                      <span>{t.modal.packages}</span>
                      <span>{t.modal.marketPrice}</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {service.packages.map((pkg, i) => (
                        <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-all group/pkg">
                          <div className="flex-1 pr-4">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-tighter ring-1 ring-blue-200">
                                {pkg.name}
                              </span>
                              <span className="text-slate-900 font-bold text-sm">{pkg.price}</span>
                            </div>
                            <p className="text-[11px] text-slate-600 leading-tight">
                              {pkg.target}
                            </p>
                          </div>
                          <button 
                            onClick={() => handlePackageOrder(pkg.name, pkg.price)}
                            className="shrink-0 flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-2 rounded-lg text-xs font-bold transition-all shadow-[0_0_15px_rgba(37,99,235,0.15)] active:scale-95"
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
                  <div className="mb-6 p-4 rounded-xl border border-violet-100 bg-gradient-to-br from-violet-50 to-blue-50 relative overflow-hidden group shadow-sm">
                    <div className="absolute -right-2 -bottom-2 opacity-10 group-hover:opacity-20 transition-all duration-500 rotate-12 group-hover:rotate-0">
                      <GraduationCap className="w-16 h-16 text-violet-400" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-500 text-white">
                          <GraduationCap className="h-3 w-3" />
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-violet-600">{t.modal.studentPricing}</span>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <h4 className="text-xl font-black text-slate-900 leading-none tracking-tight">{service.studentPricing.price}</h4>
                          <p className="text-[10px] text-violet-600/70 mt-1.5 font-medium italic">{t.modal.studentNote}</p>
                        </div>
                        <button 
                          onClick={() => handlePackageOrder("Pelajar (" + service.studentPricing!.name + ")", service.studentPricing!.price)}
                          className="flex items-center gap-2 bg-white text-violet-900 hover:bg-violet-50 text-xs px-4 py-2.5 rounded-lg font-black shadow transition-all active:scale-95"
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
                  <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-600">
                    {t.modal.features}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-50 ring-1 ring-blue-200">
                          <Check className="h-2 w-2 text-blue-500" />
                        </span>
                        <span className="text-[12px] text-slate-600 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleWhatsApp}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 border border-border px-5 py-4 text-sm font-bold text-white transition-all duration-200 hover:opacity-95 active:scale-95"
                  >
                    <MessageCircle className="h-4 w-4 text-white" />
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
