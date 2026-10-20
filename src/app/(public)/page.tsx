import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ProcessSection } from "@/components/sections/process-section";
import { EquipmentSection } from "@/components/sections/equipment-section";
import { BehindTheScenesSection } from "@/components/sections/behind-the-scenes-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function HomePage() {
  return (
    <>
      {/* 1. Cinematic Hero and Showreel CTA */}
      <HeroSection />

      {/* 2. What We Do — Commercial Advertisements, Brand Films, Event Production */}
      <ServicesSection />

      {/* 3. How We Work — Scripting, Planning, Filming, Editing, Sound & Music, Final Delivery */}
      <ProcessSection />

      {/* 4. Equipment & Technology — ARRI Alexa, RED, Sony, Lighting, DJI Mavic 4 Pro, DaVinci Resolve & Final Cut Pro */}
      <EquipmentSection />

      {/* 5. Behind the Scenes — Real Production Photographs & Craft */}
      <BehindTheScenesSection />

      {/* 6. Our Work — Finished Commercials, Brand Films & Event Films */}
      <PortfolioSection />

      {/* 7. Contact — Project Enquiry Brief & Direct Contact Information */}
      <ContactSection />
    </>
  );
}
