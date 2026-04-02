"use client";

import { useEffect, useRef } from "react";

const PHI_STEP = 0.15;
const THETA_STEP = 0.15;

// Pre-compute stable grid indices
const phiVals: number[] = [];
const thetaVals: number[] = [];
for (let phi = 0; phi < Math.PI * 2; phi += PHI_STEP) phiVals.push(phi);
for (let theta = 0; theta < Math.PI; theta += THETA_STEP) thetaVals.push(theta);
const PARTICLE_COUNT = phiVals.length * thetaVals.length;

export function AnimatedSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const smoothMouseRef = useRef({ x: -9999, y: -9999 });
  const mouseActiveRef = useRef(false);

  // Per-particle physics state
  const offsetsRef = useRef(new Float32Array(PARTICLE_COUNT * 2));
  const velocitiesRef = useRef(new Float32Array(PARTICLE_COUNT * 2));
  const wasInSphereRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chars = "░▒▓█▀▄▌▐│─┤├┴┬╭╮╰╯";
    let time = 0;

    const offsets = offsetsRef.current;
    const velocities = velocitiesRef.current;

    const onMouseMove = (e: MouseEvent) => {
      if (!mouseActiveRef.current) {
        smoothMouseRef.current = { x: e.clientX, y: e.clientY };
        mouseActiveRef.current = true;
      }
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const lerp = 0.06;
      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * lerp;
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * lerp;

      const canvasRect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, canvasRect.width, canvasRect.height);

      const centerX = canvasRect.width / 2;
      const centerY = canvasRect.height / 2;
      const radius = Math.min(canvasRect.width, canvasRect.height) * 0.44;

      const isMobile = window.innerWidth < 640;
      ctx.font = `${isMobile ? 7 : 12}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const cursorX = smoothMouseRef.current.x - canvasRect.left;
      const cursorY = smoothMouseRef.current.y - canvasRect.top;

      const normCursorX = mouseActiveRef.current ? smoothMouseRef.current.x / window.innerWidth : 0.5;
      const normCursorY = mouseActiveRef.current ? smoothMouseRef.current.y / window.innerHeight : 0.5;
      const rotY = time * 0.3 + (normCursorX - 0.5) * 2 * Math.PI * 0.6;
      const rotX = time * 0.2 + (normCursorY - 0.5) * 2 * Math.PI * 0.4;

      // Antigravity config
      const repelRadius = 130;
      const repelStrength = 70;

      // Scatter physics config
      const springK = 0.055;
      const damping = 0.82;
      const scatterImpulse = 18;

      // Check if cursor is inside the sphere
      const dcx = cursorX - centerX;
      const dcy = cursorY - centerY;
      const cursorInSphere = mouseActiveRef.current && Math.sqrt(dcx * dcx + dcy * dcy) < radius;

      // Detect entry moment
      const justEntered = cursorInSphere && !wasInSphereRef.current;
      wasInSphereRef.current = cursorInSphere;

      const points: { x: number; y: number; z: number; char: string }[] = [];
      let idx = 0;

      for (let pi = 0; pi < phiVals.length; pi++) {
        const phi = phiVals[pi];
        for (let ti = 0; ti < thetaVals.length; ti++) {
          const theta = thetaVals[ti];
          const i2 = idx * 2;

          const sx = Math.sin(theta) * Math.cos(phi);
          const sy = Math.sin(theta) * Math.sin(phi);
          const sz = Math.cos(theta);

          const nx = sx * Math.cos(rotY) - sz * Math.sin(rotY);
          const nz = sx * Math.sin(rotY) + sz * Math.cos(rotY);

          const ny = sy * Math.cos(rotX) - nz * Math.sin(rotX);
          const fz = sy * Math.sin(rotX) + nz * Math.cos(rotX);

          const depth = (fz + 1) / 2;
          const charIndex = Math.floor(depth * (chars.length - 1));

          // Natural projected position
          const natX = centerX + nx * radius;
          const natY = centerY + ny * radius;

          // Scatter impulse on cursor entry
          if (justEntered) {
            const dx = natX - cursorX;
            const dy = natY - cursorY;
            const d = Math.sqrt(dx * dx + dy * dy) || 1;
            // Stronger impulse to particles closer to cursor
            const proximity = Math.max(0, 1 - d / (radius * 1.2));
            const strength = scatterImpulse * (0.4 + proximity * 1.6);
            velocities[i2]     += (dx / d) * strength + (Math.random() - 0.5) * 4;
            velocities[i2 + 1] += (dy / d) * strength + (Math.random() - 0.5) * 4;
          }

          // Spring toward 0 + damping
          velocities[i2]     += -springK * offsets[i2];
          velocities[i2 + 1] += -springK * offsets[i2 + 1];
          velocities[i2]     *= damping;
          velocities[i2 + 1] *= damping;
          offsets[i2]        += velocities[i2];
          offsets[i2 + 1]    += velocities[i2 + 1];

          // Antigravity: repel from cursor (applied to final draw position)
          let px = natX + offsets[i2];
          let py = natY + offsets[i2 + 1];

          const adx = px - cursorX;
          const ady = py - cursorY;
          const dist = Math.sqrt(adx * adx + ady * ady);
          if (dist < repelRadius && dist > 0) {
            const force = Math.pow((repelRadius - dist) / repelRadius, 2);
            px += (adx / dist) * force * repelStrength;
            py += (ady / dist) * force * repelStrength;
          }

          points.push({ x: px, y: py, z: fz, char: chars[charIndex] });
          idx++;
        }
      }

      // Depth sort
      points.sort((a, b) => a.z - b.z);

      points.forEach((point) => {
        const alpha = 0.2 + (point.z + 1) * 0.4;
        ctx.fillStyle = `rgba(139, 52, 38, ${alpha})`;
        ctx.fillText(point.char, point.x, point.y);
      });

      time += 0.02;
      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
