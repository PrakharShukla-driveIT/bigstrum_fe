'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  characters?: string;
  className?: string;
  encryptedClassName?: string;
  parentClassName?: string;
  animateOn?: 'view' | 'hover' | 'click' | 'trigger';
  trigger?: boolean;
}

export default function DecryptedText({
  text,
  speed = 60,
  maxIterations = 12,
  sequential = false,
  revealDirection = 'start',
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*',
  className = '',
  encryptedClassName = '',
  parentClassName = '',
  animateOn = 'hover',
  trigger = false,
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const chars = characters.split('');

  const randomChar = () => chars[Math.floor(Math.random() * chars.length)];

  const scramble = useCallback((revealed: Set<number>) =>
    text.split('').map((ch, i) =>
      ch === ' ' ? ' ' : revealed.has(i) ? text[i] : randomChar()
    ).join(''),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [text, characters]
  );

  const stopInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const runAnimation = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    const revealed = new Set<number>();
    let iteration = 0;

    stopInterval();
    intervalRef.current = setInterval(() => {
      if (sequential) {
        // Reveal one char per tick in order
        const nextIdx = revealDirection === 'end'
          ? text.length - 1 - revealed.size
          : revealDirection === 'center'
            ? revealed.size % 2 === 0
              ? Math.floor(text.length / 2) + Math.floor(revealed.size / 2)
              : Math.floor(text.length / 2) - Math.ceil(revealed.size / 2)
            : revealed.size;

        if (nextIdx >= 0 && nextIdx < text.length) revealed.add(nextIdx);
        setRevealedIndices(new Set(revealed));
        setDisplayText(scramble(revealed));

        if (revealed.size >= text.length) {
          stopInterval();
          setDisplayText(text);
          setIsAnimating(false);
        }
      } else {
        // Scramble all unrevealed chars for maxIterations then show full text
        setDisplayText(scramble(revealed));
        iteration++;
        if (iteration >= maxIterations) {
          stopInterval();
          setDisplayText(text);
          setRevealedIndices(new Set());
          setIsAnimating(false);
        }
      }
    }, speed);
  }, [isAnimating, sequential, revealDirection, text, scramble, maxIterations, speed]);

  const reset = useCallback(() => {
    stopInterval();
    setIsAnimating(false);
    setRevealedIndices(new Set());
    setDisplayText(text);
  }, [text]);

  // Trigger mode: run once when trigger flips to true
  useEffect(() => {
    if (animateOn !== 'trigger' || !trigger || hasAnimated) return;
    setHasAnimated(true);
    runAnimation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animateOn, trigger, hasAnimated]);

  useEffect(() => () => stopInterval(), []);

  const eventProps =
    animateOn === 'hover'
      ? { onMouseEnter: runAnimation, onMouseLeave: reset }
      : animateOn === 'click'
        ? { onClick: runAnimation }
        : {};

  return (
    <span ref={containerRef} className={`inline-block ${parentClassName}`} {...eventProps}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {displayText.split('').map((char, i) => (
          <span
            key={i}
            className={revealedIndices.has(i) || !isAnimating ? className : encryptedClassName}
          >
            {char}
          </span>
        ))}
      </span>
    </span>
  );
}
