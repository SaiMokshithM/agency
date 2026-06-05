import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'

const features = [
  'AI-powered solutions',
  'Scalable and future-ready',
  'Transparent communication',
  'Long-term partnership',
]

const CTASection: React.FC = () => {
  const scrollContact = () =>
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section
      id="cta"
      style={{ position: 'relative', background: '#030712', padding: '0 0 80px', overflow: 'hidden' }}
      aria-label="Call to action"
    >
      {/* top divider — blue */}
      <div style={{
        height: 1, background: 'linear-gradient(90deg,transparent,rgba(37,99,235,.2),transparent)',
      }} aria-hidden="true" />

      {/* bg glows — premium blue */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background:
          'radial-gradient(ellipse at 25% 50%, rgba(37,99,235,.06) 0%, transparent 55%),' +
          'radial-gradient(ellipse at 80% 50%, rgba(59,130,246,.04) 0%, transparent 50%)',
        filter: 'blur(30px)',
      }} aria-hidden="true" />

      <div className="cta-container">
        {/* Card */}
        <div style={{
          position: 'relative',
          background: '#0B1220',
          border: '1px solid rgba(37,99,235,.15)',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 0 80px rgba(37,99,235,.06), 0 0 0 1px rgba(59,130,246,0.04)',
        }}>
          {/* Top edge glow line */}
          <div style={{
            position: 'absolute',
            top: 0, left: '20%', right: '20%', height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.35), transparent)',
            pointerEvents: 'none',
          }} />

          {/* corner glows — blue */}
          <div style={{
            position: 'absolute', top: 0, right: 0, width: 320, height: 320, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at top right, rgba(37,99,235,.1) 0%, transparent 65%)',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, width: 260, height: 260, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at bottom left, rgba(37,99,235,.065) 0%, transparent 65%)',
          }} />

          {/* Gold premium accent corner — luxury micro-detail */}
          <div style={{
            position: 'absolute', top: 0, left: 0, width: 180, height: 180, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at top left, rgba(212,175,55,.04) 0%, transparent 65%)',
          }} />

          {/* AI grid pattern on background */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
              linear-gradient(rgba(37,99,235,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(37,99,235,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse at 80% 50%, rgba(0,0,0,0.7) 0%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 80% 50%, rgba(0,0,0,0.7) 0%, transparent 75%)',
          }} />

          <div className="cta-inner">
            <div className="cta-grid">

              {/* LEFT — copy */}
              <div>
                <ScrollReveal animation="fadeUp">
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                    <span style={{ width: '28px', height: '1px', background: 'linear-gradient(90deg, #2563EB, rgba(59,130,246,0.3))', flexShrink: 0 }} />
                    <span className="label" style={{ marginBottom: 0 }}>
                      Let's Build Something Extraordinary
                    </span>
                  </div>
                </ScrollReveal>

                <ScrollReveal animation="fadeUp" delay={.07}>
                  <h2 style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(1.7rem, 3vw, 2.8rem)',
                    fontWeight: 700, color: '#F9FAFB', lineHeight: 1.1,
                    marginBottom: '16px',
                  }}>
                    Ready to bring your<br />
                    {/* Gold accent keyword — premium highlight */}
                    <span style={{
                      background: 'linear-gradient(135deg,#D4AF37 0%,#F4D03F 50%,#D4AF37 100%)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}>
                      vision to life?
                    </span>
                  </h2>
                </ScrollReveal>

                <ScrollReveal animation="fadeUp" delay={.1}>
                  <p style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '14px',
                    color: '#6B7280', lineHeight: 1.8, maxWidth: '400px', marginBottom: '28px',
                  }}>
                    Partner with us to build intelligent digital experiences that drive real business impact at enterprise scale.
                  </p>
                </ScrollReveal>

                <ScrollReveal animation="fadeUp" delay={.13}>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '11px' }} aria-label="Benefits">
                    {features.map((f, i) => (
                      <li key={f} style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#9CA3AF',
                      }}>
                        {/* Gold check for first item (featured), blue for rest */}
                        <Check size={13} style={{ color: i === 0 ? '#D4AF37' : '#3B82F6', flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>
              </div>

              {/* RIGHT — CTA button */}
              <ScrollReveal animation="slideRight" delay={.08}>
                <div className="cta-grid-right">
                  <div>
                    <motion.button
                      onClick={scrollContact}
                      className="btn-primary"
                      style={{ fontSize: '12px', padding: '14px 32px' }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: .97 }}
                      id="cta-btn"
                    >
                      Start A Project <ArrowRight size={14} />
                    </motion.button>
                    <p style={{
                      marginTop: '10px',
                      fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#374151',
                    }}>
                      or contact us at{' '}
                      <a href="mailto:saimokshith2006@gmail.com" style={{
                        color: '#3B82F6', textDecoration: 'none', transition: 'color .2s',
                      }}>
                        saimokshith2006@gmail.com
                      </a>
                    </p>

                    {/* Trust badges */}
                    <div style={{
                      marginTop: '28px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}>
                      {[
                        { label: 'Enterprise-Grade Infrastructure', icon: '🔒' },
                        { label: 'AI-Native Architecture', icon: '⚡' },
                        { label: '100% Client Satisfaction', icon: '✦' },
                      ].map((badge, i) => (
                        <div key={badge.label} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                        }}>
                          <span style={{
                            width: '28px', height: '28px',
                            borderRadius: '7px',
                            background: i === 2 ? 'rgba(212,175,55,0.08)' : 'rgba(37,99,235,0.08)',
                            border: `1px solid ${i === 2 ? 'rgba(212,175,55,0.18)' : 'rgba(59,130,246,0.18)'}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '12px', flexShrink: 0,
                          }}>
                            {badge.icon}
                          </span>
                          <span style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '11px',
                            color: '#6B7280',
                            fontWeight: 500,
                          }}>
                            {badge.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>

            </div>{/* end cta-grid */}
          </div>{/* end cta-inner */}
        </div>{/* end card */}
      </div>{/* end cta-container */}
    </section>
  )
}

export default CTASection
