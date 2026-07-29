import dynamic from "next/dynamic";
import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ScrollProgress } from "@/components/shared/ScrollProgress";

// Lazy load below-the-fold sections to improve LCP & TTI
const MarqueeSection = dynamic(() =>
  import("@/components/sections/MarqueeSection").then((m) => m.MarqueeSection)
);
const ServicesSection = dynamic(() =>
  import("@/components/sections/ServicesSection").then((m) => m.ServicesSection)
);
const WhyArvionSection = dynamic(() =>
  import("@/components/sections/WhyArvionSection").then((m) => m.WhyArvionSection)
);
const VisionMissionSection = dynamic(() =>
  import("@/components/sections/VisionMissionSection").then((m) => m.VisionMissionSection)
);
const ProcessSection = dynamic(() =>
  import("@/components/sections/ProcessSection").then((m) => m.ProcessSection)
);
const PortfolioSection = dynamic(() =>
  import("@/components/sections/PortfolioSection").then((m) => m.PortfolioSection)
);
const TestimonialsSection = dynamic(() =>
  import("@/components/sections/TestimonialsSection").then((m) => m.TestimonialsSection)
);
const FAQSection = dynamic(() =>
  import("@/components/sections/FAQSection").then((m) => m.FAQSection)
);
const CTASection = dynamic(() =>
  import("@/components/sections/CTASection").then((m) => m.CTASection)
);
const Footer = dynamic(() =>
  import("@/components/sections/Footer").then((m) => m.Footer)
);
const WhatsAppButton = dynamic(() =>
  import("@/components/shared/WhatsAppButton").then((m) => m.WhatsAppButton)
);
const ChatWidget = dynamic(() =>
  import("@/components/shared/ChatWidget").then((m) => m.ChatWidget)
);

export default function Home() {
  return (
    <main className="relative min-h-screen bg-slate-50">
      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* Critical above-the-fold — loaded immediately */}
      <Navbar />
      <HeroSection />

      {/* Below-the-fold — lazy loaded */}
      <MarqueeSection />
      <ServicesSection />
      <WhyArvionSection />
      <VisionMissionSection />
      <ProcessSection />
      <PortfolioSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />

      {/* Floating UI — deferred */}
      <WhatsAppButton />
      <ChatWidget />
    </main>
  );
}
