"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_ITEMS, SITE_BRAND } from "@/data/siteContent";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function LanguageSwitch({
  lang,
  setLanguage,
  className = "",
}: {
  lang: "id" | "en";
  setLanguage: (lang: "id" | "en") => void;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center rounded-xl border border-[#ECEEF1] bg-white p-1 shadow-xs ${className}`}
      aria-label={lang === "id" ? "Pilihan bahasa" : "Language selection"}
    >
      <button
        type="button"
        onClick={() => setLanguage("id")}
        className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-colors ${
          lang === "id"
            ? "bg-[#FFF3E9] text-[#F47721]"
            : "text-[#707581] hover:text-[#171A22]"
        }`}
        aria-pressed={lang === "id"}
      >
        <span aria-hidden="true">ID</span>
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-colors ${
          lang === "en"
            ? "bg-[#FFF3E9] text-[#F47721]"
            : "text-[#707581] hover:text-[#171A22]"
        }`}
        aria-pressed={lang === "en"}
      >
        <span aria-hidden="true">EN</span>
      </button>
    </div>
  );
}

export function Navbar() {
  const { lang, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_ITEMS.map((item) => item.href.replace("#", ""));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          visibleEntries.sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio
          );
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -40% 0px",
        threshold: [0.1, 0.3, 0.6],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const id = href.replace("#", "");
    const target = document.getElementById(id);
    if (target) {
      const topOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  const navLabels: Record<string, string> = {
    "#home": t.nav.home,
    "#about": lang === "id" ? "Tentang" : "About",
    "#services": t.nav.services,
    "#projects": lang === "id" ? "Proyek" : "Projects",
    "#process": lang === "id" ? "Proses" : "Process",
    "#contact": t.nav.contact,
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[#ECEEF1] shadow-xs py-3.5"
          : "bg-white/80 backdrop-blur-xs py-5 border-b border-transparent"
      }`}
    >
      <div className="container-arvion flex items-center justify-between">
        {/* Brand Logo on the left corner */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="flex items-center gap-2 group transition-opacity hover:opacity-90 shrink-0"
          aria-label="Arvion Creative Home"
        >
          <div className="relative h-12 sm:h-14 w-auto flex items-center">
            <Image
              src={SITE_BRAND.logoUrl}
              alt="Arvion Creative"
              width={210}
              height={52}
              priority
              className="h-12 sm:h-14 w-auto object-contain"
            />
          </div>
        </a>

        {/* Center Navigation Links (Clean plain text as shown in reference photo 1) */}
        <nav
          className="hidden md:flex items-center gap-7 lg:gap-9"
          aria-label="Main Navigation"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-sm font-semibold transition-colors duration-150 ${
                  isActive
                    ? "text-[#F47721] font-bold"
                    : "text-[#171A22] hover:text-[#F47721]"
                }`}
              >
                {navLabels[item.href] ?? item.label}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Button (Orange rounded-xl as in photo 1) */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitch lang={lang} setLanguage={setLanguage} />
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="inline-flex items-center gap-1.5 bg-[#F47721] hover:bg-[#e06512] text-white text-sm font-bold py-2.5 px-5 rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            <span>{lang === "id" ? "Mari Bicara" : "Let's Talk"}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="md:hidden p-2 rounded-lg text-[#171A22] hover:bg-[#FFFAF6] border border-[#ECEEF1] transition-colors"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <div className="md:hidden">
          <LanguageSwitch lang={lang} setLanguage={setLanguage} />
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-[#ECEEF1] bg-white px-5 py-5 shadow-lg animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                    isActive
                      ? "text-[#F47721] bg-[#FFF3E9] font-bold"
                      : "text-[#171A22] hover:bg-[#FFFAF6]"
                  }`}
                >
                  <span>{navLabels[item.href] ?? item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F47721]" />
                  )}
                </a>
              );
            })}
            <div className="pt-3 border-t border-[#ECEEF1]">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="w-full justify-center inline-flex items-center gap-1.5 bg-[#F47721] text-white text-sm font-bold py-2.5 px-5 rounded-xl"
              >
                <span>{lang === "id" ? "Mari Bicara" : "Let's Talk"}</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
