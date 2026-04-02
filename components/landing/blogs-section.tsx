"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowRight, ChevronDown } from "lucide-react";
import { insights } from "@/lib/insights-data";

gsap.registerPlugin(ScrollTrigger);

const featured = insights.find((a) => a.featured)!;
const rest = insights.filter((a) => !a.featured);

export function BlogsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const isMobile = window.innerWidth < 1024;
    const container = isMobile ? null : document.getElementById("snap-container");
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-article]").forEach((el) => {
        gsap.from(el, {
          y: 32, opacity: 0, ease: "power3.out",
          scrollTrigger: { trigger: el, scroller: container ?? undefined, start: "top 90%", end: "top 60%", scrub: 1 },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="articles"
      ref={sectionRef}
      className="snap-section relative bg-background flex flex-col overflow-hidden"
      style={{ height: '100dvh' }}
    >
      <div className={`max-w-7xl mx-auto px-6 lg:px-10 w-full flex flex-col flex-1 pt-[84px] sm:pt-24 pb-4 sm:pb-8 ${expanded ? "overflow-y-auto" : "overflow-hidden"}`}>

        {/* Section label */}
        <div className="flex items-center gap-4 mb-4 sm:mb-6 shrink-0">
          <span data-section-label className="font-mono text-sm tracking-[0.2em] text-foreground/70 uppercase">Insights</span>
          <div data-divider className="flex-1 h-px bg-foreground/10" />
          <Link href="/insights" className="inline-flex items-center gap-1.5 font-mono text-xs tracking-widest uppercase text-primary hover:text-primary/70 transition-colors duration-200">
            All articles <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-4 mb-4 sm:mb-6 shrink-0">
          <div className="lg:col-span-6">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground leading-[1.05]">
              From the engineering desk
            </h2>
          </div>
          <div className="hidden lg:col-span-6 lg:flex lg:items-end">
            <p className="text-foreground/50 text-base leading-relaxed">
              Technical deep-dives, architecture decisions, and lessons learned building software at scale.
            </p>
          </div>
        </div>

        {/* Article grid */}
        <div className="grid lg:grid-cols-12 gap-3 flex-1 min-h-0 sm:overflow-y-auto">

          {/* Featured */}
          <Link
            href={`/insights/${featured.slug}`}
            data-article
            className="lg:col-span-6 lg:h-full bg-background rounded-2xl p-6 lg:p-10 flex flex-col justify-between group cursor-pointer hover:bg-foreground/[0.03] transition-colors duration-300 border border-foreground/6"
          >
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-mono tracking-widest uppercase font-bold bg-foreground/5 border border-foreground/12 text-foreground/60">
                  {featured.category}
                </span>
                <span className="font-mono text-[10px] text-foreground/30">{featured.date} · {featured.readTime} read</span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl lg:text-[1.85rem] text-foreground leading-tight group-hover:text-primary transition-colors duration-200">
                {featured.title}
              </h3>

              <p className="text-foreground/55 text-base sm:text-lg lg:text-xl leading-relaxed flex-1">
                {featured.snippet}
              </p>
            </div>

            <div className="flex items-center justify-between pt-5 border-t border-foreground/8 mt-5">
              {/* Mobile: Explore More toggle */}
              {!expanded && (
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setExpanded(true); }}
                  className="lg:hidden inline-flex items-center gap-1.5 text-sm font-medium text-foreground/55 hover:text-foreground transition-colors duration-200"
                >
                  Explore More · {rest.length} articles
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              )}
              {/* Desktop: Featured label */}
              <span className="hidden lg:inline font-mono text-[10px] tracking-widest uppercase text-foreground/35">Featured</span>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0">
                Read article <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

          {/* Right column — hidden on mobile until expanded */}
          <div className={`lg:col-span-6 gap-2 content-start ${expanded ? "flex flex-col lg:grid lg:grid-cols-2" : "hidden lg:grid lg:grid-cols-2"}`}>
            {rest.map((article) => (
              <Link
                key={article.slug}
                href={`/insights/${article.slug}`}
                data-article
                className="bg-background rounded-2xl p-4 sm:p-5 flex flex-col gap-2 group cursor-pointer hover:bg-foreground/[0.03] transition-colors duration-300 border border-foreground/6"
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-mono tracking-widest uppercase font-bold bg-foreground/5 border border-foreground/12 text-foreground/60 leading-tight">
                    {article.category}
                  </span>
                  <span className="font-mono text-[9px] text-foreground/30 shrink-0">{article.readTime} read</span>
                </div>

                <h3 className="font-display text-sm text-foreground leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-foreground/45 text-xs sm:text-sm lg:text-xs leading-relaxed line-clamp-2 flex-1">
                  {article.snippet}
                </p>

                <div className="flex justify-end">
                  <ArrowUpRight className="w-3.5 h-3.5 text-foreground/20 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </div>
              </Link>
            ))}
          </div>

        </div>

      </div>

      {/* Collapse — pinned to section bottom, mobile only */}
      {expanded && (
        <div className="lg:hidden absolute bottom-0 left-0 right-0 px-6 pb-5 pt-8 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none">
          <button
            onClick={() => setExpanded(false)}
            className="pointer-events-auto inline-flex items-center gap-1.5 text-sm font-medium text-foreground/60 hover:text-foreground border border-foreground/15 hover:border-foreground/30 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm transition-all duration-200"
          >
            Collapse <ChevronDown className="w-3.5 h-3.5 rotate-180" />
          </button>
        </div>
      )}

    </section>
  );
}
