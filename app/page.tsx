import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { CaseStudiesSection } from "@/components/landing/case-studies-section";
import { BlogsSection } from "@/components/landing/blogs-section";
import { TechnologySection } from "@/components/landing/technology-section";
import { AISection } from "@/components/landing/ai-section";
import { AboutSection } from "@/components/landing/about-section";
import { ContactSection } from "@/components/landing/contact-section";
import { FooterSection } from "@/components/landing/footer-section";
import { ScrollAnimations } from "@/components/landing/scroll-animations";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <ScrollAnimations />
      <Navigation />
      <HeroSection />
      <CaseStudiesSection />
      <BlogsSection />
      <TechnologySection />
      <AISection />
      <AboutSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
