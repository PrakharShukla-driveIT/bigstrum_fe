"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  Services: [
    { name: "Custom Software", href: "#" },
    { name: "System Integration", href: "#" },
    { name: "Cloud & DevOps", href: "#" },
    { name: "AI / ML Solutions", href: "#" },
  ],
  Industries: [
    { name: "Healthcare", href: "#" },
    { name: "Government", href: "#" },
    { name: "FinTech", href: "#" },
    { name: "Smart Cities", href: "#" },
  ],
  Company: [
    { name: "About Us", href: "#about" },
    { name: "Case Studies", href: "#case-studies" },
    { name: "Insights", href: "#articles" },
    { name: "Careers", href: "#", badge: "Hiring" },
  ],
  Connect: [
    { name: "Contact Us", href: "#contact" },
    { name: "LinkedIn", href: "#" },
    { name: "GitHub", href: "#" },
    { name: "Twitter / X", href: "#" },
  ],
};

export function FooterSection() {
  return (
    <footer className="relative bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Main footer content */}
        <div className="py-12 lg:py-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 lg:gap-8">

          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 md:col-span-2 flex flex-col gap-6">
            <a href="#" className="inline-flex items-center">
              <Image
                src="/bigstrum.svg"
                width={110}
                height={28}
                alt="Bigstrum"
                style={{ filter: "brightness(0) invert(1)", height: "auto" }}
              />
            </a>

            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Engineering software for regulated industries. Built to last, designed to scale, secured by default.
            </p>

            <div className="flex flex-col gap-2">
              <p className="font-mono text-[10px] tracking-widest text-white/40 uppercase">Based in India · Serving globally</p>
              <a
                href="mailto:hello@bigstrum.com"
                className="text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                hello@bigstrum.com
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-mono text-[10px] tracking-widest text-white/40 uppercase mb-6">{title}</h3>
              <ul className="space-y-3.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-white/55 hover:text-white transition-colors duration-200 inline-flex items-center gap-2 group"
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

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/12 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40 font-mono">
            © 2026 Bigstrum Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/40 font-mono">
            <a href="#" className="hover:text-white transition-colors duration-200">Privacy</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Terms</a>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              All systems operational
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
