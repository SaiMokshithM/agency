import React from 'react'
import { motion } from 'framer-motion'
import { Bot, Code2, Layers, Zap, ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'

/* ── Marquee ── */
const MARQUEE_ITEMS = ['Web Development', 'AI Automation', 'SaaS Platforms', 'Product Design', 'API Integration', 'Performance Optimisation']
const MarqueeStrip: React.FC = () => {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div
      className="relative overflow-hidden border-y border-[rgba(201,162,39,.07)]"
      style={{ background: '#090909', padding: '14px 0' }}
      aria-hidden="true"
    >
      {/* edge fades */}
      <div style={{ position: 'absolute', inset: '0 auto 0 0', width: 80, background: 'linear-gradient(90deg,#090909,transparent)', zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: '0 0 0 auto', width: 80, background: 'linear-gradient(270deg,#090909,transparent)', zIndex: 1, pointerEvents: 'none' }} />

      <div className="flex items-center whitespace-nowrap marquee-track" style={{ width: 'max-content' }}>
        {items.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 0 }}>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 600,
              letterSpacing: '.24em', textTransform: 'uppercase', color: '#3a3a3a',
              padding: '0 32px',
            }}>
              {item}
            </span>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#c9a227', opacity: .45, flexShrink: 0 }} />
          </span>
        ))}
      </div>
    </div>
  )
}



/* ── Service card data ── */
const services = [
  { id:'ai',      icon: Bot,   title: 'AI Development',    desc: 'Custom AI solutions, LLM integrations and intelligent automation systems.' },
  { id:'web',     icon: Code2, title: 'Web Development',   desc: 'High-performance websites and web applications built with modern technologies.' },
  { id:'saas',    icon: Layers,title: 'SaaS Development',  desc: 'Scalable SaaS platforms that are secure, reliable and built for growth.' },
  { id:'auto',    icon: Zap,   title: 'Automation Systems',desc: 'Workflow automation, API integrations and custom business solutions.' },
]

const ServicesSection: React.FC = () => {
  const scrollContact = () =>
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <>
      <MarqueeStrip />

      <section
        id="services"
        style={{ position: 'relative', background: '#090909', padding: '88px 0', overflow: 'hidden' }}
        aria-labelledby="services-h2"
      >
        {/* bg glow */}
        <div style={{
          position: 'absolute', top: 0, right: 0, width: 420, height: 420,
          background: 'radial-gradient(ellipse, rgba(201,162,39,.04) 0%, transparent 65%)',
          filter: 'blur(80px)', pointerEvents: 'none',
        }} aria-hidden="true" />

        <div className="section-container">
          {/* Header row */}
          <div className="services-header">
            <div>
              <ScrollReveal animation="fadeUp">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                  <span style={{ width: '32px', height: '1px', background: 'linear-gradient(90deg, #c9a227, rgba(201,162,39,0.3))', flexShrink: 0 }} />
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.26em',
                    textTransform: 'uppercase',
                    color: '#c9a227',
                  }}>What We Do</span>
                </div>
              </ScrollReveal>
              <ScrollReveal animation="fadeUp" delay={0.07}>
                <h2
                  id="services-h2"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(1.8rem, 3.2vw, 3rem)',
                    fontWeight: 700, color: '#ececec', lineHeight: 1.1,
                  }}
                >
                  End-to-end digital solutions
                </h2>
              </ScrollReveal>
            </div>

            <ScrollReveal animation="fadeIn" delay={0.12}>
              <button
                onClick={scrollContact}
                className="group"
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600,
                  letterSpacing: '.1em', textTransform: 'uppercase', color: '#c9a227',
                  background: 'none', border: 'none', cursor: 'pointer',
                  transition: 'color .2s ease', whiteSpace: 'nowrap',
                }}
              >
                View All Services
                <ArrowRight size={13} style={{ transition: 'transform .2s ease' }} />
              </button>
            </ScrollReveal>
          </div>

          {/* 4-column grid */}
          <div className="services-grid">
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <ScrollReveal key={s.id} animation="fadeUp" delay={i * .07}>
                  <motion.div
                    className="service-card group"
                    whileHover={{ y: -4, borderColor: 'rgba(201,162,39,.28)', boxShadow: '0 0 44px rgba(201,162,39,.06)' }}
                    transition={{ duration: .3, ease: [.22, 1, .36, 1] }}
                    role="article"
                  >
                    {/* Icon */}
                    <div className="icon-box" style={{ marginBottom: '18px' }}>
                      <Icon size={19} style={{ color: '#c9a227' }} />
                    </div>

                    {/* Title */}
                    <h3 style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: '17px', fontWeight: 700, color: '#ececec',
                      marginBottom: '10px', lineHeight: 1.3,
                      transition: 'color .3s ease',
                    }}>
                      {s.title}
                    </h3>

                    {/* Description */}
                    <p style={{
                      fontFamily: 'Inter, sans-serif', fontSize: '13px',
                      color: '#a1a1aa', lineHeight: 1.7, flex: 1, marginBottom: '20px',
                    }}>
                      {s.desc}
                    </p>

                    {/* Learn more */}
                    <button
                      onClick={scrollContact}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600,
                        letterSpacing: '.1em', textTransform: 'uppercase', color: '#c9a227',
                        background: 'none', border: 'none', cursor: 'pointer',
                        transition: 'color .2s ease',
                      }}
                    >
                      Learn More <ArrowRight size={11} />
                    </button>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default ServicesSection
