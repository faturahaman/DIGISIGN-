"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";

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
    return () => {
      document.body.style.overflow = "";
    };
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
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4"
      >
        <div
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full px-3 py-2 transition-all duration-300",
            scrolled
              ? "border border-slate-200 bg-white/80 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.25)] backdrop-blur-xl"
              : "border border-transparent bg-white/40 backdrop-blur-md"
          )}
        >
          {/* Logo — in its own pill */}
          <button
            onClick={() => handleNavClick("#home")}
            className="flex shrink-0 items-center gap-2 rounded-full bg-slate-900/[0.03] px-3 py-1.5 ring-1 ring-slate-200 transition-colors hover:bg-slate-900/[0.06]"
            aria-label="Arvion home"
          >
            <Image
              src="/arvion.png"
              alt="Arvion logo"
              width={120}
              height={80}
              className="h-7 w-auto object-contain"
              priority
            />
            <span className="text-base font-bold tracking-tight text-slate-900">
              Arvion
            </span>
          </button>

          {/* Desktop nav — glass pill of links */}
          <ul className="hidden items-center gap-0.5 rounded-full bg-slate-900/[0.03] p-1 ring-1 ring-slate-200/70 md:flex">
            {NAV_LINKS.map((link, i) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={cn(
                      "relative rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-200",
                      isActive
                        ? "text-amber-600"
                        : "text-slate-600 hover:text-slate-900"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-amber-400/15 ring-1 ring-amber-400/40"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {navLabels[i]}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* CTA + language toggle + hamburger */}
          <div className="flex shrink-0 items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              aria-label={
                lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"
              }
              className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 md:flex"
            >
              <div className="flex items-center gap-1.5">
                <img
                  src="https://flagcdn.com/id.svg"
                  alt="ID"
                  width={16}
                  height={12}
                  loading="lazy"
                  decoding="async"
                  className={cn(
                    "h-3 w-4 rounded-xs object-cover transition-opacity",
                    lang === "id" ? "opacity-100" : "opacity-40 grayscale"
                  )}
                />
                <span className={lang === "id" ? "text-slate-900" : "text-slate-400"}>
                  ID
                </span>
              </div>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-1.5">
                <img
                  src="https://flagcdn.com/gb.svg"
                  alt="EN"
                  width={16}
                  height={12}
                  loading="lazy"
                  decoding="async"
                  className={cn(
                    "h-3 w-4 rounded-xs object-cover transition-opacity",
                    lang === "en" ? "opacity-100" : "opacity-40 grayscale"
                  )}
                />
                <span className={lang === "en" ? "text-slate-900" : "text-slate-400"}>
                  EN
                </span>
              </div>
            </button>

            <button
              onClick={() => handleNavClick("#contact")}
              className="hidden rounded-full bg-amber-500 px-5 py-2 text-sm font-bold uppercase tracking-wide text-white shadow-[0_8px_20px_-6px_rgba(245,158,11,0.55)] transition-all hover:bg-amber-600 hover:shadow-[0_10px_26px_-6px_rgba(245,158,11,0.7)] md:block"
            >
              {t.nav.getStarted}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm transition-colors hover:bg-slate-50 md:hidden"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu — full-screen glass overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white/80 backdrop-blur-xl md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex h-full flex-col px-6 pb-8 pt-24" onClick={(e) => e.stopPropagation()}>
              <nav className="flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => {
                  const id = link.href.replace("#", "");
                  const isActive = activeSection === id;
                  return (
                    <motion.button
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: i * 0.05 + 0.05,
                        duration: 0.25,
                        ease: "easeOut",
                      }}
                      onClick={() => handleNavClick(link.href)}
                      className={cn(
                        "rounded-2xl px-5 py-4 text-left text-lg font-bold transition-all",
                        isActive
                          ? "bg-amber-400/15 text-amber-600 ring-1 ring-amber-400/40"
                          : "text-slate-600 hover:bg-slate-900/5 hover:text-slate-900"
                      )}
                    >
                      {navLabels[i]}
                    </motion.button>
                  );
                })}
              </nav>

              <div className="mt-auto flex flex-col gap-3">
                {/* Mobile language toggle */}
                <button
                  onClick={toggleLanguage}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white py-3.5 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:bg-slate-50"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src="https://flagcdn.com/id.svg"
                      alt="ID"
                      width={20}
                      height={14}
                      loading="lazy"
                      decoding="async"
                      className={cn(
                        "h-3.5 w-5 rounded-xs object-cover transition-opacity",
                        lang === "id" ? "opacity-100" : "opacity-40 grayscale"
                      )}
                    />
                    <span className={lang === "id" ? "text-amber-600" : "text-slate-400"}>
                      ID
                    </span>
                  </div>
                  <span className="text-slate-300">|</span>
                  <div className="flex items-center gap-2">
                    <img
                      src="https://flagcdn.com/gb.svg"
                      alt="EN"
                      width={20}
                      height={14}
                      loading="lazy"
                      decoding="async"
                      className={cn(
                        "h-3.5 w-5 rounded-xs object-cover transition-opacity",
                        lang === "en" ? "opacity-100" : "opacity-40 grayscale"
                      )}
                    />
                    <span className={lang === "en" ? "text-amber-600" : "text-slate-400"}>
                      EN
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => handleNavClick("#contact")}
                  className="w-full rounded-2xl bg-amber-500 py-4 text-center font-bold uppercase tracking-wide text-white shadow-[0_10px_24px_-8px_rgba(245,158,11,0.6)] transition-all hover:bg-amber-600"
                >
                  {t.nav.getStarted}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
