"use client";

import { useEffect, useRef, useState } from "react";
import {
  siReact, siNextdotjs, siTypescript, siTailwindcss, siRedux,
  siNodedotjs, siExpress, siSpringboot, siDjango,
  siPostgresql, siMysql, siMongodb, siRedis,
  siDocker, siKubernetes, siGithubactions, siJenkins, siNginx,
} from "simple-icons";

const techIcons: Record<string, { path: string }> = {
  "React":          siReact,
  "Next.js":        siNextdotjs,
  "TypeScript":     siTypescript,
  "Tailwind CSS":   siTailwindcss,
  "Redux / Zustand": siRedux,
  "Node.js":        siNodedotjs,
  "Express.js":     siExpress,
  "Spring Boot":    siSpringboot,
  "Django / FastAPI": siDjango,
  "PostgreSQL":     siPostgresql,
  "MySQL":          siMysql,
  "MongoDB":        siMongodb,
  "Redis":          siRedis,
  "Docker":         siDocker,
  "Kubernetes":     siKubernetes,
  "GitHub Actions": siGithubactions,
  "Jenkins":        siJenkins,
  "Nginx":          siNginx,
};

function TechPill({ name, dim }: { name: string; dim?: boolean }) {
  const icon = techIcons[name];
  const borderBg = dim ? "border-white/10 bg-white/[0.04]" : "border-white/15 bg-white/[0.07]";
  const textCls  = dim ? "text-white/35" : "text-white/65";
  const iconCls  = dim ? "fill-white/30" : "fill-white/65";
  return (
    <span className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border ${borderBg} shrink-0`}>
      {icon ? (
        <svg viewBox="0 0 24 24" className={`w-3.5 h-3.5 shrink-0 ${iconCls}`} aria-hidden="true">
          <path d={icon.path} />
        </svg>
      ) : (
        <span className={`w-3.5 h-3.5 rounded-sm bg-white/20 shrink-0 inline-flex items-center justify-center font-mono text-[7px] ${textCls} font-bold`}>
          {name.slice(0, 2).toUpperCase()}
        </span>
      )}
      <span className={`font-mono text-[11px] tracking-widest ${textCls} uppercase whitespace-nowrap`}>{name}</span>
    </span>
  );
}

const stack = [
  {
    category: "Frontend",
    techs: [
      { name: "React",           note: "Component-based UI"    },
      { name: "Next.js",         note: "SSR & full-stack apps" },
      { name: "TypeScript",      note: "Type safety"           },
      { name: "Tailwind CSS",    note: "Utility-first styling" },
      { name: "Redux / Zustand", note: "State management"      },
    ],
  },
  {
    category: "Backend",
    techs: [
      { name: "Node.js",          note: "Scalable runtime"       },
      { name: "Express.js",       note: "Lightweight APIs"       },
      { name: "Spring Boot",      note: "Enterprise Java"        },
      { name: "Django / FastAPI",  note: "Python backends"        },
      { name: "REST / GraphQL",    note: "Standard interfaces"    },
    ],
  },
  {
    category: "Database",
    techs: [
      { name: "PostgreSQL",  note: "Relational database"  },
      { name: "MySQL",       note: "Widely used SQL DB"   },
      { name: "MongoDB",     note: "NoSQL document store" },
      { name: "Redis",       note: "Caching & sessions"   },
    ],
  },
  {
    category: "Cloud",
    techs: [
      { name: "AWS",               note: "EC2, S3, RDS, Lambda" },
      { name: "Azure",             note: "Enterprise cloud"     },
      { name: "Google Cloud (GCP)", note: "Data & ML"            },
    ],
  },
  {
    category: "DevOps",
    techs: [
      { name: "Docker",         note: "Containers"     },
      { name: "Kubernetes",     note: "Orchestration"   },
      { name: "GitHub Actions", note: "CI/CD"           },
      { name: "Jenkins",        note: "Automation"       },
      { name: "Nginx",          note: "Reverse proxy"    },
    ],
  },
];

const allTechs = stack.flatMap((s) => s.techs.map((t) => t.name));

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

function TechCard({
  category,
  index,
  inView,
}: {
  category: (typeof stack)[0];
  index: number;
  inView: boolean;
}) {
  const spotlight = useMouseSpotlight();

  return (
    <div
      ref={spotlight.ref}
      onMouseMove={spotlight.onMouseMove}
      onMouseEnter={spotlight.onMouseEnter}
      onMouseLeave={spotlight.onMouseLeave}
      className={`relative bg-background rounded-2xl px-3 py-3 md:px-5 md:py-4 flex flex-col gap-2 md:gap-3
        border border-foreground/[0.06] hover:border-foreground/[0.14]
        hover:-translate-y-1 hover:shadow-xl hover:shadow-black/15
        transition-all duration-500 overflow-hidden
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Mouse spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-400"
        style={{
          opacity: spotlight.active ? 1 : 0,
          background: `radial-gradient(380px circle at ${spotlight.pos.x}px ${spotlight.pos.y}px, rgba(120,50,30,0.07) 0%, transparent 65%)`,
        }}
      />

      {/* Category header */}
      <div className="relative flex items-center gap-2 md:gap-3 pb-3 md:pb-4">
        {/* Static base border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-foreground/[0.06]" />
        {/* Animated sweep */}
        <div
          className="absolute bottom-0 left-0 h-px bg-foreground/20 transition-all duration-500 ease-out"
          style={{ width: spotlight.active ? "100%" : "0%" }}
        />
        <span className="font-mono text-[10px] tracking-[0.25em] text-foreground/25 uppercase">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-display text-base md:text-xl text-foreground/90">
          {category.category}
        </span>
      </div>

      {/* Tech rows */}
      <div className="flex flex-col flex-1 justify-around">
        {category.techs.map((tech, j) => {
          const icon = techIcons[tech.name];
          return (
            <div
              key={tech.name}
              className={`flex items-center gap-2 md:gap-3 py-1.5 md:py-2.5 border-b border-foreground/[0.06] last:border-0
                rounded-lg px-1.5 md:px-2 -mx-1.5 md:-mx-2 transition-all duration-300
                ${spotlight.active ? "bg-foreground/[0.025]" : ""}`}
              style={{ transitionDelay: spotlight.active ? `${j * 40}ms` : "0ms" }}
            >
              {icon ? (
                <svg viewBox="0 0 24 24" className="w-3 h-3 md:w-3.5 md:h-3.5 shrink-0 fill-foreground/25" aria-hidden>
                  <path d={icon.path} />
                </svg>
              ) : (
                <span className="w-3 h-3 md:w-3.5 md:h-3.5 shrink-0 rounded-sm bg-foreground/[0.07] inline-flex items-center justify-center font-mono text-[7px] text-foreground/35 font-bold">
                  {tech.name.slice(0, 2).toUpperCase()}
                </span>
              )}
              <span className={`text-xs md:text-sm font-medium flex-1 transition-colors duration-300 leading-tight
                ${spotlight.active ? "text-foreground/90" : "text-foreground/70"}`}>
                {tech.name}
              </span>
              <span className={`hidden md:block text-xs font-mono transition-colors duration-300
                ${spotlight.active ? "text-foreground/45" : "text-foreground/28"}`}>
                {tech.note}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ApproachCard({ inView, delay }: { inView: boolean; delay: number }) {
  const spotlight = useMouseSpotlight();

  return (
    <div
      ref={spotlight.ref}
      onMouseMove={spotlight.onMouseMove}
      onMouseEnter={spotlight.onMouseEnter}
      onMouseLeave={spotlight.onMouseLeave}
      className={`relative bg-background rounded-2xl px-3 py-3 md:px-5 md:py-4 flex flex-col justify-between gap-3 md:gap-4
        border border-foreground/[0.06] hover:border-foreground/[0.14]
        hover:-translate-y-1 hover:shadow-xl hover:shadow-black/15
        transition-all duration-500 overflow-hidden
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Mouse spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-400"
        style={{
          opacity: spotlight.active ? 1 : 0,
          background: `radial-gradient(380px circle at ${spotlight.pos.x}px ${spotlight.pos.y}px, rgba(120,50,30,0.07) 0%, transparent 65%)`,
        }}
      />

      <div>
        <p className="font-mono text-[10px] tracking-[0.2em] text-foreground/35 uppercase mb-2 md:mb-4">Our Approach</p>
        <h4 className="font-display text-lg md:text-2xl text-foreground leading-tight mb-2 md:mb-3">
          Right tool for the right problem
        </h4>
        <p className="hidden md:block text-sm text-foreground/50 leading-relaxed">
          We select technologies based on your industry constraints, team, and scale — then build to last.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {["Open Source", "Cloud-Native", "API-First", "Security-First"].map((tag, i) => (
          <span
            key={tag}
            className={`font-mono text-[10px] px-3 py-1 border rounded-full transition-all duration-300
              ${spotlight.active ? "border-foreground/20 text-foreground/60" : "border-foreground/10 text-foreground/38"}`}
            style={{ transitionDelay: spotlight.active ? `${i * 50}ms` : "0ms" }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export function TechnologySection() {
  const header = useInView();
  const grid   = useInView();

  return (
    <section
      id="technology"
      className="snap-section relative bg-primary overflow-hidden flex flex-col"
    >

      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full flex-1 flex flex-col pt-[84px] sm:pt-24 pb-2 sm:pb-7">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-1 sm:mb-4 md:mb-6 shrink-0">
          <span data-section-label className="font-mono text-sm tracking-[0.2em] text-white/70 uppercase">Technology</span>
          <div data-divider className="flex-1 h-px bg-white/15" />
        </div>

        {/* Header */}
        <div
          ref={header.ref}
          className={`grid lg:grid-cols-12 gap-4 mb-2 sm:mb-4 md:mb-6 shrink-0 transition-all duration-700 ${
            header.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="lg:col-span-6">
            <h2 className="font-display text-2xl md:text-4xl lg:text-5xl tracking-tight text-white leading-[1.05]">
              Our Technology Stack
            </h2>
          </div>
          <div className="hidden lg:col-span-6 lg:flex lg:items-end">
            <p className="text-white/55 text-base leading-relaxed">
              Battle-tested tools chosen for reliability, performance, and long-term maintainability — not trends.
            </p>
          </div>
        </div>

        {/* Stack grid — flex-1 fills remaining height */}
        <div ref={grid.ref} className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 sm:flex-1 sm:min-h-0 sm:overflow-y-auto">
          {stack.map((category, i) => (
            <TechCard key={category.category} category={category} index={i} inView={grid.inView} />
          ))}
          <ApproachCard inView={grid.inView} delay={stack.length * 80} />
        </div>

      </div>

    </section>
  );
}
