"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

function useInView(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = null;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold, root }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const buildItems = [
  {
    title: "Secure Enterprise Platforms",
    tag: "Custom Software",
    desc: "Compliance-heavy systems built for audit-readiness. Every access control, log, and data boundary is engineered from the ground up — not retrofitted after the fact.",
  },
  {
    title: "AI-Driven Workflows",
    tag: "Intelligent Automation",
    desc: "From model selection to production guardrails. We build pipelines that reduce manual overhead without introducing unpredictable behaviour at scale.",
  },
  {
    title: "Mission-Critical Infrastructure",
    tag: "Backend Engineering",
    desc: "Event-driven architectures designed for 99.9% uptime in regulated, latency-sensitive environments. Built to hold under real production load.",
  },
];

const approachSteps = [
  {
    step: "01",
    title: "Understand First",
    desc: "We map your constraints, compliance requirements, and failure modes before a single line of code is written. No assumptions.",
  },
  {
    step: "02",
    title: "Design for Reality",
    desc: "Architecture is reviewed against your actual operating environment — your team size, your scale, and the edge cases that matter most.",
  },
  {
    step: "03",
    title: "Own the Outcome",
    desc: "One team carries full accountability from the first commit through to production deployment, monitoring, and iteration.",
  },
];

export function AboutSection() {
  const header = useInView();
  const body = useInView();
  const bottom = useInView();
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id="about"
      className="snap-section relative bg-primary overflow-hidden flex flex-col"
    >
      <div className={`section-inner max-w-7xl mx-auto px-6 lg:px-10 w-full flex-1 flex flex-col pt-16 sm:pt-20 pb-4 sm:pb-6 ${expanded ? "overflow-y-auto" : "overflow-hidden"}`}>

        {/* Section label */}
        <div className="flex items-center gap-4 mb-4 sm:mb-5 shrink-0">
          <span data-section-label className="font-mono text-sm tracking-[0.2em] text-white/70 uppercase">About Us</span>
          <div data-divider className="flex-1 h-px bg-white/15" />
        </div>

        {/* Distributed layout */}
        <div className="flex-1 flex flex-col justify-between min-h-0">

          {/* Who We Are */}
          <div
            ref={header.ref}
            className={`shrink-0 transition-all duration-700 ${header.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-[1.08] mb-2">
              Engineering for industries where failure is not an option.
            </h2>
            <p className="text-white/55 text-sm sm:text-base">
              In high-stakes environments, software cannot break, lag, or fail silently. We engineer systems that are secure, scalable, and built to withstand real-world complexity—across cybersecurity, healthcare, government, and enterprise.
            </p>
          </div>

          {/* What We Build + Our Approach — flex-1 + min-h-0 so it shrinks at high zoom */}
          <div
            ref={body.ref}
            className={`flex-1 min-h-0 grid grid-cols-2 gap-2 sm:gap-6 overflow-hidden transition-all duration-700 ${body.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            {/* What We Build */}
            <div className="flex flex-col min-h-0">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-white/50 uppercase block mb-2 sm:mb-3 shrink-0">What We Build</span>
              <div className="flex flex-col gap-2 sm:gap-3 flex-1 min-h-0 overflow-hidden">
                {buildItems.map(({ title, tag, desc }, i) => (
                  <div
                    key={title}
                    className="border border-white/12 rounded-xl bg-white/[0.05] px-3 py-3 sm:px-5 sm:py-5 flex flex-col gap-1 sm:gap-2 flex-1 min-h-0 overflow-hidden hover:bg-white/[0.09] transition-colors duration-300"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    <span className="font-mono text-[8px] sm:text-[9px] tracking-widest text-white/35 uppercase shrink-0">{tag}</span>
                    <p className="text-white font-semibold text-sm sm:text-lg leading-snug shrink-0">{title}</p>
                    <p className="text-white/55 text-[11px] sm:text-sm leading-relaxed hidden sm:block overflow-hidden">{desc}</p>
                    <p className="text-white/55 text-[11px] leading-snug sm:hidden line-clamp-2">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Approach */}
            <div className="flex flex-col min-h-0">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-white/50 uppercase block mb-2 sm:mb-3 shrink-0">Our Approach</span>
              <div className="flex flex-col gap-2 sm:gap-3 flex-1 min-h-0 overflow-hidden">
                {approachSteps.map(({ step, title, desc }, i) => (
                  <div
                    key={step}
                    className="border border-white/12 rounded-xl bg-white/[0.05] px-3 py-3 sm:px-5 sm:py-5 flex gap-2 sm:gap-4 flex-1 min-h-0 overflow-hidden hover:bg-white/[0.09] transition-colors duration-300"
                    style={{ transitionDelay: `${i * 60 + 180}ms` }}
                  >
                    <span className="font-mono text-[9px] sm:text-xs text-white/30 mt-0.5 shrink-0">{step}</span>
                    <div className="flex flex-col gap-1 sm:gap-2 min-h-0 overflow-hidden">
                      <p className="text-white font-semibold text-sm sm:text-lg leading-snug shrink-0">{title}</p>
                      <p className="text-white/55 text-[11px] sm:text-sm leading-relaxed hidden sm:block overflow-hidden">{desc}</p>
                      <p className="text-white/55 text-[11px] leading-snug sm:hidden line-clamp-2">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Why It Matters + Closing — hidden on mobile until expanded */}
          <div
            ref={bottom.ref}
            className={`shrink-0 transition-all duration-700 ${bottom.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${expanded ? "block" : "hidden sm:block"}`}
          >
            <div className="border-t border-white/15 pt-4 sm:pt-5 grid lg:grid-cols-2 gap-4 items-end">
              <div>
                <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase block mb-2">Why It Matters</span>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed">Most software fails precisely where the stakes are highest.</p>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed">We build for the edge cases that cannot be missed.</p>
              </div>
              <div className="lg:flex lg:justify-end">
                <p className="font-display text-base sm:text-xl text-white/90 leading-snug lg:text-right">
                  &ldquo;When the margin for error is zero,<br className="hidden sm:block" /> engineering has to be right.&rdquo;
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Explore More / Collapse CTA — mobile only */}
        <div className="sm:hidden pt-4 shrink-0">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium text-sm border border-white/20 hover:border-white/40 px-5 py-2.5 rounded-full transition-all duration-200"
          >
            {expanded ? "Collapse" : "Explore More"}
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
          </button>
        </div>

      </div>
    </section>
  );
}
