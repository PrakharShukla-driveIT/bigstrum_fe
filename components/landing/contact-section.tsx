"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Send, Calendar, MapPin, Mail, Phone } from "lucide-react";

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

type FooterLink = { name: string; href: string; badge?: string; };
type FooterColumn = { title: string; links: FooterLink[]; };

const footerColumns: FooterColumn[] = [
  {
    title: "Services",
    links: [
      { name: "Custom Software",    href: "/coming-soon" },
      { name: "System Integration", href: "/coming-soon" },
      { name: "Cloud & DevOps",     href: "/coming-soon" },
      { name: "AI / ML Solutions",  href: "/coming-soon" },
    ],
  },
  {
    title: "Industries",
    links: [
      { name: "Healthcare",   href: "/coming-soon" },
      { name: "Government",   href: "/coming-soon" },
      { name: "FinTech",      href: "/coming-soon" },
      { name: "Smart Cities", href: "/coming-soon" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us",     href: "#about"       },
      { name: "Case Studies", href: "#case-studies" },
      { name: "Insights",     href: "#articles"     },
      
    ],
  },
  {
    title: "Connect",
    links: [
      { name: "Contact Us", href: "#contact" },
      { name: "LinkedIn",   href: "/coming-soon"        },
      { name: "GitHub",     href: "/coming-soon"        },
      { name: "Twitter / X",href: "/coming-soon"        },
    ],
  },
];

export function ContactSection() {
  const header = useInView();
  const form   = useInView();

  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending,   setSending]   = useState(false);
  const [error,     setError]     = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section
      id="contact"
      className="relative bg-background flex flex-col overflow-hidden min-h-[100dvh]"
    >
      <div className="section-inner max-w-7xl mx-auto px-6 lg:px-10 w-full flex-1 flex flex-col pt-16 pb-0 sm:min-h-0">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-2 sm:mb-6 shrink-0">
          <span data-section-label className="font-mono text-sm tracking-[0.2em] text-foreground/70 uppercase">Contact</span>
          <div data-divider className="flex-1 h-px bg-foreground/10" />
        </div>

        {/* Heading — mobile */}
        <div
          className={`lg:hidden shrink-0 mb-4 transition-all duration-700 ${
            header.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="font-display text-2xl tracking-tight text-foreground leading-tight mb-1">
            Let's Build Something Together
          </h2>
          <p className="text-foreground/50 text-sm leading-relaxed">
            Tell us about your project. We'll respond within 24 hours.
          </p>
        </div>

        {/* Mobile contact info strip */}
        <div className="lg:hidden shrink-0 mb-4 flex flex-col gap-2.5">
          {[
            { icon: Mail,  label: "info@bigstrum.in",   href: "mailto:info@bigstrum.in" },
            { icon: Phone, label: "+91 7675-012174",        href: "tel:+917675012174" },
          ].map(({ icon: Icon, label, href }) => (
            <a key={label} href={href} className="inline-flex items-center gap-2.5 text-sm text-foreground/65 hover:text-foreground transition-colors duration-200">
              <div className="w-7 h-7 rounded-lg bg-foreground/6 border border-foreground/12 flex items-center justify-center shrink-0">
                <Icon className="w-3.5 h-3.5 text-foreground/50" />
              </div>
              {label}
            </a>
          ))}
        </div>

        {/* Main grid */}
        <div ref={header.ref} className="grid lg:grid-cols-12 gap-6 lg:gap-14 sm:flex-1 sm:min-h-0">

          {/* Left — desktop only */}
          <div className={`hidden lg:flex lg:col-span-5 flex-col gap-5 min-h-0 overflow-hidden transition-all duration-700 ${
              header.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div>
              <h2 className="font-display text-2xl md:text-3xl lg:text-[2.75rem] tracking-tight text-foreground leading-[1.05] mb-1.5 md:mb-3">
                Let's Build Something Together
              </h2>
              <p className="hidden lg:block text-foreground/55 text-base leading-relaxed">
                Tell us about your project. We'll respond within 24 hours with ideas and next steps.
              </p>
            </div>

            <div className="hidden lg:flex flex-col gap-3">
              {[
                { icon: Calendar, label: "Free Consultation", value: "30-min discovery call, no commitment"                                                                              },
                { icon: Mail,     label: "Email",             value: "info@bigstrum.in"                                                                                               },
                { icon: Phone,    label: "Phone",             value: "+91 7675-012174"                                                                                                   },
                { icon: MapPin,   label: "Address",           value: "Pranava Business Square, Unit 2, 3rd Floor, Kondapur, Laxmi Cyber City, Whitefields, Gachibowli, Hyderabad 500084" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-foreground/6 border border-foreground/12 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-foreground/60" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-widest text-foreground/45 uppercase">{label}</p>
                    <p className="text-sm text-foreground/70 mt-0.5">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden lg:block pt-4 border-t border-foreground/10">
              <p className="font-mono text-[10px] tracking-widest text-foreground/45 uppercase mb-2.5">Industries We Serve</p>
              <div className="flex flex-wrap gap-1.5">
                {["Power & Utilities", "Government", "Smart City", "FinTech", "Healthcare", "Cybersecurity"].map((tag) => (
                  <span key={tag} className="font-mono text-[10px] px-3 py-1 border border-foreground/15 text-foreground/50 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div
            ref={form.ref}
            className={`lg:col-span-7 flex flex-col sm:min-h-0 overflow-hidden transition-all duration-700 delay-150 ${
              form.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {submitted ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-12 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Send className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-2xl text-foreground">Message Sent!</h3>
                <p className="text-foreground/55 max-w-sm">
                  Thanks for reaching out. We'll get back to you within 24 hours to discuss your project.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-4 sm:p-7 flex flex-col gap-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] tracking-widest text-foreground/50 uppercase">
                      Name <span className="text-foreground/70">*</span>
                    </label>
                    <input
                      type="text" name="name" required
                      value={formData.name} onChange={handleChange}
                      placeholder="Your full name"
                      className="h-12 px-4 rounded-xl border border-foreground/15 bg-background text-sm text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-primary/50 transition-colors duration-200"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] tracking-widest text-foreground/50 uppercase">
                      Email <span className="text-foreground/70">*</span>
                    </label>
                    <input
                      type="email" name="email" required
                      value={formData.email} onChange={handleChange}
                      placeholder="you@company.com"
                      className="h-12 px-4 rounded-xl border border-foreground/15 bg-background text-sm text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-primary/50 transition-colors duration-200"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] tracking-widest text-foreground/50 uppercase">
                    Company / Organisation
                  </label>
                  <input
                    type="text" name="company"
                    value={formData.company} onChange={handleChange}
                    placeholder="Acme Corp, Government of India…"
                    className="h-12 px-4 rounded-xl border border-foreground/15 bg-background text-sm text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-primary/50 transition-colors duration-200"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] tracking-widest text-foreground/50 uppercase">
                    Message <span className="text-foreground/70">*</span>
                  </label>
                  <textarea
                    name="message" required rows={4}
                    value={formData.message} onChange={handleChange}
                    placeholder="Tell us about your project, problem, or idea…"
                    className="px-4 py-3 rounded-xl border border-foreground/15 bg-background text-sm text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-primary/50 transition-colors duration-200 resize-none"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-[10px] font-mono uppercase tracking-tight">
                    {error}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit" disabled={sending}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-medium text-sm h-12 px-8 rounded-full transition-all duration-200"
                  >
                    {sending ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : "Send Message"}
                  </button>
                  <a
                    href="/book"
                    className="inline-flex items-center justify-center gap-2 border border-foreground/15 text-foreground/65 hover:border-primary/40 hover:text-primary font-medium text-sm h-12 px-6 rounded-full transition-all duration-200"
                  >
                    <Calendar className="w-4 h-4" />
                    Book a call
                  </a>
                </div>

                <p className="hidden sm:block text-center text-xs text-foreground/35">
                  We respond within 24 hours. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* ── Red footer ── */}
      <footer className="shrink-0 bg-primary relative overflow-hidden mt-6 sm:mt-0">
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute -bottom-4 left-0 font-display font-bold text-white/[0.04] leading-none whitespace-nowrap"
          style={{ fontSize: 'clamp(4rem, 10vw, 9rem)', lineHeight: 1 }}
        >
          BIGSTRUM
        </span>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          {/* Links grid */}
          <div className="py-4 sm:py-8 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-4 sm:gap-8">
            {footerColumns.map(({ title, links }) => (
              <div key={title}>
                <h3 className="font-mono text-[9px] tracking-[0.25em] text-white/40 uppercase mb-2 sm:mb-3">{title}</h3>
                <ul className="flex flex-col gap-1.5 sm:gap-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-[11px] sm:text-xs text-white/55 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5"
                      >
                        {link.name}
                        {"badge" in link && link.badge && (
                          <span className="text-[8px] font-mono px-1.5 py-0.5 bg-white/15 text-white border border-white/25 rounded-full">
                            {link.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/12 py-3 sm:py-4 flex flex-row flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-4">
              <Image
                src="/bigstrum.svg"
                width={72}
                height={18}
                alt="Bigstrum"
                style={{ filter: 'brightness(0) invert(1)', height: 'auto' }}
              />
              <span className="font-mono text-[9px] text-white/35">© 2026 Bigstrum Technologies</span>
            </div>
            <div className="flex items-center gap-4 text-[9px] font-mono text-white/40">
              <a href="/coming-soon" className="hover:text-white transition-colors duration-200">Privacy</a>
              <a href="/coming-soon" className="hover:text-white transition-colors duration-200">Terms</a>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
