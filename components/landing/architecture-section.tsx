"use client";

import { useEffect, useRef, useState } from "react";
import {
  Monitor, Smartphone, Cpu, GitBranch,
  Bot, Database, Cloud, ShieldCheck,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const layers = [
  {
    label: "Client Layer",
    items: [
      { icon: Monitor,    name: "Web Portal",    note: "Responsive interfaces"        },
      { icon: Smartphone, name: "Mobile Apps",   note: "iOS & Android native"         },
    ],
  },
  {
    label: "Logic Layer",
    items: [
      { icon: Cpu,       name: "Microservices", note: "Domain-isolated services"      },
      { icon: GitBranch, name: "Orchestration", note: "Event-driven workflows"        },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { icon: Bot,      name: "AI Agents",  note: "Autonomous decision-making"        },
      { icon: Database, name: "Vector DB",  note: "Embeddings & semantic search"      },
    ],
  },
  {
    label: "Foundation",
    items: [
      { icon: Cloud,       name: "Hybrid Cloud", note: "AWS / Azure / GCP"            },
      { icon: ShieldCheck, name: "Zero-Trust",   note: "Security-first access"        },
    ],
  },
];

const metrics = [
  { value: "45%",  label: "Maintenance Cost Reduction", sub: "vs. legacy maintenance spend", pct: 45  },
  { value: "12×",  label: "Delivery Velocity",           sub: "faster time-to-production",   pct: 85  },
  { value: "100%", label: "AI Compatibility",             sub: "cloud-native, model-ready",   pct: 100 },
];

function useInView(threshold = 0.1) {
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

export function ArchitectureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const grid       = useInView();
  const metricsRef = useInView();

  useEffect(() => {
    const scroller  = undefined;
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          Array.from(headerRef.current.children),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
            scrollTrigger: { trigger: headerRef.current, scroller, start: "top 80%", once: true } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="architecture"
      className="snap-section relative bg-background border-t border-foreground/10 overflow-hidden flex flex-col"
    >
      <div className="section-inner max-w-7xl mx-auto px-6 lg:px-10 w-full flex-1 flex flex-col pt-16 sm:pt-20 pb-4 sm:pb-6 min-h-0" style={{ minHeight: 0 }}>

        {/* Section label */}
        <div className="flex items-center gap-4 mb-2 sm:mb-4 shrink-0">
          <span data-section-label className="font-mono text-sm tracking-[0.2em] text-foreground/70 uppercase">Technical Blueprint</span>
          <div data-divider className="flex-1 h-px bg-foreground/10" />
        </div>

        {/* Header */}
        <div ref={headerRef} className="grid lg:grid-cols-12 gap-3 lg:gap-6 mb-3 sm:mb-4 shrink-0">
          <div className="lg:col-span-6">
            <h2 className="font-display text-3xl md:text-4xl lg:text-4xl xl:text-5xl tracking-tight text-foreground leading-[1.05] font-bold">
              Enterprise Architecture
            </h2>
          </div>
          <div className="hidden lg:col-span-6 lg:flex lg:items-end">
            <p className="text-foreground/55 text-sm leading-relaxed">
              Every system we build follows a layered blueprint — client, logic, intelligence, and foundation — engineered to scale and secure by default.
            </p>
          </div>
        </div>

        {/* Body — flex-1 fills remaining height */}
        <div className="flex-1 flex flex-col min-h-0 gap-3">

          {/* Architecture layers grid — flex-1 so it takes remaining height */}
          <div ref={grid.ref} className="flex-1 min-h-0 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {layers.map((layer, li) => (
              <div
                key={layer.label}
                className={`rounded-2xl border border-foreground/[0.07] bg-foreground/[0.015] p-4 sm:p-5 flex flex-col
                  transition-all duration-700
                  ${grid.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${li * 80}ms` }}
              >
                <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-foreground/35 mb-3 sm:mb-4 shrink-0">
                  {layer.label}
                </p>
                <div className="flex flex-col flex-1 gap-2 sm:gap-3">
                  {layer.items.map(({ icon: Icon, name, note }) => (
                    <div key={name} className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-background border border-foreground/[0.06] flex-1">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-foreground/[0.04] border border-foreground/[0.07] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-foreground/45" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm sm:text-base font-bold text-foreground/80 leading-tight">{name}</p>
                        <p className="text-[10px] sm:text-[11px] font-mono text-foreground/35 leading-tight mt-0.5">{note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Impact metrics — fixed height at bottom */}
          <div
            ref={metricsRef.ref}
            className={`shrink-0 rounded-2xl border border-foreground/[0.07] bg-foreground/[0.015] p-4 sm:p-5
              transition-all duration-700 ${metricsRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "320ms" }}
          >
            <p className="font-display text-sm sm:text-base font-bold tracking-[0.15em] uppercase text-foreground/70 mb-2 sm:mb-3">The Bigstrum Impact</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
              {metrics.map(({ value, label, sub, pct }, i) => (
                <div key={label} className="flex flex-col gap-1.5">
                  <div className="flex sm:flex-col sm:gap-0.5 items-center sm:items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-foreground/55 font-medium leading-tight">{label}</p>
                      <p className="hidden sm:block text-[10px] font-mono text-foreground/30 mt-0.5">{sub}</p>
                    </div>
                    <span className="font-display text-2xl sm:text-3xl font-bold text-primary shrink-0 leading-none">{value}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-foreground/[0.08]">
                    <div
                      className="h-1.5 rounded-full bg-primary transition-all duration-1000 ease-out"
                      style={{ width: metricsRef.inView ? `${pct}%` : "0%", transitionDelay: `${400 + i * 150}ms` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[10px] font-mono text-foreground/30 italic">
              *Averages based on 2025–2026 enterprise modernization audits.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
