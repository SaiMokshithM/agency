import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { useScrolled } from '@/hooks/useScrolled'
import { Logo } from './Logo'

const navLinks = [
  { label: 'Services',  href: '#services'  },
  { label: 'Approach',  href: '#process'    },
  { label: 'About',     href: '#about'      },
  { label: 'Contact',   href: '#contact'    },
]

const Navbar: React.FC = () => {
  const { scrolled }                = useScrolled(50)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const location                    = useLocation()

  useEffect(() => { setMobileOpen(false); setServicesOpen(false) }, [location])


  const go = (href: string) => {
    setMobileOpen(false)
    setServicesOpen(false)
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
          top: 0, left: 0, right: 0,
          zIndex: 50,
          transition: 'background 0.5s ease, border-color 0.5s ease, backdrop-filter 0.5s ease',
          background: scrolled ? 'rgba(9,9,9,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(62,143,168,0.07)' : '1px solid transparent',
        }}
        role="banner"
      >
        <nav
          style={{
            maxWidth: '1380px', margin: '0 auto',
            padding: '0 56px', height: '66px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}
          aria-label="Main navigation"
        >
          <Link to="/" aria-label="VELOtechnoz home"
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}
          >
            <Logo fontSize="22px" />
          </Link>

          <ul style={{ display: 'none', listStyle: 'none', gap: '36px', alignItems: 'center' }}
            className="nav-desktop-links" role="list"
          >
            {navLinks.map(l => (
              <li key={l.label}>
                <button onClick={() => go(l.href)} className="nav-link">{l.label}</button>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => go('#contact')} className="btn-nav" id="navbar-cta" style={{ display: 'none' }}>
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
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0,
              zIndex: 40,
              background: '#090909',
              display: 'flex', flexDirection: 'column',
              overflowY: 'auto',
              maxHeight: '92vh',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.7)',
            }}
          >


            {/* ── Top bar: Logo + Close ── */}
            <div style={{
              position: 'relative', zIndex: 2,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '18px 24px',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
              <Link to="/" onClick={() => setMobileOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
              >
                <Logo fontSize="20px" />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  width: '38px', height: '38px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: '#F0EAE4',
                  transition: 'background 0.2s',
                }}
                className="mobile-close-btn"
              >
                <X size={18} />
              </button>
            </div>

            {/* ── Nav Links ── */}
            <div style={{ flex: 1, position: 'relative', zIndex: 2, padding: '8px 0 0' }}>
              <ul style={{ listStyle: 'none', margin: 0, padding: '0 24px' }}>
                {navLinks.map((l, i) => (
                  <motion.li key={l.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.055, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      onClick={() => go(l.href)}
                      className="mobile-nav-link-v2"
                      style={{
                        width: '100%', textAlign: 'left',
                        padding: '22px 0',
                        display: 'block',
                        background: 'transparent', border: 'none',
                        borderBottom: '1px solid rgba(255,255,255,0.07)',
                        cursor: 'pointer',
                        color: '#E8E2DC',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '1.55rem',
                        fontWeight: 600,
                        letterSpacing: '-0.01em',
                        transition: 'color 0.25s',
                      }}
                    >
                      {l.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* ── Bottom CTAs ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.58, duration: 0.4 }}
              style={{
                position: 'relative', zIndex: 2,
                padding: '20px 24px 36px',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                display: 'flex', flexDirection: 'column', gap: '10px',
              }}
            >
              <button
                onClick={() => go('#about')}
                style={{
                  width: '100%', padding: '14px',
                  background: 'transparent',
                  border: '1px solid rgba(240,234,228,0.18)',
                  borderRadius: '50px',
                  color: '#E8E2DC',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px', fontWeight: 500,
                  cursor: 'pointer', letterSpacing: '0.03em',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                className="mobile-btn-outline"
              >
                Learn About Us
              </button>
              <button
                onClick={() => go('#contact')}
                style={{
                  width: '100%', padding: '14px',
                  background: 'linear-gradient(135deg, #3E8FA8, #2a7090)',
                  border: '1px solid rgba(62,143,168,0.4)',
                  borderRadius: '50px',
                  color: '#fff',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px', fontWeight: 600,
                  cursor: 'pointer', letterSpacing: '0.03em',
                  boxShadow: '0 4px 24px rgba(62,143,168,0.25)',
                  transition: 'opacity 0.2s, box-shadow 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}
                className="mobile-btn-primary"
              >
                Start a Project <ArrowRight size={14} />
              </button>

              <p style={{
                textAlign: 'center', marginTop: '6px',
                color: 'rgba(255,255,255,0.2)',
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px',
              }}>saimokshith2006@gmail.com</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
