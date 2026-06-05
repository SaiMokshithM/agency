import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'

const projects = [
  {
    id: 'project-1',
    label: 'Your Project Here',
    category: 'Web Application',
    description:
      'This is where your next groundbreaking project will be showcased. We partner with ambitious brands to create digital experiences that define industries.',
    tags: ['React', 'TypeScript', 'Node.js'],
    aspect: 'wide',
  },
  {
    id: 'project-2',
    label: 'Case Study Placeholder',
    category: 'SaaS Platform',
    description:
      'A placeholder for an upcoming case study. Every great product starts with a vision — and a partner who can execute it at the highest level.',
    tags: ['SaaS', 'AI', 'Design'],
    aspect: 'tall',
  },
  {
    id: 'project-3',
    label: 'Project Showcase',
    category: 'AI Automation',
    description:
      'Reserved for a project that will demonstrate our capabilities in AI-driven workflow automation and intelligent system design.',
    tags: ['AI', 'Automation', 'API'],
    aspect: 'normal',
  },
  {
    id: 'project-4',
    label: 'Add Your Content',
    category: 'Product Design',
    description:
      'Your vision, brought to life. We believe in building products that stand the test of time — beautiful, functional, and built for scale.',
    tags: ['UX', 'UI Design', 'Brand'],
    aspect: 'normal',
  },
]

// Premium blue-themed placeholder visuals
const placeholderVisuals = [
  {
    bg: 'linear-gradient(135deg, #030B1A 0%, #0D1E3D 40%, #030712 100%)',
    accentColor: 'rgba(37,99,235,0.14)',
    pattern: 'grid',
    glowColor: 'rgba(37,99,235,0.22)',
  },
  {
    bg: 'linear-gradient(225deg, #030712 0%, #061428 50%, #030B1A 100%)',
    accentColor: 'rgba(59,130,246,0.1)',
    pattern: 'dots',
    glowColor: 'rgba(59,130,246,0.18)',
  },
  {
    bg: 'linear-gradient(45deg, #030712 0%, #0B1A36 60%, #0D1E3D 100%)',
    accentColor: 'rgba(96,165,250,0.1)',
    pattern: 'lines',
    glowColor: 'rgba(96,165,250,0.16)',
  },
  {
    bg: 'linear-gradient(315deg, #030B1A 0%, #061428 40%, #030712 100%)',
    accentColor: 'rgba(37,99,235,0.12)',
    pattern: 'grid',
    glowColor: 'rgba(37,99,235,0.2)',
  },
]

const ProjectCard: React.FC<{
  project: typeof projects[0]
  visual: typeof placeholderVisuals[0]
  index: number
}> = ({ project, visual, index }) => {
  return (
    <motion.article
      className="group relative overflow-hidden cursor-pointer"
      style={{
        background: '#0B1220',
        border: '1px solid rgba(37,99,235,0.12)',
        borderRadius: '16px',
      }}
      whileHover={{
        borderColor: 'rgba(59,130,246,0.38)',
        boxShadow: '0 0 64px rgba(37,99,235,0.12)',
        y: -4,
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      aria-label={project.label}
    >
      {/* Visual Area */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: index === 0 ? '280px' : '220px', background: visual.bg }}
      >
        {/* Pattern overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: visual.pattern === 'grid'
              ? `linear-gradient(${visual.accentColor} 1px, transparent 1px), linear-gradient(90deg, ${visual.accentColor} 1px, transparent 1px)`
              : visual.pattern === 'dots'
              ? `radial-gradient(circle, ${visual.accentColor} 1.5px, transparent 1.5px)`
              : `repeating-linear-gradient(45deg, ${visual.accentColor} 0, ${visual.accentColor} 1px, transparent 0, transparent 50%)`,
            backgroundSize: visual.pattern === 'grid' ? '44px 44px'
              : visual.pattern === 'dots' ? '26px 26px'
              : '14px 14px',
          }}
          aria-hidden="true"
        />

        {/* Central blue glow orb */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full"
          style={{
            background: `radial-gradient(ellipse, ${visual.glowColor} 0%, transparent 70%)`,
            filter: 'blur(28px)',
          }}
          aria-hidden="true"
        />

        {/* Subtle grid-line frame detail */}
        <div style={{
          position: 'absolute',
          inset: '24px',
          border: `1px solid ${visual.accentColor}`,
          borderRadius: '8px',
          pointerEvents: 'none',
        }} aria-hidden="true" />

        {/* Top-left dot cluster — AI aesthetic */}
        <div style={{
          position: 'absolute',
          top: '18px', left: '18px',
          display: 'flex', gap: '5px',
        }} aria-hidden="true">
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: '7px', height: '7px',
              borderRadius: '50%',
              background: i === 0 ? 'rgba(59,130,246,0.6)' : i === 1 ? 'rgba(59,130,246,0.3)' : 'rgba(59,130,246,0.15)',
            }} />
          ))}
        </div>

        {/* Category pill */}
        <div className="absolute top-4 right-4">
          <span style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '10px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#60A5FA',
            background: 'rgba(37,99,235,0.12)',
            border: '1px solid rgba(59,130,246,0.22)',
          }}>
            {project.category}
          </span>
        </div>

        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          style={{ background: 'rgba(3,7,18,0.65)' }}
        >
          <div
            style={{
              width: '52px', height: '52px',
              borderRadius: '50%',
              border: '1px solid rgba(59,130,246,0.6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#60A5FA',
              boxShadow: '0 0 32px rgba(37,99,235,0.4)',
              background: 'rgba(37,99,235,0.12)',
            }}
            aria-hidden="true"
          >
            <ExternalLink size={18} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px' }}>
        <h3 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '18px',
          fontWeight: 700,
          color: '#F9FAFB',
          marginBottom: '8px',
          lineHeight: 1.3,
          transition: 'color 0.3s',
        }}
          className="group-hover:text-blue-400"
        >
          {project.label}
        </h3>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '13px',
          color: '#9CA3AF',
          lineHeight: 1.7,
          marginBottom: '18px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }} aria-label="Technologies used">
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: '3px 10px',
                borderRadius: '6px',
                fontSize: '10px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                letterSpacing: '0.05em',
                color: '#6B7280',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <span style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '11px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#3B82F6',
          transition: 'gap 0.3s',
        }}
          className="group-hover:gap-3"
        >
          View Case Study <ArrowRight size={13} />
        </span>
      </div>

      {/* Bottom accent line */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: '24px', right: '24px', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.18), transparent)',
      }} />
    </motion.article>
  )
}

