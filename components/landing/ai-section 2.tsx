"use client";

import { useEffect, useRef, useState } from "react";
import { Brain, Database, Bot, Eye, BarChart3, Server } from "lucide-react";

const capabilities = [
  {
    number: "01",
    icon: Brain,
    title: "LLM Integration",
    description: "Production-grade integration of GPT-4, Claude, Gemini, and open-source models into your existing systems with guardrails, fallback chains, and eval loops.",
    tags: ["OpenAI", "Anthropic", "Gemini", "LangChain"],
    stat: "< 200ms",
    statLabel: "avg. inference latency",
    featured: true,
  },
  {
    number: "02",
    icon: Database,
    title: "RAG Pipelines",
    description: "Retrieval-Augmented Generation over your private data — document ingestion, vector search, reranking, and grounded responses that stay on-topic.",
    tags: ["Pinecone", "pgvector", "Weaviate", "LlamaIndex"],
    stat: "99.2%",
    statLabel: "retrieval accuracy",
    featured: false,
  },
  {
    number: "03",
    icon: Bot,
    title: "AI Agents & Automation",
    description: "Autonomous agent workflows that plan, use tools, and execute multi-step tasks — from data extraction to report generation to customer support.",
    tags: ["LangGraph", "CrewAI", "Tool Use", "Function Calling"],
    stat: "10×",
    statLabel: "ops throughput",
    featured: false,
  },
  {
    number: "04",
    icon: Eye,
    title: "Computer Vision",
    description: "Custom vision models for document OCR, defect detection, medical imaging, and real-time video analytics deployed at the edge or in the cloud.",
    tags: ["YOLOv10", "SAM 2", "OpenCV", "ONNX"],
    stat: "97%",
    statLabel: "detection accuracy",
    featured: false,
  },
  {
    number: "05",
    icon: BarChart3,
    title: "Predictive Analytics",
    description: "Time-series forecasting, anomaly detection, and churn/risk scoring models trained on your domain data and served as low-latency REST APIs.",
    tags: ["XGBoost", "PyTorch", "MLflow", "FastAPI"],
    stat: "35%",
    statLabel: "avg. accuracy lift",
    featured: false,
  },
  {
    number: "06",
    icon: Server,
    title: "AI Infrastructure",
    description: "End-to-end ML platform engineering — model registries, CI/CD for ML, GPU cluster management, and cost-optimised inference serving at scale.",
    tags: ["Kubernetes", "Ray", "vLLM", "Triton"],
    stat: "60%",
    statLabel: "infra cost reduction",
    featured: false,
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export function AISection() {
  const header = useInView();
  const grid = useInView(0.05);

  return (
    <section id="ai" className="relative bg-background flex flex-col min-h-screen overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full flex flex-col flex-1 py-10 lg:py-14">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-8 shrink-0">
          <span className="font-mono text-sm tracking-[0.2em] text-foreground/70 uppercase">AI Capabilities</span>
          <div className="flex-1 h-px bg-foreground/10" />
          <span className="font-mono text-[10px] tracking-widest text-primary uppercase px-3 py-1 border border-primary/25 rounded-full bg-primary/6">
            Production Ready
          </span>
        </div>

        {/* Header */}
        <div
          ref={header.ref}
          className={`grid lg:grid-cols-12 gap-6 mb-10 shrink-0 transition-all duration-700 ${
            header.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="lg:col-span-6">
            <h2 className="font-display text-4xl md:text-5xl tracking-tight text-foreground leading-[1.05]">
              Built for the AI Era
            </h2>
          </div>
          <div className="lg:col-span-6 lg:flex lg:items-end">
            <p className="text-foreground/50 text-lg leading-relaxed">
              We design and ship AI systems that work reliably in production — not demos. Every capability is grounded in real-world constraints.
            </p>
          </div>
        </div>

        {/* Capabilities grid */}
        <div
          ref={grid.ref}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1"
        >
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.number}
                className={`group relative rounded-2xl bg-primary flex flex-col gap-5 p-7 overflow-hidden cursor-default transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 ${
                  grid.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                {/* Subtle inner glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Top row — number + stat */}
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                    <Icon className="w-4.5 h-4.5 text-white/80" strokeWidth={1.5} />
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl text-white font-semibold leading-none tracking-tight">{cap.stat}</p>
                    <p className="font-mono text-[9px] tracking-widest text-white/45 uppercase mt-1">{cap.statLabel}</p>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <span className="font-mono text-[9px] tracking-[0.2em] text-white/35 uppercase block mb-1.5">{cap.number}</span>
                  <h3 className="font-display text-xl text-white leading-tight">
                    {cap.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-white/60 leading-relaxed flex-1">
                  {cap.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                  {cap.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2.5 py-1 rounded-md bg-white/15 text-white font-semibold tracking-wide border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
