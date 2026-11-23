import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ToolsSection } from "@/components/sections/ToolsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { ChatWidget } from "@/components/shared/ChatWidget";
import { SplashScreen } from "@/components/shared/SplashScreen";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      <SplashScreen />
      <Navbar />
      <HeroSection />
      <PortfolioSection />
      <ServicesSection />
      <ToolsSection />
      <TestimonialsSection />
      <ProcessSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
    </main>
  );
}
