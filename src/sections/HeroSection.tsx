import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ArrowRight } from 'lucide-react'
import GoldSphere from '@/components/GoldSphere'

const EASE = 'easeOut' as const

// Floating particle system for hero background
const ParticleField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: 0.8 + Math.random() * 1.6,
      alpha: 0.08 + Math.random() * 0.22,
      pulse: Math.random() * Math.PI * 2,
    }))

    const connections: [number, number][] = []

    const render = (t: number) => {
      const time = t * 0.001
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      // update
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.pulse += 0.018
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
      })

      // draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1, i + 8).forEach(b => {
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 130) {
            const alpha = (1 - d / 130) * 0.1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(59,130,246,${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        })
      })

      // draw particles
      particles.forEach(p => {
        const pulsedAlpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(96,165,250,${pulsedAlpha})`
        ctx.fill()
      })

      animRef.current = requestAnimationFrame(render)
    }

    animRef.current = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.55,
      }}
    />
  )
}

const HeroSection: React.FC = () => {
  const h1Ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!h1Ref.current) return
    const words = h1Ref.current.querySelectorAll('.w')
    gsap.fromTo(words,
      { y: 88, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, stagger: 0.045, delay: 0.4, ease: 'power4.out' }
    )
  }, [])

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: '#030712',
        overflow: 'hidden',
      }}
      aria-labelledby="hero-h1"
    >
      {/* ── Deep atmosphere layers ── */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>

        {/* Primary blue cloud — right side behind sphere */}
        <div style={{
          position: 'absolute',
          top: '-5%', right: '-8%',
          width: '72%', height: '115%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 60% 45%, rgba(37,99,235,0.16) 0%, rgba(59,130,246,0.07) 38%, transparent 68%)',
          filter: 'blur(70px)',
        }} />

        {/* Secondary blue bloom — upper right */}
        <div style={{
          position: 'absolute',
          top: '-20%', right: '5%',
          width: '55%', height: '80%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(96,165,250,0.09) 0%, transparent 60%)',
          filter: 'blur(90px)',
        }} />

        {/* Subtle bottom-left echo glow */}
        <div style={{
          position: 'absolute',
          bottom: '-10%', left: '-5%',
          width: '40%', height: '55%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.04) 0%, transparent 65%)',
          filter: 'blur(100px)',
        }} />

        {/* Particle field canvas */}
        <ParticleField />

        {/* Subtle AI grid overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(37,99,235,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at 65% 50%, rgba(0,0,0,0.5) 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 65% 50%, rgba(0,0,0,0.5) 0%, transparent 70%)',
        }} />

        {/* Thin blue light rays from sphere area */}
        {[
          { rotate: -38, top: '10%', right: '22%', width: '45%', opacity: 0.08 },
          { rotate: -26, top: '24%', right: '18%', width: '52%', opacity: 0.05 },
          { rotate: -14, top: '38%', right: '14%', width: '58%', opacity: 0.04 },
          { rotate: 14,  top: '58%', right: '20%', width: '48%', opacity: 0.05 },
          { rotate: 30,  top: '72%', right: '24%', width: '40%', opacity: 0.03 },
        ].map((ray, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: ray.top,
              right: ray.right,
              width: ray.width,
              height: '1px',
              background: `linear-gradient(90deg, transparent, rgba(59,130,246,${ray.opacity}), transparent)`,
              transform: `rotate(${ray.rotate}deg)`,
              transformOrigin: 'right center',
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Film grain texture */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.12,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }} />
      </div>

      {/* ── Layout container ── */}
      <div
        className="section-container"
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          paddingTop: '66px',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center',
            width: '100%',
            gap: '3rem',
            paddingTop: '40px',
            paddingBottom: '40px',
          }}
          className="hero-grid"
        >

          {/* ── LEFT CONTENT ── */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">

            {/* Badge */}
            <motion.div
              style={{ marginBottom: '1.8rem', display: 'inline-flex', alignItems: 'center', gap: '12px' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
            >
              {/* Blue left rule */}
              <span style={{ width: '28px', height: '1px', background: 'linear-gradient(90deg, #2563EB, rgba(59,130,246,0.3))', flexShrink: 0 }} />
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: '#60A5FA',
              }}>
                AI-Powered Web Development Agency
              </span>
              {/* Gold dot — premium accent micro-detail */}
              <span style={{
                width: '5px', height: '5px',
                borderRadius: '50%',
                background: '#D4AF37',
                boxShadow: '0 0 8px rgba(212,175,55,0.6)',
                flexShrink: 0,
              }} />
            </motion.div>

            {/* Headline */}
            <h1
              id="hero-h1"
              ref={h1Ref}
              aria-label="We build enterprise AI systems that drive impact."
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2.1rem, 5.2vw, 4.8rem)',
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: '-0.015em',
                color: '#F9FAFB',
              }}
            >
              <span className="sr-only">We build enterprise AI systems that drive impact.</span>
              <span aria-hidden="true">
                <span style={{ display: 'block', overflow: 'hidden' }}>
                  <span className="w" style={{ display: 'inline-block' }}>We build enterprise</span>
                </span>
                <span style={{ display: 'block', overflow: 'hidden' }}>
                  <span className="w" style={{ display: 'inline-block' }}>AI systems</span>
                </span>
                <span style={{ display: 'block', overflow: 'hidden', marginTop: '0.05em' }}>
                  <span className="w" style={{ display: 'inline-block', marginRight: '0.3em' }}>that</span>
                  <span
                    className="w"
                    style={{
                      display: 'inline-block',
                      background: 'linear-gradient(130deg, #D4AF37 0%, #F4D03F 50%, #D4AF37 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 0 24px rgba(212,175,55,0.28))',
                    }}
                  >
                    drive impact.
                  </span>
                </span>
              </span>
            </h1>

            {/* Sub-headline */}
            <motion.p
              style={{
                marginTop: '1.5rem',
                color: '#9CA3AF',
                fontFamily: 'Inter, sans-serif',
                fontSize: '15px',
                lineHeight: 1.8,
                maxWidth: '440px',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.95, ease: EASE }}
            >
              Custom AI solutions, enterprise software, and intelligent
              automation for ambitious companies that refuse to accept average.
            </motion.p>

            {/* Trust signals row */}
            <motion.div
              style={{
                marginTop: '1.4rem',
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 1.0, ease: EASE }}
            >
              {['AI-Native', 'Enterprise-Grade', 'Full-Stack'].map((tag, i) => (
                <span
                  key={tag}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    fontWeight: 500,
                    color: '#6B7280',
                    letterSpacing: '0.04em',
                  }}
                >
                  <span style={{
                    width: '5px', height: '5px',
                    borderRadius: '50%',
                    background: i === 1 ? '#D4AF37' : '#2563EB',
                    boxShadow: i === 1
                      ? '0 0 6px rgba(212,175,55,0.5)'
                      : '0 0 6px rgba(37,99,235,0.5)',
                  }} />
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              style={{
                marginTop: '2rem',
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 1.15, ease: EASE }}
              className="w-full md:w-auto"
            >
              <button
                onClick={() => scrollTo('#contact')}
                className="btn-primary w-full sm:w-auto justify-center"
                id="hero-cta-primary"
              >
                Start A Project <ArrowRight size={12} strokeWidth={2.5} />
              </button>
              <button
                onClick={() => scrollTo('#work')}
                className="btn-secondary w-full sm:w-auto justify-center"
                id="hero-cta-secondary"
              >
                Explore Our Work <ArrowRight size={12} strokeWidth={2.5} />
              </button>
            </motion.div>

            {/* Scroll indicator */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.1, delay: 2.0 }}
              onClick={() => scrollTo('#services')}
              style={{
                marginTop: '3.2rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '11px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                color: '#4B5563',
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = '#F9FAFB')}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = '#4B5563')}
              aria-label="Scroll to explore"
            >
              Scroll to Explore
              {/* Animated scroll box */}
              <span
                style={{
                  width: '24px',
                  height: '24px',
                  border: '1px solid rgba(59,130,246,0.28)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span
                  className="animate-scroll-dot"
                  style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: '#2563EB',
                    boxShadow: '0 0 8px rgba(37,99,235,0.7)',
                  }}
                />
              </span>
            </motion.button>
          </div>

          {/* ── RIGHT — Blue AI Sphere ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '560px',
                aspectRatio: '1 / 1',
                margin: '0 auto',
              }}
            >
              {/* Outermost mega glow — blue */}
              <div style={{
                position: 'absolute',
                inset: '-35%',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.18) 0%, rgba(37,99,235,0.06) 42%, transparent 70%)',
                filter: 'blur(70px)',
                pointerEvents: 'none',
              }} />

              {/* Mid glow ring */}
              <div style={{
                position: 'absolute',
                inset: '-12%',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.10) 0%, transparent 65%)',
                filter: 'blur(32px)',
                pointerEvents: 'none',
              }} />

              {/* Outer dashed orbit — blue */}
              <div
                className="animate-rotate-slow"
                style={{
                  position: 'absolute',
                  inset: '4%',
                  borderRadius: '50%',
                  border: '1px dashed rgba(59,130,246,0.1)',
                  pointerEvents: 'none',
                }}
              />

              {/* Inner orbit ring (reverse) */}
              <div
                className="animate-rotate-reverse"
                style={{
                  position: 'absolute',
                  inset: '14%',
                  borderRadius: '50%',
                  border: '1px solid rgba(37,99,235,0.06)',
                  pointerEvents: 'none',
                }}
              />

              {/* Sphere canvas */}
              <div
                className="animate-float-sphere"
                style={{ width: '100%', height: '100%' }}
              >
                <GoldSphere className="w-full h-full" />
              </div>

              {/* Orbiting blue dot */}
              <div
                className="animate-orbit-dot"
                style={{
                  position: 'absolute',
                  inset: '6%',
                  borderRadius: '50%',
                  pointerEvents: 'none',
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '0%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#3B82F6',
                  boxShadow: '0 0 14px rgba(59,130,246,0.9)',
                }} />
              </div>

              {/* Secondary orbiting gold accent dot — luxury micro-detail */}
              <div
                className="animate-rotate-reverse"
                style={{
                  position: 'absolute',
                  inset: '2%',
                  borderRadius: '50%',
                  pointerEvents: 'none',
                }}
              >
                <div style={{
                  position: 'absolute',
                  bottom: '8%',
                  right: '12%',
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: '#D4AF37',
                  boxShadow: '0 0 10px rgba(212,175,55,0.7)',
                }} />
              </div>

              {/* Floating stat badge — enterprise trust signal */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.8 }}
                style={{
                  position: 'absolute',
                  bottom: '12%',
                  left: '-8%',
                  background: 'rgba(11,18,32,0.88)',
                  border: '1px solid rgba(59,130,246,0.22)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  backdropFilter: 'blur(16px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  pointerEvents: 'none',
                }}
              >
                <div style={{
                  width: '32px', height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(37,99,235,0.15)',
                  border: '1px solid rgba(59,130,246,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <div style={{
                    width: '10px', height: '10px',
                    borderRadius: '50%',
                    background: '#2563EB',
                    boxShadow: '0 0 8px rgba(37,99,235,0.8)',
                  }} />
                </div>
                <div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 700, color: '#F9FAFB', lineHeight: 1 }}>100%</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', fontWeight: 500, color: '#6B7280', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '2px' }}>Client Satisfaction</div>
                </div>
              </motion.div>

              {/* Top-right badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 2.1 }}
                style={{
                  position: 'absolute',
                  top: '15%',
                  right: '-6%',
                  background: 'rgba(11,18,32,0.88)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  borderRadius: '10px',
                  padding: '9px 13px',
                  backdropFilter: 'blur(16px)',
                  pointerEvents: 'none',
                }}
              >
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, color: '#D4AF37', lineHeight: 1 }}>AI-Native</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', color: '#6B7280', marginTop: '2px', letterSpacing: '0.08em' }}>Enterprise Ready</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '160px',
          background: 'linear-gradient(to bottom, transparent, #030712)',
          pointerEvents: 'none',
        }}
      />
    </section>
  )
}

export default HeroSection
