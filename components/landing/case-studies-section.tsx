"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ScrollStack, { ScrollStackItem } from "./scroll-stack";
import { caseStudies } from "@/lib/case-studies-data";

export function CaseStudiesSection() {
  return (
    <section id="case-studies" className="relative pt-16 sm:pt-24 lg:pt-36 pb-[30vh] lg:pb-[38vh] bg-primary" style={{ clipPath: 'inset(0)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span data-section-label className="font-mono text-sm tracking-[0.2em] text-white/70 uppercase">
            Case Studies
          </span>
          <div data-divider className="flex-1 h-px bg-white/15" />
          <span className="font-mono text-xs text-white/50">
            {String(caseStudies.length).padStart(2, "0")} projects
          </span>
        </div>

        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 mb-10 lg:mb-20">
          <div className="lg:col-span-7">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-[1.05]">
              Proven Solutions Across Industries
            </h2>
          </div>
          <div className="lg:col-span-5 lg:flex lg:items-end">
            <p className="text-white/60 text-lg leading-relaxed">
              Real-world systems built to solve complex problems at scale.
            </p>
          </div>
        </div>

        {/* Scroll Stack */}
        <ScrollStack
          baseScale={0.88}
          itemScale={0.03}
          itemStackDistance={28}
          itemDistance={100}
          stackPosition="20%"
          scaleEndPosition="10%"
        >
          {caseStudies.map((cs) => (
            <ScrollStackItem
              key={cs.tag}
              itemClassName="border border-foreground/8 bg-background"
            >
              <div className="grid lg:grid-cols-12">

                {/* Left — main content */}
                <div className="lg:col-span-8 p-6 sm:p-8 lg:p-14 flex flex-col gap-6 lg:gap-8 border-b lg:border-b-0 lg:border-r border-foreground/8">

                  {/* Top row */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-widest uppercase text-primary font-semibold">
                      {cs.industry}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] tracking-wider px-3 py-1 border border-primary/20 text-primary bg-primary/6 rounded-full">
                        {cs.tag}
                      </span>
                      <span className="font-mono text-[10px] text-foreground/35">{cs.year}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-3xl md:text-4xl lg:text-[2.5rem] text-foreground leading-tight">
                    {cs.title}
                  </h3>

                  {/* Metric highlight */}
                  <div className="flex items-start gap-3 px-6 py-5 rounded-2xl bg-primary/6 border-l-2 border-primary">
                    <span className="text-primary mt-0.5 text-xl leading-none">↗</span>
                    <p className="text-base font-semibold text-foreground/80 leading-snug">{cs.metric}</p>
                  </div>

                  {/* Problem / Solution */}
                  <div className="grid sm:grid-cols-2 gap-8 flex-1">
                    <div>
                      <p className="font-mono text-[10px] tracking-widest text-foreground/40 uppercase mb-3">Challenge</p>
                      <p className="text-sm text-foreground/60 leading-relaxed">{cs.problem}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] tracking-widest text-foreground/40 uppercase mb-3">Solution</p>
                      <p className="text-sm text-foreground/60 leading-relaxed">{cs.solution}</p>
                    </div>
                  </div>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-foreground/6">
                    {cs.stack.map((t) => (
                      <span key={t} className="font-mono text-[11px] px-3.5 py-2 border border-foreground/12 text-foreground/50 rounded-full bg-foreground/[0.02]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right — meta panel */}
                <div className="lg:col-span-4 p-6 sm:p-8 lg:p-14 flex flex-col justify-between bg-foreground/[0.015]">
                  {/* Large number */}
                  <p className="font-display text-[5rem] lg:text-[10rem] leading-none font-bold text-foreground opacity-[0.06] select-none -mt-2">
                    {cs.number}
                  </p>

                  {/* Meta details */}
                  <div className="flex flex-col gap-4">
                    <div className="border-t border-foreground/8 pt-4">
                      <p className="font-mono text-[10px] tracking-widest text-foreground/35 uppercase mb-1">Type</p>
                      <p className="text-sm font-medium text-foreground/70">{cs.type}</p>
                    </div>
                    <div className="border-t border-foreground/8 pt-4">
                      <p className="font-mono text-[10px] tracking-widest text-foreground/35 uppercase mb-1">Industry</p>
                      <p className="text-sm font-medium text-foreground/70">{cs.industry}</p>
                    </div>
                    <div className="border-t border-foreground/8 pt-4">
                      <p className="font-mono text-[10px] tracking-widest text-foreground/35 uppercase mb-1">Year</p>
                      <p className="text-sm font-medium text-foreground/70">{cs.year}</p>
                    </div>

                    {/* CTA */}
                    <Link
                      href={`/case-study/${cs.slug}`}
                      className="mt-2 w-full flex items-center justify-between px-4 py-3 rounded-xl border border-primary/20 bg-primary/6 text-primary text-sm font-medium hover:bg-primary/10 transition-colors duration-200 group"
                    >
                      View Case Study
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>

              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>

      </div>
    </section>
  );
}
