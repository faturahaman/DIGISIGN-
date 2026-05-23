import {
  Palette,
  FileImage,
  Layout,
  Building2,
  ShoppingCart,
  Briefcase,
  Globe,
  Zap,
  Sparkles,
  Clock,
  Target,
  Smartphone,
  Star,
} from "lucide-react";

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const SERVICES = [
  {
    id: "branding",
    title: "Branding Design",
    description:
      "Identitas visual yang kuat dan berkesan untuk brand Anda. Logo, color palette, dan brand guidelines yang profesional.",
    icon: Palette,
    size: "large" as const,
    gradient: "from-blue-300/20 to-violet-500/20",
    imageUrl: "/fotoModalLayanan/desainBaner.png",
    startingPrice: 800000,
    priceLabel: "Mulai dari",
    deliveryTime: "3–5 Hari Kerja",
    features: [
      "Desain logo (3 konsep awal)",
      "Color palette profesional",
      "Tipografi brand",
      "Brand guidelines PDF",
      "File final (AI, PNG, SVG)",
      "2x revisi gratis",
    ],
    highlight: "Paket terlengkap untuk membangun identitas brand yang kuat dan berkesan.",
    packages: [
      {
        name: "Basic",
        price: "Rp 800 rb - 2 jt",
        target: "Bisnis baru / UMKM",
        features: ["Logo basic", "Color palette", "1x revisi"],
      },
      {
        name: "Standar",
        price: "Rp 2 jt - 5 jt",
        target: "Bisnis berkembang",
        features: ["Logo premium", "Brand guidelines", "Visual identity", "3x revisi"],
      },
      {
        name: "Premium",
        price: "Rp 5 jt+",
        target: "Perusahaan / Brand besar",
        features: ["Full branding system", "Marketing assets", "Unlimited revision"],
      },
    ],
    studentPricing: {
      name: "Paket Pelajar",
      price: "Rp 249.000",
      features: ["Logo untuk tugas/portfolio", "1x revisi", "File PNG/JPG"],
    },
  },
  {
    id: "poster",
    title: "Poster Design",
    description: "Desain poster yang eye-catching dan komunikatif untuk berbagai kebutuhan promosi.",
    icon: FileImage,
    size: "small" as const,
    gradient: "from-violet-500/20 to-pink-500/20",
    imageUrl: "/fotoModalLayanan/poster.jpg", 
    startingPrice: 105000,
    priceLabel: "Mulai dari",
    deliveryTime: "1–2 Hari Kerja",
    features: [
      "Ukuran custom sesuai kebutuhan",
      "Desain modern & eye-catching",
      "File PNG / PDF siap cetak",
      "2x revisi gratis",
    ],
    highlight: "Poster promosi yang menarik perhatian dan siap pakai dalam waktu singkat.",
    packages: [
      {
        name: "Standard",
        price: "Rp 105.000",
        target: "Kebutuhan umum",
        features: ["1 Desain poster", "High-res output", "2x revisi"],
      },
      {
        name: "Bundle",
        price: "Rp 450.000",
        target: "Campaign / Event",
        features: ["5 Desain poster", "Theme konsisten", "3x revisi"],
      },
    ],
    studentPricing: {
      name: "Pelajar/Mahasiswa",
      price: "Rp 35.000",
      features: ["Khusus tugas sekolah/kuliah", "1x revisi"],
    },
  },
  {
    id: "banner",
    title: "Banner Design",
    description: "Banner digital dan cetak yang menarik perhatian dan menyampaikan pesan dengan efektif.",
    icon: Layout,
    size: "small" as const,
    gradient: "from-pink-500/20 to-orange-500/20",
    imageUrl: "/fotoModalLayanan/banerdesain.jpg",
    startingPrice: 210000,
    priceLabel: "Mulai dari",
    deliveryTime: "1–2 Hari Kerja",
    features: [
      "Banner digital (Instagram, Facebook, dll)",
      "Banner cetak (spanduk, roll-up, dll)",
      "Ukuran custom",
      "File siap pakai",
      "2x revisi gratis",
    ],
    highlight: "Banner yang efektif menyampaikan pesan promosi untuk media digital maupun cetak.",
    packages: [
      {
        name: "Standard",
        price: "Rp 210.000",
        target: "Kebutuhan promosi",
        features: ["1 Desain banner", "Format digital/cetak", "2x revisi"],
      },
    ],
    studentPricing: {
      name: "Pelajar/Organisasi",
      price: "Rp 55.000",
      features: ["Khusus proker organisasi", "1x revisi"],
    },
  },
  {
    id: "landing",
    title: "Landing Page",
    description: "Landing page konversi tinggi yang dirancang untuk mengubah pengunjung menjadi pelanggan.",
    icon: Globe,
    size: "small" as const,
    gradient: "from-blue-500/20 to-cyan-500/5",
    imageUrl: "/fotoModalLayanan/landingpage.jpg",
    startingPrice: 1500000,
    priceLabel: "Mulai dari",
    deliveryTime: "5–7 Hari Kerja",
    features: [
      "Desain UI/UX modern & responsif",
      "Optimasi konversi (CRO)",
      "Integrasi form & WhatsApp",
      "SEO dasar",
      "Hosting & domain gratis 1 tahun*",
      "3x revisi gratis",
    ],
    highlight: "Landing page yang dioptimalkan untuk meningkatkan konversi dan penjualan bisnis Anda.",
    packages: [
      {
        name: "Freelancer",
        price: "Rp 375 rb - 2 jt",
        target: "1 halaman, template, responsif, tanpa CMS",
        features: ["Single page", "No CMS", "Responsive"],
      },
      {
        name: "Semi-custom",
        price: "Rp 2 jt - 5 jt",
        target: "Desain custom, form, integrasi WA, SEO, 3-7 hari",
        features: ["Custom design", "Form integration", "SEO optimization"],
      },
      {
        name: "Agensi",
        price: "Rp 5 jt - 15 jt",
        target: "Full custom UI/UX, copywriting, animasi, A/B testing",
        features: ["Full custom", "Copywriting", "Advanced animation"],
      },
    ],
    studentPricing: {
      name: "Edisi Portfolio",
      price: "Rp 175.000",
      features: ["Khusus portfolio pelajar", "S&K berlaku"],
    },
  },
  {
    id: "company",
    title: "Company Profile",
    description: "Website company profile profesional yang merepresentasikan bisnis Anda secara optimal.",
    icon: Building2,
    size: "small" as const,
    gradient: "from-cyan-500/20 to-blue-500/20",
    imageUrl: "/fotoModalLayanan/companyprofile.png",
    startingPrice: 1800000,
    priceLabel: "Mulai dari",
    deliveryTime: "7–14 Hari Kerja",
    features: [
      "Multi-halaman (Home, About, Services, Contact)",
      "Desain profesional & elegan",
      "Responsif semua perangkat",
      "SEO dasar",
      "Formulir kontak",
      "Hosting & domain gratis 1 tahun*",
      "3x revisi gratis",
    ],
    highlight: "Website company profile yang menonjolkan profesionalisme dan kepercayaan bisnis Anda.",
    packages: [
      {
        name: "Basic",
        price: "Rp 1,5 jt - 5 jt",
        target: "UMKM/startup, template premium, 3-5 halaman, WordPress",
        features: ["Template premium", "3-5 Pages", "WordPress"],
      },
      {
        name: "Standar",
        price: "Rp 5 jt - 15 jt",
        target: "Desain semi-custom, 5-10 halaman, fitur interaktif dasar",
        features: ["Semi-custom design", "5-10 Pages", "Interactive features"],
      },
      {
        name: "Premium",
        price: "Rp 15 jt - 30 jt",
        target: "Desain full custom, UI/UX profesional, multi-bahasa, animasi",
        features: ["Full custom", "Multi-language", "Professional UI/UX"],
      },
      {
        name: "Enterprise",
        price: "Rp 30 jt+",
        target: "Perusahaan besar, integrasi sistem, branding kompleks",
        features: ["System integration", "Complex branding", "Scalable"],
      },
    ],
    studentPricing: {
      name: "Pelajar Mandiri",
      price: "Rp 249.000",
      features: ["Khusus tugas/final project", "Hosting gratis 1 bln"],
    },
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    description: "Toko online yang lengkap dengan sistem pembayaran, manajemen produk, dan pengalaman belanja premium.",
    icon: ShoppingCart,
    size: "small" as const,
    gradient: "from-green-500/20 to-emerald-500/20",
    imageUrl: "/fotoModalLayanan/ecomerce.jpg",
    startingPrice: 5000000,
    priceLabel: "Mulai dari",
    deliveryTime: "14–21 Hari Kerja",
    features: [
      "Manajemen produk & kategori",
      "Sistem pembayaran (Midtrans / Xendit)",
      "Keranjang belanja & checkout",
      "Dashboard admin",
      "Responsif semua perangkat",
      "SEO & optimasi kecepatan",
      "5x revisi gratis",
    ],
    highlight: "Toko online lengkap siap berjualan dengan fitur pembayaran dan manajemen produk profesional.",
    packages: [
      {
        name: "Basic",
        price: "Rp 2 jt - 6 jt",
        target: "WooCommerce/template, katalog produk, checkout sederhana",
        features: ["WooCommerce", "Simple checkout", "Product catalog"],
      },
      {
        name: "Standar",
        price: "Rp 6 jt - 20 jt",
        target: "Payment gateway, manajemen stok, admin panel, integrasi ongkir",
        features: ["Payment gateway", "Inventory system", "Shipping integration"],
      },
      {
        name: "Custom",
        price: "Rp 20 jt - 60 jt",
        target: "Full custom dev (Next.js/Laravel), multi-vendor, fitur member",
        features: ["Full stack dev", "Membership system", "Multi-vendor"],
      },
      {
        name: "Enterprise",
        price: "Rp 60 jt+",
        target: "Marketplace skala besar, multi-seller, sistem logistik",
        features: ["Large scale", "Logistics system", "Fraud detection"],
      },
    ],
    studentPricing: {
      name: "Toko Online Pelajar",
      price: "Rp 499.000",
      features: ["Katalog sederhana", "WhatsApp order", "Hosting 1 bln"],
    },
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    description: "Website portfolio yang memamerkan karya terbaik Anda dengan tampilan yang memukau.",
    icon: Briefcase,
    size: "small" as const,
    gradient: "from-orange-500/20 to-yellow-500/20",
    startingPrice: 1600000,
    priceLabel: "Mulai dari",
    deliveryTime: "5–7 Hari Kerja",
    features: [
      "Galeri karya interaktif",
      "Animasi halus & modern",
      "Halaman About & Contact",
      "Responsif semua perangkat",
      "SEO dasar",
      "3x revisi gratis",
    ],
    highlight: "Tampilkan karya terbaik Anda dengan website portfolio yang memukau dan berkesan.",
    packages: [
      {
        name: "Template",
        price: "Rp 300 rb - 1,5 jt",
        target: "Template Webflow/WordPress, halaman statis",
        features: ["Static pages", "WordPress/Webflow", "Quick launch"],
      },
      {
        name: "Semi-custom",
        price: "Rp 1,5 jt - 5 jt",
        target: "Desain custom, galeri proyek, form kontak, animasi ringan",
        features: ["Project gallery", "Light animation", "Contact form"],
      },
      {
        name: "Full custom",
        price: "Rp 5 jt - 15 jt",
        target: "Branding kuat, animasi kompleks, CMS buat update proyek",
        features: ["Strong branding", "Complex animation", "Custom CMS"],
      },
    ],
    studentPricing: {
      name: "Paket Tugas Akhir",
      price: "Rp 199.000",
      features: ["Single page portfolio", "2x revisi", "S&K Berlaku"],
    },
  },
  {
    id: "dynamic",
    title: "Dynamic Website",
    description: "Website dinamis dengan CMS, database, dan fitur interaktif sesuai kebutuhan bisnis Anda.",
    icon: Zap,
    size: "small" as const,
    gradient: "from-violet-500/20 to-blue-500/20",
    imageUrl: "/fotoModalLayanan/koding.jpg",
    startingPrice: 1200000,
    priceLabel: "Mulai dari",
    deliveryTime: "14–21 Hari Kerja",
    features: [
      "CMS kustom (tambah/edit konten sendiri)",
      "Database terintegrasi",
      "Fitur interaktif sesuai kebutuhan",
      "Panel admin",
      "Responsif semua perangkat",
      "SEO & optimasi performa",
      "5x revisi gratis",
    ],
    highlight: "Website dinamis yang bisa Anda kelola sendiri dengan fitur lengkap sesuai kebutuhan bisnis.",
    packages: [
      {
        name: "Sedang",
        price: "Rp 8 jt - 25 jt",
        target: "Dashboard admin, sistem booking, portal berita/blog dengan CMS",
        features: ["Admin dashboard", "Booking system", "CMS"],
      },
      {
        name: "Kompleks",
        price: "Rp 25 jt - 75 jt",
        target: "SaaS sederhana, platform kursus online, sistem manajemen internal",
        features: ["SaaS infrastructure", "E-learning platform", "Internal system"],
      },
      {
        name: "Enterprise",
        price: "Rp 75 jt - 500 jt+",
        target: "ERP, marketplace fullstack, platform multi-tenant",
        features: ["ERP system", "Multi-tenant", "Real-time system"],
      },
    ],
    studentPricing: {
      name: "Web App Academy",
      price: "Rp 899.000",
      features: ["Custom logic simple", "Database terintegrasi", "Mentoring 1 jam"],
    },
  },
];

