"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const NAV_KEYS = ["home", "services", "portfolio", "testimonials", "contact"] as const;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { lang, t, toggleLanguage } = useLanguage();

  useEffect(() => {
    let frameId: number | null = null;

    const handleScroll = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        setScrolled(scrollY > 20);

        const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
        for (const id of [...sections].reverse()) {
          const el = document.getElementById(id);
          if (el && scrollY >= el.offsetTop - 120) {
            setActiveSection(id);
            break;
          }
        }

        frameId = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navLabels = [
    t.nav.home,
    t.nav.services,
    t.nav.vision,
    t.nav.portfolio,
    t.nav.testimonials,
    t.nav.contact,
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-200 py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("#home")}
            className="flex shrink-0 items-center gap-2 font-bold text-slate-900"
            aria-label="Arvion home"
          >
            <Image
              src="/arvion.png"
              alt="Arvion logo"
              width={120}
              height={80}
              className="h-8 w-auto object-contain"
              priority
            />
            <span className="text-xl font-bold tracking-tight text-slate-900">Arvion Creative</span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link, i) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={cn(
                      "relative rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "text-orange-600 bg-orange-50"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    {navLabels[i]}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* CTA + language toggle + hamburger */}
          <div className="flex shrink-0 items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              aria-label={lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
              className="hidden md:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900"
            >
              <div className="flex items-center gap-1.5">
                <img src="https://flagcdn.com/id.svg" alt="ID" className={cn("w-4 h-3 rounded-xs object-cover transition-opacity", lang === "id" ? "opacity-100" : "opacity-40 grayscale")} />
                <span className={cn("transition-opacity", lang === "id" ? "text-slate-900" : "text-slate-400")}>ID</span>
              </div>
              <span className="text-slate-200">|</span>
              <div className="flex items-center gap-1.5">
                <img src="https://flagcdn.com/gb.svg" alt="EN" className={cn("w-4 h-3 rounded-xs object-cover transition-opacity", lang === "en" ? "opacity-100" : "opacity-40 grayscale")} />
                <span className={cn("transition-opacity", lang === "en" ? "text-slate-900" : "text-slate-400")}>EN</span>
              </div>
            </button>

            <button
              onClick={() => handleNavClick("#contact")}
              className="hidden rounded-full bg-linear-to-r from-orange-500 to-purple-600 px-5 py-2 text-sm font-medium text-white shadow-md transition-all hover:opacity-90 hover:shadow-lg md:block"
            >
              {t.nav.getStarted}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 transition-colors hover:bg-slate-50 md:hidden"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-opacity duration-200",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />
      <div
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-[85vw] max-w-[320px] flex-col bg-white shadow-2xl md:hidden transition-transform duration-200 ease-out will-change-transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-2">
            <Image src="/arvion.png" alt="Arvion logo" width={105} height={70} className="h-7 w-auto object-contain" />
            <span className="font-bold text-slate-900 text-lg">Arvion</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex flex-col gap-2 p-6 overflow-y-auto">
          {NAV_LINKS.map((link, i) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 + 0.05, duration: 0.25, ease: "easeOut" }}
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  "rounded-xl px-4 py-3 text-left text-base font-medium transition-all",
                  isActive
                    ? "bg-orange-50 text-orange-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                {navLabels[i]}
              </motion.button>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-slate-100 p-6 flex flex-col gap-3">
          {/* Mobile language toggle */}
          <button
            onClick={toggleLanguage}
            className="w-full flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <img src="https://flagcdn.com/id.svg" alt="ID" className={cn("w-5 h-3.5 rounded-xs object-cover transition-opacity", lang === "id" ? "opacity-100" : "opacity-40 grayscale")} />
              <span className={cn(lang === "id" ? "text-orange-600" : "text-slate-400")}>ID</span>
            </div>
            <span className="text-slate-200">|</span>
            <div className="flex items-center gap-2">
              <img src="https://flagcdn.com/gb.svg" alt="EN" className={cn("w-5 h-3.5 rounded-xs object-cover transition-opacity", lang === "en" ? "opacity-100" : "opacity-40 grayscale")} />
              <span className={cn(lang === "en" ? "text-orange-600" : "text-slate-400")}>EN</span>
            </div>
          </button>

          <button
            onClick={() => handleNavClick("#contact")}
            className="w-full rounded-xl bg-linear-to-r from-orange-500 to-purple-600 py-3.5 text-center font-bold text-white shadow-md transition-opacity hover:opacity-90"
          >
            {t.nav.getStarted}
          </button>
        </div>
      </div>
    </>
  );
}
