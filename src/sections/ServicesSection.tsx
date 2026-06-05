import React from 'react'
import { motion } from 'framer-motion'
import { Bot, Code2, Layers, Zap, ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'

/* ── Marquee ── */
const MARQUEE_ITEMS = ['AI Development', 'Enterprise Software', 'SaaS Platforms', 'Product Design', 'API Integration', 'Intelligent Automation']
const MarqueeStrip: React.FC = () => {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: '#0B1220',
        padding: '14px 0',
        borderTop: '1px solid rgba(37,99,235,0.08)',
        borderBottom: '1px solid rgba(37,99,235,0.08)',
      }}
      aria-hidden="true"
    >
      {/* edge fades */}
      <div style={{ position: 'absolute', inset: '0 auto 0 0', width: 80, background: 'linear-gradient(90deg,#0B1220,transparent)', zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: '0 0 0 auto', width: 80, background: 'linear-gradient(270deg,#0B1220,transparent)', zIndex: 1, pointerEvents: 'none' }} />

      <div className="flex items-center whitespace-nowrap marquee-track" style={{ width: 'max-content' }}>
        {items.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 0 }}>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 600,
              letterSpacing: '.22em', textTransform: 'uppercase', color: '#1F2D4A',
              padding: '0 32px',
            }}>
              {item}
            </span>
            {/* Alternating blue and gold dots */}
            <span style={{
              width: 4, height: 4, borderRadius: '50%',
              background: i % 3 === 1 ? '#D4AF37' : '#2563EB',
              opacity: i % 3 === 1 ? 0.55 : 0.5,
              flexShrink: 0,
            }} />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Service card data ── */
const services = [
  {
    id: 'ai',
    icon: Bot,
    title: 'AI Development',
    desc: 'Custom LLM integrations, intelligent automation, and AI-native systems built for enterprise scale.',
    badge: 'Most Popular',
    badgeGold: true,
  },
  {
    id: 'web',
    icon: Code2,
    title: 'Web Development',
    desc: 'High-performance websites and web applications engineered with modern, cutting-edge technologies.',
    badge: null,
    badgeGold: false,
  },
  {
    id: 'saas',
    icon: Layers,
    title: 'SaaS Development',
    desc: 'Scalable SaaS platforms architected for security, reliability, and sustained business growth.',
    badge: null,
    badgeGold: false,
  },
  {
    id: 'auto',
    icon: Zap,
    title: 'Automation Systems',
    desc: 'Workflow automation, API integrations, and intelligent business process solutions.',
    badge: null,
    badgeGold: false,
  },
]

const ServicesSection: React.FC = () => {
  const scrollContact = () =>
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <>
      <MarqueeStrip />

      <section
        id="services"
        style={{ position: 'relative', background: '#030712', padding: '88px 0', overflow: 'hidden' }}
        aria-labelledby="services-h2"
      >
        {/* bg glow — blue */}
        <div style={{
          position: 'absolute', top: 0, right: 0, width: 500, height: 500,
          background: 'radial-gradient(ellipse, rgba(37,99,235,0.05) 0%, transparent 65%)',
          filter: 'blur(80px)', pointerEvents: 'none',
        }} aria-hidden="true" />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, width: 350, height: 350,
          background: 'radial-gradient(ellipse, rgba(37,99,235,0.03) 0%, transparent 65%)',
          filter: 'blur(80px)', pointerEvents: 'none',
        }} aria-hidden="true" />

        <div className="section-container">
          {/* Header row */}
          <div className="services-header">
            <div>
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
                  }}>What We Build</span>
                </div>
              </ScrollReveal>
              <ScrollReveal animation="fadeUp" delay={0.07}>
                <h2
                  id="services-h2"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(1.8rem, 3.2vw, 3rem)',
                    fontWeight: 700, color: '#F9FAFB', lineHeight: 1.1,
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
                  letterSpacing: '.1em', textTransform: 'uppercase', color: '#3B82F6',
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
                    whileHover={{ y: -4, borderColor: 'rgba(59,130,246,.35)', boxShadow: '0 0 48px rgba(37,99,235,.1)' }}
                    transition={{ duration: .3, ease: [.22, 1, .36, 1] }}
                    role="article"
                    style={{ position: 'relative' }}
                  >
                    {/* Gold premium badge for highlighted card */}
                    {s.badge && (
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        padding: '3px 10px',
                        background: 'rgba(212,175,55,0.1)',
                        border: '1px solid rgba(212,175,55,0.25)',
                        borderRadius: '20px',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '9px',
                        fontWeight: 700,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: '#D4AF37',
                      }}>
                        {s.badge}
                      </div>
                    )}

                    {/* Icon */}
                    <div className="icon-box" style={{ marginBottom: '18px' }}>
                      <Icon size={19} style={{ color: '#60A5FA' }} />
                    </div>

                    {/* Title */}
                    <h3 style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: '17px', fontWeight: 700, color: '#F9FAFB',
                      marginBottom: '10px', lineHeight: 1.3,
                      transition: 'color .3s ease',
                    }}>
                      {s.title}
                    </h3>

                    {/* Description */}
                    <p style={{
                      fontFamily: 'Inter, sans-serif', fontSize: '13px',
                      color: '#9CA3AF', lineHeight: 1.7, flex: 1, marginBottom: '20px',
                    }}>
                      {s.desc}
                    </p>

                    {/* Learn more */}
                    <button
                      onClick={scrollContact}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600,
                        letterSpacing: '.1em', textTransform: 'uppercase', color: '#3B82F6',
                        background: 'none', border: 'none', cursor: 'pointer',
                        transition: 'color .2s ease',
                      }}
                    >
                      Learn More <ArrowRight size={11} />
                    </button>

                    {/* Bottom accent line */}
                    <div style={{
                      position: 'absolute',
                      bottom: 0, left: '24px', right: '24px',
                      height: '1px',
                      background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.15), transparent)',
                    }} />
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
