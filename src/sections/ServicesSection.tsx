import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, Code2, Layers, Zap, Palette, ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import ServiceModal from '@/components/ServiceModal'
import type { ServiceDetail } from '@/components/ServiceModal'

/* ── Marquee ── */
const MARQUEE_ITEMS = ['Web Development', 'AI Automation', 'SaaS Platforms', 'Product Design', 'API Integration', 'Performance Optimisation', 'Logo & Poster Design']
const MarqueeStrip: React.FC = () => {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div
      className="relative overflow-hidden border-y border-[rgba(62,143,168,.07)]"
      style={{ background: '#07111F', padding: '14px 0' }}
      aria-hidden="true"
    >
      {/* edge fades */}
      <div style={{ position: 'absolute', inset: '0 auto 0 0', width: 80, background: 'linear-gradient(90deg,#07111F,transparent)', zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: '0 0 0 auto', width: 80, background: 'linear-gradient(270deg,#07111F,transparent)', zIndex: 1, pointerEvents: 'none' }} />

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
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#3E8FA8', opacity: .45, flexShrink: 0 }} />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Full service detail data ── */
const services: ServiceDetail[] = [
  {
    id: 'ai',
    icon: Bot,
    title: 'AI Development',
    desc: 'Custom AI solutions, LLM integrations and intelligent automation systems.',
    img: '/service_ai_bg.png',
    tagline: 'We build intelligent systems that think, learn, and act — giving your business an unfair competitive advantage through AI.',
    what: 'From custom large language model (LLM) integrations to full AI-powered pipelines, we design and engineer AI systems tailored to your exact business workflow. No off-the-shelf tools — everything is purpose-built for maximum ROI.',
    deliverables: [
      'Custom LLM integrations (OpenAI, Claude, Gemini)',
      'AI-powered chatbots & virtual assistants',
      'Intelligent document processing & summarization',
      'Recommendation engines & predictive analytics',
      'RAG (Retrieval-Augmented Generation) systems',
      'AI API design, deployment & monitoring',
    ],
    stack: ['OpenAI', 'LangChain', 'Python', 'FastAPI', 'Pinecone', 'Supabase', 'Vercel AI SDK'],
    highlight: 'Businesses using our AI systems report 40–70% reduction in manual processing time within the first 60 days.',
    stat: { value: '70%', label: 'Time Saved' },
  },
  {
    id: 'web',
    icon: Code2,
    title: 'Web Development',
    desc: 'High-performance websites and web applications built with modern technologies.',
    img: '/service_web_bg.png',
    tagline: 'We craft blazing-fast, conversion-optimised websites and web apps that don\'t just look stunning — they perform.',
    what: 'Our web development goes beyond templates. We architect scalable, SEO-ready, pixel-perfect digital experiences — from landing pages to complex multi-page applications — all built with the latest modern stack and optimised for speed, performance, and growth.',
    deliverables: [
      'Custom responsive website design & development',
      'React / Next.js web applications',
      'SEO-optimised structure & Core Web Vitals tuning',
      'CMS integration (Sanity, Contentful, Strapi)',
      'Performance audits & speed optimisation',
      'Ongoing maintenance & feature development',
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    highlight: 'Every site we ship scores 90+ on Google PageSpeed — because speed is conversion.',
    stat: { value: '90+', label: 'PageSpeed Score' },
  },
  {
    id: 'saas',
    icon: Layers,
    title: 'SaaS Development',
    desc: 'Scalable SaaS platforms that are secure, reliable and built for growth.',
    img: '/service_saas_bg.png',
    tagline: 'We build full-stack SaaS products from zero — authentication, billing, dashboards, and everything in between.',
    what: 'Turning your SaaS idea into a market-ready product requires deep engineering expertise. We handle every layer — from database architecture and auth systems to subscription billing, admin dashboards, and API design — so you can focus on growth.',
    deliverables: [
      'Full-stack SaaS product architecture & build',
      'Auth systems (Clerk, NextAuth, Supabase Auth)',
      'Stripe billing, subscriptions & webhook handling',
      'Multi-tenant database design',
      'Admin dashboards & analytics panels',
      'API design, documentation & rate limiting',
    ],
    stack: ['Next.js', 'Supabase', 'PostgreSQL', 'Stripe', 'Clerk', 'Prisma', 'Railway'],
    highlight: 'We\'ve helped founders go from idea to launched SaaS in under 8 weeks — fully production-ready.',
    stat: { value: '8wk', label: 'Avg. Launch Time' },
  },
  {
    id: 'auto',
    icon: Zap,
    title: 'Automation Systems',
    desc: 'Workflow automation, API integrations and custom business solutions.',
    img: '/service_auto_bg.png',
    tagline: 'We eliminate repetitive work by building intelligent automations that run your business processes 24/7 — without you lifting a finger.',
    what: 'Whether it\'s connecting your CRM to your email platform, auto-generating reports, scraping data, or building end-to-end workflow bots — we design and deploy custom automation systems that save your team hundreds of hours every month.',
    deliverables: [
      'End-to-end workflow automation design & build',
      'API integrations between any platforms',
      'Web scraping & data pipeline automation',
      'Zapier / Make alternatives — fully custom',
      'Automated reporting & notification systems',
      'CRM, Slack, email & calendar integrations',
    ],
    stack: ['Python', 'Node.js', 'Make', 'n8n', 'Playwright', 'REST APIs', 'Webhooks'],
    highlight: 'Our automations typically save clients 20–50 hours of manual work per week — every single week.',
    stat: { value: '50hr', label: 'Weekly Saved' },
  },
  {
    id: 'design',
    icon: Palette,
    title: 'Logo & Poster Design',
    desc: 'Distinctive brand identities and stunning visual designs that make your brand unforgettable.',
    img: '/service_design_bg.png',
    tagline: 'Your brand\'s first impression is everything. We create premium visual identities that command attention and build instant trust.',
    what: 'Great design is a business asset. Our designers craft logos, brand systems, and marketing collateral that are strategically aligned with your brand values — ensuring you stand out in any market, on any medium.',
    deliverables: [
      'Primary logo design + alternate variations',
      'Full brand identity system & style guide',
      'Business cards, letterheads & stationery',
      'Social media banners & post templates',
      'Marketing posters & print-ready designs',
      'Pitch deck & presentation design',
    ],
    stack: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'Canva Pro'],
    highlight: 'A strong brand identity increases perceived value by up to 23× — we make sure yours delivers.',
    stat: { value: '23×', label: 'Brand Value Lift' },
  },
]

const ServicesSection: React.FC = () => {
  const [activeService, setActiveService] = useState<ServiceDetail | null>(null)

  const scrollContact = () =>
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <>
      <MarqueeStrip />

      <section
        id="services"
        style={{ position: 'relative', background: '#07111F', padding: '88px 0', overflow: 'hidden' }}
        aria-labelledby="services-h2"
      >
        {/* bg glow */}
        <div style={{
          position: 'absolute', top: 0, right: 0, width: 420, height: 420,
          background: 'radial-gradient(ellipse, rgba(62,143,168,.04) 0%, transparent 65%)',
          filter: 'blur(80px)', pointerEvents: 'none',
        }} aria-hidden="true" />

        <div className="section-container">
          {/* Header row */}
          <div className="services-header">
            <div>
              <ScrollReveal animation="fadeUp">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                  <span style={{ width: '32px', height: '1px', background: 'linear-gradient(90deg, #3E8FA8, rgba(62,143,168,0.3))', flexShrink: 0 }} />
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.26em',
                    textTransform: 'uppercase',
                    color: '#3E8FA8',
                  }}>What We Do</span>
                </div>
              </ScrollReveal>
              <ScrollReveal animation="fadeUp" delay={0.07}>
                <h2
                  id="services-h2"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(1.8rem, 3.2vw, 3rem)',
                    fontWeight: 700, color: '#F0EAE4', lineHeight: 1.1,
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
                  letterSpacing: '.1em', textTransform: 'uppercase', color: '#3E8FA8',
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
                    whileHover={{ y: -4, borderColor: 'rgba(62,143,168,.28)', boxShadow: '0 0 44px rgba(62,143,168,.06)' }}
                    transition={{ duration: .3, ease: [.22, 1, .36, 1] }}
                    role="article"
                  >
                    {/* ── Visible photo header ── */}
                    {s.img && (
                      <div className="service-card-photo" aria-hidden="true">
                        <img
                          src={s.img}
                          alt=""
                          className="service-card-photo-img"
                        />
                        {/* Teal tint overlay so photo feels on-brand */}
                        <div className="service-card-photo-tint" />
                      </div>
                    )}

                    {/* ── Content below the photo ── */}
                    <div className="service-card-body">
                      {/* Icon */}
                      <div className="icon-box" style={{ marginBottom: '16px' }}>
                        <Icon size={19} style={{ color: '#3E8FA8' }} />
                      </div>

                      {/* Title */}
                      <h3 style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: '17px', fontWeight: 700, color: '#F0EAE4',
                        marginBottom: '10px', lineHeight: 1.3,
                        transition: 'color .3s ease',
                      }}>
                        {s.title}
                      </h3>

                      {/* Description */}
                      <p style={{
                        fontFamily: 'Inter, sans-serif', fontSize: '13px',
                        color: '#AECCD9', lineHeight: 1.7, flex: 1, marginBottom: '20px',
                      }}>
                        {s.desc}
                      </p>

                      {/* Learn more — now opens modal */}
                      <button
                        onClick={() => setActiveService(s)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 6,
                          fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600,
                          letterSpacing: '.1em', textTransform: 'uppercase', color: '#3E8FA8',
                          background: 'none', border: 'none', cursor: 'pointer',
                          transition: 'color .2s ease',
                        }}
                      >
                        Learn More <ArrowRight size={11} />
                      </button>
                    </div>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Premium Service Detail Modal */}
      <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
    </>
  )
}

export default ServicesSection
