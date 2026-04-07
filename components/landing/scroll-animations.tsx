"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollAnimations() {
  useEffect(() => {
    // ── Sync scroll progress bar ──────────────────────────────────────────────
    const updateProgress = () => {
      const el = document.getElementById("scroll-progress-bar");
      if (!el) return;
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      el.style.transform = `scaleX(${total > 0 ? scrolled / total : 0})`;
    };
    window.addEventListener("scroll", updateProgress, { passive: true });

    const ctx = gsap.context(() => {

      // ── Hero content exit ───────────────────────────────────────────────────
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

      // ── Section divider lines grow ──────────────────────────────────────────
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

      // ── Section label text slide-in ─────────────────────────────────────────
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

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", updateProgress);
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
