import dynamic from "next/dynamic";
import { EditorialIntro } from "@/components/sections/EditorialIntro";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/sections/Footer";
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection").then(m => m.TestimonialsSection));
const WhatsAppButton = dynamic(() => import("@/components/shared/WhatsAppButton").then(m => m.WhatsAppButton));
const ChatWidget = dynamic(() => import("@/components/shared/ChatWidget").then(m => m.ChatWidget));
export default function Home() {
  return <main className="editorial-site"><EditorialIntro/><ServicesSection/><ProcessSection/><PortfolioSection/><TestimonialsSection/><FAQSection/><CTASection/><Footer/><WhatsAppButton/><ChatWidget/></main>;
}
