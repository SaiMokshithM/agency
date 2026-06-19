import React, { useEffect, useRef, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ArrowRight } from 'lucide-react'

// Lazy-load the heavy Three.js solar system — splits it to a separate chunk
const GoldSphere = lazy(() => import('@/components/GoldSphere'))

// Minimal skeleton shown while Three.js chunk loads
const SphereSkeleton = () => (
  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{
      width: '60%', maxWidth: '340px', aspectRatio: '1/1',
      borderRadius: '50%',
      background: 'radial-gradient(ellipse at 40% 35%, rgba(62,143,168,0.18) 0%, rgba(7,17,31,0.6) 70%)',
      border: '1px solid rgba(62,143,168,0.12)',
      animation: 'pulse 2s ease-in-out infinite',
    }} />
  </div>
)

const EASE = 'easeOut' as const

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
        background: '#07111F',
        overflow: 'hidden',
      }}
      aria-labelledby="hero-h1"
    >
      {/* ── Deep atmosphere layers ── */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>

        {/* Primary warm golden cloud — right side behind sphere */}
        <div style={{
          position: 'absolute',
          top: '-5%', right: '-8%',
          width: '70%', height: '110%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 60% 45%, rgba(62,143,168,0.18) 0%, rgba(62,143,168,0.06) 38%, transparent 68%)',
          filter: 'blur(60px)',
        }} />

        {/* Secondary amber bloom — upper right */}
        <div style={{
          position: 'absolute',
          top: '-20%', right: '5%',
          width: '55%', height: '80%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(232,196,90,0.10) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }} />

        {/* Subtle bottom-left counter glow */}
        <div style={{
          position: 'absolute',
          bottom: '-10%', left: '-5%',
          width: '40%', height: '55%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(62,143,168,0.04) 0%, transparent 65%)',
          filter: 'blur(90px)',
        }} />

        {/* Light rays / streaks from sphere area */}
        {[
          { rotate: -38, top: '10%', right: '22%', width: '45%', height: '1px', opacity: 0.12 },
          { rotate: -28, top: '22%', right: '18%', width: '55%', height: '1px', opacity: 0.08 },
          { rotate: -18, top: '35%', right: '14%', width: '60%', height: '1px', opacity: 0.06 },
          { rotate: 12,  top: '58%', right: '20%', width: '50%', height: '1px', opacity: 0.07 },
          { rotate: 28,  top: '72%', right: '24%', width: '42%', height: '1px', opacity: 0.05 },
        ].map((ray, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: ray.top,
              right: ray.right,
              width: ray.width,
              height: ray.height,
              background: `linear-gradient(90deg, transparent, rgba(62,143,168,${ray.opacity}), transparent)`,
              transform: `rotate(${ray.rotate}deg)`,
              transformOrigin: 'right center',
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Film grain texture */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.15,
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
            gridTemplateColumns: '1fr 1.35fr',
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
              style={{ marginBottom: '1.8rem', display: 'inline-flex', alignItems: 'center', gap: '14px' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
            >
              {/* Gold left rule */}
              <span style={{ width: '32px', height: '1px', background: 'linear-gradient(90deg, #3E8FA8, rgba(62,143,168,0.3))', flexShrink: 0 }} />
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: '#3E8FA8',
              }}>
                AI-Powered Web Development Agency
              </span>
            </motion.div>

            {/* Headline */}
            <h1
              id="hero-h1"
              ref={h1Ref}
              aria-label="We build digital experiences that drive impact."
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.75rem, 5.5vw, 4.8rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.015em',
                color: '#F0EAE4',
              }}
            >
              <span className="sr-only">We build digital experiences that drive impact.</span>
              <span aria-hidden="true" className="flex flex-wrap gap-x-[0.25em] gap-y-[0.08em] justify-center md:justify-start">
                <span style={{ display: 'inline-block', overflow: 'hidden' }}>
                  <span className="w" style={{ display: 'inline-block' }}>We</span>
                </span>
                <span style={{ display: 'inline-block', overflow: 'hidden' }}>
                  <span className="w" style={{ display: 'inline-block' }}>build</span>
                </span>
                <span style={{ display: 'inline-block', overflow: 'hidden' }}>
                  <span className="w" style={{ display: 'inline-block' }}>digital</span>
                </span>
                <span style={{ display: 'inline-block', overflow: 'hidden' }}>
                  <span className="w" style={{ display: 'inline-block' }}>experiences</span>
                </span>
                <span style={{ display: 'inline-block', overflow: 'hidden' }}>
                  <span className="w" style={{ display: 'inline-block' }}>that</span>
                </span>
                <span style={{ display: 'inline-block', overflow: 'hidden' }}>
                  <span
                    className="w"
                    style={{
                      display: 'inline-block',
                      background: 'linear-gradient(130deg, #3E8FA8 0%, #C2DCEA 45%, #3E8FA8 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 0 28px rgba(62,143,168,0.35))',
                    }}
                  >
                    drive
                  </span>
                </span>
                <span style={{ display: 'inline-block', overflow: 'hidden' }}>
                  <span
                    className="w"
                    style={{
                      display: 'inline-block',
                      background: 'linear-gradient(130deg, #3E8FA8 0%, #C2DCEA 45%, #3E8FA8 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 0 28px rgba(62,143,168,0.35))',
                    }}
                  >
                    impact.
                  </span>
                </span>
              </span>
            </h1>

            {/* Sub-headline */}
            <motion.p
              style={{
                marginTop: '1.5rem',
                color: '#AECCD9',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                lineHeight: 1.8,
                maxWidth: '440px',
                width: '100%',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.95, ease: EASE }}
            >
              Custom web development, AI automation, and intelligent
              solutions for forward-thinking companies.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              style={{
                marginTop: '2rem',
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 1.1, ease: EASE }}
              className="w-full md:w-auto justify-center md:justify-start"
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
                color: '#6E9AAD',
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = '#F0EAE4')}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = '#6E9AAD')}
              aria-label="Scroll to explore"
            >
              Scroll to Explore
              {/* Animated scroll box */}
              <span
                style={{
                  width: '24px',
                  height: '24px',
                  border: '1px solid rgba(62,143,168,0.28)',
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
                    background: '#3E8FA8',
                    boxShadow: '0 0 6px rgba(62,143,168,0.6)',
                  }}
                />
              </span>
            </motion.button>
          </div>

          {/* ── RIGHT — Sphere ── */}
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
                maxWidth: '720px',
                aspectRatio: '1 / 1',
                margin: '0 auto',
              }}
            >
              {/* Outermost mega glow */}
              <div style={{
                position: 'absolute',
                inset: '-35%',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at center, rgba(62,143,168,0.18) 0%, rgba(62,143,168,0.06) 40%, transparent 68%)',
                filter: 'blur(70px)',
                pointerEvents: 'none',
              }} />

              {/* Mid glow ring */}
              <div style={{
                position: 'absolute',
                inset: '-12%',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at center, rgba(62,143,168,0.10) 0%, transparent 65%)',
                filter: 'blur(30px)',
                pointerEvents: 'none',
              }} />

              {/* Outer dashed orbit */}
              <div
                className="animate-rotate-slow"
                style={{
                  position: 'absolute',
                  inset: '4%',
                  borderRadius: '50%',
                  border: '1px dashed rgba(62,143,168,0.09)',
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
                  border: '1px solid rgba(62,143,168,0.05)',
                  pointerEvents: 'none',
                }}
              />

              {/* Sphere canvas — lazy loaded for fast page paint */}
              <div
                className="animate-float-sphere"
                style={{ width: '100%', height: '100%' }}
              >
                <Suspense fallback={<SphereSkeleton />}>
                  <GoldSphere className="w-full h-full" />
                </Suspense>
              </div>

              {/* Small orbiting dot */}
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
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#5BB8D4',
                  boxShadow: '0 0 12px rgba(62,143,168,0.8)',
                }} />
              </div>
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
          background: 'linear-gradient(to bottom, transparent, #07111F)',
          pointerEvents: 'none',
        }}
      />
    </section>
  )
}

export default HeroSection
