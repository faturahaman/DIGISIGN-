"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SITE_BRAND } from "@/data/siteContent";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Footer() {
  const { lang } = useLanguage();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setSubmitted(true);
    setEmail("");
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-[#171A22] text-white pt-20 pb-12 border-t border-slate-800">
      <div className="container-arvion">
        {/* 4-Column Layout matching Reference Photo 7 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-slate-800/80">
          {/* Column 1: Brand Logo & Description */}
          <div className="lg:col-span-4">
            <a
              href="#home"
              onClick={(e) => handleScrollTo(e, "home")}
              className="inline-block mb-5"
            >
              <div className="h-12 sm:h-14 w-auto flex items-center">
                <Image
                  src={SITE_BRAND.logoUrl}
                  alt="Arvion Creative"
                  width={210}
                  height={52}
                  className="h-12 sm:h-14 w-auto object-contain brightness-0 invert"
                />
              </div>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {lang === "id"
                ? "Mengubah ide menjadi pengalaman digital yang bermakna. Pemikiran kreatif, desain matang, dan teknologi yang bertujuan."
                : "Turning ideas into meaningful digital experiences. Creative thinking, thoughtful design, and purposeful technology."}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white mb-5 tracking-tight">
              {lang === "id" ? "Tautan Cepat" : "Quick Links"}
            </h4>
            <ul className="space-y-3">
              {[
                { label: lang === "id" ? "Beranda" : "Home", id: "home" },
                { label: lang === "id" ? "Layanan" : "Services", id: "services" },
                { label: lang === "id" ? "Proyek" : "Projects", id: "projects" },
                { label: lang === "id" ? "Proses Kami" : "Our Process", id: "process" },
                { label: lang === "id" ? "Kontak" : "Contact", id: "contact" },
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleScrollTo(e, item.id)}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: What We Do */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white mb-5 tracking-tight">
              {lang === "id" ? "Yang Kami Kerjakan" : "What We Do"}
            </h4>
            <ul className="space-y-3">
              {[
                lang === "id" ? "Desain UI/UX" : "UI/UX Design",
                lang === "id" ? "Pengembangan Website" : "Web Development",
                lang === "id" ? "Identitas Brand" : "Brand Identity",
                lang === "id" ? "Desain Aplikasi Mobile" : "Mobile App Design",
                lang === "id" ? "Strategi Kreatif" : "Creative Strategy",
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    onClick={(e) => handleScrollTo(e, "services")}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Stay Connected / Newsletter Capsule Form */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white mb-5 tracking-tight">
              {lang === "id" ? "Tetap Terhubung" : "Stay Connected"}
            </h4>
            <p className="text-sm text-slate-400 mb-5 leading-relaxed">
              {lang === "id"
                ? "Dapatkan wawasan kreatif dan kabar terbaru langsung ke email Anda."
                : "Get creative insights and updates straight to your inbox."}
            </p>

            {/* Newsletter Pill Input matching Reference Photo 7 */}
            {submitted ? (
              <p className="text-xs text-emerald-400 font-medium">
                {lang === "id" ? "Terima kasih telah berlangganan!" : "Thank you for subscribing!"}
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={lang === "id" ? "Alamat email Anda" : "Your email address"}
                  className="w-full bg-white text-[#171A22] placeholder-slate-400 text-xs sm:text-sm pl-4 pr-12 py-3 rounded-xl focus:outline-hidden"
                  required
                />
                <button
                  type="submit"
                  aria-label={lang === "id" ? "Berlangganan" : "Subscribe"}
                  className="absolute right-1 top-1 bottom-1 px-3.5 bg-[#F47721] hover:bg-[#e06512] text-white rounded-lg flex items-center justify-center transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Tagline matching Reference Photo 7 */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Arvion Creative. {lang === "id" ? "Hak cipta dilindungi." : "All rights reserved."}</p>
          <p>{lang === "id" ? "Dibuat dengan niat & kreativitas." : "Made with intention & creativity."}</p>
        </div>
      </div>
    </footer>
  );
}
