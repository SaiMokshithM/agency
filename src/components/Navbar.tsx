import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { useScrolled } from '@/hooks/useScrolled'

const navLinks = [
  { label: 'Services',  href: '#services'  },
  { label: 'Approach',  href: '#process'    },
  { label: 'About',     href: '#about'      },
  { label: 'Contact',   href: '#contact'    },
]

const Navbar: React.FC = () => {
  const { scrolled }                = useScrolled(50)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location                    = useLocation()

  useEffect(() => { setMobileOpen(false) }, [location])
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const go = (href: string) => {
    setMobileOpen(false)
    if (!href.startsWith('#')) return
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  return (
    <>
      {/* ── Desktop bar ── */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'background 0.5s ease, border-color 0.5s ease, backdrop-filter 0.5s ease',
          background: scrolled
            ? 'rgba(3,7,18,0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(37,99,235,0.1)'
            : '1px solid transparent',
          boxShadow: scrolled ? '0 1px 0 rgba(37,99,235,0.06)' : 'none',
        }}
        role="banner"
      >
        <nav
          style={{
            maxWidth: '1380px',
            margin: '0 auto',
            padding: '0 56px',
            height: '66px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            to="/"
            aria-label="AVENOIR home"
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}
          >
            {/* A mark */}
            <img
              src="/logo-a.svg"
              alt="AVENOIR logo"
              style={{ width: '34px', height: '34px', display: 'block', flexShrink: 0 }}
            />
            {/* Brand name — gold kept on logo as prestige accent */}
            <span style={{
              fontFamily: "'Cinzel', serif",
              fontSize: '14.5px',
              fontWeight: 500,
              letterSpacing: '0.28em',
              background: 'linear-gradient(135deg, #fff6d1 0%, #e8c45a 50%, #D4AF37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
            }} className="navbar-brand-text">
              AVENOIR
            </span>
          </Link>

          {/* Desktop nav links — centered */}
          <ul
            style={{
              display: 'none',
              listStyle: 'none',
              gap: '36px',
              alignItems: 'center',
            }}
            className="nav-desktop-links"
            role="list"
          >
            {navLinks.map(l => (
              <li key={l.label}>
                <button onClick={() => go(l.href)} className="nav-link">{l.label}</button>
              </li>
            ))}
          </ul>

          {/* Right: CTA + mobile toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => go('#contact')}
              className="btn-nav"
              id="navbar-cta"
              style={{ display: 'none' }}
            >
              Let&apos;s Talk <ArrowRight size={10} strokeWidth={2.5} />
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileOpen(v => !v)}
              className="mobile-menu-toggle"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile fullscreen menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog" aria-modal="true" aria-label="Mobile navigation"
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 39px) 33px)' }}
            animate={{ opacity: 1, clipPath: 'circle(160% at calc(100% - 39px) 33px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 39px) 33px)' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 40,
              background: '#030712',
              display: 'flex', flexDirection: 'column',
              overflowY: 'auto',
            }}
          >
            {/* BG glow — blue */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'radial-gradient(ellipse at 80% 15%, rgba(37,99,235,0.09) 0%, transparent 55%)',
              }}
            />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 32px', paddingTop: '88px', paddingBottom: '32px', minHeight: 'fit-content' }}>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.label}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      onClick={() => go(l.href)}
                      className="mobile-nav-link"
                      style={{
                        width: '100%', textAlign: 'left',
                        padding: '16px 0',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        background: 'transparent', border: 'none', borderBottom: '1px solid rgba(37,99,235,0.1)',
                        cursor: 'pointer',
                        color: '#F9FAFB',
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: 'clamp(1.75rem, 6vw, 2.4rem)',
                        fontWeight: 700,
                        transition: 'color 0.3s',
                      }}
                    >
                      <span>{l.label}</span>
                      <ArrowRight size={16} className="arrow-icon" style={{ color: '#3B82F6', opacity: 0.7, transition: 'transform 0.3s ease' }} />
                    </button>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.46, duration: 0.45 }}
                style={{ marginTop: '32px' }}
              >
                <button onClick={() => go('#contact')} className="btn-primary" style={{ width: '100%', justifyContent: 'center', minHeight: '48px' }}>
                  Start a Project <ArrowRight size={13} />
                </button>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              style={{ padding: '0 32px 28px', color: '#374151', fontSize: '12px', fontFamily: 'Inter, sans-serif' }}
            >
              saimokshith2006@gmail.com
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
