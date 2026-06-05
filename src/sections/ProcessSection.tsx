import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollReveal from '@/components/ScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { n: '01', title: 'Discover',       desc: 'We analyse your goals, challenges and opportunities to define the foundation.' },
  { n: '02', title: 'Strategy',       desc: 'We define the right strategy and create a clear, actionable roadmap.' },
  { n: '03', title: 'Design',         desc: 'We design intuitive and conversion-focused user experiences.' },
  { n: '04', title: 'Develop',        desc: 'We build scalable, secure and high-performance solutions.' },
  { n: '05', title: 'Launch & Scale', desc: 'We launch, optimise and scale your product for sustained growth.' },
]

const ProcessSection: React.FC = () => {
  const hLineRef     = useRef<HTMLDivElement>(null)
  const vLineRef     = useRef<HTMLDivElement>(null)
  const sectionRef   = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // ── Desktop: horizontal line ──
    const hLine = hLineRef.current
    if (hLine) {
      gsap.fromTo(hLine,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1, duration: 1.4, ease: 'power2.inOut',
          scrollTrigger: {
            trigger: section, start: 'top 65%',
            end: 'center center', scrub: 0.6,
          },
        }
      )
    }

    // ── Mobile: vertical line ──
    const vLine = vLineRef.current
    if (vLine) {
      gsap.fromTo(vLine,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1, duration: 1.6, ease: 'power2.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 0.8,
          },
        }
      )
    }

    return () => ScrollTrigger.getAll().forEach(t => {
      if (t.vars.trigger === section) t.kill()
    })
  }, [])

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{ position: 'relative', background: '#0B1220', padding: '88px 0', overflow: 'hidden' }}
      aria-labelledby="process-h2"
    >
      {/* top divider — blue */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg,transparent,rgba(37,99,235,.18),transparent)',
      }} aria-hidden="true" />

      {/* centre glow — blue */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%,-50%)',
        width: 700, height: 300,
        background: 'radial-gradient(ellipse, rgba(37,99,235,.06) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} aria-hidden="true" />

      <div className="section-container">

        {/* Header */}
        <div style={{ marginBottom: '60px' }}>
          <ScrollReveal animation="fadeUp">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
              <span style={{ width: '28px', height: '1px', background: 'linear-gradient(90deg, #2563EB, rgba(59,130,246,0.3))', flexShrink: 0 }} />
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: '#60A5FA',
              }}>Our Process</span>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={.07}>
            <h2
              id="process-h2"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.8rem, 3.2vw, 3rem)',
                fontWeight: 700, color: '#F9FAFB', lineHeight: 1.1,
              }}
            >
              A proven process for{' '}
              {/* Gold gradient on key phrase — premium keyword emphasis */}
              <span style={{
                background: 'linear-gradient(135deg,#D4AF37 0%,#F4D03F 50%,#D4AF37 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                exceptional results
              </span>
            </h2>
          </ScrollReveal>
        </div>

        {/* ══ DESKTOP LAYOUT ══ */}
        <div className="process-desktop">
          <div style={{ position: 'relative' }}>
            {/* track BG — dark blue */}
            <div className="process-h-line" style={{
              position: 'absolute', top: 8, left: '9%', right: '9%',
              height: 1, background: 'rgba(37,99,235,.1)',
            }} aria-hidden="true" />
            {/* track animated — blue gradient */}
            <div ref={hLineRef} className="process-h-line" style={{
              position: 'absolute', top: 8, left: '9%', right: '9%',
              height: 1,
              background: 'linear-gradient(90deg,#2563EB,#60A5FA,#2563EB)',
              transformOrigin: 'left center',
              boxShadow: '0 0 8px rgba(37,99,235,0.5)',
            }} aria-hidden="true" />

            <div className="process-grid">
              {steps.map((s, i) => (
                <ScrollReveal key={s.n} animation="fadeUp" delay={i * .08}>
                  <div className="group process-step">
                    {/* Dot — blue */}
                    <div
                      className="timeline-dot process-dot"
                      style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}
                      aria-hidden="true"
                    >
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3B82F6', display: 'block', boxShadow: '0 0 6px rgba(59,130,246,0.8)' }} />
                    </div>

                    <p style={{
                      fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700,
                      letterSpacing: '.2em', textTransform: 'uppercase', color: '#3B82F6',
                      marginBottom: '8px',
                    }}>
                      {s.n}
                    </p>

                    <h3 style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: '16px', fontWeight: 700, color: '#F9FAFB',
                      marginBottom: '8px', lineHeight: 1.3,
                    }}>
                      {s.title}
                    </h3>

                    <p style={{
                      fontFamily: 'Inter, sans-serif', fontSize: '12px',
                      color: '#9CA3AF', lineHeight: 1.7,
                    }}>
                      {s.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* ══ MOBILE LAYOUT ══ */}
        <div className="process-mobile">
          <div className="process-mobile-track">

            {/* Vertical track BG line */}
            <div className="process-vline-bg" aria-hidden="true" />
            {/* Vertical animated blue line */}
            <div ref={vLineRef} className="process-vline-fill" aria-hidden="true" />

            {/* Steps */}
            {steps.map((s, i) => (
              <ScrollReveal key={s.n} animation="fadeUp" delay={i * 0.06}>
                <div className="process-mobile-step">
                  {/* Dot */}
                  <div className="process-mobile-dot" aria-hidden="true">
                    <span className="process-mobile-dot-inner" />
                  </div>

                  {/* Content */}
                  <div className="process-mobile-content">
                    <p className="process-mobile-num">{s.n}</p>
                    <h3 className="process-mobile-title">{s.title}</h3>
                    <p className="process-mobile-desc">{s.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default ProcessSection
