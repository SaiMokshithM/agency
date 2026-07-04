import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Sparkles } from 'lucide-react'

export type ServiceDetail = {
  id: string
  icon: React.ElementType
  title: string
  desc: string
  img: string
  tagline: string
  what: string
  deliverables: string[]
  stack: string[]
  highlight: string
  stat: { value: string; label: string }
}

interface Props {
  service: ServiceDetail | null
  onClose: () => void
}

const ServiceModal: React.FC<Props> = ({ service, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = service ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [service])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const stagger = (i: number) => ({
    delay: 0.1 + i * 0.07,
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  })

  return (
    <AnimatePresence>
      {service && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 60,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          />

          {/* ── Full-screen Modal ── */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 61,
              overflowY: 'auto',
              background: '#08090A',
            }}
            role="dialog"
            aria-modal="true"
          >
            {/* ── HERO SECTION ── */}
            <div style={{ position: 'relative', height: '55vh', minHeight: '320px', overflow: 'hidden' }}>
              <img
                src={service.img}
                alt={service.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.45) saturate(0.8)' }}
              />

              {/* Gradient overlays */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, rgba(8,9,10,0.3) 0%, rgba(8,9,10,0) 40%, rgba(8,9,10,0.95) 100%)',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 20% 50%, rgba(62,143,168,0.12) 0%, transparent 60%)',
              }} />

              {/* ── Close button ── */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                onClick={onClose}
                aria-label="Close"
                style={{
                  position: 'absolute', top: '20px', right: '20px',
                  width: '42px', height: '42px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: '#fff',
                  backdropFilter: 'blur(12px)',
                  transition: 'background 0.2s',
                }}
                className="modal-close-btn"
              >
                <X size={17} />
              </motion.button>

              {/* ── Hero content ── */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '0 28px 32px',
              }}>
                {/* Agency label */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={stagger(0)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    marginBottom: '14px',
                    background: 'rgba(62,143,168,0.15)',
                    border: '1px solid rgba(62,143,168,0.3)',
                    borderRadius: '20px',
                    padding: '5px 14px',
                  }}
                >
                  <Sparkles size={11} color="#3E8FA8" />
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '10px', fontWeight: 700,
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: '#3E8FA8',
                  }}>VELOtechnoz Service</span>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={stagger(1)}
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(2rem, 8vw, 3.2rem)',
                    fontWeight: 900, color: '#F0EAE4',
                    lineHeight: 1.1, marginBottom: '10px',
                  }}
                >
                  {service.title}
                </motion.h2>

                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={stagger(2)}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px', color: 'rgba(240,234,228,0.65)',
                    lineHeight: 1.6, maxWidth: '520px',
                  }}
                >
                  {service.tagline}
                </motion.p>
              </div>
            </div>

            {/* ── BODY ── */}
            <div style={{ padding: '0 28px 60px' }}>

              {/* ── Stat bar ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={stagger(3)}
                style={{
                  display: 'grid', gridTemplateColumns: '1fr 1px 1fr 1px 1fr',
                  background: 'linear-gradient(135deg, rgba(62,143,168,0.07), rgba(62,143,168,0.03))',
                  border: '1px solid rgba(62,143,168,0.13)',
                  borderRadius: '16px',
                  padding: '20px 0',
                  margin: '28px 0',
                  textAlign: 'center',
                }}
              >
                {[
                  { v: service.stat.value, l: service.stat.label },
                  { v: '100%', l: 'Custom Built' },
                  { v: '< 8wk', l: 'Avg. Delivery' },
                ].map((s, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <div style={{ background: 'rgba(62,143,168,0.15)', width: '1px' }} />}
                    <div style={{ padding: '0 12px' }}>
                      <p style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: '1.6rem', fontWeight: 700,
                        color: '#3E8FA8', lineHeight: 1,
                        marginBottom: '4px',
                      }}>{s.v}</p>
                      <p style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '10px', fontWeight: 500,
                        color: 'rgba(255,255,255,0.35)',
                        textTransform: 'uppercase', letterSpacing: '0.1em',
                      }}>{s.l}</p>
                    </div>
                  </React.Fragment>
                ))}
              </motion.div>

              {/* ── What we do ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={stagger(4)}
                style={{ marginBottom: '36px' }}
              >
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px',
                }}>
                  <span style={{ width: '24px', height: '1px', background: '#3E8FA8', flexShrink: 0 }} />
                  <span style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700,
                    letterSpacing: '0.22em', textTransform: 'uppercase', color: '#3E8FA8',
                  }}>Our Approach</span>
                </div>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '15px', color: 'rgba(240,234,228,0.7)',
                  lineHeight: 1.8,
                }}>{service.what}</p>
              </motion.div>

              {/* ── Highlight quote ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={stagger(5)}
                style={{
                  position: 'relative',
                  padding: '24px 24px 24px 28px',
                  marginBottom: '36px',
                  borderLeft: '2px solid #3E8FA8',
                  background: 'linear-gradient(135deg, rgba(62,143,168,0.06), transparent)',
                  borderRadius: '0 12px 12px 0',
                }}
              >
                <span style={{
                  position: 'absolute', top: '-10px', left: '20px',
                  fontFamily: 'Georgia, serif', fontSize: '60px',
                  color: 'rgba(62,143,168,0.25)', lineHeight: 1,
                }}>"</span>
                <p style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '15px', fontStyle: 'italic',
                  color: '#C0D8E4', lineHeight: 1.75,
                  position: 'relative', zIndex: 1,
                }}>{service.highlight}</p>
              </motion.div>

              {/* ── Deliverables ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={stagger(6)}
                style={{ marginBottom: '36px' }}
              >
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px',
                }}>
                  <span style={{ width: '24px', height: '1px', background: '#3E8FA8', flexShrink: 0 }} />
                  <span style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700,
                    letterSpacing: '0.22em', textTransform: 'uppercase', color: '#3E8FA8',
                  }}>What You Get</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {service.deliverables.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 + i * 0.06, duration: 0.4 }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '18px',
                        padding: '15px 0',
                        borderBottom: i < service.deliverables.length - 1
                          ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      }}
                    >
                      <span style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: '13px', fontWeight: 700,
                        color: 'rgba(62,143,168,0.5)',
                        minWidth: '28px', flexShrink: 0,
                        letterSpacing: '0.05em',
                      }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '13.5px', fontWeight: 450,
                        color: 'rgba(240,234,228,0.82)',
                        lineHeight: 1.5, flex: 1,
                      }}>{item}</span>
                      <span style={{
                        width: '6px', height: '6px',
                        borderRadius: '50%',
                        background: 'rgba(62,143,168,0.35)',
                        flexShrink: 0,
                      }} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* ── Tech Stack ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={stagger(7)}
                style={{ marginBottom: '40px' }}
              >
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px',
                }}>
                  <span style={{ width: '24px', height: '1px', background: '#3E8FA8', flexShrink: 0 }} />
                  <span style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700,
                    letterSpacing: '0.22em', textTransform: 'uppercase', color: '#3E8FA8',
                  }}>Tech & Tools</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {service.stack.map((tech, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.75 + i * 0.05 }}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '11px', fontWeight: 600,
                        color: '#7AB8CC',
                        background: 'rgba(62,143,168,0.08)',
                        border: '1px solid rgba(62,143,168,0.2)',
                        borderRadius: '6px',
                        padding: '6px 14px',
                        letterSpacing: '0.03em',
                      }}
                    >{tech}</motion.span>
                  ))}
                </div>
              </motion.div>

              {/* ── CTA ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={stagger(9)}
              >
                <button
                  onClick={() => {
                    onClose()
                    setTimeout(() => {
                      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }, 350)
                  }}
                  className="service-modal-cta"
                  style={{
                    width: '100%', padding: '18px',
                    background: 'linear-gradient(135deg, #3E8FA8 0%, #2a6e87 100%)',
                    border: 'none',
                    borderRadius: '14px',
                    color: '#fff',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px', fontWeight: 700,
                    cursor: 'pointer', letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    boxShadow: '0 8px 40px rgba(62,143,168,0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    transition: 'opacity 0.2s, transform 0.2s',
                  }}
                >
                  Start This Project <ArrowRight size={16} />
                </button>
                <p style={{
                  textAlign: 'center', marginTop: '14px',
                  fontFamily: 'Inter, sans-serif', fontSize: '11px',
                  color: 'rgba(255,255,255,0.25)',
                }}>Free discovery call · No commitment</p>
              </motion.div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ServiceModal
