"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatedSphere } from "./animated-sphere";
import { PillButton } from "./pill-button";

const HERO_TEXT = "Build. Ship. Scale. Grow.";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="hero"
      data-gsap-hero
      className="snap-section relative flex flex-col overflow-hidden"
    >
      {/* Animated sphere — center at top-right corner on mobile, large + centered on desktop */}
      <div
        className="absolute pointer-events-none opacity-25 sm:right-0 sm:top-1/2 sm:-translate-y-1/2 sm:opacity-40"
        style={{ width: '900px', height: '900px', top: '-450px', right: '-450px' }}
        ref={(el) => {
          if (!el) return;
          const mq = window.matchMedia('(min-width: 640px)');
          const apply = (m: MediaQueryList | MediaQueryListEvent) => {
            if (m.matches) {
              const s = `min(80vh, 80vw)`;
              el.style.width  = s;
              el.style.height = s;
              el.style.top = '';
              el.style.right = '0';
            } else {
              el.style.width  = '900px';
              el.style.height = '900px';
              el.style.top = '-450px';
              el.style.right = '-450px';
            }
          };
          apply(mq);
          mq.addEventListener('change', apply);
        }}
      >
        <AnimatedSphere />
      </div>

      {/* Subtle grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(8)].map((_, i) => (
          <div key={`h-${i}`} className="absolute h-px bg-foreground/10" style={{ top: `${12.5 * (i + 1)}%`, left: 0, right: 0 }} />
        ))}
        {[...Array(12)].map((_, i) => (
          <div key={`v-${i}`} className="absolute w-px bg-foreground/10" style={{ left: `${8.33 * (i + 1)}%`, top: 0, bottom: 0 }} />
        ))}
      </div>

      <div data-gsap-hero-content className="relative z-10 w-full px-6 lg:px-16 pt-20 sm:pt-28 lg:pt-36 pb-12 flex-1 flex flex-col justify-center">
        <div className="max-w-2xl">

          {/* Eyebrow
          <div className={`mb-7 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
              <span className="w-8 h-px bg-foreground/30" />
              Full-spectrum technology partner
            </span>
          </div> */}

          {/* Headline */}
          <div className="mb-9">
            <h1
              className={`font-display leading-[1.15] tracking-tight transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ fontSize: 'clamp(2.4rem, 6vw, 3.5rem)' }}
            >
              <span className="block text-foreground/80">A Platform To</span>
              <span className="block text-primary">
                {HERO_TEXT.split(" ").map((word, index) => (
                  <span
                    key={index}
                    className="inline-block"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                      transition: `opacity 0.6s ease, transform 0.6s ease`,
                      transitionDelay: `${300 + index * 180}ms`,
                      marginRight: index < HERO_TEXT.split(" ").length - 1 ? '0.25em' : 0,
                    }}
                  >
                    {word}
                  </span>
                ))}
              </span>
            </h1>
          </div>

          {/* CTA */}
          <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-9 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <PillButton
              href="/book"
              variant="primary"
              style={{
                background: "oklch(0.43 0.14 25)",
                color: "#fff",
                fontSize: "15px",
                fontWeight: 500,
                padding: "0 32px",
                height: "52px",
              }}
            >
              Discuss Your Project
              <ArrowRight className="w-4 h-4" style={{ flexShrink: 0 }} />
            </PillButton>
          </div>

          {/* Description */}
          <p className={`text-base lg:text-lg text-muted-foreground leading-relaxed max-w-lg transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            From AI-powered products and cloud-native infrastructure to mobile apps and intelligent automation — built for regulated industries.
          </p>

        </div>
      </div>
    </section>
  );
}
