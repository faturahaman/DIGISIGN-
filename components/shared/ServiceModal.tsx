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
              className="relative w-full max-w-[88vw] sm:max-w-lg max-h-[85vh] flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-2xl transform-gpu"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Banner */}
              <div className="relative w-full h-44 sm:h-52 shrink-0 bg-slate-100 overflow-hidden">
                {/* Gradient Overlay behind image */}
                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 z-0", service.gradient)} />
                
                {service.imageUrl && (
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    priority
                    className="object-cover relative z-10"
                    sizes="(max-width: 768px) 100vw, 512px"
                  />
                )}
                
                {/* Shadow gradient on bottom of image for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-20" />

                {/* Close button - absolute top right */}
                <button
                  onClick={onClose}
                  className="absolute top-3.5 right-3.5 z-30 flex h-8.5 w-8.5 items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20 transition-all hover:bg-black/60 active:scale-95"
                  aria-label={t.modal.closeModal}
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Floating Service Icon */}
                <div className="absolute bottom-3 left-4 z-30 flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-lg border border-slate-100">
                  <service.icon className="h-5.5 w-5.5 text-orange-500" />
                </div>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                {/* Title & Price */}
                <div className="mb-5">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight tracking-tight">{service.title}</h2>
                  
                  <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        {service.priceLabel}
                      </span>
                      <p className="mt-1 text-2xl font-black text-orange-600 tracking-tight leading-none">
                        {formatRupiah(service.startingPrice)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full border border-slate-100 bg-slate-50 px-3 py-1 shadow-2xs">
                      <Clock className="h-3.5 w-3.5 text-orange-500" />
                      <span className="text-xs font-semibold text-slate-600">{service.deliveryTime}</span>
                    </div>
                  </div>
                </div>

                {/* Highlight */}
                <p className="mb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-l-3 border-orange-500 bg-orange-50/20 p-3 rounded-r-lg italic">
                  {service.highlight}
                </p>

                {/* Packages List */}
                {service.packages && (
                  <div className="mb-6">
                    <h3 className="mb-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      {t.modal.packages}
                    </h3>
                    <div className="flex flex-col gap-3">
                      {service.packages.map((pkg, i) => (
                        <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:border-orange-200 transition-all duration-300">
                          <div className="flex-1 pr-2">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="px-2.5 py-0.5 rounded bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-wider border border-orange-100">
                                {pkg.name}
                              </span>
                              <span className="text-slate-900 font-extrabold text-sm sm:text-base">{pkg.price}</span>
                            </div>
                            <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                              {pkg.target}
                            </p>
                          </div>
                          <button 
                            onClick={() => handlePackageOrder(pkg.name, pkg.price)}
                            className="shrink-0 flex items-center justify-center gap-1 bg-linear-to-r from-orange-500 to-purple-500 hover:opacity-90 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95"
                          >
                            <span>{t.modal.order}</span>
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Student Pricing */}
                {service.studentPricing && (
                  <div className="mb-6 p-4 rounded-xl border border-violet-100 bg-linear-to-br from-violet-50/50 to-purple-50/30 relative overflow-hidden group shadow-2xs">
                    <div className="absolute -right-2 -bottom-2 opacity-10 group-hover:opacity-15 transition-all duration-500 rotate-12 group-hover:rotate-0">
                      <GraduationCap className="w-16 h-16 text-violet-400" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-500 text-white">
                          <GraduationCap className="h-3 w-3" />
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-violet-600">
                          {t.modal.studentPricing}
                        </span>
                      </div>
                      <div className="flex justify-between items-end gap-3 flex-wrap">
                        <div>
                          <h4 className="text-xl font-black text-slate-900 leading-none tracking-tight">
                            {service.studentPricing.price}
                          </h4>
                          <p className="text-[10px] text-violet-600/70 mt-1.5 font-medium italic">
                            {t.modal.studentNote}
                          </p>
                        </div>
                        <button 
                          onClick={() => handlePackageOrder("Pelajar (" + service.studentPricing!.name + ")", service.studentPricing!.price)}
                          className="flex items-center gap-2 bg-white text-violet-900 hover:bg-violet-50 text-xs px-3.5 py-2.5 rounded-xl font-bold shadow-xs border border-violet-100 transition-all active:scale-95"
                        >
                          <ArrowRight className="h-3.5 w-3.5 text-violet-600" />
                          {t.modal.takePromo}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Features */}
                <div className="mb-6">
                  <h3 className="mb-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    {t.modal.features}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                        <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-emerald-50 border border-emerald-100">
                          <Check className="h-2.5 w-2.5 text-emerald-500" />
                        </span>
                        <span className="text-[12px] text-slate-700 font-semibold">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="mt-8 border-t border-slate-100 pt-5">
                  <button
                    onClick={handleWhatsApp}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 px-5 py-4 text-sm font-bold text-white transition-all duration-200 shadow-md active:scale-95"
                  >
                    <MessageCircle className="h-4.5 w-4.5 text-white" />
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
