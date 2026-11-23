"use client";

import { useState } from "react";
import { Mail, Phone, Globe, Sparkles, ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";
import { SITE_BRAND } from "@/data/siteContent";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function ContactSection() {
  const { lang } = useLanguage();
  const copy =
    lang === "id"
      ? {
          title: "Mari Ciptakan Sesuatu yang Hebat",
          description: "Punya ide, tantangan, atau proyek? Ceritakan kepada kami. Kami siap mendengarnya.",
          name: "Nama Anda",
          email: "Email Anda",
          projectType: "Jenis Proyek",
          budget: "Rentang Anggaran",
          message: "Pesan Anda",
          namePlaceholder: "contoh: Alex Johnson",
          messagePlaceholder: "Ceritakan sedikit tentang proyek Anda...",
          send: "Kirim Pesan",
          sending: "Mengirim...",
          submitted: "Pesan Terkirim!",
          submittedDesc: "Terima kasih telah menghubungi Arvion Creative. Tim kami akan segera merespons pesan Anda.",
          wa: "Lanjut via WhatsApp",
          another: "Kirim Pesan Lain",
          prototype: "Formulir prototipe — belum terhubung ke backend.",
        }
      : {
          title: "Let's Create Something Great",
          description: "Have an idea, a challenge, or a project in mind? Tell us about it. We'd love to hear from you.",
          name: "Your Name",
          email: "Your Email",
          projectType: "Project Type",
          budget: "Budget Range",
          message: "Your Message",
          namePlaceholder: "e.g. Alex Johnson",
          messagePlaceholder: "Tell us a little about your project...",
          send: "Send Message",
          sending: "Sending...",
          submitted: "Message Sent!",
          submittedDesc: "Thank you for contacting Arvion Creative. Our team will respond to your message soon.",
          wa: "Continue via WhatsApp",
          another: "Send Another Message",
          prototype: "Prototype form — not yet connected to a backend.",
        };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Choose a service",
    budgetRange: "Select budget",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = lang === "id" ? "Nama wajib diisi" : "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = lang === "id" ? "Email wajib diisi" : "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = lang === "id" ? "Format email tidak valid" : "Invalid email format";
    }
    if (!formData.message.trim()) {
      newErrors.message = lang === "id" ? "Pesan singkat wajib diisi" : "A short message is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleWhatsAppDirect = () => {
    const text = `Halo Arvion Creative! Saya ${formData.name || "Klien"}. Saya tertarik dengan layanan ${formData.projectType}. Pesan: ${formData.message || "Bisa info lebih lanjut?"}`;
    window.open(
      `https://wa.me/${SITE_BRAND.phoneRaw}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-white border-t border-[#ECEEF1]">
      <div className="container-arvion">
        {/* Section Header matching Reference Photo 6 */}
        <div className="mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171A22] tracking-tight mb-3">
            {copy.title}
          </h2>
          <p className="text-sm sm:text-base text-[#707581] max-w-2xl">
            {copy.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: 4 Contact Info Items matching Reference Photo 6 */}
          <div className="lg:col-span-5 space-y-6 pt-2">
            {/* Item 1: Email */}
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl border border-[#ECEEF1] bg-white flex items-center justify-center text-[#F47721] shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <a
                href={`mailto:${SITE_BRAND.email}`}
                className="text-sm sm:text-base font-semibold text-[#171A22] hover:text-[#F47721] transition-colors"
              >
                {SITE_BRAND.email}
              </a>
            </div>

            {/* Item 2: Phone */}
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl border border-[#ECEEF1] bg-white flex items-center justify-center text-[#F47721] shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <a
                href={`https://wa.me/${SITE_BRAND.phoneRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base font-semibold text-[#171A22] hover:text-[#F47721] transition-colors"
              >
                {SITE_BRAND.phone}
              </a>
            </div>

            {/* Item 3: Location */}
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl border border-[#ECEEF1] bg-white flex items-center justify-center text-[#F47721] shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <span className="text-sm sm:text-base font-semibold text-[#171A22]">
                Indonesia · Working Worldwide
              </span>
            </div>

            {/* Item 4: Status */}
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl border border-[#ECEEF1] bg-white flex items-center justify-center text-[#F47721] shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-sm sm:text-base font-semibold text-[#171A22]">
                Available for new projects
              </span>
            </div>
          </div>

          {/* Right Column: Contact Form matching Reference Photo 6 */}
          <div className="lg:col-span-7">
            {isSubmitted ? (
              <div className="p-8 rounded-2xl border border-[#ECEEF1] bg-white text-center">
                <div className="w-14 h-14 rounded-full bg-[#FFF3E9] text-[#F47721] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#171A22] mb-2">
                  {copy.submitted}
                </h3>
                <p className="text-sm text-[#707581] max-w-md mx-auto mb-6">
                  {copy.submittedDesc}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleWhatsAppDirect}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-[#F47721] hover:bg-[#e06512] text-white font-bold text-sm py-2.5 px-6 rounded-xl transition-all"
                  >
                    <span>{copy.wa}</span>
                  </button>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-white border border-[#ECEEF1] text-[#171A22] font-bold text-sm py-2.5 px-6 rounded-xl transition-all"
                  >
                    <span>{copy.another}</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Row 1: Your Name & Your Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-semibold text-[#171A22] mb-2"
                    >
                      {copy.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder={copy.namePlaceholder}
                      className={`w-full px-4 py-3 rounded-xl bg-white border ${
                        errors.name
                          ? "border-red-500"
                          : "border-[#ECEEF1] focus:border-[#F47721]"
                      } text-sm text-[#171A22] placeholder-slate-400 focus:outline-hidden transition-colors`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold text-[#171A22] mb-2"
                    >
                      {copy.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="you@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-white border ${
                        errors.email
                          ? "border-red-500"
                          : "border-[#ECEEF1] focus:border-[#F47721]"
                      } text-sm text-[#171A22] placeholder-slate-400 focus:outline-hidden transition-colors`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Project Type & Budget Range */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="projectType"
                      className="block text-xs font-semibold text-[#171A22] mb-2"
                    >
                      {copy.projectType}
                    </label>
                    <select
                      id="projectType"
                      value={formData.projectType}
                      onChange={(e) =>
                        setFormData({ ...formData, projectType: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#ECEEF1] focus:border-[#F47721] text-sm text-[#171A22] focus:outline-hidden transition-colors"
                    >
                      <option>{lang === "id" ? "Pilih layanan" : "Choose a service"}</option>
                      <option>{lang === "id" ? "Desain UI/UX" : "UI/UX Design"}</option>
                      <option>{lang === "id" ? "Pengembangan Website" : "Web Development"}</option>
                      <option>{lang === "id" ? "Desain Aplikasi Mobile" : "Mobile App Design"}</option>
                      <option>{lang === "id" ? "Branding & Identitas" : "Branding & Identity"}</option>
                      <option>{lang === "id" ? "Strategi Kreatif" : "Creative Strategy"}</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="budgetRange"
                      className="block text-xs font-semibold text-[#171A22] mb-2"
                    >
                      {copy.budget}
                    </label>
                    <select
                      id="budgetRange"
                      value={formData.budgetRange}
                      onChange={(e) =>
                        setFormData({ ...formData, budgetRange: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#ECEEF1] focus:border-[#F47721] text-sm text-[#171A22] focus:outline-hidden transition-colors"
                    >
                      <option>{lang === "id" ? "Pilih anggaran" : "Select budget"}</option>
                      <option>&lt; Rp 10.000.000</option>
                      <option>Rp 10.000.000 - Rp 25.000.000</option>
                      <option>Rp 25.000.000 - Rp 50.000.000</option>
                      <option>&gt; Rp 50.000.000</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Your Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold text-[#171A22] mb-2"
                  >
                    {copy.message}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder={copy.messagePlaceholder}
                    className={`w-full px-4 py-3 rounded-xl bg-white border ${
                      errors.message
                        ? "border-red-500"
                        : "border-[#ECEEF1] focus:border-[#F47721]"
                    } text-sm text-[#171A22] placeholder-slate-400 focus:outline-hidden transition-colors resize-y`}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button matching Photo 6 */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-[#F47721] hover:bg-[#e06512] text-white font-bold text-base py-3.5 px-8 rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-50"
                >
                  <span>{isSubmitting ? copy.sending : copy.send}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                {/* Prototype note under button */}
                <p className="text-[11px] text-[#707581] text-center pt-1">
                  {copy.prototype}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
