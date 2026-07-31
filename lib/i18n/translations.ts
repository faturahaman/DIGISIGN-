export type Language = "id" | "en";

export const translations = {
  id: {
    // Navbar
    nav: {
      home: "Home",
      services: "Layanan",
      vision: "Visi Misi",
      portfolio: "Portfolio",
      testimonials: "Testimoni",
      contact: "Kontak",
      getStarted: "Mulai Sekarang",
    },

    // Hero
    hero: {
      badge: "Creative Digital Agency",
      heading1: "Kami Merancang",
      headingHighlight: "Pengalaman Digital",
      heading2: "yang Terasa Premium",
      subheading:
        "Dari branding yang berkesan hingga website yang memukau — kami menghadirkan solusi digital premium yang mendorong pertumbuhan bisnis Anda.",
      services: ["Branding Design", "Landing Page", "E-Commerce", "UI/UX Design"],
      ctaPrimary: "Mulai Proyek",
      ctaSecondary: "Lihat Portfolio",
      stats: {
        projects: "Proyek Selesai",
        clients: "Klien Puas",
        rating: "Rating",
      },
      scroll: "Gulir",
      floatingBadges: {
        live: "Proyek Live",
        rating: "Rating 5.0",
        conversion: "+40% Konversi",
      },
    },

    // Services
    services: {
      badge: "Layanan Kami",
      title: "Semua yang Anda Butuhkan untuk",
      titleHighlight: "Tampil Beda",
      description:
        "Dari desain grafis yang memukau hingga website yang powerful — kami menghadirkan solusi digital lengkap untuk bisnis Anda.",
      startingFrom: "Mulai dari",
    },

    // Why Arvion
    why: {
      badge: "Mengapa Arvion",
      title: "Mengapa Memilih",
      titleHighlight: "Arvion?",
      description:
        "Kami bukan sekadar agency biasa. Kami adalah mitra strategis yang berkomitmen pada hasil nyata untuk bisnis Anda.",
    },

    // Vision Mission
    visionMission: {
      badge: "Visi & Misi",
      title: "Visi",
      titleHighlight: "Misi",
      description:
        "Kami berkomitmen menghadirkan pengalaman digital yang kuat, fungsional, dan relevan bagi semua klien kami.",
      vision: {
        title: "Visi",
        highlight: "Menjadi solusi digital terpercaya",
        description:
          "Mewujudkan website dan identitas digital yang modern, mudah digunakan, dan berdampak positif di era digital.",
        items: [
          "Memperkuat brand melalui desain yang menarik dan profesional.",
          "Menyediakan website dengan performa tinggi dan pengalaman pengguna yang lancar.",
          "Membangun solusi digital yang rapi, mudah dipelihara, dan relevan.",
        ],
      },
      mission: {
        title: "Misi",
        highlight: "Fokus pada hasil dan kepuasan klien",
        description:
          "Kami bekerja dengan prinsip kualitas, inovasi, dan keandalan untuk membantu bisnis Anda berkembang secara digital.",
        points: [
          "Mengembangkan website yang simpel, modern, dan memiliki performa tinggi agar nyaman digunakan oleh setiap pengguna.",
          "Mengutamakan optimasi website dari segi kecepatan, keamanan, dan pengalaman pengguna untuk hasil terbaik.",
          "Menyediakan layanan desain kreatif seperti poster, branding, dan media promosi digital yang menarik serta profesional.",
          "Membantu UMKM, personal brand, dan berbagai bisnis agar berkembang di era digital melalui solusi teknologi terjangkau.",
          "Menjalin hubungan kerja yang baik dengan klien dengan mengutamakan pelayanan, kepercayaan, dan kepuasan pelanggan.",
          "Terus mengikuti perkembangan teknologi dan tren desain agar layanan yang diberikan selalu relevan dan kompetitif.",
        ],
      },
    },

    // Process
    process: {
      badge: "Proses Kami",
      title: "Bagaimana Kami",
      titleHighlight: "Bekerja",
      description:
        "Proses kerja kami yang terstruktur memastikan setiap proyek berjalan lancar dari awal hingga peluncuran.",
    },

    // Portfolio
    portfolio: {
      badge: "Portfolio",
      title: "Karya",
      titleHighlight: "Kami",
      description:
        "Setiap proyek adalah cerita tentang transformasi digital. Lihat bagaimana kami membantu klien kami berkembang.",
      filters: {
        all: "Semua",
        design: "Desain",
        website: "Website",
      },
      viewProject: "Lihat Proyek",
    },

    // Testimonials
    testimonials: {
      badge: "Testimoni",
      title: "Apa Kata",
      titleHighlight: "Klien Kami",
      description:
        "Kepercayaan klien adalah aset terbesar kami. Inilah yang mereka katakan tentang pengalaman bekerja bersama Arvion.",
      prev: "Testimoni sebelumnya",
      next: "Testimoni berikutnya",
      goTo: "Ke testimoni",
    },

    // CTA
    cta: {
      badge: "Ayo Bekerja Sama",
      title1: "Siap Membangun",
      titleHighlight: "Sesuatu",
      title2: "yang Berbeda?",
      description:
        "Ceritakan visi Anda kepada kami. Kami siap mengubahnya menjadi pengalaman digital yang premium dan berkesan.",
      primaryBtn: "Mulai Proyek Anda",
      secondaryBtn: "Kirim Email",
      trust: {
        response: "Respon Cepat",
        consultation: "Konsultasi Gratis",
        quality: "Kualitas Premium",
      },
    },

    // Footer
    footer: {
      description:
        "Creative digital agency yang menghadirkan jasa desain grafis premium dan pembuatan website berkualitas tinggi untuk bisnis Anda.",
      nav: {
        services: "Layanan",
        navigate: "Navigasi",
        links: {
          branding: "Branding & Desain",
          landing: "Landing Page",
          ecommerce: "E-Commerce",
          dynamic: "Website Dinamis",
          home: "Home",
          portfolio: "Portfolio",
          process: "Proses",
          contact: "Kontak",
        },
      },
      rights: "Hak cipta dilindungi.",
      crafted: "Dibuat dengan ❤️ oleh Arvion",
    },

    // Chat Widget
    chat: {
      initialMessage:
        "Halo! Saya DigiMin - Ai, asisten AI dari Arvion. Ada yang bisa saya bantu terkait layanan web development, UI/UX, atau digital marketing?\nQUICK_REPLIES:[\"Lihat layanan\",\"Berapa estimasi biaya?\",\"Konsultasi gratis\"]",
      placeholder: "Tanya DigiMin - Ai di sini...",
      status: "Online",
      label: "Chat Ai",
      desktopLabel: "Chat DigiMin",
      errorGeneral: "Maaf, terjadi kesalahan. Silakan coba lagi.",
      errorBusy:
        "Aduh, sepertinya saya sedang sangat sibuk melayani banyak orang sekaligus. Boleh coba sapa saya lagi dalam 10-20 detik ya? 🙏",
      errorConnection: "Maaf, terjadi kesalahan koneksi.",
    },

    // WhatsApp Button
    whatsapp: {
      label: "Chat via WhatsApp",
      tooltip: "Respon cepat!",
      message: "Halo Arvion, saya ingin konsultasi tentang layanan kalian 😊",
    },

    // Service Modal
    modal: {
      packages: "Pilihan Paket",
      marketPrice: "Harga Pasar",
      studentPricing: "Harga Pelajar",
      studentNote: "*Wajib lampirkan KTM / Kartu Pelajar",
      features: "Fitur Standar",
      order: "Pesan",
      takePromo: "Ambil Promo",
      consultOnly: "Hanya Konsultasi Dulu",
      closeModal: "Tutup modal",
      orderMessage: (title: string) =>
        `Halo Arvion! Saya tertarik dengan layanan *${title}* yang ditawarkan. Bisa berikan info lebih detail mengenai harga dan prosesnya?`,
      packageOrderMessage: (pkgName: string, serviceName: string, price: string) =>
        `Halo Arvion! Saya ingin memesan paket *${pkgName}* untuk layanan *${serviceName}*.\n\nHarga: ${price}\n\nMohon info selanjutnya untuk proses pengerjaannya. Terima kasih!`,
    },

    // FAQ Section
    faq: {
      badge: "FAQ",
      title: "Ada Pertanyaan?",
      titleHighlight: "Tanyakan Langsung",
      description: "Temukan jawaban cepat di bawah, atau klik pertanyaan untuk bertanya langsung ke DigiMin AI.",
      askBtn: "Tanya DigiMin",
      items: [
        {
          q: "Berapa lama waktu pengerjaan website?",
          a: "Tergantung jenis dan kompleksitasnya. Poster & banner biasanya 1–2 hari kerja, landing page 5–7 hari, company profile 7–14 hari, sedangkan e-commerce dan website dinamis custom 14–21 hari kerja.",
        },
        {
          q: "Apakah ada garansi revisi?",
          a: "Ya. Setiap paket sudah termasuk 2–5x revisi gratis tergantung layanannya, dan kami memberikan gratis perbaikan bug (bug fix) selama 30 hari setelah website diluncurkan.",
        },
        {
          q: "Layanan apa saja yang tersedia?",
          a: "Kami menyediakan branding & desain logo, desain poster & banner, UI/UX design, serta pembuatan website: landing page, company profile, e-commerce, portfolio, dan website dinamis custom.",
        },
        {
          q: "Berapa estimasi biaya landing page?",
          a: "Landing page mulai dari Rp 1.500.000. Kisarannya: paket freelancer Rp 375 rb–2 jt, semi-custom Rp 2–5 jt, dan agensi (full custom + copywriting) Rp 5–15 jt, tergantung fitur dan tingkat kustomisasi.",
        },
        {
          q: "Apakah ada harga khusus pelajar?",
          a: "Ada. Hampir semua layanan punya paket pelajar — misalnya logo mulai Rp 249 rb, poster Rp 35 rb, dan website portfolio Rp 199 rb. Cukup lampirkan KTM atau kartu pelajar yang masih aktif.",
        },
        {
          q: "Bagaimana proses pembayarannya?",
          a: "Sistemnya DP (uang muka) 50% di awal untuk memulai pengerjaan, dan pelunasan 50% sisanya setelah project selesai dan disetujui oleh Anda.",
        },
        {
          q: "Apakah bisa request desain custom?",
          a: "Tentu. Kami menerima kebutuhan custom sepenuhnya — mulai dari desain, fitur khusus, hingga integrasi sistem sesuai kebutuhan bisnis Anda.",
        },
        {
          q: "Apakah website yang dibuat responsif?",
          a: "Ya. Semua website yang kami bangun tampil sempurna dan responsif di semua perangkat, mulai dari smartphone, tablet, hingga desktop.",
        },
        {
          q: "Apakah tersedia paket maintenance?",
          a: "Ya. Kami menyediakan layanan maintenance & support rutin: update konten, perbaikan bug, serta pengelolaan hosting dan domain. Hubungi kami untuk detail paketnya.",
        },
        {
          q: "Berapa lama support setelah project selesai?",
          a: "Anda mendapat gratis bug fix selama 30 hari setelah launch. Untuk dukungan jangka panjang, tersedia paket maintenance berkelanjutan.",
        },
      ],
    },
  },

  en: {
    // Navbar
    nav: {
      home: "Home",
      services: "Services",
      vision: "Vision Mission",
      portfolio: "Portfolio",
      testimonials: "Testimonials",
      contact: "Contact",
      getStarted: "Get Started",
    },

    // Hero
    hero: {
      badge: "Creative Digital Agency",
      heading1: "We Design",
      headingHighlight: "Digital Experiences",
      heading2: "That Feel Premium",
      subheading:
        "From memorable branding to stunning websites — we deliver premium digital solutions that drive your business growth.",
      services: ["Branding Design", "Landing Page", "E-Commerce", "UI/UX Design"],
      ctaPrimary: "Start Project",
      ctaSecondary: "View Portfolio",
      stats: {
        projects: "Projects Done",
        clients: "Happy Clients",
        rating: "Rating",
      },
      scroll: "Scroll",
      floatingBadges: {
        live: "Project Live",
        rating: "5.0 Rating",
        conversion: "+40% Conversion",
      },
    },

    // Services
    services: {
      badge: "Our Services",
      title: "Everything You Need to",
      titleHighlight: "Stand Out",
      description:
        "From stunning graphic design to powerful websites — we deliver complete digital solutions for your business.",
      startingFrom: "Starting from",
    },

    // Why Arvion
    why: {
      badge: "Why Arvion",
      title: "Why Choose",
      titleHighlight: "Arvion?",
      description:
        "We're not just another agency. We're a strategic partner committed to delivering real results for your business.",
    },

    // Vision Mission
    visionMission: {
      badge: "Vision & Mission",
      title: "Vision",
      titleHighlight: "Mission",
      description:
        "We are committed to delivering strong, functional, and relevant digital experiences for every client.",
      vision: {
        title: "Vision",
        highlight: "Becoming a trusted digital solution",
        description:
          "Create modern, user-friendly websites and digital identities that positively impact businesses in the digital era.",
        items: [
          "Strengthen brands through attractive and professional design.",
          "Deliver websites with high performance and smooth user experience.",
          "Build digital solutions that are clean, easy to maintain, and relevant.",
        ],
      },
      mission: {
        title: "Mission",
        highlight: "Delivering results and client satisfaction",
        description:
          "We work with quality, innovation, and reliability to help your business grow digitally.",
        points: [
          "Develop websites that are simple, modern, and high-performing for comfortable use by every visitor.",
          "Prioritize website optimization in speed, security, and user experience for the best result.",
          "Provide creative design services such as posters, branding, and digital promotion media that are attractive and professional.",
          "Help SMEs, personal brands, and businesses grow in the digital era through affordable technology solutions.",
          "Build strong client relationships by prioritizing service, trust, and customer satisfaction.",
          "Continue following technology and design trends so our services stay relevant and competitive.",
        ],
      },
    },

    // Process
    process: {
      badge: "Our Process",
      title: "How We",
      titleHighlight: "Work",
      description:
        "Our structured workflow ensures every project runs smoothly from start to launch.",
    },

    // Portfolio
    portfolio: {
      badge: "Portfolio",
      title: "Our",
      titleHighlight: "Work",
      description:
        "Every project is a story of digital transformation. See how we've helped our clients grow.",
      filters: {
        all: "All",
        design: "Design",
        website: "Website",
      },
      viewProject: "View Project",
    },

    // Testimonials
    testimonials: {
      badge: "Testimonials",
      title: "What Our",
      titleHighlight: "Clients Say",
      description:
        "Client trust is our greatest asset. Here's what they say about working with Arvion.",
      prev: "Previous testimonial",
      next: "Next testimonial",
      goTo: "Go to testimonial",
    },

    // CTA
    cta: {
      badge: "Let's Work Together",
      title1: "Ready To Build",
      titleHighlight: "Something",
      title2: "Different?",
      description:
        "Tell us your vision. We're ready to turn it into a premium and memorable digital experience.",
      primaryBtn: "Start Your Project",
      secondaryBtn: "Send Email",
      trust: {
        response: "Fast Response",
        consultation: "Free Consultation",
        quality: "Premium Quality",
      },
    },

    // Footer
    footer: {
      description:
        "Creative digital agency delivering premium graphic design and high-quality website development for your business.",
      nav: {
        services: "Services",
        navigate: "Navigate",
        links: {
          branding: "Branding & Design",
          landing: "Landing Page",
          ecommerce: "E-Commerce",
          dynamic: "Dynamic Website",
          home: "Home",
          portfolio: "Portfolio",
          process: "Process",
          contact: "Contact",
        },
      },
      rights: "All rights reserved.",
      crafted: "Crafted with ❤️ by Arvion",
    },

    // Chat Widget
    chat: {
      initialMessage:
        'Hello! I\'m DigiMin - Ai, Arvion\'s AI assistant. How can I help you with web development, UI/UX, or digital marketing?\nQUICK_REPLIES:["View services","Pricing estimate?","Free consultation"]',
      placeholder: "Ask DigiMin - Ai here...",
      status: "Online",
      label: "Chat AI",
      desktopLabel: "Chat DigiMin",
      errorGeneral: "Sorry, an error occurred. Please try again.",
      errorBusy:
        "Looks like I'm very busy right now serving many people at once. Could you try again in 10-20 seconds? 🙏",
      errorConnection: "Sorry, a connection error occurred.",
    },

    // WhatsApp Button
    whatsapp: {
      label: "Chat via WhatsApp",
      tooltip: "Fast response!",
      message: "Hello Arvion, I'd like to consult about your services 😊",
    },

    // Service Modal
    modal: {
      packages: "Package Options",
      marketPrice: "Market Price",
      studentPricing: "Student Pricing",
      studentNote: "*Must attach student ID card",
      features: "Standard Features",
      order: "Order",
      takePromo: "Get Promo",
      consultOnly: "Just Consult First",
      closeModal: "Close modal",
      orderMessage: (title: string) =>
        `Hello Arvion! I'm interested in your *${title}* service. Could you provide more details about pricing and the process?`,
      packageOrderMessage: (pkgName: string, serviceName: string, price: string) =>
        `Hello Arvion! I'd like to order the *${pkgName}* package for the *${serviceName}* service.\n\nPrice: ${price}\n\nPlease let me know the next steps. Thank you!`,
    },

    // FAQ Section
    faq: {
      badge: "FAQ",
      title: "Have Questions?",
      titleHighlight: "Ask Directly",
      description: "Find quick answers below, or click a question to ask DigiMin AI directly.",
      askBtn: "Ask DigiMin",
      items: [
        {
          q: "How long does website development take?",
          a: "It depends on the type and complexity. Posters & banners typically take 1–2 working days, landing pages 5–7 days, company profiles 7–14 days, while custom e-commerce and dynamic websites take 14–21 working days.",
        },
        {
          q: "Is there a revision guarantee?",
          a: "Yes. Every package includes 2–5 free revisions depending on the service, plus 30 days of free bug fixes after your website goes live.",
        },
        {
          q: "What services are available?",
          a: "We offer branding & logo design, poster & banner design, UI/UX design, and website development: landing pages, company profiles, e-commerce, portfolios, and custom dynamic websites.",
        },
        {
          q: "What's the estimated cost for a landing page?",
          a: "Landing pages start from Rp 1,500,000. Ranges: freelancer package Rp 375k–2M, semi-custom Rp 2–5M, and agency (full custom + copywriting) Rp 5–15M, depending on features and customization.",
        },
        {
          q: "Is there a student discount?",
          a: "Yes. Almost every service has a student package — for example logos from Rp 249k, posters from Rp 35k, and portfolio websites from Rp 199k. Just attach a valid student ID.",
        },
        {
          q: "How does the payment process work?",
          a: "We use a 50% down payment upfront to begin work, with the remaining 50% paid after the project is completed and approved by you.",
        },
        {
          q: "Can I request a custom design?",
          a: "Absolutely. We fully welcome custom requirements — from design and special features to system integrations tailored to your business needs.",
        },
        {
          q: "Are the websites mobile responsive?",
          a: "Yes. Every website we build looks perfect and responsive across all devices, from smartphones and tablets to desktops.",
        },
        {
          q: "Is there a maintenance package available?",
          a: "Yes. We offer ongoing maintenance & support: content updates, bug fixes, and hosting & domain management. Contact us for package details.",
        },
        {
          q: "How long is support after project completion?",
          a: "You get free bug fixes for 30 days after launch. For long-term support, ongoing maintenance packages are available.",
        },
      ],
    },
  },
} as const;

export type Translations = typeof translations["id"];
