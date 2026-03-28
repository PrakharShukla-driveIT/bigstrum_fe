"use client";

import React, { useLayoutEffect, useRef, useCallback, ReactNode } from "react";

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
}) => (
  <div
    className={`scroll-stack-card relative w-full rounded-[32px] overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.08)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  itemDistance = 120,
  itemScale = 0.03,
  itemStackDistance = 28,
  stackPosition = "18%",
  scaleEndPosition = "8%",
  baseScale = 0.88,
  rotationAmount = 0,
  blurAmount = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  // Cached natural document positions — read once before any transforms
  const cardTopsRef = useRef<number[]>([]);
  const endTopRef = useRef(0);
  const lastTransformsRef = useRef(new Map<number, { translateY: number; scale: number }>());
  const isUpdatingRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const calculateProgress = useCallback(
    (scrollTop: number, start: number, end: number) => {
      if (scrollTop < start) return 0;
      if (scrollTop > end) return 1;
      return (scrollTop - start) / (end - start);
    },
    []
  );

  const parsePercentage = useCallback((value: string, containerHeight: number) => {
    if (value.includes("%")) return (parseFloat(value) / 100) * containerHeight;
    return parseFloat(value);
  }, []);

  const updateCardTransforms = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length || isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;
    const stackPx = parsePercentage(stackPosition, viewportHeight);
    const scaleEndPx = parsePercentage(scaleEndPosition, viewportHeight);
    // Use cached positions — never call getBoundingClientRect during animation
    const endTop = endTopRef.current;

    cards.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardTopsRef.current[i];
      const triggerStart = cardTop - stackPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPx;
      const pinStart = triggerStart;
      const pinEnd = endTop - viewportHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);

      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPx + itemStackDistance * i;
      }

      const rounded = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
      };

      const last = lastTransformsRef.current.get(i);
      if (
        !last ||
        Math.abs(last.translateY - rounded.translateY) > 0.1 ||
        Math.abs(last.scale - rounded.scale) > 0.001
      ) {
        const rotation = rotationAmount ? `rotate(${i * rotationAmount * scaleProgress}deg)` : "";
        card.style.transform = `translate3d(0,${rounded.translateY}px,0) scale(${rounded.scale}) ${rotation}`;
        lastTransformsRef.current.set(i, rounded);
      }
    });

    isUpdatingRef.current = false;
  }, [
    calculateProgress,
    parsePercentage,
    stackPosition,
    scaleEndPosition,
    itemStackDistance,
    itemScale,
    baseScale,
    rotationAmount,
    blurAmount,
  ]);

  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateCardTransforms);
  }, [updateCardTransforms]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(
      container.querySelectorAll(".scroll-stack-card")
    ) as HTMLElement[];
    cardsRef.current = cards;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
      card.style.willChange = "transform";
      card.style.transformOrigin = "top center";
    });

    // Cache natural positions BEFORE any transforms are applied
    cardTopsRef.current = cards.map(
      (card) => card.getBoundingClientRect().top + window.scrollY
    );
    const endEl = container.querySelector(".scroll-stack-end") as HTMLElement | null;
    endTopRef.current = endEl ? endEl.getBoundingClientRect().top + window.scrollY : 0;

    const recachePositions = () => {
      // Reset transforms first so we read natural positions
      cardsRef.current.forEach((c) => { c.style.transform = ""; });
      lastTransformsRef.current.clear();
      cardTopsRef.current = cardsRef.current.map(
        (card) => card.getBoundingClientRect().top + window.scrollY
      );
      const endElR = container.querySelector(".scroll-stack-end") as HTMLElement | null;
      endTopRef.current = endElR ? endElR.getBoundingClientRect().top + window.scrollY : 0;
      updateCardTransforms();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", recachePositions);
    updateCardTransforms();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", recachePositions);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      cardsRef.current = [];
      lastTransformsRef.current.clear();
    };
  }, [handleScroll, updateCardTransforms, itemDistance]);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {children}
      <div className="scroll-stack-end w-full h-px" />
    </div>
  );
};

export default ScrollStack;
