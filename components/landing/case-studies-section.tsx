"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { caseStudies } from "@/lib/case-studies-data";

const AUTOPLAY_DELAY = 3000;

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%" }),
  center: { x: 0 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%" }),
};

export function CaseStudiesSection() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const go = useCallback((next: number, dir: 1 | -1) => {
    setDirection(dir);
    setActive(next);
  }, []);

  const prev = useCallback(() => {
    go((active - 1 + caseStudies.length) % caseStudies.length, -1);
  }, [active, go]);

  const next = useCallback(() => {
    go((active + 1) % caseStudies.length, 1);
  }, [active, go]);

  useEffect(() => {
    const id = setTimeout(() => {
      setDirection(1);
      setActive((a) => (a + 1) % caseStudies.length);
    }, AUTOPLAY_DELAY);
    return () => clearTimeout(id);
  }, [active]);

  const cs = caseStudies[active];

  return (
    <section
      id="case-studies"
      className="snap-section relative bg-primary overflow-hidden flex flex-col"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full flex-1 flex flex-col pt-16 sm:pt-24 pb-2 sm:pb-7">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-2 sm:mb-4 shrink-0">
          <span data-section-label className="font-mono text-sm tracking-[0.2em] text-white/70 uppercase">
            Case Studies
          </span>
          <div data-divider className="flex-1 h-px bg-white/15" />
          <span className="font-mono text-xs text-white/50">
            {String(caseStudies.length).padStart(2, "0")} projects
          </span>
        </div>

        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-4 lg:gap-8 mb-2 sm:mb-5 shrink-0">
          <div className="lg:col-span-7">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight text-white leading-[1.05]">
              Proven Solutions Across Industries
            </h2>
          </div>
          <div className="hidden lg:col-span-5 lg:flex lg:items-end">
            <p className="text-white/60 text-base leading-relaxed">
              Real-world systems built to solve complex problems at scale.
            </p>
          </div>
        </div>

        {/* Card + controls */}
        <div className="relative flex-1 flex flex-col min-h-0">

          {/* Fluid-height clip container — fills remaining space */}
          <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] min-h-[580px] sm:min-h-[620px] lg:flex-1 lg:min-h-0">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={cs.tag}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 grid lg:grid-cols-12 bg-background border border-foreground/8 rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.1)]">

                  {/* Left — main content */}
                  <div className="lg:col-span-8 p-4 sm:p-7 lg:p-10 flex flex-col gap-2.5 sm:gap-4 lg:gap-5 border-b lg:border-b-0 lg:border-r border-foreground/8 overflow-hidden">

                    {/* Tags */}
                    <div className="flex items-center gap-2 shrink-0 flex-wrap">
                      <span className="font-mono text-[11px] tracking-widest uppercase font-bold text-primary bg-primary/8 border border-primary/20 px-3 py-1 rounded-full">
                        {cs.tag}
                      </span>
                      <span className="font-mono text-[11px] tracking-widest uppercase font-semibold text-primary/70 bg-primary/5 border border-primary/15 px-3 py-1 rounded-full">
                        {cs.industry}
                      </span>
                      <span className="font-mono text-[11px] text-foreground/35 ml-1">{cs.year}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-lg sm:text-2xl md:text-3xl lg:text-[2.25rem] text-foreground font-semibold leading-[1.15] tracking-tight shrink-0">
                      {cs.title}
                    </h3>

                    {/* Metric */}
                    <div className="flex items-start gap-3 px-3 py-1.5 sm:py-3 rounded-xl bg-primary/5 border-l-2 border-primary shrink-0">
                      <span className="text-primary text-lg leading-none mt-0.5">↗</span>
                      <p className="text-sm font-semibold text-foreground/80 leading-snug">{cs.metric}</p>
                    </div>

                    {/* Overview */}
                    <p className="hidden lg:block text-sm text-foreground/55 leading-relaxed shrink-0 line-clamp-2">{cs.overview}</p>

                    {/* Challenge / Solution */}
                    <div className="hidden lg:grid grid-cols-2 gap-5 flex-1 min-h-0">
                      <div className="overflow-hidden">
                        <p className="font-mono text-[10px] tracking-widest uppercase mb-2 font-bold text-primary/80 bg-primary/6 border border-primary/15 inline-block px-2 py-0.5 rounded">Challenge</p>
                        <p className="text-sm text-foreground/60 leading-relaxed line-clamp-4">{cs.problem}</p>
                        <ul className="mt-3 flex flex-col gap-1.5">
                          {cs.challenges.slice(0, 2).map((c, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-foreground/25" />
                              <span className="text-xs text-foreground/45 leading-snug line-clamp-2">{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-mono text-[10px] tracking-widest uppercase mb-2 font-bold text-primary/80 bg-primary/6 border border-primary/15 inline-block px-2 py-0.5 rounded">Solution</p>
                        <p className="text-sm text-foreground/60 leading-relaxed line-clamp-4">{cs.solution}</p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {cs.stack.map((t) => (
                            <span key={t} className="font-mono text-[10px] px-2.5 py-1 border border-primary/15 text-primary/60 rounded-full bg-primary/5 font-medium">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Right — outcomes panel */}
                  <div className="lg:col-span-4 relative p-4 sm:p-7 lg:p-10 flex flex-col overflow-hidden bg-foreground/[0.015]">

                    {/* Decorative number */}
                    <p className="absolute -top-2 -right-2 font-display text-[7rem] lg:text-[9rem] leading-none font-bold text-foreground opacity-[0.04] select-none pointer-events-none">
                      {cs.number}
                    </p>

                    {/* Outcomes */}
                    <div className="flex flex-col lg:flex-1 lg:min-h-0">
                      <p className="font-mono text-[10px] tracking-widest uppercase mb-2 sm:mb-3 shrink-0 font-bold text-primary/80 bg-primary/6 border border-primary/15 inline-block px-2 py-0.5 rounded self-start">Key Outcomes</p>
                      <ul className="flex flex-col gap-2 lg:flex-1 lg:justify-between lg:gap-0">
                        {cs.outcomes.map((outcome, i) => (
                          <li key={i} className="flex items-start gap-3 py-1.5 sm:py-2.5 border-b border-foreground/6 last:border-0">
                            <span className="shrink-0 mt-0.5 font-mono text-[10px] font-bold text-primary bg-primary/8 border border-primary/20 w-5 h-5 rounded flex items-center justify-center leading-none">
                              {i + 1}
                            </span>
                            <p className="text-sm text-foreground/60 leading-snug">{outcome}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom: type + CTA */}
                    <div className="mt-3 sm:mt-4 flex flex-col gap-2 sm:gap-3 shrink-0">
                      <div className="flex items-center gap-2 pt-3 border-t border-foreground/8">
                        <span className="font-mono text-[10px] tracking-widest text-foreground/35 uppercase">Type</span>
                        <span className="text-foreground/15">·</span>
                        <span className="font-mono text-[10px] font-semibold text-primary">{cs.type}</span>
                      </div>
                      <Link
                        href={`/case-study/${cs.slug}`}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-primary/20 bg-primary/6 text-primary text-sm font-medium hover:bg-primary/12 transition-colors duration-200 group"
                      >
                        View Case Study
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                      </Link>
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="mt-4 flex items-center justify-between shrink-0">
            {/* Dots + View All */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {caseStudies.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i, i > active ? 1 : -1)}
                    aria-label={`Go to case study ${i + 1}`}
                    className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300 focus:outline-none"
                    style={{
                      width: i === active ? 32 : 8,
                      background: i === active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)",
                    }}
                  >
                    {i === active && (
                      <motion.span
                        className="absolute inset-y-0 left-0 bg-white/30 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: (AUTOPLAY_DELAY - 1100) / 1000, ease: "linear" }}
                        key={active}
                      />
                    )}
                  </button>
                ))}
              </div>
              <Link
                href="/case-studies"
                className="font-mono text-[11px] tracking-widest uppercase text-white/60 hover:text-white flex items-center gap-1.5 transition-colors duration-200"
              >
                View All
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Prev / Next */}
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                aria-label="Previous"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                aria-label="Next"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors duration-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
