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

  // Scrolled state only.
  //
  // This handler used to resolve the active section too, which meant a
  // getElementById plus an offsetTop read for all six nav targets on every
  // animation frame of every scroll. offsetTop forces a synchronous layout, so
  // that was up to six reflows per frame, plus two throwaway arrays per frame
  // from the map/reverse. That work moved to the observer below. What's left is
  // one scrollY read, a value the compositor already has.
  useEffect(() => {
    let frameId: number | null = null;

    const handleScroll = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        frameId = null;
      });
    };

    // Seed it, so a reload partway down the page doesn't start untinted.
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Active section, observed rather than measured. The browser reports boundary
  // crossings on its own schedule, so scrolling costs nothing until a section
  // edge is actually reached.
  //
  // The band sits just below the navbar. Whichever observed section is lowest in
  // the document while overlapping it wins, which is the same answer the old
  // reverse() scan produced. Every target is in the server-rendered HTML — the
  // sections are code-split via next/dynamic but not ssr:false — so they all
  // resolve on the first run and there's nothing to re-query later.
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const inBand = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        }
        for (let i = ids.length - 1; i >= 0; i--) {
          if (inBand.has(ids[i])) {
            setActiveSection(ids[i]);
            return;
          }
        }
        // Nothing overlaps the band right now — it can land between two short
        // sections. Hold the last match instead of blanking the highlight.
      },
      // Top inset clears the fixed navbar, matching the old `- 120` offset. The
      // bottom inset leaves a band roughly 120px deep, which is thick enough that
      // a full-height section always overlaps it, so the gap case above stays
      // theoretical. The highlight does now switch a little earlier than the old
      // scan did — it fired when a section's top reached 120px, this fires as the
      // top enters the band below that.
      { rootMargin: "-120px 0px -70% 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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
      {/* Entrance is a CSS animation now, the same way HeroSection does it. It
          runs once and needs no JavaScript, so it no longer competes with
          hydration for the main thread on a slow phone. */}
      <nav className="fixed inset-x-0 top-0 z-50 animate-in fade-in slide-in-from-top-4 px-3 pt-3 duration-500 fill-mode-backwards sm:px-4 sm:pt-4">
        <div
          className={cn(
            // Blur and border sit out here, unconditionally, on purpose. While
            // they lived in the branches below, `transition-all` animated
            // backdrop-filter from 12px to 24px across 300ms, and the browser
            // re-blurs everything behind a fixed bar on every frame of that —
            // triggered at the exact moment the user starts scrolling. The
            // transition is now restricted to properties that are cheap to
            // paint, and the blur is lighter on phones, where the difference is
            // invisible at that size but expensive for the GPU.
            "mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border px-3 py-2 backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 md:backdrop-blur-xl",
            scrolled
              ? "border-slate-200 bg-white/80 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.25)]"
              : "border-transparent bg-white/40 shadow-none"
          )}
        >
          {/* Logo — bare, no pill */}
          <button
            onClick={() => handleNavClick("#home")}
            className="flex shrink-0 items-center gap-2 rounded-full px-1 transition-opacity hover:opacity-80"
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
      </nav>

      {/* Mobile menu — full-screen glass overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            // A 24px blur across the entire viewport is one of the most
            // expensive things a phone GPU can be asked for, and this overlay is
            // mobile-only — the one place it was guaranteed to hurt. Dropping to
            // 12px and making the white slightly more opaque reads the same while
            // costing a fraction to composite.
            className="fixed inset-0 z-40 bg-white/90 backdrop-blur-md md:hidden"
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
