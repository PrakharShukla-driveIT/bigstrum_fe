"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrainCircuit, ShieldCheck, Zap, GitMerge, ScanSearch, BarChart3 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    icon: BrainCircuit,
    tag: "Language AI",
    title: "LLM Integration",
    desc: "Production-safe integration of large language models with guardrails, fallback strategies, and evaluation loops built in from day one.",
    pills: ["GPT-4o", "Claude", "Llama", "Mistral"],
  },
  {
    icon: ScanSearch,
    tag: "Retrieval",
    title: "RAG Systems",
    desc: "Retrieval-augmented generation pipelines that ground model outputs in your proprietary data — accurate, auditable, and hallucination-resistant.",
    pills: ["Vector DB", "Embeddings", "Reranking"],
  },
  {
    icon: Zap,
    tag: "Real-Time",
    title: "Inference Pipelines",
    desc: "Sub-100ms inference pipelines for anomaly detection, alert systems, and live scoring — built on event-driven, stream-processing architecture.",
    pills: ["Kafka", "Redis", "FastAPI"],
  },
  {
    icon: ShieldCheck,
    tag: "Compliance",
    title: "Compliance-Aware AI",
    desc: "AI systems designed around your regulatory environment — HIPAA, GDPR, and sector-specific constraints handled at the architecture level, not bolted on.",
    pills: ["HIPAA", "GDPR", "Audit Logs"],
  },
  {
    icon: BarChart3,
    tag: "Analytics",
    title: "Predictive Analytics",
    desc: "Custom ML models for forecasting, classification, and risk scoring — trained on your domain data and integrated directly into your existing dashboards.",
    pills: ["Scikit-learn", "XGBoost", "PyTorch"],
  },
  {
    icon: GitMerge,
    tag: "Operations",
    title: "MLOps & Monitoring",
    desc: "Continuous monitoring of model performance, latency, and accuracy drift — with automated retraining pipelines and rollback-safe deployments.",
    pills: ["MLflow", "Prometheus", "Docker"],
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
    ref,
    pos,
    active,
    onMouseMove,
    onMouseEnter: () => setActive(true),
    onMouseLeave: () => setActive(false),
  };
}

function AICard({
  icon: Icon,
  tag,
  title,
  desc,
  pills,
  index,
}: (typeof capabilities)[0] & { index: number }) {
  const spotlight = useMouseSpotlight();

  return (
    <div
      ref={spotlight.ref}
      onMouseMove={spotlight.onMouseMove}
      onMouseEnter={spotlight.onMouseEnter}
      onMouseLeave={spotlight.onMouseLeave}
      className="ai-card relative rounded-2xl border border-white/10 bg-primary p-7 flex flex-col gap-5 overflow-hidden
        hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/30 hover:border-white/20
        transition-all duration-500"
    >
      {/* Mouse spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-400"
        style={{
          opacity: spotlight.active ? 1 : 0,
          background: `radial-gradient(360px circle at ${spotlight.pos.x}px ${spotlight.pos.y}px, rgba(255,255,255,0.06) 0%, transparent 65%)`,
        }}
      />

      {/* Top row */}
      <div className="relative flex items-start justify-between pb-5">
        {/* Static base border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
        {/* Animated sweep */}
        <div
          className="absolute bottom-0 left-0 h-px bg-white/30 transition-all duration-500 ease-out"
          style={{ width: spotlight.active ? "100%" : "0%" }}
        />

        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-colors duration-300
          ${spotlight.active ? "bg-white/20 border-white/30" : "bg-white/10 border-white/20"}`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <span className="font-mono text-[9px] tracking-widest uppercase text-white/50 border border-white/20 px-2.5 py-1 rounded-full">
          {tag}
        </span>
      </div>

      {/* Text */}
      <div className="flex-1">
        <h3 className={`font-display text-xl mb-2.5 transition-colors duration-300
          ${spotlight.active ? "text-white" : "text-white/90"}`}>
          {title}
        </h3>
        <p className={`text-sm leading-relaxed transition-colors duration-300
          ${spotlight.active ? "text-white/70" : "text-white/55"}`}>
          {desc}
        </p>
      </div>

      {/* Tech pills */}
      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
        {pills.map((p, j) => (
          <span
            key={p}
            className={`ai-pill font-mono text-[10px] px-2.5 py-1 rounded-full border font-medium tracking-wide transition-all duration-300
              ${spotlight.active ? "border-white/40 text-white bg-white/20" : "border-white/25 text-white/70 bg-white/10"}`}
            style={{ transitionDelay: spotlight.active ? `${j * 40}ms` : "0ms" }}
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

export function AISection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          Array.from(headerRef.current.children),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".ai-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 78%",
              once: true,
            },
          }
        );

        const pills = gridRef.current.querySelectorAll(".ai-pill");
        gsap.fromTo(
          pills,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.03,
            ease: "back.out(1.6)",
            delay: 0.35,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 78%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="ai" className="relative py-16 sm:py-24 lg:py-36 bg-background border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span data-section-label className="font-mono text-sm tracking-[0.2em] text-foreground/70 uppercase">AI & Machine Learning</span>
          <div data-divider className="flex-1 h-px bg-foreground/10" />
        </div>

        {/* Header */}
        <div ref={headerRef} className="grid lg:grid-cols-12 gap-6 lg:gap-8 mb-10 lg:mb-16">
          <div className="lg:col-span-6">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground leading-[1.05]">
              AI built for production
            </h2>
          </div>
          <div className="lg:col-span-6 lg:flex lg:items-end">
            <p className="text-foreground/55 text-lg leading-relaxed">
              We integrate intelligent capabilities into regulated, high-stakes systems — with the same engineering rigour we apply to every other layer of the stack.
            </p>
          </div>
        </div>

        {/* Capability cards */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap, i) => (
            <AICard key={cap.title} {...cap} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
