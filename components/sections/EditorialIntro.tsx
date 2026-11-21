"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function EditorialIntro() {
  const { lang, toggleLanguage } = useLanguage();
  const [menu, setMenu] = useState(false);
  const en = lang === "en";
  return <>
    <div className="announcement">{en ? "A creative partner for brands with ambition" : "Partner kreatif untuk brand yang punya ambisi"} <span>✳</span> Bogor, Indonesia</div>
    <header className="editorial-nav">
      <a className="wordmark" href="#home" aria-label="Arvion home">arvion<span>✳</span></a>
      <nav className={menu ? "editorial-links open" : "editorial-links"} aria-label="Navigasi utama">
        <a href="#services" onClick={() => setMenu(false)}>{en ? "Services" : "Layanan"}</a>
        <a href="#about" onClick={() => setMenu(false)}>{en ? "About" : "Tentang"}</a>
        <a href="#portfolio" onClick={() => setMenu(false)}>Portfolio</a>
        <a href="#faq" onClick={() => setMenu(false)}>FAQ</a>
      </nav>
      <div className="nav-actions"><button className="lang-toggle" onClick={toggleLanguage} aria-label="Change language">{lang.toUpperCase()} / {en ? "ID" : "EN"}</button><a className="nav-contact" href="#contact">{en ? "Start a project" : "Mulai proyek"}</a><button className="menu-toggle" aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? "Tutup" : "Menu"}</button></div>
    </header>
    <section className="editorial-hero" id="home">
      <div className="hero-topline"><span>CREATIVE STUDIO · BOGOR</span><span>DESIGN & DIGITAL EXPERIENCE</span></div>
      <div className="hero-content"><div className="hero-copy"><p className="hero-kicker">{en ? "Good ideas deserve great execution." : "Ide yang baik layak diwujudkan dengan istimewa."}</p><h1>{en ? <>Making good<br /><em>ideas</em> matter.</> : <>Ide baik,<br /><em>dibuat berarti.</em></>}</h1><p className="hero-description">{en ? "We bring ideas to life through thoughtful design and digital experiences that help your brand grow." : "Kami membantu brand bertumbuh melalui desain yang bermakna dan pengalaman digital yang berkesan."}</p><div className="hero-actions"><a href="#services" className="editorial-button">{en ? "Explore our services" : "Jelajahi layanan"}</a><a href="#portfolio" className="text-link">{en ? "See our work" : "Lihat karya kami"} <span>↗</span></a></div></div><div className="hero-art" aria-hidden="true"><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="art-sun">✳</div><span className="art-caption">IDEAS INTO<br/>IMPACT.</span><span className="art-bottom">ARVION CREATIVE STUDIO</span></div></div>
      <div className="hero-bottom"><span>{en ? "Thoughtfully made, for what’s next." : "Dirancang dengan pikiran, untuk langkah berikutnya."}</span><a href="#services">{en ? "Scroll to explore" : "Gulir untuk menjelajah"} ↓</a></div>
    </section>
    <section className="intro-statement" id="about"><div className="statement-label">{en ? "A LITTLE ABOUT US" : "SEKILAS TENTANG KAMI"} <span>✳</span></div><div><h2>{en ? <>A good idea is only<br/><em>the beginning.</em></> : <>Ide yang baik adalah<br/><em>awal dari segalanya.</em></>}</h2><p>{en ? "From a first sketch to a digital experience, we collaborate with you to create work that feels right and works hard for your business." : "Dari sketsa pertama hingga pengalaman digital, kami berkolaborasi dengan Anda untuk menciptakan karya yang terasa tepat dan bekerja untuk bisnis Anda."}</p></div></section>
  </>;
}
