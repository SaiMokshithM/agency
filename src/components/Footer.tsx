import React from 'react'
import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'

/* ── Inline SVG brand icons ── */
const IconInstagram = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
)

const IconTwitter = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const cols: Record<string, string[]> = {
  Services: ['AI Development', 'Web Development', 'SaaS Development', 'Automation Systems'],
  Company:  ['About Us', 'Our Approach', 'Contact'],
  Contact:  ['saimokshith2006@gmail.com', "Let's build something", 'great together.'],
}

const sectionMap: Record<string, string> = {
  'AI Development':    '#services',
  'Web Development':   '#services',
  'SaaS Development':  '#services',
  'Automation Systems':'#services',
  'About Us':          '#about',
  'Our Approach':      '#process',
  'Contact':           '#contact',
}

const Footer: React.FC = () => {
  const go = (id: string) => {
    if (id === '#') return
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer
      style={{
        position: 'relative',
        background: '#030712',
        borderTop: '1px solid rgba(37,99,235,.08)',
      }}
      role="contentinfo"
    >
      {/* Top glow line — blue */}
      <div style={{
        position: 'absolute', top: -1, left: '20%', right: '20%', height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(59,130,246,.28), transparent)',
        pointerEvents: 'none',
      }} aria-hidden="true" />

      {/* Subtle background glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 20% 0%, rgba(37,99,235,0.04) 0%, transparent 55%)',
      }} aria-hidden="true" />

      <div className="footer-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Main grid */}
        <div className="footer-grid">

          {/* Brand col */}
          <div>
            <Link
              to="/"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '16px' }}
              aria-label="AVENOIR home"
              className="group"
            >
              <img
                src="/logo-a.svg"
                alt="AVENOIR logo"
                style={{ width: '32px', height: '32px', display: 'block', flexShrink: 0 }}
              />
              {/* Gold logo text — preserved as prestige brand element */}
              <span style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '13.5px',
                fontWeight: 500,
                letterSpacing: '0.24em',
                background: 'linear-gradient(135deg, #fff6d1 0%, #e8c45a 50%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block',
              }}>
                AVENOIR
              </span>
            </Link>

            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#4B5563',
              lineHeight: 1.75, maxWidth: '220px', marginBottom: '22px',
            }}>
              Enterprise AI systems and software products for ambitious, forward-thinking businesses.
            </p>

            {/* Social icons — blue */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} role="list" aria-label="Social links">
              {[
                { label: 'Instagram', Icon: IconInstagram, href: '#' },
                { label: 'Twitter',  Icon: IconTwitter,  href: '#' },
                { label: 'Email', Icon: Mail, href: 'mailto:saimokshith2006@gmail.com' },
              ].map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  role="listitem"
                  className="social-icon"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>

            {/* Premium status badge */}
            <div style={{
              marginTop: '24px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '7px 12px',
              background: 'rgba(11,18,32,0.8)',
              border: '1px solid rgba(212,175,55,0.14)',
              borderRadius: '8px',
            }}>
              <span style={{
                width: '6px', height: '6px',
                borderRadius: '50%',
                background: '#D4AF37',
                boxShadow: '0 0 8px rgba(212,175,55,0.6)',
              }} />
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#6B7280',
              }}>
                Premium Studio
              </span>
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(cols).map(([cat, links]) => (
            <div key={cat}>
              <h3 style={{
                fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700,
                letterSpacing: '.18em', textTransform: 'uppercase', color: '#F9FAFB',
                marginBottom: '18px',
              }}>
                {cat}
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map(link => {
                  const isEmail = link.includes('@')
                  const isPlain = link.endsWith('.') || link === 'great together.'
                  const linkStyle: React.CSSProperties = {
                    fontFamily: 'Inter, sans-serif', fontSize: '12px', lineHeight: 1.5,
                  }
                  if (isPlain) return (
                    <li key={link}><span style={{ ...linkStyle, color: '#4B5563' }}>{link}</span></li>
                  )
                  if (isEmail) return (
                    <li key={link}>
                      <a href={`mailto:${link}`} style={{ ...linkStyle, color: '#3B82F6', textDecoration: 'none', transition: 'color .2s' }}>{link}</a>
                    </li>
                  )
                  return (
                    <li key={link}>
                      <button
                        onClick={() => go(sectionMap[link] ?? '#')}
                        className="footer-nav-btn"
                        style={{ ...linkStyle, background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}
                      >
                        {link}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(37,99,235,.06)',
          paddingTop: '24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px',
        }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#1F2937' }}>
            © {new Date().getFullYear()} Avenoir Digital. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy Policy', 'Terms of Service'].map(l => (
              <a key={l} href="#" style={{
                fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#1F2937',
                textDecoration: 'none', transition: 'color .2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#6B7280')}
              onMouseLeave={e => (e.currentTarget.style.color = '#1F2937')}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
