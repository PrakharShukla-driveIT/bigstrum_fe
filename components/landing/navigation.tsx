'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';
import { PillButton } from './pill-button';

const NAV_LINKS = [
  { name: 'Case Studies', href: '#case-studies', sectionId: 'case-studies' },
  { name: 'Insights',     href: '#articles',     sectionId: 'articles'     },
  { name: 'Technology',   href: '#technology',   sectionId: 'technology'   },
  { name: 'About',        href: '#about',        sectionId: 'about'        },
  { name: 'Contact',      href: '#contact',      sectionId: 'contact'      },
];

const EASE   = 'cubic-bezier(0.4, 0, 0.2, 1)';
const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
const GSAP_EASE = 'power3.out';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // GSAP pill hover refs
  const circleRefs  = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs      = useRef<Array<gsap.core.Timeline | null>>([]);
  const tweenRefs   = useRef<Array<gsap.core.Tween | null>>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      const onScroll = () => setIsScrolled(window.scrollY > 80);
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }
    const container = document.getElementById('snap-container');
    if (!container) return;
    const onScroll = () => setIsScrolled(container.scrollTop > 80);
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  // Active section via IntersectionObserver — uses snap container on desktop, viewport on mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    const container = isMobile ? null : document.getElementById('snap-container');

    const sectionIds = ['hero', 'case-studies', 'articles', 'technology', 'ai', 'about', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            setActiveSection(id);
          }
        },
        { root: container, threshold: [0.4] }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Smooth scroll to section on nav click
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      e.preventDefault();
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setMobileOpen(false);
    },
    []
  );

  // Close mobile menu on scroll
  useEffect(() => {
    if (!mobileOpen) return;
    const close = () => setMobileOpen(false);
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      window.addEventListener('scroll', close, { passive: true, once: true });
      return () => window.removeEventListener('scroll', close);
    }
    const container = document.getElementById('snap-container');
    if (!container) return;
    container.addEventListener('scroll', close, { passive: true, once: true });
    return () => container.removeEventListener('scroll', close);
  }, [mobileOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Layout GSAP circle timelines
  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const { width: w, height: h } = pill.getBoundingClientRect();
        const R      = ((w * w) / 4 + h * h) / (2 * h);
        const D      = Math.ceil(2 * R) + 2;
        const delta  = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width  = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${originY}px` });

        const label = pill.querySelector<HTMLElement>('.pill-label');
        const hover = pill.querySelector<HTMLElement>('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (hover) gsap.set(hover, { y: Math.ceil(h + 100), opacity: 0 });

        const idx = circleRefs.current.indexOf(circle);
        if (idx === -1) return;

        tlRefs.current[idx]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease: GSAP_EASE, overwrite: 'auto' }, 0);
        if (label) tl.to(label, { y: -(h + 8), duration: 2, ease: GSAP_EASE, overwrite: 'auto' }, 0);
        if (hover) tl.to(hover, { y: 0, opacity: 1, duration: 2, ease: GSAP_EASE, overwrite: 'auto' }, 0);

        tlRefs.current[idx] = tl;
      });
    };

    layout();
    window.addEventListener('resize', layout);
    document.fonts?.ready.then(layout).catch(() => {});
    return () => window.removeEventListener('resize', layout);
  }, []);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    tweenRefs.current[i]?.kill();
    tweenRefs.current[i] = tl.tweenTo(tl.duration(), { duration: 0.3, ease: GSAP_EASE, overwrite: 'auto' });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    tweenRefs.current[i]?.kill();
    tweenRefs.current[i] = tl.tweenTo(0, { duration: 0.2, ease: GSAP_EASE, overwrite: 'auto' });
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          pointerEvents: 'none',
          height: '80px',
          overflow: 'visible',
        }}
      >

        {/* ── Flat nav ── */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '80px',
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(26,24,22,0.06)',
            opacity: isScrolled ? 0 : 1,
            transform: isScrolled
              ? 'scaleX(0.82) scaleY(0.7) translateY(-6px)'
              : 'scaleX(1) scaleY(1) translateY(0)',
            transformOrigin: 'center top',
            pointerEvents: isScrolled ? 'none' : 'auto',
            transition: `opacity 300ms ${EASE}, transform 480ms ${EASE}`,
          }}
        >
          <div
            style={{
              maxWidth: '1400px',
              margin: '0 auto',
              padding: '0 20px',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            <a href="/" style={{ flexShrink: 0 }}>
              <Image
                src="/bigstrum.svg"
                width={120}
                height={30}
                alt="Bigstrum"
                priority
                loading="eager"
                style={{
                  filter: 'brightness(0) invert(20%) sepia(96%) saturate(730%) hue-rotate(322deg) brightness(88%)',
                  display: 'block',
                  height: 'auto',
                }}
              />
            </a>

            {/* Desktop nav links */}
            <nav style={{ flex: 1, justifyContent: 'center', gap: '24px' }} className="hidden lg:flex">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.sectionId;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.sectionId)}
                    style={{
                      fontSize: '13px',
                      fontFamily: 'monospace',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      color: isActive ? 'oklch(0.43 0.14 25)' : 'rgba(26,24,22,0.6)',
                      fontWeight: isActive ? 600 : 400,
                      whiteSpace: 'nowrap',
                      transition: 'color 200ms ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'oklch(0.43 0.14 25)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? 'oklch(0.43 0.14 25)' : 'rgba(26,24,22,0.6)')}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            <div className="hidden lg:block" style={{ flexShrink: 0, pointerEvents: 'auto' }}>
              <PillButton
                href="/book"
                variant="primary"
                style={{
                  background: 'oklch(0.43 0.14 25)',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: 500,
                  padding: '10px 20px',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'auto',
                }}
              >
                Book Consultation
              </PillButton>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex items-center justify-center"
              onClick={() => setMobileOpen((v) => !v)}
              style={{
                marginLeft: 'auto',
                pointerEvents: 'auto',
                width: '40px',
                height: '40px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'rgba(26,24,22,0.7)',
                flexShrink: 0,
              }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ── Pill nav ── */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px',
              background: '#ffffff',
              borderRadius: '9999px',
              boxShadow: '0 4px 32px rgba(0,0,0,0.12)',
              maxWidth: 'calc(100vw - 32px)',
              overflow: 'hidden',
              opacity: isScrolled ? 1 : 0,
              transform: isScrolled ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(-10px)',
              pointerEvents: isScrolled ? 'auto' : 'none',
              transition: `opacity 350ms ${EASE} 180ms, transform 500ms ${SPRING} 180ms`,
            }}
          >
            {/* Logo pill */}
            <a
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '7px 14px',
                borderRadius: '9999px',
                background: '#f0ede8',
                flexShrink: 0,
                textDecoration: 'none',
              }}
            >
              <Image
                src="/bigstrum.svg"
                width={80}
                height={20}
                alt="Bigstrum"
                style={{
                  filter: 'brightness(0) invert(20%) sepia(96%) saturate(730%) hue-rotate(322deg) brightness(88%)',
                  display: 'block',
                  height: 'auto',
                }}
              />
            </a>

            {/* Nav pills with GSAP circle hover — desktop only */}
            {NAV_LINKS.map((link, i) => {
              const isActive = activeSection === link.sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.sectionId)}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={() => handleLeave(i)}
                  className="hidden lg:inline-flex"
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    background: isActive ? 'oklch(0.43 0.14 25)' : '#f0ede8',
                    color: isActive ? '#ffffff' : '#1a1816',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    lineHeight: 0,
                    transition: 'background 200ms ease, color 200ms ease',
                  }}
                >
                  {/* Expanding circle */}
                  <span
                    ref={(el) => { circleRefs.current[i] = el; }}
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: '50%',
                      bottom: 0,
                      borderRadius: '50%',
                      background: '#8b2a2a',
                      zIndex: 1,
                      display: 'block',
                      pointerEvents: 'none',
                    }}
                  />
                  {/* Label stack */}
                  <span style={{ position: 'relative', display: 'inline-block', lineHeight: 1, zIndex: 2 }}>
                    <span
                      className="pill-label"
                      style={{ position: 'relative', display: 'inline-block', lineHeight: 1, zIndex: 2 }}
                    >
                      {link.name}
                    </span>
                    <span
                      className="pill-label-hover"
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        display: 'inline-block',
                        color: '#ffffff',
                        zIndex: 3,
                      }}
                    >
                      {link.name}
                    </span>
                  </span>
                </a>
              );
            })}

            {/* Mobile hamburger in pill nav */}
            <button
              className="lg:hidden flex items-center justify-center"
              onClick={() => setMobileOpen((v) => !v)}
              style={{
                width: '36px',
                height: '36px',
                background: '#f0ede8',
                border: 'none',
                borderRadius: '9999px',
                cursor: 'pointer',
                color: 'rgba(26,24,22,0.7)',
                flexShrink: 0,
              }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

      </header>

      {/* ── Mobile menu overlay ── */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 48,
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
          transition: `opacity 250ms ${EASE}`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 32px 48px',
        }}
      >
        <nav style={{ display: 'flex', flexDirection: 'column' }}>
          {NAV_LINKS.map((link, i) => {
            const isActive = activeSection === link.sectionId;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.sectionId)}
                style={{
                  fontFamily: 'var(--font-display, serif)',
                  fontSize: 'clamp(1.6rem, 8vw, 2.25rem)',
                  color: isActive ? 'oklch(0.43 0.14 25)' : 'rgba(26,24,22,0.85)',
                  textDecoration: 'none',
                  padding: '14px 0',
                  borderBottom: '1px solid rgba(26,24,22,0.07)',
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 320ms ${EASE} ${i * 55 + 80}ms, transform 400ms ${EASE} ${i * 55 + 80}ms`,
                  display: 'block',
                }}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        <div
          style={{
            marginTop: '36px',
            opacity: mobileOpen ? 1 : 0,
            transform: mobileOpen ? 'translateY(0)' : 'translateY(16px)',
            transition: `opacity 320ms ${EASE} 420ms, transform 400ms ${EASE} 420ms`,
          }}
        >
          <a
            href="/book"
            onClick={() => setMobileOpen(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'oklch(0.43 0.14 25)',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 500,
              padding: '14px 32px',
              borderRadius: '9999px',
              textDecoration: 'none',
            }}
          >
            Book Consultation
          </a>
        </div>
      </div>
    </>
  );
}
