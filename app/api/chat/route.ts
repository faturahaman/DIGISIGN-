import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Kamu adalah AI Assistant resmi untuk Arvion Creative — digital creative studio modern yang membantu brand dan bisnis berkembang melalui pengalaman digital strategis, visual kuat, dan solusi terukur.
Namamu adalah Arvion Assistant — asisten konsultasi cerdas yang membantu calon klien memahami layanan, portofolio, proses kerja, dan solusi digital terbaik untuk brand mereka.

---

## IDENTITAS BRAND ARVION CREATIVE
- Nama Brand: Arvion Creative
- Tagline: Ideas into Impact.
- Subtitle: WE DESIGN. WE BUILD. WE CREATE.
- Filosofi Brand: Creative, Modern, Professional, Minimalist, Innovative, Trustworthy.
- Warna Brand: Primary Orange (#F47721), Dark Charcoal (#171A22), White (#FFFFFF), Soft Orange (#FFF3E9).
- Deskripsi: Arvion Creative membantu brand bertumbuh melalui pengalaman digital strategis, visual yang kuat, dan solusi kreatif yang dirancang untuk memberikan hasil nyata.
- Lokasi: Jakarta & Bogor, Indonesia
- Status: Available for new projects
- Kontak Resmi:
  * Email: hello@arvioncreative.com
  * WhatsApp: +62 859-2436-1892 (6285924361892)

---

## LAYANAN UTAMA (CREATIVE SERVICES)
1. UI/UX Design
   - Riset pengguna, user flow, wireframing, high-fidelity interactive prototype, design system terukur, dan token styling.
   - Cocok untuk: Web app, SaaS platform, dashboard analytics, dan mobile application.

2. Web Development
   - Website modern berperforma tinggi, SEO-optimized, fully responsive, dan clean architecture menggunakan Next.js, React, Tailwind CSS, dan TypeScript.
   - Cocok untuk: Company portfolio, conversion landing page, e-commerce, dan portal interaktif.

3. Mobile App Design
   - Desain antarmuka iOS dan Android dengan gestur natural, micro-interactions, navigasi intuitif, dan kepatuhan standar App Store & Play Store.

4. Branding & Identity
   - Identitas visual lengkap: desain logo, color palette strategis, panduan tipografi, brand guidelines book, dan marketing collateral.

5. Creative Strategy
   - Konsultasi positioning brand, arsitektur informasi digital, content strategy, dan conversion rate optimization (CRO).

---

## 4-STEP PROCESS (HOW WE MAKE IT HAPPEN)
- 01 — Discover: Memahami tujuan bisnis klien, target audiens, kompetisi pasar, dan requirement spesifik.
- 02 — Design: Merancang wireframe, eksplorasi konsep visual, dan prototipe interaktif.
- 03 — Develop: Membangun produk digital dengan clean code, performa tinggi, dan responsive layout.
- 04 — Deliver: Quality assurance mendalam, optimasi kecepatan & SEO, serta serah terima produk siap rilis.

---

## PORTFOLIO UNGGULAN (SELECTED WORK)
1. FinTrack Dashboard — Dashboard Design (Platform telemetri keuangan real-time & analitik arus kas prediktif).
2. Luxora Interiors — Website Design (Showcase arsitektur interior premium dengan editorial visual imersif).
3. MoveFit App — Mobile App Design (Aplikasi kebugaran adaptif dengan pelacakan biometrik pintar).
4. Nova E-Commerce — Website Design (Platform direct-to-consumer modern yang dioptimasi untuk konversi tinggi).

---

## ATURAN PERCAKAPAN & TONE
- Selalu ramah, sopan, percaya diri, dan profesional.
- Jawab secara ringkas, informatif, dan terstruktur (gunakan bullet point jika menjelaskan poin).
- Jangan berikan harga kaku/mati; jelaskan bahwa estimasi biaya disesuaikan dengan scope, kompleksitas fitur, dan timeline proyek.
- Jika calon klien ingin diskusi mendalam atau penawaran resmi, arahkan untuk mengisi formulir kontak di website atau langsung hubungi tim via WhatsApp (+62 859-2436-1892).

---

## FORMAT WAJIB AKHIR RESPONS
Setiap respons WAJIB diakhiri di baris terakhir dengan daftar quick replies dalam format berikut (tanpa tanda kutip di luar):
QUICK_REPLIES:["opsi 1","opsi 2","opsi 3"]

Contoh opsi:
["Layanan UI/UX","Estimasi Proyek","Lihat Portofolio","Konsultasi WhatsApp"]
`;

// Smart local fallback answers when external API is unreachable or key is not provided
function getSmartFallbackReply(userMessage: string): string {
  const lower = userMessage.toLowerCase();

  if (lower.includes("layanan") || lower.includes("services") || lower.includes("bikin") || lower.includes("buat")) {
    return `Arvion Creative menyediakan 5 layanan utama:\n\n1. **UI/UX Design** — Riset pengguna, wireframe, interactive prototype, dan design system.\n2. **Web Development** — Website modern, cepat, SEO-friendly dengan Next.js & Tailwind CSS.\n3. **Mobile App Design** — Desain aplikasi iOS & Android dengan gestur natural dan micro-interactions.\n4. **Branding & Identity** — Logo, visual identity, color system, dan brand guidelines book.\n5. **Creative Strategy** — Konsultasi digital positioning dan optimasi konversi.\n\nLayanan mana yang paling relevan dengan kebutuhan proyek Anda saat ini?\n\nQUICK_REPLIES:["Detail UI/UX","Detail Web Dev","Alur Kerja 4 Langkah","Konsultasi WhatsApp"]`;
  }

  if (lower.includes("harga") || lower.includes("biaya") || lower.includes("cost") || lower.includes("budget") || lower.includes("paket")) {
    return `Biaya pengerjaan di Arvion Creative disesuaikan secara fleksibel berdasarkan scope pekerjaan, jumlah halaman/fitur, serta timeline yang dibutuhkan.\n\nKami mengutamakan solusi yang terukur dan efisien untuk setiap brand. Anda dapat memberi tahu kami gambaran proyek atau range budget melalui formulir kontak di bawah, atau langsung diskusi singkat dengan tim kami di WhatsApp.\n\nQUICK_REPLIES:["Konsultasi WhatsApp","Isi Form Kontak","Layanan Apa Saja?","Portofolio Contoh"]`;
  }

  if (lower.includes("waktu") || lower.includes("lama") || lower.includes("timeline") || lower.includes("durasi")) {
    return `Estimasi pengerjaan proyek bergantung pada kompleksitas:\n\n- **Landing Page / Website Standar**: umumnya 1–3 minggu.\n- **Full Custom Web / E-Commerce**: 3–6 minggu.\n- **UI/UX App Design**: 2–4 minggu.\n- **Branding & Visual Identity**: 1–2 minggu.\n\nSemua proses melalui 4 tahap terstruktur kami (Discover, Design, Develop, Deliver) agar hasil maksimal tepat waktu.\n\nQUICK_REPLIES:["Alur Kerja 4 Langkah","Mulai Proyek Baru","Konsultasi WhatsApp","Layanan Lain"]`;
  }

  if (lower.includes("proses") || lower.includes("alur") || lower.includes("cara kerja") || lower.includes("process")) {
    return `Proses kerja kami di Arvion Creative menggunakan **4-Step Framework**:\n\n1. **01 — Discover**: Memahami tujuan bisnis, target audiens, dan requirement Anda.\n2. **02 — Design**: Eksplorasi konsep, wireframing, dan visual prototype interaktif.\n3. **03 — Develop**: Implementasi kode bersih, responsif, dan performa tinggi.\n4. **04 — Deliver**: QA komprehensif, testing, dan peluncuran produk.\n\nQUICK_REPLIES:["Mulai Proyek Baru","Lihat Portofolio","Konsultasi WhatsApp","Tanya Estimasi"]`;
  }

  if (lower.includes("portofolio") || lower.includes("portfolio") || lower.includes("project") || lower.includes("contoh")) {
    return `Beberapa karya pilihan Arvion Creative meliputi:\n\n- **FinTrack Dashboard** — Dashboard Fintech analytics dengan telemetri real-time.\n- **Luxora Interiors** — Website arsitektur interior mewah dengan editorial layout.\n- **MoveFit App** — Mobile app kebugaran adaptif dengan pelacak biometrik.\n- **Nova E-Commerce** — Platform e-commerce modern dengan konversi tinggi.\n\nAnda dapat melihat kartu proyek di bagian **Selected Work** di halaman ini!\n\nQUICK_REPLIES:["Mulai Proyek","Konsultasi WhatsApp","Layanan UI/UX","Tanya Harga"]`;
  }

  if (lower.includes("kontak") || lower.includes("hubungi") || lower.includes("whatsapp") || lower.includes("wa") || lower.includes("lokasi")) {
    return `Anda dapat menghubungi Arvion Creative melalui:\n\n- **WhatsApp**: +62 859-2436-1892 (Respon cepat)\n- **Email**: hello@arvioncreative.com\n- **Lokasi**: Jakarta & Bogor, Indonesia\n\nTim kami siap membantu merealisasikan ide digital Anda menjadi dampak nyata.\n\nQUICK_REPLIES:["Chat WhatsApp Sekarang","Layanan Apa Saja?","Estimasi Waktu","Isi Form Kontak"]`;
  }

  return `Halo! Terima kasih sudah menghubungi Arvion Creative. Kami adalah studio digital kreatif yang fokus pada UI/UX Design, Web Development, Mobile App, dan Branding.\n\nAda proyek atau kebutuhan spesifik yang ingin Anda diskusikan hari ini?\n\nQUICK_REPLIES:["Layanan Arvion","Estimasi Biaya","Portofolio Contoh","Konsultasi WhatsApp"]`;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Format pesan tidak valid' },
        { status: 400 }
      );
    }

    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')?.content || '';
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Fallback response if no API key is set
      const reply = getSmartFallbackReply(lastUserMessage);
      return NextResponse.json({ reply });
    }

    // Map messages for Gemini
    let geminiMessages = messages.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    if (geminiMessages.length > 0 && geminiMessages[0].role === 'model') {
      geminiMessages = geminiMessages.slice(1);
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: SYSTEM_PROMPT }],
            },
            contents: geminiMessages,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 800,
            },
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.candidates && data.candidates.length > 0) {
        const reply = data.candidates[0].content.parts[0].text;
        return NextResponse.json({ reply });
      }

      // If Gemini returned an error, use high-quality local fallback
      const fallback = getSmartFallbackReply(lastUserMessage);
      return NextResponse.json({ reply: fallback });
    } catch {
      // Network failure or timeout -> smart fallback
      const fallback = getSmartFallbackReply(lastUserMessage);
      return NextResponse.json({ reply: fallback });
    }
  } catch (error: any) {
    console.error('Server Error:', error);
    return NextResponse.json(
      { reply: getSmartFallbackReply('') },
      { status: 200 }
    );
  }
}
