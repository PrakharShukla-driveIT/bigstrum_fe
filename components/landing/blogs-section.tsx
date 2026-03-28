"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    tag: "Cybersecurity",
    title: "Why Compliance Automation Is No Longer Optional for Enterprises",
    excerpt:
      "Manual compliance workflows create audit gaps, slow down teams, and leave businesses exposed. Here's how intelligent automation changes the equation.",
    date: "Mar 2026",
    readTime: "6 min",
    featured: true,
  },
  {
    tag: "Healthcare IT",
    title: "Building HIPAA-Ready Systems: What Most Engineers Get Wrong",
    excerpt: "HIPAA compliance isn't just about encryption. Most violations come from overlooked access controls and audit logging gaps.",
    date: "Feb 2026",
    readTime: "8 min",
    featured: false,
  },
  {
    tag: "Architecture",
    title: "Event-Driven Architecture for Real-Time Healthcare Monitoring",
    excerpt: "How we designed a sub-100ms alert pipeline for patient vitals using Kafka, Spring Boot, and a custom risk-scoring engine.",
    date: "Jan 2026",
    readTime: "10 min",
    featured: false,
  },
  {
    tag: "AI / ML",
    title: "Integrating LLMs Into Production Systems Without the Risk",
    excerpt: "LLMs are powerful but unpredictable in production. We share the guardrails, fallback strategies, and evaluation loops we use.",
    date: "Dec 2025",
    readTime: "7 min",
    featured: false,
  },
];

const featured = articles.find((a) => a.featured)!;
const rest = articles.filter((a) => !a.featured);

export function BlogsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-article]").forEach((el, i) => {
        gsap.from(el, {
          y: 32, opacity: 0, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", end: "top 60%", scrub: 1 },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="articles" ref={sectionRef} className="relative bg-background flex flex-col lg:min-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full flex flex-col flex-1 py-12 lg:py-14">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-8 shrink-0">
          <span data-section-label className="font-mono text-sm tracking-[0.2em] text-foreground/70 uppercase">Insights</span>
          <div data-divider className="flex-1 h-px bg-foreground/10" />
          <a href="#" className="inline-flex items-center gap-1.5 font-mono text-xs tracking-widest uppercase text-primary hover:text-primary/70 transition-colors duration-200">
            All articles <ArrowRight className="w-3 h-3" />
          </a>
        </div>

        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-6 mb-8 shrink-0">
          <div className="lg:col-span-6">
            <h2 className="font-display text-4xl md:text-5xl tracking-tight text-foreground leading-[1.05]">
              From the engineering desk
            </h2>
          </div>
          <div className="lg:col-span-6 lg:flex lg:items-end">
            <p className="text-foreground/50 text-base leading-relaxed">
              Technical deep-dives, architecture decisions, and lessons learned building software for regulated industries.
            </p>
          </div>
        </div>

        {/* Article grid — stretches to fill height */}
        <div className="grid lg:grid-cols-12 gap-3 flex-1 min-h-0">

          {/* Featured — left */}
          <div
            data-article
            className="lg:col-span-6 bg-background rounded-2xl p-8 lg:p-10 flex flex-col justify-between group cursor-pointer hover:bg-foreground/[0.03] transition-colors duration-300 border border-foreground/6"
          >
            <div className="flex flex-col gap-5 flex-1">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-mono tracking-widest uppercase font-bold bg-foreground/5 border border-foreground/12 text-foreground/60">
                  {featured.tag}
                </span>
                <span className="font-mono text-[10px] text-foreground/30">{featured.date} · {featured.readTime} read</span>
              </div>

              <h3 className="font-display text-2xl md:text-3xl lg:text-[1.85rem] text-foreground leading-tight group-hover:text-primary transition-colors duration-200">
                {featured.title}
              </h3>

              <p className="text-foreground/55 text-base leading-relaxed flex-1">
                {featured.excerpt}
              </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-foreground/8 mt-6">
              <span className="font-mono text-[10px] tracking-widest uppercase text-foreground/35">Featured</span>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0">
                Read article <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Right column — 3 smaller cards */}
          <div className="lg:col-span-6 flex flex-col gap-3">
            {rest.map((article) => (
              <div
                key={article.title}
                data-article
                className="bg-background rounded-2xl p-6 lg:p-7 flex flex-col gap-3 flex-1 group cursor-pointer hover:bg-foreground/[0.03] transition-colors duration-300 border border-foreground/6"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-mono tracking-widest uppercase font-bold bg-foreground/5 border border-foreground/12 text-foreground/60">
                    {article.tag}
                  </span>
                  <span className="font-mono text-[10px] text-foreground/30">{article.date} · {article.readTime} read</span>
                </div>

                <h3 className="font-display text-lg md:text-xl text-foreground leading-snug group-hover:text-primary transition-colors duration-200">
                  {article.title}
                </h3>

                <p className="text-foreground/45 text-sm leading-relaxed line-clamp-2 flex-1">
                  {article.excerpt}
                </p>

                <div className="flex justify-end pt-2">
                  <ArrowUpRight className="w-4 h-4 text-foreground/20 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