export const ADVANTAGES = [
  {
    id: "modern",
    title: "Modern Visual",
    description:
      "Desain mengikuti tren terkini dengan estetika premium yang membuat brand Anda tampil beda dan berkesan.",
    icon: Sparkles,
  },
  {
    id: "fast",
    title: "Fast Delivery",
    description:
      "Proses kerja yang efisien dan terstruktur memastikan proyek selesai tepat waktu tanpa mengorbankan kualitas.",
    icon: Clock,
  },
  {
    id: "business",
    title: "Business-Focused Design",
    description:
      "Setiap keputusan desain didasarkan pada tujuan bisnis Anda — bukan sekadar estetika, tapi hasil nyata.",
    icon: Target,
  },
  {
    id: "responsive",
    title: "Responsive Development",
    description:
      "Semua website yang kami bangun tampil sempurna di semua perangkat, dari mobile hingga desktop besar.",
    icon: Smartphone,
  },
  {
    id: "premium",
    title: "Premium User Experience",
    description:
      "Kami merancang pengalaman pengguna yang intuitif, menyenangkan, dan meninggalkan kesan mendalam.",
    icon: Star,
  },
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discover",
    description:
      "Kami memulai dengan memahami bisnis, tujuan, dan target audiens Anda secara mendalam melalui sesi konsultasi.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "Berdasarkan riset, kami menyusun strategi visual dan teknis yang paling efektif untuk mencapai tujuan Anda.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Tim desainer kami menciptakan visual yang memukau — dari wireframe hingga mockup high-fidelity yang siap disetujui.",
  },
  {
    number: "04",
    title: "Development",
    description:
      "Desain diwujudkan menjadi produk digital yang fungsional, cepat, dan responsif menggunakan teknologi terkini.",
  },
  {
    number: "05",
    title: "Launch",
    description:
      "Setelah pengujian menyeluruh, produk diluncurkan. Kami memastikan semuanya berjalan sempurna dan siap untuk dunia.",
  },
];

