"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatedSphere } from "./animated-sphere";
import RotatingText from "@/components/RotatingText";
import { PillButton } from "./pill-button";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section data-gsap-hero className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Animated sphere background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[220px] h-[220px] sm:w-[380px] sm:h-[380px] md:w-[500px] md:h-[500px] lg:w-[800px] lg:h-[800px] opacity-30 sm:opacity-40 pointer-events-none">
        <AnimatedSphere />
      </div>

      {/* Subtle grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-foreground/10"
            style={{ top: `${12.5 * (i + 1)}%`, left: 0, right: 0 }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-foreground/10"
            style={{ left: `${8.33 * (i + 1)}%`, top: 0, bottom: 0 }}
          />
        ))}
      </div>

      <div data-gsap-hero-content className="relative z-10 w-full px-6 lg:px-16 pt-24 sm:pt-28 lg:pt-36 pb-12 flex-1 flex flex-col justify-center">
        <div className="max-w-2xl">
            {/* Eyebrow */}
            <div
              className={`mb-8 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
                <span className="w-8 h-px bg-foreground/30" />
                The platform for modern teams
              </span>
            </div>

            {/* Main headline */}
            <div className="mb-10">
              <h1
                className={`text-[clamp(2rem,6vw,5.5rem)] font-display leading-[1.35] tracking-tight transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <span className="block text-foreground/80">The platform</span>
                <span className="flex items-center gap-[0.25em] flex-wrap">
                  <span className="text-foreground/80">to</span>
                  <RotatingText
                    texts={["build", "scale", "ship", "grow"]}
                    mainClassName="bg-primary text-primary-foreground overflow-hidden rounded-[0.35em] justify-center px-[0.25em] py-[0.01em]"
                    splitLevelClassName="overflow-hidden pb-[0.05em]"
                    staggerFrom="last"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={4000}
                  />
                </span>
              </h1>
            </div>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-10 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <PillButton
                variant="primary"
                style={{
                  background: "oklch(0.43 0.14 25)",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: 500,
                  padding: "0 32px",
                  height: "56px",
                }}
              >
                Start free trial
                <ArrowRight className="w-4 h-4" style={{ flexShrink: 0 }} />
              </PillButton>
              <PillButton
                variant="outline"
                style={{
                  background: "transparent",
                  color: "rgba(26,24,22,0.75)",
                  fontSize: "15px",
                  fontWeight: 500,
                  padding: "0 32px",
                  height: "56px",
                  border: "1px solid rgba(26,24,22,0.18)",
                }}
              >
                Watch demo
              </PillButton>
            </div>

            {/* Description */}
            <p
              className={`text-lg lg:text-xl text-muted-foreground leading-relaxed transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Your toolkit to stop configuring and start innovating.
              Securely build, deploy, and scale the best experiences.
            </p>
          </div>
      </div>

      {/* Keyword marquee */}
      <div
        className={`relative z-10 pb-10 transition-all duration-700 delay-500 shrink-0 overflow-hidden ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div className="flex marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center shrink-0">
              {[
                "AI Integration",
                "Cloud Architecture",
                "Data Engineering",
                "Cybersecurity",
                "Smart City Systems",
                "Government Tech",
                "FinTech Solutions",
                "Power & Utilities",
                "IoT Platforms",
                "Enterprise Software",
                "ML Infrastructure",
                "System Design",
              ].map((item) => (
                <span key={`${item}-${i}`} className="flex items-center">
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-foreground/40 px-6">
                    {item}
                  </span>
                  <span className="text-foreground/20 text-xs">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
