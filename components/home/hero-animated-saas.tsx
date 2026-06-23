'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n))
}

export function HeroAnimatedSaaS() {
  const reducedMotion = useReducedMotion()
  const [progress, setProgress] = useState(0) // 0..1
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  // 8 scenes, loop
  const durationMs = 9800

  useEffect(() => {
    if (reducedMotion) return

    const tick = (t: number) => {
      if (startRef.current === null) startRef.current = t
      const elapsed = t - startRef.current
      const p = (elapsed % durationMs) / durationMs
      setProgress(p)
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [reducedMotion])

  // Scene mapping (each scene ~1/8)
  const s = useMemo(() => {
    const seg = (i: number) => {
      const start = i / 8
      const end = (i + 1) / 8
      const local = (progress - start) / (end - start)
      return clamp01(local)
    }

    const easeInOut = (x: number) => {
      // cubic ease in/out
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
    }

    return {
      p0: easeInOut(seg(0)),
      p1: easeInOut(seg(1)),
      p2: easeInOut(seg(2)),
      p3: easeInOut(seg(3)),
      p4: easeInOut(seg(4)),
      p5: easeInOut(seg(5)),
      p6: easeInOut(seg(6)),
      p7: easeInOut(seg(7)),
    }
  }, [progress])

  // If reduced motion, show a sensible static midpoint
  const effective = reducedMotion ? { p0: 1, p1: 1, p2: 1, p3: 1, p4: 1, p5: 1, p6: 1, p7: 1 } : s

  return (
    <div className="w-full max-w-6xl mx-auto relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute left-[10%] top-[10%] w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto h-[420px] sm:h-[460px] lg:h-[520px]">
        <motion.div
          aria-hidden
          className="w-full h-full"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <svg viewBox="0 0 1000 520" width="100%" height="100%" className="block select-none" role="img">
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(37,99,235,0.22)" />
                <stop offset="100%" stopColor="rgba(20,184,166,0.18)" />
              </linearGradient>

              <linearGradient id="boxFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.55} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0.18} />
              </linearGradient>

              <linearGradient id="cardFill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1d4ed8" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#14b8a6" stopOpacity={0.22} />
              </linearGradient>

              <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#000" floodOpacity="0.15" />
              </filter>

              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect x="0" y="0" width="1000" height="520" fill="url(#g1)" opacity={0.65} />
            <rect x="60" y="110" width="880" height="340" rx="22" fill="rgba(2,6,23,0.06)" />

            {/* Floor */}
            <ellipse cx="520" cy="440" rx="420" ry="50" fill="rgba(2,6,23,0.08)" />

            {/* Scene 1: stacked boxes appear */}
            <g opacity={effective.p0} filter="url(#softShadow)">
              {Array.from({ length: 4 }).map((_, col) =>
                Array.from({ length: 5 }).map((__, row) => {
                  const x = 130 + col * 140 + (row % 2) * 6
                  const y = 330 - row * 46
                  const w = 90
                  const h = 40
                  return (
                    <g key={`${col}-${row}`}>
                      <rect x={x} y={y} width={w} height={h} rx={12} fill="url(#boxFill)" />
                      <rect x={x + 8} y={y + 9} width={w - 16} height={h - 18} rx={10} fill="rgba(59,130,246,0.12)" />
                      <rect x={x + 5} y={y + 5} width={w - 10} height={h - 10} rx={11} fill="none" stroke="rgba(59,130,246,0.35)" strokeWidth="2" />
                    </g>
                  )
                })
              )}
            </g>

            {/* Scene 2: worried owner appears */}
            <g opacity={effective.p1}>
              <g filter="url(#softShadow)">
                <circle cx="270" cy="292" r="28" fill="rgba(37,99,235,0.18)" stroke="rgba(37,99,235,0.45)" strokeWidth="2" />
                <path
                  d="M242 330 C250 312, 290 312, 298 330 L308 390 C310 404, 228 404, 230 390 Z"
                  fill="rgba(20,184,166,0.18)"
                  stroke="rgba(20,184,166,0.45)"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path d="M232 352 C208 370, 198 395, 210 410" stroke="rgba(20,184,166,0.55)" strokeWidth="8" strokeLinecap="round" />
                <path d="M308 352 C332 370, 342 395, 330 410" stroke="rgba(20,184,166,0.55)" strokeWidth="8" strokeLinecap="round" />
                <path d="M258 290 Q270 298 282 290" stroke="#0b1220" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M255 277 Q268 270 281 277" stroke="#0b1220" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M258 300 Q270 320 282 300" stroke="#0b1220" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path
                  d="M298 270 C304 285, 288 290, 292 273"
                  fill="rgba(59,130,246,0.25)"
                  stroke="rgba(59,130,246,0.5)"
                  strokeWidth="2"
                />
              </g>
            </g>

            {/* Scene 3: owner uploads to StockFlow */}
            <g opacity={effective.p2}>
              <g filter="url(#softShadow)">
                <rect x="360" y="250" width="280" height="150" rx="18" fill="rgba(2,6,23,0.10)" />
                <rect x="380" y="270" width="240" height="110" rx="14" fill="url(#cardFill)" />
                <rect x="400" y="325" width="200" height="14" rx="7" fill="rgba(2,6,23,0.12)" />
                <rect x="400" y="325" width={80 + effective.p2 * 120} height="14" rx="7" fill="rgba(37,99,235,0.45)" />
                <text
                  x="520"
                  y="300"
                  textAnchor="middle"
                  fontSize="18"
                  fill="rgba(15,23,42,0.85)"
                  fontFamily="system-ui, -apple-system, Segoe UI, Roboto"
                >
                  Uploading…
                </text>
                <circle cx="430" cy="300" r="10" fill="rgba(20,184,166,0.35)" filter="url(#glow)" />
              </g>

              <g transform={`translate(${520 - effective.p2 * 120}, ${230 - effective.p2 * 30})`} opacity={effective.p2}>
                <rect x="0" y="0" width="70" height="38" rx="12" fill="rgba(96,165,250,0.35)" />
                <rect x="6" y="6" width="58" height="26" rx="10" fill="rgba(14,165,233,0.15)" />
                <rect x="2" y="2" width="66" height="34" rx="11" fill="none" stroke="rgba(37,99,235,0.45)" strokeWidth="2" />
              </g>
            </g>

            {/* Scene 4: boxes transform into product cards */}
            <g opacity={effective.p3}>
              {Array.from({ length: 3 }).map((_, i) => {
                const startX = 200 + i * 200
                const startY = 320
                const cardX = 320 + i * 180
                const cardY = 250
                return (
                  <g
                    key={i}
                    transform={`translate(${(cardX - startX) * effective.p3}, ${(cardY - startY) * effective.p3}) scale(${0.92 + effective.p3 * 0.08})`}
                    filter="url(#softShadow)"
                  >
                    <rect x={startX} y={startY} width="150" height="90" rx="18" fill="rgba(255,255,255,0.30)" />
                    <rect x={startX + 12} y={startY + 12} width="126" height="66" rx="14" fill="rgba(37,99,235,0.10)" />
                    <rect x={startX + 24} y={startY + 26} width="62" height="14" rx="7" fill="rgba(37,99,235,0.35)" />
                    <rect x={startX + 24} y={startY + 48} width="98" height="10" rx="5" fill="rgba(20,184,166,0.30)" />
                    <circle cx={startX + 124} cy={startY + 34} r="12" fill="rgba(14,165,233,0.30)" filter="url(#glow)" />
                  </g>
                )
              })}
            </g>

            {/* Scene 5: cards travel to buyers */}
            <g opacity={effective.p4}>
              {Array.from({ length: 3 }).map((_, i) => {
                const bx = 820 - i * 120
                const by = 175 + i * 25
                return (
                  <g key={i} transform={`translate(${bx}, ${by})`}>
                    <circle cx="0" cy="0" r="18" fill="rgba(20,184,166,0.22)" stroke="rgba(20,184,166,0.45)" strokeWidth="2" />
                    <rect x="-26" y="18" width="52" height="44" rx="18" fill="rgba(2,6,23,0.10)" />
                    <rect x="-20" y="24" width="40" height="32" rx="14" fill="rgba(37,99,235,0.10)" />
                  </g>
                )
              })}

              {Array.from({ length: 3 }).map((_, i) => {
                const fromX = 380 + i * 180
                const fromY = 250
                const toX = 770 - i * 130
                const toY = 165 + i * 30
                const tX = (toX - fromX) * effective.p4
                const tY = (toY - fromY) * effective.p4
                return (
                  <motion.g
                    key={i}
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    transform={`translate(${tX}, ${tY})`}
                  >
                    <rect x={fromX} y={fromY} width="150" height="90" rx="18" fill="rgba(255,255,255,0.28)" />
                    <rect x={fromX + 12} y={fromY + 12} width="126" height="66" rx="14" fill="rgba(37,99,235,0.10)" />
                    <rect x={fromX + 26} y={fromY + 28} width="56" height="14" rx="7" fill="rgba(37,99,235,0.35)" />
                    <rect x={fromX + 26} y={fromY + 50} width="94" height="10" rx="5" fill="rgba(20,184,166,0.28)" />
                  </motion.g>
                )
              })}
            </g>

            {/* Scene 6: revenue graphs grow */}
            <g opacity={effective.p5}>
              <g filter="url(#softShadow)">
                <rect x="620" y="250" width="320" height="160" rx="20" fill="rgba(255,255,255,0.08)" />
                <path d="M655 390 L770 320 L830 345 L905 275" fill="none" stroke="rgba(37,99,235,0.55)" strokeWidth="3" />
                <path d="M655 390 L770 320 L830 345 L905 275" fill="none" stroke="rgba(20,184,166,0.45)" strokeWidth="2" strokeDasharray="6 6" />

                {/* Bars */}
                {Array.from({ length: 6 }).map((_, i) => {
                  const baseX = 700 + i * 34
                  const barH = 12 + effective.p5 * (90 - i * 6)
                  return (
                    <g key={i}>
                      <rect x={baseX} y={390 - barH} width="18" height={barH} rx="9" fill="rgba(37,99,235,0.35)" />
                      <rect x={baseX + 5} y={390 - barH + 6} width="8" height={Math.max(0, barH - 6)} rx="5" fill="rgba(20,184,166,0.35)" />
                    </g>
                  )
                })}

                {/* Up indicators */}
                {Array.from({ length: 3 }).map((_, i) => {
                  const x = 680 + i * 110
                  const y = 280 + i * 22
                  return (
                    <g key={i} transform={`translate(0, ${-10 * effective.p5})`}>
                      <circle cx={x} cy={y} r="5" fill="rgba(20,184,166,0.55)" filter="url(#glow)" />
                      <path d={`M${x} ${y + 10} C${x - 8} ${y + 18} ${x + 8} ${y + 18} ${x} ${y + 28}`} fill="none" stroke="rgba(37,99,235,0.55)" strokeWidth="2" strokeLinecap="round" />
                    </g>
                  )
                })}
              </g>
            </g>

            {/* Scene 7: warehouse organizes & inventory decreases */}
            <g opacity={effective.p6}>
              {Array.from({ length: 4 }).map((_, col) =>
                Array.from({ length: 5 }).map((__, row) => {
                  const stackProgress = clamp01((row + 0.3) / 5)
                  const fade = 1 - effective.p6 * stackProgress
                  const x = 130 + col * 140 + (row % 2) * 6
                  const y = 330 - row * 46 - effective.p6 * (row * 2)
                  const w = 90
                  const h = 40
                  return (
                    <g key={`${col}-${row}`} opacity={Math.max(0, fade)} transform={`translate(0, ${effective.p6 * -10})`}>
                      <rect x={x} y={y} width={w} height={h} rx={12} fill="url(#boxFill)" />
                      <rect x={x + 5} y={y + 5} width={w - 10} height={h - 10} rx={11} fill="none" stroke="rgba(59,130,246,0.35)" strokeWidth="2" />
                    </g>
                  )
                })
              )}

              {/* simple organizer lines */}
              <path d="M170 360 H760" stroke="rgba(20,184,166,0.25)" strokeWidth="2" strokeLinecap="round" />
              <path d="M210 404 H720" stroke="rgba(37,99,235,0.18)" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Scene 8: headline appears */}
            <g opacity={effective.p7}>
              <text
                x="520"
                y="145"
                textAnchor="middle"
                fontSize="34"
                fontWeight="800"
                fill="rgba(15,23,42,0.90)"
                style={{ letterSpacing: '-0.02em' }}
                fontFamily="system-ui, -apple-system, Segoe UI, Roboto"
              >
                Turn Excess Inventory Into Cash
              </text>
            </g>
          </svg>
        </motion.div>

        {/* subtle CTA-friendly gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
      </div>
    </div>
  )
}

