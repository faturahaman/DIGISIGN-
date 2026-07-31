/**
 * FAQPage JSON-LD, derived from the same translation data the FAQ section
 * renders. Uses the Indonesian copy because `id` is the default language that
 * gets server-rendered into the initial HTML — the schema must match the
 * answers actually visible on the page (a Google structured-data requirement).
 */
import { translations } from "@/lib/i18n/translations";

const faqItems = translations.id.faq.items;

export const faqJsonLd = {
  "@type": "FAQPage",
  "@id": "https://www.arviotiv.com/#faq",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};
