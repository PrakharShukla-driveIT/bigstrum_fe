"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";

const GSAP_EASE = "power3.out";

interface PillButtonProps {
  children: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  /** "primary" = dark bg + white text; "outline" = light bg + dark text */
  variant?: "primary" | "outline";
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}

export function PillButton({
  children,
  href,
  target,
  rel,
  onClick,
  variant = "outline",
  className = "",
  style,
  title,
}: PillButtonProps) {
  const containerRef = useRef<HTMLElement>(null);
  const circleRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Circle fill color and hover text color per variant
  const circleBg = variant === "primary" ? "#e8e8e6" : "#8b2a2a";
  const hoverTextColor = variant === "primary" ? "#1a1816" : "#ffffff";

  useEffect(() => {
    const container = containerRef.current;
    const circle = circleRef.current;
    if (!container || !circle) return;

    const layout = () => {
      const { width: w, height: h } = container.getBoundingClientRect();
      const R = ((w * w) / 4 + h * h) / (2 * h);
      const D = Math.ceil(2 * R) + 2;
      const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
      const originY = D - delta;

      circle.style.width = `${D}px`;
      circle.style.height = `${D}px`;
      circle.style.bottom = `-${delta}px`;

      gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${originY}px` });

      const label = container.querySelector<HTMLElement>(".pill-btn-label");
      const hover = container.querySelector<HTMLElement>(".pill-btn-hover");

      if (label) gsap.set(label, { y: 0 });
      if (hover) gsap.set(hover, { y: Math.ceil(h + 100), opacity: 0 });

      tlRef.current?.kill();
      const tl = gsap.timeline({ paused: true });

      tl.to(circle, { scale: 3, xPercent: -50, duration: 5, ease: GSAP_EASE, overwrite: "auto" }, 0);
      if (label) tl.to(label, { y: -(h + 8), duration: 5, ease: GSAP_EASE, overwrite: "auto" }, 0);
      if (hover) tl.to(hover, { y: 0, opacity: 1, duration: 5, ease: GSAP_EASE, overwrite: "auto" }, 0);

      tlRef.current = tl;
    };

    layout();
    window.addEventListener("resize", layout);
    document.fonts?.ready.then(layout).catch(() => {});
    return () => window.removeEventListener("resize", layout);
  }, []);

  const handleEnter = () => {
    const tl = tlRef.current;
    if (!tl) return;
    tweenRef.current?.kill();
    tweenRef.current = tl.tweenTo(tl.duration(), { duration: 0.75, ease: GSAP_EASE, overwrite: "auto" });
  };

  const handleLeave = () => {
    const tl = tlRef.current;
    if (!tl) return;
    tweenRef.current?.kill();
    tweenRef.current = tl.tweenTo(0, { duration: 0.2, ease: GSAP_EASE, overwrite: "auto" });
  };

  const sharedStyle: React.CSSProperties = {
    position: "relative",
    overflow: "hidden",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "9999px",
    cursor: "pointer",
    lineHeight: 0,
    textDecoration: "none",
    userSelect: "none",
    ...style,
  };

  const inner = (
    <>
      {/* Expanding circle */}
      <span
        ref={circleRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          bottom: 0,
          borderRadius: "50%",
          background: circleBg,
          zIndex: 1,
          display: "block",
          pointerEvents: "none",
        }}
      />
      {/* Label stack */}
      <span style={{ position: "relative", display: "inline-block", lineHeight: 1, zIndex: 2 }}>
        <span
          className="pill-btn-label"
          style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: "0.5em", lineHeight: 1, zIndex: 2 }}
        >
          {children}
        </span>
        <span
          className="pill-btn-hover"
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5em",
            color: hoverTextColor,
            zIndex: 3,
            whiteSpace: "nowrap",
            opacity: 0, /* hidden until GSAP initialises — prevents text overlap on slow machines */
          }}
        >
          {children}
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <a
        ref={containerRef as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        className={className}
        style={sharedStyle}
        title={title}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={containerRef as React.Ref<HTMLButtonElement>}
      className={className}
      style={sharedStyle}
      title={title}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {inner}
    </button>
  );
}