export const PORTFOLIO_ITEMS = [
  {
    id: "porto-1",
    title: "Brand Identity — NovaTech",
    category: "design" as const,
    imageUrl: "/images/portfolio/placeholder-1.webp",
    imageAlt: "Brand identity design untuk NovaTech",
    description:
      "Sistem identitas visual lengkap termasuk logo, color palette, tipografi, dan brand guidelines komprehensif.",
    tags: ["Branding", "Logo", "Identity"],
    size: "large" as const,
  },
  {
    id: "porto-2",
    title: "E-Commerce Platform — StyleHub",
    category: "website" as const,
    imageUrl: "/images/portfolio/placeholder-2.webp",
    imageAlt: "E-commerce website untuk StyleHub",
    description:
      "Platform e-commerce fashion dengan pengalaman belanja premium, sistem filter canggih, dan checkout yang mulus.",
    tags: ["E-Commerce", "Next.js", "UI/UX"],
    size: "medium" as const,
  },
  {
    id: "porto-3",
    title: "Poster Campaign — ArtFest 2024",
    category: "design" as const,
    imageUrl: "/images/portfolio/placeholder-3.webp",
    imageAlt: "Poster campaign untuk ArtFest 2024",
    description: "Seri poster event festival seni dengan visual yang bold dan ekspresif.",
    tags: ["Poster", "Print", "Campaign"],
    size: "small" as const,
  },
  {
    id: "porto-4",
    title: "Company Profile — BuildCorp",
    category: "website" as const,
    imageUrl: "/images/portfolio/placeholder-4.webp",
    imageAlt: "Company profile website untuk BuildCorp",
    description: "Website company profile konstruksi dengan tampilan profesional dan konten yang terstruktur.",
    tags: ["Company Profile", "Web Design"],
    size: "medium" as const,
  },
  {
    id: "porto-5",
    title: "Banner Series — FoodFest",
    category: "design" as const,
    imageUrl: "/images/portfolio/placeholder-5.webp",
    imageAlt: "Banner series untuk FoodFest",
    description: "Seri banner digital dan cetak untuk festival kuliner dengan visual yang menggugah selera.",
    tags: ["Banner", "Digital", "Print"],
    size: "small" as const,
  },
  {
    id: "porto-6",
    title: "Portfolio — Creative Studio",
    category: "website" as const,
    imageUrl: "/images/portfolio/placeholder-6.webp",
    imageAlt: "Portfolio website untuk Creative Studio",
    description: "Website portfolio studio kreatif dengan galeri interaktif dan animasi yang memukau.",
    tags: ["Portfolio", "Animation", "Creative"],
    size: "small" as const,
  },
];

