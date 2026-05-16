export type Language = "id" | "en";

export const translations = {
  id: {
    // Navbar
    nav: {
      home: "Home",
      services: "Layanan",
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

    // Why DiGiSign
    why: {
      badge: "Mengapa DiGiSign",
      title: "Mengapa Memilih",
      titleHighlight: "DiGiSign?",
      description:
        "Kami bukan sekadar agency biasa. Kami adalah mitra strategis yang berkomitmen pada hasil nyata untuk bisnis Anda.",
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
        "Kepercayaan klien adalah aset terbesar kami. Inilah yang mereka katakan tentang pengalaman bekerja bersama DiGiSign.",
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
      crafted: "Dibuat dengan ❤️ oleh DiGiSign",
    },

    // Chat Widget
    chat: {
      initialMessage:
        "Halo! Saya DigiMin - Ai, asisten AI dari DiGiSign. Ada yang bisa saya bantu terkait layanan web development, UI/UX, atau digital marketing?\nQUICK_REPLIES:[\"Lihat layanan\",\"Berapa estimasi biaya?\",\"Konsultasi gratis\"]",
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
      message: "Halo DiGiSign, saya ingin konsultasi tentang layanan kalian 😊",
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
        `Halo DiGiSign! Saya tertarik dengan layanan *${title}* yang ditawarkan. Bisa berikan info lebih detail mengenai harga dan prosesnya?`,
      packageOrderMessage: (pkgName: string, serviceName: string, price: string) =>
        `Halo DiGiSign! Saya ingin memesan paket *${pkgName}* untuk layanan *${serviceName}*.\n\nHarga: ${price}\n\nMohon info selanjutnya untuk proses pengerjaannya. Terima kasih!`,
    },

    // FAQ Section
    faq: {
      badge: "FAQ",
      title: "Ada Pertanyaan?",
      titleHighlight: "Tanyakan Langsung",
      description: "Klik pertanyaan di bawah dan DigiMin AI akan langsung menjawab untuk Anda.",
      askBtn: "Tanya DigiMin",
      questions: [
        "Berapa lama waktu pengerjaan website?",
        "Apakah ada garansi revisi?",
        "Layanan apa saja yang tersedia?",
        "Berapa estimasi biaya landing page?",
        "Apakah ada harga khusus pelajar?",
        "Bagaimana proses pembayarannya?",
        "Apakah bisa request desain custom?",
        "Apakah website yang dibuat responsif?",
        "Apakah tersedia paket maintenance?",
        "Berapa lama support setelah project selesai?",
      ],
    },
  },

  en: {
    // Navbar
    nav: {
      home: "Home",
      services: "Services",
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

    // Why DiGiSign
    why: {
      badge: "Why DiGiSign",
      title: "Why Choose",
      titleHighlight: "DiGiSign?",
      description:
        "We're not just another agency. We're a strategic partner committed to delivering real results for your business.",
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
        "Client trust is our greatest asset. Here's what they say about working with DiGiSign.",
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
      crafted: "Crafted with ❤️ by DiGiSign",
    },

    // Chat Widget
    chat: {
      initialMessage:
        'Hello! I\'m DigiMin - Ai, DiGiSign\'s AI assistant. How can I help you with web development, UI/UX, or digital marketing?\nQUICK_REPLIES:["View services","Pricing estimate?","Free consultation"]',
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
      message: "Hello DiGiSign, I'd like to consult about your services 😊",
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
        `Hello DiGiSign! I'm interested in your *${title}* service. Could you provide more details about pricing and the process?`,
      packageOrderMessage: (pkgName: string, serviceName: string, price: string) =>
        `Hello DiGiSign! I'd like to order the *${pkgName}* package for the *${serviceName}* service.\n\nPrice: ${price}\n\nPlease let me know the next steps. Thank you!`,
    },

    // FAQ Section
    faq: {
      badge: "FAQ",
      title: "Have Questions?",
      titleHighlight: "Ask Directly",
      description: "Click a question below and DigiMin AI will answer it for you instantly.",
      askBtn: "Ask DigiMin",
      questions: [
        "How long does website development take?",
        "Is there a revision guarantee?",
        "What services are available?",
        "What's the estimated cost for a landing page?",
        "Is there a student discount?",
        "How does the payment process work?",
        "Can I request a custom design?",
        "Are the websites mobile responsive?",
        "Is there a maintenance package available?",
        "How long is support after project completion?",
      ],
    },
  },
} as const;

export type Translations = typeof translations["id"];
