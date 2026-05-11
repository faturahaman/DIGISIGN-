"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Track active section
      const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
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

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed left-1/2 top-4 z-50 -translate-x-1/2",
          "flex items-center justify-between gap-6",
          "rounded-full border border-white/10 px-5 py-2.5",
          "backdrop-blur-xl transition-all duration-300",
          scrolled
            ? "bg-[#050816]/90 shadow-[0_0_30px_rgba(37,99,235,0.12)]"
            : "bg-[#050816]/60"
        )}
        style={{ width: "min(92vw, 720px)" }}
      >
        {/* Logo */}
        <button
          onClick={() => handleNavClick("#home")}
          className="flex shrink-0 items-center gap-2 font-bold text-white"
          aria-label="DiGiSign home"
        >
          <Image
            src="/logo.png"
            alt="DiGiSign logo"
            width={120}
            height={80}
            className="h-8 w-auto object-contain"
            priority
          />
          <span className="text-sm font-semibold tracking-wide">DiGiSign</span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-0.5 md:flex">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "relative rounded-full px-4 py-1.5 text-sm transition-all duration-200",
                    isActive
                      ? "text-white"
                      : "text-[#94A3B8] hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/8"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* CTA + hamburger */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            onClick={() => handleNavClick("#contact")}
            className="hidden rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-1.5 text-sm font-medium text-white transition-all hover:opacity-90 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] md:block"
          >
            Get Started
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:bg-white/5 md:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="h-4 w-4" />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="h-4 w-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed right-0 top-0 z-50 flex h-full w-[min(80vw,300px)] flex-col border-l border-white/10 bg-[#050816]/98 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">
                <div className="flex items-center gap-2">
                  <Image src="/logo.png" alt="DiGiSign logo" width={105} height={70} className="h-7 w-auto object-contain" />
                  <span className="font-semibold text-white">DiGiSign</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:bg-white/5"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <nav className="flex flex-col gap-1 p-4">
                {NAV_LINKS.map((link, i) => {
                  const id = link.href.replace("#", "");
                  const isActive = activeSection === id;
                  return (
                    <motion.button
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.05, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => handleNavClick(link.href)}
                      className={cn(
                        "rounded-xl px-4 py-3 text-left text-base transition-all",
                        isActive
                          ? "bg-white/8 text-white"
                          : "text-[#94A3B8] hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {link.label}
                    </motion.button>
                  );
                })}
              </nav>

              <div className="mt-auto border-t border-white/5 p-4">
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-3.5 text-center font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-opacity hover:opacity-90"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
