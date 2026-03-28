"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Calendar, MapPin, Mail } from "lucide-react";

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

export function ContactSection() {
  const header = useInView();
  const form = useInView();

  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSubmitted(true); }, 1200);
  }

  return (
    <section id="contact" className="relative py-16 sm:py-24 lg:py-36 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span data-section-label className="font-mono text-sm tracking-[0.2em] text-foreground/70 uppercase">Contact</span>
          <div data-divider className="flex-1 h-px bg-foreground/10" />
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20">

          {/* Left */}
          <div
            ref={header.ref}
            className={`lg:col-span-5 flex flex-col gap-8 transition-all duration-700 ${
              header.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] tracking-tight text-foreground leading-[1.05] mb-4">
                Let's Build Something Together
              </h2>
              <p className="text-foreground/55 text-lg leading-relaxed">
                Tell us about your project. We'll respond within 24 hours with ideas and next steps.
              </p>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-4">
              {[
                { icon: Calendar, label: "Free Consultation", value: "30-min discovery call, no commitment" },
                { icon: Mail, label: "Email", value: "hello@bigstrum.com" },
                { icon: MapPin, label: "Location", value: "India — serving clients globally" },
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

            {/* Industries served */}
            <div className="pt-6 border-t border-foreground/10">
              <p className="font-mono text-[10px] tracking-widest text-foreground/45 uppercase mb-3">Industries We Serve</p>
              <div className="flex flex-wrap gap-2">
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
            className={`lg:col-span-7 transition-all duration-700 delay-150 ${
              form.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {submitted ? (
              <div className="h-full min-h-[420px] flex flex-col items-center justify-center gap-4 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-12 text-center">
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
                className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 sm:p-8 lg:p-10 flex flex-col gap-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] tracking-widest text-foreground/50 uppercase">
                      Name <span className="text-foreground/70">*</span>
                    </label>
                    <input
                      type="text" name="name" required
                      value={formData.name} onChange={handleChange}
                      placeholder="Your full name"
                      className="h-11 px-4 rounded-lg border border-foreground/15 bg-background text-sm text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-primary/50 transition-colors duration-200"
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
                      className="h-11 px-4 rounded-lg border border-foreground/15 bg-background text-sm text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-primary/50 transition-colors duration-200"
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
                    className="h-11 px-4 rounded-lg border border-foreground/15 bg-background text-sm text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-primary/50 transition-colors duration-200"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] tracking-widest text-foreground/50 uppercase">
                    Message <span className="text-foreground/70">*</span>
                  </label>
                  <textarea
                    name="message" required rows={5}
                    value={formData.message} onChange={handleChange}
                    placeholder="Tell us about your project, problem, or idea…"
                    className="px-4 py-3 rounded-lg border border-foreground/15 bg-background text-sm text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-primary/50 transition-colors duration-200 resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                  <button
                    type="submit" disabled={sending}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-medium text-sm h-12 px-8 rounded-full transition-all duration-200"
                  >
                    {sending ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                  <a
                    href="/book"
                    className="inline-flex items-center justify-center gap-2 border border-foreground/15 text-foreground/65 hover:border-primary/40 hover:text-primary font-medium text-sm h-12 px-6 rounded-full transition-all duration-200"
                  >
                    <Calendar className="w-4 h-4" />
                    Book a call
                  </a>
                </div>

                <p className="text-center text-xs text-foreground/35">
                  We respond within 24 hours. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
