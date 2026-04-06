"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  Services: [
    { name: "Custom Software",    href: "#" },
    { name: "System Integration", href: "#" },
    { name: "Cloud & DevOps",     href: "#" },
    { name: "AI / ML Solutions",  href: "#" },
  ],
  Industries: [
    { name: "Healthcare",   href: "#" },
    { name: "Government",   href: "#" },
    { name: "FinTech",      href: "#" },
    { name: "Smart Cities", href: "#" },
  ],
  Company: [
    { name: "About Us",      href: "#about"        },
    { name: "Case Studies",  href: "#case-studies"  },
    { name: "Insights",      href: "#articles"      },
    
  ],
  Connect: [
    { name: "Contact Us", href: "#contact"  },
    { name: "LinkedIn",   href: "#"         },
    { name: "GitHub",     href: "#"         },
    { name: "Twitter / X",href: "#"         },
  ],
};

export function FooterSection() {
  return (
    <footer
      id="footer"
      className="relative bg-primary overflow-hidden flex flex-col"
      style={{ height: '100dvh', scrollSnapAlign: 'start' }}
    >
      {/* Decorative large background text */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute bottom-0 left-0 right-0 font-display font-bold text-white/[0.04] leading-none whitespace-nowrap overflow-hidden"
        style={{ fontSize: 'clamp(7rem, 18vw, 18rem)', lineHeight: 1 }}
      >
        BIGSTRUM
      </span>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full flex-1 flex flex-col pt-[88px] sm:pt-20 pb-6 sm:pb-8">

        {/* ── Top: brand + CTA ── */}
        <div className="flex items-start justify-between gap-6 mb-8 sm:mb-10 shrink-0">
          <div className="flex flex-col gap-4">
            <a href="/" aria-label="Bigstrum home">
              <Image
                src="/bigstrum.svg"
                width={130}
                height={32}
                alt="Bigstrum"
                style={{ filter: "brightness(0) invert(1)", height: "auto" }}
              />
            </a>
            <p className="text-sm text-white/55 leading-relaxed max-w-xs">
              Engineering software for regulated industries.<br />
              Built to last, designed to scale, secured by default.
            </p>
          </div>

          <a
            href="/book"
            className="hidden sm:inline-flex shrink-0 items-center gap-2 bg-white text-primary font-semibold text-sm px-6 py-3 rounded-full hover:bg-white/90 transition-colors duration-200"
          >
            Book Consultation
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-white/12 shrink-0 mb-8 sm:mb-10" />

        {/* ── Links grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6 flex-1 min-h-0">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-4">
              <h3 className="font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase">
                {title}
              </h3>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200 inline-flex items-center gap-2 group"
                    >
                      {link.name}
                      {"badge" in link && link.badge && (
                        <span className="text-[9px] font-mono px-2 py-0.5 bg-white/15 text-white border border-white/25 rounded-full">
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

        {/* ── Divider ── */}
        <div className="h-px bg-white/12 shrink-0 mt-6 sm:mt-8 mb-5 sm:mb-6" />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-white/40 font-mono">
              © 2026 Bigstrum Technologies. All rights reserved.
            </p>
            <p className="text-xs text-white/35 font-mono">
              Based in India · Serving clients globally
            </p>
          </div>

          <div className="flex items-center gap-5 text-xs text-white/40 font-mono">
            <a href="#" className="hover:text-white transition-colors duration-200">Privacy</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Terms</a>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              All systems operational
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
