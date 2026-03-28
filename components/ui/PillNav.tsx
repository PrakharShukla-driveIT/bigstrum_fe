'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export interface PillNavProps {
  logo?: React.ReactNode;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  hoverColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  initialLoadAnimation?: boolean;
}

const PillNav: React.FC<PillNavProps> = ({
  logo,
  items,
  activeHref,
  className = '',
  ease = 'power3.easeOut',
  baseColor = '#111',
  hoverColor,
  pillColor = '#1c1c1c',
  hoveredPillTextColor = '#fff',
  pillTextColor = 'rgba(255,255,255,0.7)',
  initialLoadAnimation = true,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const navItemsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector<HTMLElement>('.pill-label');
        const white = pill.querySelector<HTMLElement>('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);
        if (label) tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();
    window.addEventListener('resize', layout);
    document.fonts?.ready.then(layout).catch(() => {});

    if (mobileMenuRef.current) {
      gsap.set(mobileMenuRef.current, { visibility: 'hidden', opacity: 0 });
    }

    if (initialLoadAnimation && navItemsRef.current) {
      gsap.set(navItemsRef.current, { width: 0, overflow: 'hidden' });
      gsap.to(navItemsRef.current, { width: 'auto', duration: 0.6, ease });
    }

    return () => window.removeEventListener('resize', layout);
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto',
    });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto',
    });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, ease }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          duration: 0.2,
          ease,
          onComplete: () => gsap.set(menu, { visibility: 'hidden' }),
        });
      }
    }
  };

  const cssVars = {
    '--base': baseColor,
    '--hover-circle': hoverColor ?? baseColor,
    '--pill-bg': pillColor,
    '--hover-text': hoveredPillTextColor,
    '--pill-text': pillTextColor,
    '--nav-h': '44px',
    '--pill-pad-x': '20px',
    '--pill-gap': '3px',
  } as React.CSSProperties;

  const basePillClasses =
    'relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-semibold text-[13px] leading-[0] uppercase tracking-[0.15em] whitespace-nowrap cursor-pointer';

  const pillStyle: React.CSSProperties = {
    background: 'var(--pill-bg)',
    color: 'var(--pill-text)',
    paddingLeft: 'var(--pill-pad-x)',
    paddingRight: 'var(--pill-pad-x)',
  };

  return (
    <div className="relative z-[1000]">
      <nav
        className={`flex items-center justify-center gap-2 ${className}`}
        aria-label="Primary"
        style={cssVars}
      >
        {/* Logo slot */}
        {logo && (
          <a
            href="#"
            className="rounded-full inline-flex items-center justify-center overflow-hidden shrink-0"
            style={{ width: 'var(--nav-h)', height: 'var(--nav-h)', background: 'var(--base)' }}
          >
            {logo}
          </a>
        )}

        {/* Pills container */}
        <div
          ref={navItemsRef}
          className="relative items-center rounded-full hidden md:flex"
          style={{ height: 'var(--nav-h)', background: 'var(--base)' }}
        >
          <ul
            role="menubar"
            className="list-none flex items-stretch m-0 h-full"
            style={{ padding: '3px', gap: 'var(--pill-gap)' }}
          >
            {items.map((item, i) => {
              const isActive = activeHref === item.href;
              return (
                <li key={item.href} role="none" className="flex h-full">
                  <a
                    role="menuitem"
                    href={item.href}
                    className={basePillClasses}
                    style={pillStyle}
                    aria-label={item.ariaLabel || item.label}
                    onMouseEnter={() => handleEnter(i)}
                    onMouseLeave={() => handleLeave(i)}
                  >
                    {/* Hover fill circle */}
                    <span
                      className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                      style={{ background: 'var(--hover-circle)', willChange: 'transform' }}
                      aria-hidden="true"
                      ref={(el) => { circleRefs.current[i] = el; }}
                    />
                    {/* Label stack */}
                    <span className="label-stack relative inline-block leading-[1] z-[2]">
                      <span
                        className="pill-label relative z-[2] inline-block leading-[1]"
                        style={{ willChange: 'transform' }}
                      >
                        {item.label}
                      </span>
                      <span
                        className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                        style={{ color: 'var(--hover-text)', willChange: 'transform, opacity' }}
                        aria-hidden="true"
                      >
                        {item.label}
                      </span>
                    </span>
                    {/* Active dot */}
                    {isActive && (
                      <span
                        className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-3 h-3 rounded-full z-[4]"
                        style={{ background: 'var(--base)' }}
                        aria-hidden="true"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mobile hamburger */}
        <button
          ref={hamburgerRef}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          className="md:hidden rounded-full border-0 flex flex-col items-center justify-center gap-1 cursor-pointer"
          style={{ width: 'var(--nav-h)', height: 'var(--nav-h)', background: 'var(--base)' }}
        >
          <span
            className="hamburger-line w-4 h-0.5 rounded origin-center"
            style={{ background: pillTextColor }}
          />
          <span
            className="hamburger-line w-4 h-0.5 rounded origin-center"
            style={{ background: pillTextColor }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        className="md:hidden absolute top-[3.5rem] left-0 right-0 rounded-2xl shadow-xl z-[998] overflow-hidden"
        style={{ ...cssVars, background: 'var(--base)' }}
      >
        <ul className="list-none m-0 p-[3px] flex flex-col gap-[3px]">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block py-3 px-5 text-[14px] font-semibold uppercase tracking-[0.15em] rounded-[50px] transition-all duration-200"
                style={{ background: 'var(--pill-bg)', color: 'var(--pill-text)' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PillNav;
