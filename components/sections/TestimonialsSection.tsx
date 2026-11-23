"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

const TESTIMONIALS = [
  {
    quote:
      "Arvion understood our needs from the start. The final product exceeded our expectations and made our workflow easier.",
    name: "Jessica Miller",
    position: "Product Manager, FinTrack",
    initials: "JM",
  },
  {
    quote:
      "Professional, creative and always on time. The team brought our ideas to life with a thoughtful and polished result.",
    name: "David Thompson",
    position: "CEO, Luxora Interiors",
    initials: "DT",
  },
  {
    quote:
      "They delivered a beautiful design that not only looks stunning but also performs incredibly well.",
    name: "Sarah Williams",
    position: "Marketing Director, Nova",
    initials: "SW",
  },
];

export function TestimonialsSection() {
  const { lang } = useLanguage();
  const testimonials =
    lang === "id"
      ? [
          "Arvion memahami kebutuhan kami sejak awal. Hasil akhirnya melampaui ekspektasi dan membuat alur kerja kami lebih mudah.",
          "Profesional, kreatif, dan selalu tepat waktu. Tim berhasil mengubah ide kami menjadi hasil yang matang dan berkualitas.",
          "Desain yang indah dan performa yang luar biasa. Website mereka tidak hanya tampak premium, tetapi juga bekerja sangat baik.",
        ]
      : TESTIMONIALS.map((item) => item.quote);
  const heading =
    lang === "id" ? "Kata Baik, Hasil Nyata" : "Kind Words, Real Results";
  return (
    <section id="testimonials" className="py-20 sm:py-24 bg-white border-t border-[#ECEEF1]">
      <div className="container-arvion">
        {/* Section Header matching Reference Photo 4 */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171A22] tracking-tight">
            {heading}
          </h2>
        </div>

        {/* 3-Card Grid matching Reference Photo 4 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-[#ECEEF1] p-7 sm:p-8 flex flex-col justify-between hover:border-[#F47721]/30 hover:shadow-md transition-all duration-300"
            >
              <div>
                {/* Orange Quotation Mark as in Photo 4 */}
                <div className="text-3xl font-black text-[#F47721] leading-none mb-4 select-none">
                  ““
                </div>

                {/* Quote Text */}
                <p className="text-[#171A22] text-sm sm:text-[0.9375rem] leading-relaxed mb-8">
                  {testimonials[index]}
                </p>
              </div>

              {/* Author Info with Orange Circle Initials Avatar */}
              <div className="flex items-center gap-3.5 pt-4">
                <div className="w-10 h-10 rounded-full bg-[#FF9B4A] text-white flex items-center justify-center font-bold text-xs tracking-wider shrink-0 shadow-xs">
                  {item.initials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#171A22]">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#707581] mt-0.5">
                    {item.position}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
