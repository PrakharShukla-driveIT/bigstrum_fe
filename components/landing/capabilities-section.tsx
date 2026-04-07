"use client";

import { useEffect, useRef, useState } from "react";
import {
  Monitor, Rocket, Layers, BrainCircuit, BarChart3,
  GitMerge, Wrench, Database,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    icon: Monitor,
    tag: "Web & Mobile",
    title: "Full-Stack Development",
    desc: "High-performance cross-platform ecosystems engineered for enterprise scale — from pixel-perfect interfaces to resilient backend APIs.",
    pills: ["React", "Next.js", "Node.js", "React Native"],
  },
  {
    icon: Rocket,
    tag: "Startups",
    title: "MVP Development",
    desc: "Ship your first version fast. We scope, design, and build lean MVPs that validate your product hypothesis without burning runway.",
    pills: ["Rapid Build", "Launch-Ready", "Lean Scope"],
  },
  {
    icon: Layers,
    tag: "Product",
    title: "Product Development",
    desc: "End-to-end product engineering — from discovery to delivery. Scalable, user-centered products built to grow with your business.",
    pills: ["Discovery", "UI/UX Design", "Engineering"],
  },
  {
    icon: BrainCircuit,
    tag: "AI & ML",
    title: "Custom AI Agents",
    desc: "Architect autonomous AI entities tailored to your data to automate complex decision-making workflows at enterprise scale.",
    pills: ["LLM Integration", "RAG", "MLOps"],
  },
  {
    icon: BarChart3,
    tag: "Intelligence",
    title: "Analytics & Insights",
    desc: "Custom ML models and dashboards for forecasting, classification, and risk scoring — integrated directly into your existing workflows.",
    pills: ["Predictive Models", "Dashboards", "Data Pipelines"],
  },
  {
    icon: GitMerge,
    tag: "Integration",
    title: "Scalable Integrations",
    desc: "Resilient API frameworks that harmonize disparate services and third-party platforms — accelerating delivery across your ecosystem.",
    pills: ["REST", "GraphQL", "Event-Driven"],
  },
  {
    icon: Wrench,
    tag: "Ongoing",
    title: "Maintenance & Support",
    desc: "Dedicated engineering support to keep your systems performant, secure, and evolving — with SLA-backed response and proactive monitoring.",
    pills: ["SLA Support", "Monitoring", "Security"],
  },
  {
    icon: Database,
    tag: "Legacy",
    title: "Legacy Modernization",
    desc: "Unlock your legacy data. Re-architect monoliths into agile, cloud-native environments — without disrupting your core operations.",
    pills: ["API Encapsulation", "Cloud Migration", "Refactoring"],
  },
];

function useMouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  function onMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return {
    ref, pos, active, onMouseMove,
    onMouseEnter: () => setActive(true),
    onMouseLeave: () => setActive(false),
  };
}

function CapabilityCard({
  icon: Icon, tag, title, desc, index,
}: Omit<(typeof capabilities)[0], "pills"> & { index: number }) {
  const spotlight = useMouseSpotlight();

  return (
    <div
      ref={spotlight.ref}
      onMouseMove={spotlight.onMouseMove}
      onMouseEnter={spotlight.onMouseEnter}
      onMouseLeave={spotlight.onMouseLeave}
      className="cap-card relative rounded-2xl border border-white/20 bg-white p-3 md:p-5 flex flex-col gap-2 md:gap-4 overflow-hidden min-h-0
        hover:-translate-y-1 hover:shadow-xl hover:shadow-black/25 hover:border-white/40
        transition-all duration-500"
    >
      {/* Mouse spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-400"
        style={{
          opacity: spotlight.active ? 1 : 0,
          background: `radial-gradient(360px circle at ${spotlight.pos.x}px ${spotlight.pos.y}px, rgba(0,0,0,0.03) 0%, transparent 65%)`,
        }}
      />

      {/* Top row */}
      <div className="relative flex items-start justify-between pb-3 md:pb-4">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-black/10" />
        <div
          className="absolute bottom-0 left-0 h-px bg-black/30 transition-all duration-500 ease-out"
          style={{ width: spotlight.active ? "100%" : "0%" }}
        />
        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl border flex items-center justify-center shrink-0 transition-colors duration-300
          ${spotlight.active ? "bg-black/10 border-black/20" : "bg-black/5 border-black/10"}`}>
          <Icon className="w-3.5 h-3.5 text-foreground/70" />
        </div>
        <span className="font-mono text-[8px] md:text-[9px] tracking-widest uppercase text-foreground/40 border border-black/10 px-2 py-0.5 md:px-2.5 md:py-1 rounded-full">
          {tag}
        </span>
      </div>

      {/* Text */}
      <div className="flex-1">
        <h3 className={`font-display text-sm md:text-xl mb-1.5 md:mb-2.5 leading-tight transition-colors duration-300
          ${spotlight.active ? "text-foreground" : "text-foreground/85"}`}>
          {title}
        </h3>
        <p className={`hidden md:block text-sm leading-relaxed transition-colors duration-300
          ${spotlight.active ? "text-foreground/65" : "text-foreground/50"}`}>
          {desc}
        </p>
      </div>

    </div>
  );
}

export function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = undefined;
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          Array.from(headerRef.current.children),
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: headerRef.current, scroller, start: "top 80%", once: true },
          }
        );
      }

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".cap-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.07, ease: "power3.out",
            scrollTrigger: { trigger: gridRef.current, scroller, start: "top 78%", once: true },
          }
        );

      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="snap-section relative bg-primary overflow-hidden flex flex-col"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full flex-1 flex flex-col min-h-0 pt-16 sm:pt-20 pb-2 sm:pb-5">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-1 sm:mb-3 shrink-0">
          <span data-section-label className="font-mono text-sm tracking-[0.2em] text-white/70 uppercase">What We Build</span>
          <div data-divider className="flex-1 h-px bg-white/15" />
        </div>

        {/* Header */}
        <div ref={headerRef} className="grid lg:grid-cols-12 gap-4 lg:gap-8 mb-2 sm:mb-4 shrink-0">
          <div className="lg:col-span-6">
            <h2 className="font-display text-2xl md:text-4xl lg:text-4xl xl:text-5xl tracking-tight text-white leading-[1.05]">
              Our Capabilities
            </h2>
          </div>
          <div className="hidden lg:col-span-6 lg:flex lg:items-end">
            <p className="text-white/55 text-base leading-relaxed">
              From zero-to-one MVPs to enterprise AI and legacy modernization — end-to-end engineering across every layer of your stack.
            </p>
          </div>
        </div>

        {/* Cards grid — fluid auto-fill columns (min 260px), equal-height rows fill remaining space */}
        <div
          ref={gridRef}
          className="cap-cards-grid grid gap-2 sm:gap-3 flex-1 min-h-0 overflow-hidden"
          style={{
            gridAutoRows: '1fr',                          /* equal-height rows, determined by grid height */
          }}
        >
          {capabilities.map((cap, i) => (
            <CapabilityCard key={cap.title} {...cap} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
