import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'

/* ─── FAQ Data ─── */
const faqs = [
  {
    q: 'What does Avenoir do?',
    a: 'Avenoir is a private product design and engineering studio. We build custom digital products — from high-performance websites and SaaS platforms to AI-powered automation systems — for forward-thinking companies that refuse to accept average.',
  },
  {
    q: 'What services do you offer?',
    a: 'We offer four core services: AI Development (custom LLM integrations and intelligent automation), Web Development (modern, high-performance sites and apps), SaaS Development (scalable, secure platforms built for growth), and Automation Systems (workflow automation and API integrations).',
  },
  {
    q: 'What do clients get when working with Avenoir?',
    a: 'Every client receives our complete, undivided focus. We cap active intake to four concurrent projects so your product is never an afterthought. You get end-to-end ownership — strategy, design, engineering, and delivery — all under one roof.',
  },
  {
    q: 'How does the project process work?',
    a: 'We start with a discovery call to understand your goals, then move into design and architecture planning. From there, our engineering team builds, tests, and iterates with you at every milestone. We operate transparently — no black boxes, no surprises.',
  },
  {
    q: 'Do you work with startups and early-stage companies?',
    a: 'Yes. We specifically serve forward-thinking enterprises and startups who value performance and aesthetics equally. Whether you need an MVP, a full product rebuild, or intelligent automation to scale operations, we tailor our scope to your stage.',
  },
]

/* ─── FAQ Item ─── */
const FAQItem: React.FC<{ faq: { q: string; a: string }; index: number }> = ({ faq, index }) => {
  const [open, setOpen] = useState(false)

  return (
    <ScrollReveal animation="fadeUp" delay={index * 0.07}>
      <div className={`about-faq-item${open ? ' about-faq-item--open' : ''}`}>
        <button
          className="about-faq-trigger"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          id={`faq-btn-${index}`}
          aria-controls={`faq-panel-${index}`}
        >
          <span className="about-faq-q">{faq.q}</span>
          <span className="about-faq-icon" aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
            <ChevronDown size={16} />
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-btn-${index}`}
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <p className="about-faq-a">{faq.a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  )
}

/* ─── Component ─── */
const AboutSection: React.FC = () => {

  return (
    <section
      id="about"
      className="about-section"
      aria-labelledby="about-title"
    >
      {/* ── Background atmosphere — blue ── */}
      <div className="about-bg" aria-hidden="true">
        <div className="about-bg-glow-left"  />
        <div className="about-bg-glow-right" />
        <div className="about-bg-line about-bg-line--left"  />
        <div className="about-bg-line about-bg-line--right" />
      </div>

      <div className="section-container about-container">

        {/* ══ TOP: Editorial header row ══ */}
        <div className="about-header">
          <ScrollReveal animation="fadeUp">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '14px', marginBottom: '1.2rem' }}>
              <span style={{ width: '28px', height: '1px', background: 'linear-gradient(90deg, #2563EB, rgba(59,130,246,0.3))', flexShrink: 0 }} />
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: '#60A5FA',
              }}>Studio Thesis</span>
            </div>
          </ScrollReveal>

          <div className="about-header-grid">
            {/* Left — Headline */}
            <ScrollReveal animation="fadeUp" delay={0.06}>
              <h2
                id="about-title"
                className="about-headline"
              >
                We engineer complexity<br className="about-headline-break" />
                into{' '}
                {/* Gold gradient — premium keyword emphasis */}
                <span className="text-gold">pure performance.</span>
              </h2>
            </ScrollReveal>

            {/* Right — Body + CTA */}
            <div className="about-header-right">
              <ScrollReveal animation="fadeUp" delay={0.12}>
                <p className="about-body">
                  Avenoir is a private product design and engineering studio.
                  We operate at the intersection of aesthetic authority and structural
                  engineering — building custom digital products for forward-thinking
                  enterprises that refuse to accept average.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* ══ DIVIDER ══ */}
        <div className="divider about-divider" />

        {/* ══ FAQ Accordion ══ */}
        <div className="about-faq">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>

        {/* ══ DIVIDER ══ */}
        <div className="divider about-divider" />

        {/* ══ QUOTE BLOCK ══ */}
        <ScrollReveal animation="fadeUp" delay={0.08}>
          <div className="about-quote">
            <div className="about-quote-inner">
              <div className="about-quote-mark">"</div>
              <div className="about-quote-content">
                <blockquote className="about-quote-text">
                  Complexity is easy. Simplicity is the hardest work of all.
                </blockquote>
                {/* Gold cite — prestige brand accent */}
                <cite className="about-quote-cite">— Avenoir Studio Creed</cite>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}

export default AboutSection
