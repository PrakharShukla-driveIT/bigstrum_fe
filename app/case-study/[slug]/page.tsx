import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ArrowRight } from "lucide-react";
import { caseStudies } from "@/lib/case-studies-data";
import { Navigation } from "@/components/landing/navigation";
import { ScrollAnimations } from "@/components/landing/scroll-animations";
import { ScrollToTop } from "@/components/scroll-to-top";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();

  const idx = caseStudies.indexOf(cs);
  const nextCs = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <main className="min-h-screen bg-background">
      <ScrollToTop />
      <ScrollAnimations />
      <Navigation />

      {/* ── Hero ── */}
      <section className="relative bg-primary overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-20 lg:pt-48 lg:pb-32">
        {/* Large ghost number */}
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2 font-display font-bold text-white/[0.04] leading-none"
          style={{ fontSize: "clamp(6rem, 22vw, 26rem)" }}
        >
          {cs.number}
        </span>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2.5 mb-10">
            <span className="font-mono text-[10px] tracking-widest uppercase text-white/40">{cs.number}</span>
            <span className="text-white/20 text-xs">·</span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-white/40">{cs.industry}</span>
            <span className="text-white/20 text-xs">·</span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-white/40">{cs.type}</span>
            <span className="text-white/20 text-xs">·</span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-white/40">{cs.year}</span>
          </div>

          {/* Tag pill */}
          <div className="mb-6">
            <span className="font-mono text-[11px] tracking-widest px-3.5 py-1.5 border border-white/20 text-white/70 rounded-full">
              {cs.tag}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-[3.75rem] text-white leading-[1.05] tracking-tight max-w-3xl mb-10">
            {cs.title}
          </h1>

          {/* Key metric */}
          <div className="flex items-start gap-4 max-w-xl bg-white/[0.06] border border-white/12 rounded-2xl px-6 py-5">
            <span className="text-white/50 text-lg mt-0.5 shrink-0">↗</span>
            <p className="text-white/85 font-medium text-base leading-snug">{cs.metric}</p>
          </div>
        </div>
      </section>

      {/* ── Stat bar ── */}
      <div className="border-b border-foreground/8 bg-foreground/[0.01]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { label: "Industry",     value: cs.industry },
              { label: "Project Type", value: cs.type     },
              { label: "Year",         value: cs.year     },
              { label: "Stack",        value: `${cs.stack.length} technologies` },
            ].map(({ label, value }, i) => (
              <div key={label} className={`px-4 sm:px-6 py-4 sm:py-5 ${i % 2 !== 0 ? 'border-l border-foreground/8' : ''} ${i >= 2 ? 'border-t border-foreground/8' : ''} md:border-t-0 ${i > 0 ? 'md:border-l md:border-foreground/8' : ''}`}>
                <p className="font-mono text-[9px] tracking-widest text-foreground/35 uppercase mb-1">{label}</p>
                <p className="text-sm font-medium text-foreground/80">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Main column */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-20">

            {/* Overview */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] tracking-widest text-foreground/35 uppercase">Overview</span>
                <div className="flex-1 h-px bg-foreground/8" />
              </div>
              <p className="text-xl text-foreground/65 leading-[1.75]">{cs.overview}</p>
            </div>

            {/* Challenges */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] tracking-widest text-foreground/35 uppercase">Challenges</span>
                <div className="flex-1 h-px bg-foreground/8" />
              </div>
              <ul className="flex flex-col gap-0 divide-y divide-foreground/6">
                {cs.challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-5 py-5 first:pt-0 last:pb-0">
                    <span className="font-mono text-[10px] text-foreground/25 mt-[3px] shrink-0 w-5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-foreground/60 leading-relaxed">{c}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solution */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] tracking-widest text-foreground/35 uppercase">Solution</span>
                <div className="flex-1 h-px bg-foreground/8" />
              </div>
              <div className="pl-5 border-l-2 border-primary/40">
                <p className="text-xl text-foreground/65 leading-[1.75]">{cs.solution}</p>
              </div>
            </div>

            {/* Outcomes */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] tracking-widest text-foreground/35 uppercase">Outcomes</span>
                <div className="flex-1 h-px bg-foreground/8" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {cs.outcomes.map((o, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-foreground/8 bg-foreground/[0.015] p-6 flex flex-col gap-3 hover:border-foreground/15 transition-colors duration-200"
                  >
                    <span className="text-primary font-mono text-xs">↗</span>
                    <p className="text-sm text-foreground/65 leading-relaxed">{o}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-24 flex flex-col gap-5">

              {/* Meta card */}
              <div className="rounded-2xl border border-foreground/8 overflow-hidden">
                <div className="px-5 py-4 border-b border-foreground/8 bg-foreground/[0.02]">
                  <p className="font-mono text-[10px] tracking-widest text-foreground/40 uppercase">Project Details</p>
                </div>
                {[
                  { label: "Industry",     value: cs.industry },
                  { label: "Type",         value: cs.type     },
                  { label: "Year",         value: cs.year     },
                  { label: "Reference ID", value: cs.tag      },
                ].map(({ label, value }) => (
                  <div key={label} className="px-5 py-3.5 border-b border-foreground/6 last:border-0 flex items-center justify-between">
                    <p className="font-mono text-[10px] tracking-widest text-foreground/35 uppercase">{label}</p>
                    <p className="text-sm font-medium text-foreground/70">{value}</p>
                  </div>
                ))}
              </div>

              {/* Stack card */}
              <div className="rounded-2xl border border-foreground/8 p-5">
                <p className="font-mono text-[10px] tracking-widest text-foreground/35 uppercase mb-4">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {cs.stack.map((t) => (
                    <span key={t} className="font-mono text-[11px] px-3 py-1.5 border border-foreground/10 text-foreground/55 rounded-full bg-foreground/[0.02]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/#contact"
                className="group rounded-2xl bg-primary px-5 py-5 flex items-center justify-between hover:bg-primary/90 transition-colors duration-200"
              >
                <div>
                  <p className="font-mono text-[10px] tracking-widest text-white/50 uppercase mb-1">Ready to build?</p>
                  <p className="text-white font-medium text-sm">Start a similar project</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-200">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </Link>

              {/* All case studies link */}
              <Link
                href="/#case-studies"
                className="group flex items-center justify-center gap-2 py-3 font-mono text-[11px] tracking-widest uppercase text-foreground/35 hover:text-foreground/70 transition-colors duration-200"
              >
                <ArrowLeft className="w-3 h-3" />
                View all case studies
              </Link>

            </div>
          </div>

        </div>
      </div>

      {/* ── Next case study ── */}
      <div className="border-t border-foreground/8">
        <Link
          href={`/case-study/${nextCs.slug}`}
          className="group block max-w-7xl mx-auto px-6 lg:px-10 py-10 sm:py-14 lg:py-20"
        >
          <div className="flex items-center justify-between gap-6">
            <div className="flex flex-col gap-2 sm:gap-3 min-w-0">
              <p className="font-mono text-[10px] tracking-widest text-foreground/35 uppercase">Next Case Study</p>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="font-mono text-xs text-foreground/30">{nextCs.number}</span>
                <span className="text-foreground/20">·</span>
                <span className="font-mono text-xs text-foreground/40">{nextCs.industry}</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground group-hover:text-primary transition-colors duration-300">
                {nextCs.title}
              </h3>
            </div>
            <div className="shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-foreground/12 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/8 transition-all duration-300">
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-foreground/30 group-hover:text-primary transition-colors duration-300" />
            </div>
          </div>
        </Link>
      </div>

    </main>
  );
}
