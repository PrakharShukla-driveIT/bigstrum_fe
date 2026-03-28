"use client";

import { useEffect, useRef, useState } from "react";
import { Target, Eye, Users, Award } from "lucide-react";

function useInView(threshold = 0.12) {
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

export function AboutSection() {
  const header = useInView();
  const cards = useInView();
  const bottom = useInView();

  return (
    <section id="about" className="relative py-24 lg:py-36 bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span data-section-label className="font-mono text-sm tracking-[0.2em] text-white/70 uppercase">About Us</span>
          <div data-divider className="flex-1 h-px bg-white/15" />
        </div>

        {/* Header */}
        <div
          ref={header.ref}
          className={`grid lg:grid-cols-12 gap-8 mb-20 transition-all duration-700 ${
            header.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="lg:col-span-7">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-[1.05]">
              We build systems that power critical industries
            </h2>
          </div>
          <div className="lg:col-span-5 lg:flex lg:items-end">
            <p className="text-white/60 text-lg leading-relaxed">
              Bigstrum is a software engineering company specialising in scalable, secure, and intelligent systems — built for cybersecurity, healthcare, government, and enterprise.
            </p>
          </div>
        </div>

        {/* Mission + Vision */}
        <div
          ref={cards.ref}
          className="grid md:grid-cols-2 gap-6 mb-20"
        >
          {[
            {
              icon: Target,
              label: "Mission",
              title: "Solve real problems with tailored software",
              body: "We partner with organisations to understand their unique challenges and deliver software that works exactly as needed — not templated solutions forced into the wrong shape.",
              delay: 0,
            },
            {
              icon: Eye,
              label: "Vision",
              title: "Create future-ready digital platforms",
              body: "We believe every industry deserves software built for tomorrow. Our goal is to lead the shift toward AI-powered, cloud-native systems that evolve with the organisations they serve.",
              delay: 100,
            },
          ].map(({ icon: Icon, label, title, body, delay }) => (
            <div
              key={label}
              className={`rounded-2xl border border-white/15 bg-white/[0.06] p-8 lg:p-10 flex flex-col gap-5 hover:bg-white/[0.09] transition-all duration-500 ${
                cards.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${delay}ms` }}
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                <Icon className="w-4 h-4 text-white/70" />
              </div>
              <div>
                <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase block mb-3">{label}</span>
                <h3 className="font-display text-2xl md:text-3xl text-white leading-tight mb-3">{title}</h3>
                <p className="text-white/60 leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Values / differentiators */}
        <div
          ref={bottom.ref}
          className={`transition-all duration-700 ${bottom.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <h3 className="font-mono text-sm tracking-[0.2em] text-white/60 uppercase mb-8">Why Bigstrum</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Users,
                title: "Domain Expertise",
                desc: "We've built for power utilities, government, smart cities, and fintech — we understand your constraints.",
              },
              {
                icon: Award,
                title: "Architecture First",
                desc: "Every project starts with design. We plan before we build so you avoid costly pivots later.",
              },
              {
                icon: Target,
                title: "End-to-End Delivery",
                desc: "From requirements to production deployment — one team, full accountability.",
              },
              {
                icon: Eye,
                title: "Security by Design",
                desc: "Data sensitivity, compliance, and access control are built in from day one — not bolted on.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className={`bg-white/[0.05] border border-white/12 rounded-2xl p-7 flex flex-col gap-3 transition-all duration-500 ${
                  bottom.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5 text-white/60" />
                </div>
                <p className="font-medium text-white text-sm">{title}</p>
                <p className="text-xs text-white/55 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