export const TESTIMONIALS = [
  {
    id: "testi-1",
    name: "Ahmad Fauzi",
    role: "CEO",
    company: "TechStartup ID",
    avatarUrl: "/images/avatars/avatar-1.webp",
    avatarAlt: "Foto Ahmad Fauzi",
    review:
      "DiGiSign mengubah brand kami secara total. Hasilnya jauh melampaui ekspektasi kami. Tim mereka sangat profesional dan responsif sepanjang proses.",
    rating: 5,
  },
  {
    id: "testi-2",
    name: "Sari Dewi",
    role: "Founder",
    company: "StyleHub",
    avatarUrl: "/images/avatars/avatar-2.webp",
    avatarAlt: "Foto Sari Dewi",
    review:
      "Website e-commerce yang dibuat DiGiSign meningkatkan konversi kami sebesar 40%. Desainnya premium dan pengalaman penggunanya sangat intuitif.",
    rating: 5,
  },
  {
    id: "testi-3",
    name: "Budi Santoso",
    role: "Marketing Director",
    company: "BuildCorp",
    avatarUrl: "/images/avatars/avatar-3.webp",
    avatarAlt: "Foto Budi Santoso",
    review:
      "Proses kerja DiGiSign sangat terstruktur dan transparan. Mereka benar-benar memahami kebutuhan bisnis kami dan menerjemahkannya menjadi desain yang tepat sasaran.",
    rating: 5,
  },
];

export const WHATSAPP_NUMBER = "6285924361892";
export const WHATSAPP_MESSAGE =
  "Halo DiGiSign, saya ingin memulai proyek bersama kalian. Bisa ceritakan lebih lanjut tentang layanan kalian?";

export const SOCIAL_LINKS = [
  { platform: "Instagram", url: "https://instagram.com/digisign", handle: "@digisign" },
  { platform: "LinkedIn", url: "https://linkedin.com/company/digisign", handle: "DiGiSign" },
  { platform: "Behance", url: "https://behance.net/digisign", handle: "digisign" },
];