const WorkSection: React.FC = () => {
  return (
    <section
      id="work"
      style={{ position: 'relative', padding: '112px 0 144px', background: '#030712', overflow: 'hidden' }}
      aria-labelledby="work-title"
    >
      {/* top divider glow — blue */}
      <div
        style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '60%', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.22), transparent)',
        }}
        aria-hidden="true"
      />

      {/* Background glows */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-5%',
        width: '45%', height: '60%',
        background: 'radial-gradient(ellipse, rgba(37,99,235,0.04) 0%, transparent 65%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} aria-hidden="true" />

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '64px' }}
          className="md:flex-row md:items-end md:justify-between"
        >
          <div>
            <ScrollReveal animation="fadeUp">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <span style={{ width: '28px', height: '1px', background: 'linear-gradient(90deg, #2563EB, rgba(59,130,246,0.3))', flexShrink: 0 }} />
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '10px', fontWeight: 600,
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: '#60A5FA',
                }}>
                  Our Work
                </span>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fadeUp" delay={0.1}>
              <h2
                id="work-title"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 700,
                  color: '#F9FAFB',
                  lineHeight: 1.1,
                }}
              >
                Digital products<br />
                {/* Gold accent — prestige emphasis */}
                <span style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #F4D03F 50%, #D4AF37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  we build
                </span>
              </h2>
            </ScrollReveal>
          </div>

          <ScrollReveal animation="fadeIn" delay={0.2}>
            <button
              onClick={() => {
                const el = document.querySelector('#contact')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                fontSize: '11px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#3B82F6',
                background: 'transparent', border: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s',
                padding: '8px 0',
              }}
            >
              View All Work
              <ArrowRight size={14} style={{ transition: 'transform 0.2s' }} />
            </button>
          </ScrollReveal>
        </div>

        {/* Projects Grid */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}
          className="grid-cols-1 md:grid-cols-2"
          role="list"
          aria-label="Selected work"
        >
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} animation="fadeUp" delay={i * 0.1}>
              <div role="listitem">
                <ProjectCard project={project} visual={placeholderVisuals[i]} index={i} />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal animation="fadeUp" delay={0.2}>
          <div style={{ marginTop: '64px', textAlign: 'center' }}>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              color: '#6B7280',
              marginBottom: '24px',
            }}>
              Ready to be our next success story?
            </p>
            <button
              onClick={() => {
                const el = document.querySelector('#contact')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 32px',
                borderRadius: '8px',
                border: '1px solid rgba(37,99,235,0.3)',
                color: '#3B82F6',
                fontSize: '11px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: 'transparent',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.background = 'rgba(37,99,235,0.08)'
                el.style.borderColor = 'rgba(59,130,246,0.55)'
                el.style.boxShadow = '0 0 24px rgba(37,99,235,0.15)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.background = 'transparent'
                el.style.borderColor = 'rgba(37,99,235,0.3)'
                el.style.boxShadow = 'none'
              }}
            >
              Start Your Project <ArrowRight size={14} />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default WorkSection
