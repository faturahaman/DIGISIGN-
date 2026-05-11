"use client";

import { ExternalLink, Mail, MessageCircle } from "lucide-react";
import Image from "next/image";

// All links point to actual sections on the single page
const FOOTER_NAV = [
  {
    title: "Services",
    links: [
      { label: "Branding & Design", href: "#services" },
      { label: "Landing Page", href: "#services" },
      { label: "E-Commerce", href: "#services" },
      { label: "Dynamic Website", href: "#services" },
    ],
  },
  {
    title: "Navigate",
    links: [
      { label: "Home", href: "#home" },
      { label: "Portfolio", href: "#portfolio" },
      { label: "Process", href: "#services" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  const id = href.replace("#", "");
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#050816]">
      {/* Faded logo background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <Image
          src="/logo.png"
          alt=""
          width={900}
          height={600}
          className="h-[40vw] w-auto max-h-80 object-contain"
          style={{ opacity: 0.04 }}
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
                src="/logo.png"
                alt="DiGiSign logo"
                width={135}
                height={90}
                className="h-9 w-auto object-contain"
              />
              <span className="text-lg font-bold text-white">DiGiSign</span>
            </a>
            <p className="max-w-sm text-sm leading-relaxed text-[#94A3B8]">
              Creative digital agency yang menghadirkan jasa desain grafis premium dan pembuatan
              website berkualitas tinggi untuk bisnis Anda.
            </p>

            {/* Contact */}
            <div className="mt-5 space-y-2 sm:mt-6">
              <a
                href="mailto:digitalidsign@gmail.com"
                className="flex items-center gap-2 text-sm text-[#94A3B8] transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0" />
                digitalidsign@gmail.com
              </a>
              <a
                href="https://wa.me/6285924361892"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#94A3B8] transition-colors hover:text-white"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                +62 859-2436-1892
              </a>
            </div>

            {/* Social links */}
            <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
              <a
                href="https://www.instagram.com/digisign_id/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DiGiSign Instagram"
                className="flex h-9 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 text-sm text-[#94A3B8] transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Instagram
              </a>
            </div>
          </div>

          {/* Nav groups — all anchor links to sections on this page */}
          {FOOTER_NAV.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="text-sm text-[#94A3B8] transition-colors hover:text-white"
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
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-[#94A3B8]">
            © {year} DiGiSign. All rights reserved.
          </p>
          <p className="text-sm text-[#94A3B8]">
            Crafted with ❤️ by DiGiSign
          </p>
        </div>
      </div>
    </footer>
  );
}
