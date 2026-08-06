"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Mail, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { SERVICES } from "@/lib/constants";
import { fetchServices } from "@/lib/services";
import { BUSINESS_LOCALITY } from "@/lib/site";

function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  const id = href.replace("#", "");
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLanguage();

  // Service links are live from the Google Sheets CMS (same source as the
  // Services section), so editing the sheet updates the footer without a deploy.
  // Falls back to the static SERVICES catalog until/unless the fetch resolves.
  const [serviceLinks, setServiceLinks] = useState(() =>
    SERVICES.slice(0, 6).map((s) => ({ label: s.title, href: "#services" }))
  );

  useEffect(() => {
    let cancelled = false;
    fetchServices()
      .then((data) => {
        if (!cancelled && data.length > 0) {
          setServiceLinks(
            data.slice(0, 6).map((s) => ({ label: s.title, href: "#services" }))
          );
        }
      })
      .catch(() => {
        // keep the static fallback on error
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const FOOTER_NAV = [
    {
      title: t.footer.nav.services,
      links: serviceLinks,
    },
    {
      title: t.footer.nav.navigate,
      links: [
        { label: t.footer.nav.links.home, href: "#home" },
        { label: t.footer.nav.links.portfolio, href: "#portfolio" },
        { label: t.footer.nav.links.process, href: "#services" },
        { label: t.footer.nav.links.contact, href: "#contact" },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-white">
      {/* Big radial glow bleeding up from behind the footer. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72"
        style={{
          WebkitMaskImage:
            "radial-gradient(70% 100% at 50% 0%, white 40%, transparent)",
          maskImage: "radial-gradient(70% 100% at 50% 0%, white 40%, transparent)",
          backgroundImage:
            "radial-gradient(70% 120% at 50% 0%, rgba(245,158,11,0.12), rgba(139,92,246,0.07) 45%, transparent 70%)",
        }}
      />

      {/* Faded logo background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <Image
          src="/arvion.png"
          alt=""
          width={900}
          height={600}
          className="h-[40vw] w-auto max-h-80 object-contain"
          style={{ opacity: 0.03 }}
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <a
              href="#home"
              onClick={(e) => handleAnchorClick(e, "#home")}
              className="mb-4 inline-flex items-center gap-2"
            >
              <Image
                src="/arvion.png"
                alt="Arvion logo"
                width={135}
                height={90}
                className="h-9 w-auto object-contain"
              />
              <span className="text-xl font-bold tracking-tight text-slate-900">Arvion</span>
            </a>
            <p className="max-w-sm text-sm leading-relaxed text-slate-600">
              {t.footer.description}
            </p>

            {/* Contact */}
            <div className="mt-6 space-y-3 sm:mt-8">
              <a
                href="mailto:digitalidsign@gmail.com"
                className="flex items-center gap-2.5 text-sm font-medium text-slate-600 transition-colors hover:text-amber-600"
              >
                <Mail className="h-4 w-4 shrink-0" />
                digitalidsign@gmail.com
              </a>
              <a
                href="https://wa.me/6285924361892"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm font-medium text-slate-600 transition-colors hover:text-amber-600"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                +62 859-2436-1892
              </a>
            </div>

            {/* Social links */}
            <div className="mt-6 flex flex-wrap gap-2 sm:mt-8">
              <a
                href="https://www.instagram.com/arvioncreative_/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Arvion Instagram"
                className="flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-600 shadow-sm transition-all hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600"
              >
                <ExternalLink className="h-4 w-4" />
                Instagram
              </a>
            </div>
          </div>

          {/* Nav groups */}
          {FOOTER_NAV.map((group) => (
            <div key={group.title}>
              <h3 className="mb-5 font-mono text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="text-sm font-medium text-slate-500 transition-colors hover:text-amber-600"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-sm font-medium text-slate-500">
            © {year} Arvion (arviotiv.com) · {BUSINESS_LOCALITY}, Indonesia.{" "}
            {t.footer.rights}
          </p>
          <p className="text-sm font-medium text-slate-500">{t.footer.crafted}</p>
        </div>
      </div>
    </footer>
  );
}
