"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

const RED = "#8B2020"

export function LoadingScreen() {
  const pathname = usePathname()
  const [phase, setPhase] = useState(0)
  // phase 0 = hidden
  // phase 1 = wordmark in
  // phase 2 = bar filling
  // phase 3 = fade out
  // phase 4 = gone

  useEffect(() => {
    setPhase(0)
    const t1 = setTimeout(() => setPhase(1), 50)
    const t2 = setTimeout(() => setPhase(2), 400)
    const t3 = setTimeout(() => setPhase(3), 1600)
    const t4 = setTimeout(() => setPhase(4), 2200)
    return () => [t1, t2, t3, t4].forEach(clearTimeout)
  }, [pathname])

  if (phase === 4) return null

  return (
    <>
      <style>{`
        @keyframes ls-text-up {
          0%   { opacity: 0; transform: translateY(10px) skewX(-2deg); letter-spacing: 0.35em; }
          100% { opacity: 1; transform: translateY(0) skewX(0deg); letter-spacing: 0.25em; }
        }
        @keyframes ls-bar-fill {
          0%   { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--background, #f8f4f2)",
          opacity: phase === 3 ? 0 : 1,
          transition: phase === 3 ? "opacity 0.6s cubic-bezier(0.77,0,0.175,1)" : undefined,
          pointerEvents: "none",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>

          {/* Wordmark */}
          <div
            style={{
              animation: phase >= 1 ? "ls-text-up 0.5s cubic-bezier(0.22,1,0.36,1) forwards" : undefined,
              opacity: phase >= 1 ? undefined : 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/bigstrum.svg"
              alt="Bigstrum"
              width={160}
              height={40}
              loading="eager"
              style={{ filter: "brightness(0) invert(20%) sepia(96%) saturate(730%) hue-rotate(322deg) brightness(88%)" }}
            />
          </div>

          {/* Progress bar */}
          <div
            style={{
              width: 200,
              height: 2,
              backgroundColor: "rgba(0,0,0,0.08)",
              overflow: "hidden",
              borderRadius: 2,
              opacity: phase >= 2 ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <div
              style={{
                height: "100%",
                backgroundColor: RED,
                transformOrigin: "left",
                transform: "scaleX(0)",
                animation: phase >= 2 ? "ls-bar-fill 0.9s cubic-bezier(0.77,0,0.175,1) forwards" : undefined,
                borderRadius: 2,
              }}
            />
          </div>

        </div>
      </div>
    </>
  )
}
