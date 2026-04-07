import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { CaseStudiesSection } from "@/components/landing/case-studies-section";
import { BlogsSection } from "@/components/landing/blogs-section";
import { CapabilitiesSection } from "@/components/landing/capabilities-section";
import { ArchitectureSection } from "@/components/landing/architecture-section";
import { AboutSection } from "@/components/landing/about-section";
import { ContactSection } from "@/components/landing/contact-section";
import { ScrollAnimations } from "@/components/landing/scroll-animations";
import { LenisProvider } from "@/components/landing/lenis-provider";

export default function Home() {
  return (
    <>
      <LenisProvider />
      <ScrollAnimations />
      <Navigation />
      <main>
        <HeroSection />
        <CaseStudiesSection />
        <BlogsSection />
        <CapabilitiesSection />
        <ArchitectureSection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  );
}
