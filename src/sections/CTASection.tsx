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
      style={{ position: 'relative', background: '#090909', padding: '0 0 80px', overflow: 'hidden' }}
      aria-label="Call to action"
    >
      {/* top divider */}
      <div style={{
        height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,162,39,.16),transparent)',
      }} aria-hidden="true" />

      {/* bg glows */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background:
          'radial-gradient(ellipse at 25% 50%, rgba(201,162,39,.055) 0%, transparent 55%),' +
          'radial-gradient(ellipse at 80% 50%, rgba(201,162,39,.035) 0%, transparent 50%)',
        filter: 'blur(30px)',
      }} aria-hidden="true" />

      <div className="cta-container">
        {/* Card */}
        <div style={{
          position: 'relative',
          background: '#0d0d0d',
          border: '1px solid rgba(201,162,39,.12)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 0 80px rgba(201,162,39,.05)',
        }}>
          {/* corner glows */}
          <div style={{
            position: 'absolute', top: 0, right: 0, width: 280, height: 280, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at top right, rgba(201,162,39,.09) 0%, transparent 65%)',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, width: 220, height: 220, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at bottom left, rgba(201,162,39,.055) 0%, transparent 65%)',
          }} />

          <div className="cta-inner">
            <div className="cta-grid">

              {/* LEFT — copy */}
              <div>
                <ScrollReveal animation="fadeUp">
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                    <span style={{ width: '32px', height: '1px', background: 'linear-gradient(90deg, #c9a227, rgba(201,162,39,0.3))', flexShrink: 0 }} />
                    <span className="label" style={{ marginBottom: 0 }}>
                      Let's Build Something Extraordinary
                    </span>
                  </div>
                </ScrollReveal>

                <ScrollReveal animation="fadeUp" delay={.07}>
                  <h2 style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(1.7rem, 3vw, 2.8rem)',
                    fontWeight: 700, color: '#ececec', lineHeight: 1.1,
                    marginBottom: '16px',
                  }}>
                    Ready to bring your<br />
                    <span style={{
                      background: 'linear-gradient(135deg,#c9a227 0%,#e8c45a 50%,#c9a227 100%)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}>
                      vision to life?
                    </span>
                  </h2>
                </ScrollReveal>

                <ScrollReveal animation="fadeUp" delay={.1}>
                  <p style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '14px',
                    color: '#888', lineHeight: 1.8, maxWidth: '400px', marginBottom: '28px',
                  }}>
                    Partner with us to build intelligent digital experiences that drive real business impact.
                  </p>
                </ScrollReveal>

                <ScrollReveal animation="fadeUp" delay={.13}>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '11px' }} aria-label="Benefits">
                    {features.map(f => (
                      <li key={f} style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#888',
                      }}>
                        <Check size={13} style={{ color: '#c9a227', flexShrink: 0 }} />
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
                      fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#555',
                    }}>
                      or contact us at{' '}
                      <a href="mailto:saimokshith2006@gmail.com" style={{
                        color: '#c9a227', textDecoration: 'none', transition: 'color .2s',
                      }}>
                        saimokshith2006@gmail.com
                      </a>
                    </p>
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
