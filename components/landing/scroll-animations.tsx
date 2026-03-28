"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export function ScrollAnimations() {
  useEffect(() => {
    // ── Lenis smooth scroll ──────────────────────────────────────────────────
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Drive Lenis from GSAP ticker so ScrollTrigger stays in sync
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Wait one frame so all section components have mounted
    const raf = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {

        // ── 1. SCROLL PROGRESS BAR ─────────────────────────────────────────
        gsap.to("#scroll-progress-bar", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0,
          },
        });

        // ── 2. HERO CONTENT EXIT ───────────────────────────────────────────
        // As the hero scrolls out, text drifts up and fades
        const heroContent = document.querySelector("[data-gsap-hero-content]");
        if (heroContent) {
          gsap.to(heroContent, {
            y: -80,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-gsap-hero]",
              start: "50% top",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

        // ── 3. SECTION DIVIDER LINES GROW ─────────────────────────────────
        // The h-px lines inside each section header grow from left to right
        gsap.utils
          .toArray<HTMLElement>("section[id] [data-divider]")
          .forEach((line) => {
            gsap.from(line, {
              scaleX: 0,
              transformOrigin: "left center",
              ease: "power2.out",
              scrollTrigger: {
                trigger: line.closest("section") ?? line,
                start: "top 85%",
                end: "top 55%",
                scrub: 1,
              },
            });
          });

        // ── 4. SECTION LABEL TEXT SLIDE-IN ────────────────────────────────
        gsap.utils
          .toArray<HTMLElement>("section[id] [data-section-label]")
          .forEach((label) => {
            gsap.from(label, {
              x: -24,
              opacity: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: label.closest("section") ?? label,
                start: "top 85%",
                end: "top 60%",
                scrub: 1,
              },
            });
          });

        ScrollTrigger.refresh();
      });

      return () => ctx.revert();
    });

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[999] h-[2px] pointer-events-none">
      <div
        id="scroll-progress-bar"
        className="h-full bg-primary"
        style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
      />
    </div>
  );
}
