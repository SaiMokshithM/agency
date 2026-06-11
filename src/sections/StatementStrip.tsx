import React, { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

/* ── Canvas wireframe globe ── */
const WireframeGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const SIZE = 300

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width  = SIZE * dpr
    canvas.height = SIZE * dpr
    ctx.scale(dpr, dpr)

    const cx     = SIZE / 2
    const cy     = SIZE / 2
    const R      = SIZE * 0.43
    const SQUASH = 0.32   // latitude perspective squash
    const N_LAT  = 13     // latitude rings
    const N_LON  = 13     // longitude rings

    const drawPass = (alpha: number, lw: number, blur: number) => {
      ctx.shadowColor = `rgba(201,162,39,${blur > 0 ? 0.55 : 0})`
      ctx.shadowBlur  = blur
      ctx.lineWidth   = lw

      // — Latitude rings (horizontal ellipses stacked top-to-bottom)
      for (let i = 0; i <= N_LAT; i++) {
        const phi = -Math.PI / 2 + (Math.PI * i) / N_LAT
        const r   = R * Math.cos(phi)
        const y   = cy + R * Math.sin(phi)
        if (r < 1) continue
        ctx.beginPath()
        ctx.ellipse(cx, y, r, r * SQUASH, 0, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(201,162,39,${alpha})`
        ctx.stroke()
      }

      // — Longitude rings (vertical ellipses rotated around Y axis)
      for (let i = 0; i < N_LON; i++) {
        const theta = (Math.PI * i) / N_LON
        const rx    = R * Math.abs(Math.sin(theta))
        if (rx < 1) continue
        ctx.beginPath()
        ctx.ellipse(cx, cy, rx, R, 0, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(201,162,39,${alpha})`
        ctx.stroke()
      }
    }

    // Layer 1 — big bloom
    drawPass(0.10, 3.0, 18)
    // Layer 2 — medium glow
    drawPass(0.20, 1.2, 8)
    // Layer 3 — crisp fine lines
    ctx.shadowBlur = 0
    drawPass(0.32, 0.65, 0)

    // Bright equator accent
    ctx.shadowColor = 'rgba(201,162,39,0.7)'
    ctx.shadowBlur  = 10
    ctx.lineWidth   = 1.1
    ctx.beginPath()
    ctx.ellipse(cx, cy, R, R * SQUASH, 0, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(201,162,39,0.6)'
    ctx.stroke()

    // Outer ambient halo
    ctx.shadowBlur  = 28
    ctx.shadowColor = 'rgba(201,162,39,0.3)'
    ctx.lineWidth   = 0.8
    ctx.beginPath()
    ctx.arc(cx, cy, R * 1.06, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(201,162,39,0.08)'
    ctx.stroke()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ display: 'block', width: `${SIZE}px`, height: `${SIZE}px` }}
    />
  )
}

/* ── Statement strip ── */
const StatementStrip: React.FC = () => {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      aria-label="Brand statement"
      style={{
        position: 'relative',
        width: '100%',
        background: '#060606',
        overflow: 'hidden',
        minHeight: '160px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Top hairline */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.14), transparent)',
      }} />
      {/* Bottom hairline */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.14), transparent)',
      }} />

      {/* ── LEFT globe — half-visible, cut off at left edge ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0, top: '50%',
          transform: 'translate(-42%, -50%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        {/* Extra ambient glow behind globe */}
        <div style={{
          position: 'absolute', inset: '-20%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(201,162,39,0.14) 0%, transparent 68%)',
          filter: 'blur(22px)',
        }} />
        <WireframeGlobe />
      </div>

      {/* ── RIGHT globe — half-visible, cut off at right edge ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: 0, top: '50%',
          transform: 'translate(42%, -50%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <div style={{
          position: 'absolute', inset: '-20%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(201,162,39,0.14) 0%, transparent 68%)',
          filter: 'blur(22px)',
        }} />
        <WireframeGlobe />
      </div>

      {/* ── CENTER statement text ── */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '52px clamp(120px, 18vw, 280px)',
        }}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <p style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)',
          fontWeight: 400,
          lineHeight: 1.85,
          color: 'rgba(201,162,39,0.72)',
          letterSpacing: '0.01em',
          maxWidth: '480px',
          margin: '0 auto',
        }}>
          We combine strategy, design and advanced technology to build digital products
          that scale and create lasting impact.
        </p>
      </motion.div>
    </section>
  )
}

export default StatementStrip
