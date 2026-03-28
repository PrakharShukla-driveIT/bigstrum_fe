"use client";

import { useEffect, useRef, useState } from "react";
import {
  siReact, siAngular, siNextdotjs, siFlutter,
  siSpringboot, siNodedotjs, siExpress,
  siPostgresql, siMongodb, siRedis,
  siDocker, siKubernetes, siNginx,
} from "simple-icons";

const techIcons: Record<string, { path: string }> = {
  "React":       siReact,
  "Next.js":     siNextdotjs,
  "Angular":     siAngular,
  "Flutter":     siFlutter,
  "Spring Boot": siSpringboot,
  "Node.js":     siNodedotjs,
  "Express":     siExpress,
  "PostgreSQL":  siPostgresql,
  "MongoDB":     siMongodb,
  "Redis":       siRedis,
  "Docker":      siDocker,
  "Kubernetes":  siKubernetes,
  "Nginx":       siNginx,
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
      { name: "React",          note: "Component UIs"       },
      { name: "Next.js",        note: "SSR & full-stack"    },
      { name: "Angular",        note: "Enterprise SPAs"     },
      { name: "Flutter",        note: "Cross-platform"      },
    ],
  },
  {
    category: "Backend",
    techs: [
      { name: "Spring Boot",    note: "Java microservices"  },
      { name: "Node.js",        note: "Event-driven APIs"   },
      { name: "Express",        note: "Lightweight REST"    },
      { name: "REST / GraphQL", note: "API patterns"        },
    ],
  },
  {
    category: "Database",
    techs: [
      { name: "PostgreSQL",     note: "Relational"          },
      { name: "MS SQL",         note: "Enterprise data"     },
      { name: "MongoDB",        note: "Document store"      },
      { name: "Redis",          note: "Cache & queues"      },
    ],
  },
  {
    category: "Cloud",
    techs: [
      { name: "AWS",            note: "EC2, S3, Lambda"     },
      { name: "Azure",          note: "Enterprise cloud"    },
      { name: "On-Premises",    note: "Air-gapped"          },
    ],
  },
  {
    category: "DevOps",
    techs: [
      { name: "Docker",         note: "Containers"          },
      { name: "Kubernetes",     note: "Orchestration"       },
      { name: "CI/CD",          note: "Auto delivery"       },
      { name: "Nginx",          note: "Proxy & LB"          },
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
      className={`relative bg-background rounded-2xl px-7 py-6 flex flex-col gap-4
        border border-foreground/[0.06] hover:border-foreground/[0.14]
        hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20
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
      <div className="relative flex items-center gap-3 pb-4">
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
        <span className="font-display text-xl text-foreground/90">
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
              className={`flex items-center gap-3 py-2.5 border-b border-foreground/[0.06] last:border-0
                rounded-lg px-2 -mx-2 transition-all duration-300
                ${spotlight.active ? "bg-foreground/[0.025]" : ""}`}
              style={{ transitionDelay: spotlight.active ? `${j * 40}ms` : "0ms" }}
            >
              {icon ? (
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 fill-foreground/25" aria-hidden>
                  <path d={icon.path} />
                </svg>
              ) : (
                <span className="w-3.5 h-3.5 shrink-0 rounded-sm bg-foreground/[0.07] inline-flex items-center justify-center font-mono text-[7px] text-foreground/35 font-bold">
                  {tech.name.slice(0, 2).toUpperCase()}
                </span>
              )}
              <span className={`text-sm font-medium flex-1 transition-colors duration-300
                ${spotlight.active ? "text-foreground/90" : "text-foreground/70"}`}>
                {tech.name}
              </span>
              <span className={`text-xs font-mono transition-colors duration-300
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
      className={`relative bg-background rounded-2xl px-7 py-6 flex flex-col justify-between gap-5
        border border-foreground/[0.06] hover:border-foreground/[0.14]
        hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20
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
        <p className="font-mono text-[10px] tracking-[0.2em] text-foreground/35 uppercase mb-4">Our Approach</p>
        <h4 className="font-display text-2xl text-foreground leading-tight mb-3">
          Right tool for the right problem
        </h4>
        <p className="text-sm text-foreground/50 leading-relaxed">
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
    <section id="technology" className="relative bg-primary overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full py-16 lg:py-24">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span data-section-label className="font-mono text-sm tracking-[0.2em] text-white/70 uppercase">Technology</span>
          <div data-divider className="flex-1 h-px bg-white/15" />
        </div>

        {/* Header */}
        <div
          ref={header.ref}
          className={`grid lg:grid-cols-12 gap-6 mb-12 transition-all duration-700 ${
            header.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="lg:col-span-6">
            <h2 className="font-display text-4xl md:text-5xl tracking-tight text-white leading-[1.05]">
              Our Technology Stack
            </h2>
          </div>
          <div className="lg:col-span-6 lg:flex lg:items-end">
            <p className="text-white/55 text-lg leading-relaxed">
              Battle-tested tools chosen for reliability, performance, and long-term maintainability — not trends.
            </p>
          </div>
        </div>

        {/* Stack grid */}
        <div ref={grid.ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stack.map((category, i) => (
            <TechCard key={category.category} category={category} index={i} inView={grid.inView} />
          ))}
          <ApproachCard inView={grid.inView} delay={stack.length * 80} />
        </div>

      </div>

      {/* ── Scrolling tech strip at bottom ── */}
      <div
        className="mt-8 pb-8 -mx-6 lg:-mx-10 select-none pointer-events-none overflow-hidden"
        style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
      >
        <div className="flex gap-3 marquee whitespace-nowrap mb-3">
          {[...allTechs, ...allTechs, ...allTechs].map((name, i) => (
            <TechPill key={i} name={name} />
          ))}
        </div>
        <div className="flex gap-3 marquee-reverse whitespace-nowrap">
          {[...allTechs, ...allTechs, ...allTechs].reverse().map((name, i) => (
            <TechPill key={i} name={name} dim />
          ))}
        </div>
      </div>

    </section>
  );
}
