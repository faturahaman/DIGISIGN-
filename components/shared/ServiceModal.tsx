"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Clock, MessageCircle, ArrowRight } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
    const msg = encodeURIComponent(
      `Halo DiGiSign! Saya tertarik dengan layanan *${service.title}* yang ditawarkan. Bisa berikan info lebih detail mengenai harga dan prosesnya?`
    );
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
            aria-label={`Detail layanan ${service.title}`}
          >
            {/* Modal Panel */}
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg max-h-[85vh] flex flex-col overflow-y-auto overflow-x-hidden rounded-2xl border border-white/10 bg-[#0B1120] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header dengan Gradient & Background Image */}
              <div className="relative px-6 pt-6 pb-5 shrink-0 overflow-hidden">
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
                    {/* Extra gradient overlay agar teks tetap terbaca */}
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
                      <h2 className="text-xl font-bold text-white leading-tight drop-shadow-md">{service.title}</h2>
                      <p className="mt-1 text-sm text-white/80 leading-relaxed drop-shadow-md">{service.description}</p>
                    </div>

                    {/* Close button */}
                    <button
                      onClick={onClose}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/80 transition-all hover:bg-white/20 hover:text-white"
                      aria-label="Tutup modal"
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
                      <p className="mt-0.5 text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">
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
                <p className="mb-4 text-sm text-[#94A3B8] leading-relaxed border-l-2 border-blue-500/50 pl-3 italic">
                  {service.highlight}
                </p>

                {/* Features */}
                <div className="mb-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                    Yang Kamu Dapatkan
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-blue-500/15 ring-1 ring-blue-500/30">
                          <Check className="h-2.5 w-2.5 text-blue-400" />
                        </span>
                        <span className="text-sm text-[#CBD5E1]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Note */}
                <p className="mb-5 text-xs text-[#475569]">
                  * Harga bisa bervariasi tergantung kebutuhan spesifik proyek Anda. Hubungi kami untuk konsultasi gratis.
                </p>

                {/* CTA Button */}
                <button
                  onClick={handleWhatsApp}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition-all duration-300 hover:from-blue-500 hover:to-violet-500 hover:shadow-blue-800/40 hover:scale-[1.02]"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Konsultasi via WhatsApp</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
