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

// Unique placeholder visuals using CSS gradients + patterns
const placeholderVisuals = [
  {
    bg: 'linear-gradient(135deg, #1a1200 0%, #2a1f00 40%, #0B0B0B 100%)',
    accent: 'rgba(62,143,168,0.12)',
    pattern: 'grid',
  },
  {
    bg: 'linear-gradient(225deg, #0B0B0B 0%, #1a1200 50%, #050505 100%)',
    accent: 'rgba(62,143,168,0.08)',
    pattern: 'dots',
  },
  {
    bg: 'linear-gradient(45deg, #050505 0%, #1a1200 60%, #2a1f00 100%)',
    accent: 'rgba(62,143,168,0.1)',
    pattern: 'lines',
  },
  {
    bg: 'linear-gradient(315deg, #0B0B0B 0%, #1a1200 40%, #050505 100%)',
    accent: 'rgba(62,143,168,0.09)',
    pattern: 'grid',
  },
]

const ProjectCard: React.FC<{
  project: typeof projects[0]
  visual: typeof placeholderVisuals[0]
  index: number
}> = ({ project, visual, index }) => {
  return (
    <motion.article
      className="group relative rounded-2xl overflow-hidden border border-[rgba(62,143,168,0.1)] cursor-pointer"
      style={{ background: '#0B0B0B' }}
      whileHover={{
        borderColor: 'rgba(62,143,168,0.35)',
        boxShadow: '0 0 60px rgba(62,143,168,0.1)',
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
        {/* Grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: visual.pattern === 'grid'
              ? `linear-gradient(${visual.accent} 1px, transparent 1px), linear-gradient(90deg, ${visual.accent} 1px, transparent 1px)`
              : visual.pattern === 'dots'
              ? `radial-gradient(circle, ${visual.accent} 1px, transparent 1px)`
              : `repeating-linear-gradient(45deg, ${visual.accent} 0, ${visual.accent} 1px, transparent 0, transparent 50%)`,
            backgroundSize: visual.pattern === 'grid' ? '40px 40px'
              : visual.pattern === 'dots' ? '24px 24px'
              : '12px 12px',
          }}
          aria-hidden="true"
        />

        {/* Central glow orb */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(62,143,168,0.2) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
          aria-hidden="true"
        />

        {/* Category pill */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-[10px] font-body font-semibold tracking-[0.15em] uppercase text-[#3E8FA8] bg-[rgba(62,143,168,0.1)] border border-[rgba(62,143,168,0.2)]">
            {project.category}
          </span>
        </div>

        {/* Hover overlay with external link */}
        <div className="absolute inset-0 bg-[rgba(5,5,5,0.6)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div
            className="w-12 h-12 rounded-full border border-[#3E8FA8] flex items-center justify-center text-[#3E8FA8]"
            style={{ boxShadow: '0 0 30px rgba(62,143,168,0.3)' }}
            aria-hidden="true"
          >
            <ExternalLink size={18} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-white text-xl mb-2 group-hover:text-[#7DC8E0] transition-colors duration-300">
          {project.label}
        </h3>
        <p className="text-[#AECCD9] text-sm font-body leading-relaxed mb-5 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5" aria-label="Technologies used">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md text-[10px] font-body font-medium tracking-wide text-[#AECCD9] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <span className="flex items-center gap-1.5 text-[#3E8FA8] text-xs font-body font-medium group-hover:gap-2.5 transition-all duration-300">
          View Case Study <ArrowRight size={13} />
        </span>
      </div>
    </motion.article>
  )
}

const WorkSection: React.FC = () => {
  return (
    <section
      id="work"
      className="relative py-28 md:py-36 bg-[#0B0B0B] overflow-hidden"
      aria-labelledby="work-title"
    >
      {/* Subtle top divider glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(62,143,168,0.2), transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <ScrollReveal animation="fadeUp">
              <div className="inline-flex items-center gap-3.5 mb-4">
                <span className="w-8 h-px bg-gradient-to-r from-[#3E8FA8] to-[rgba(62,143,168,0.3)] shrink-0" />
                <span className="text-[#3E8FA8] text-xs font-body font-medium tracking-[0.2em] uppercase">
                  Our Work
                </span>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fadeUp" delay={0.1}>
              <h2
                id="work-title"
                className="font-display text-white text-[clamp(2rem,4vw,3.5rem)] leading-tight"
              >
                Digital products
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #3E8FA8 0%, #7DC8E0 50%, #3E8FA8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
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
              className="flex items-center gap-2 text-[#3E8FA8] hover:text-[#7DC8E0] text-sm font-body font-medium tracking-wide transition-colors duration-200 group cursor-pointer bg-transparent border-0 py-2 px-1 whitespace-nowrap"
            >
              View All Work
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </ScrollReveal>
        </div>

        {/* Projects Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          role="list"
          aria-label="Selected work"
        >
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} animation="fadeUp" delay={i * 0.1} role="listitem">
              <ProjectCard project={project} visual={placeholderVisuals[i]} index={i} />
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal animation="fadeUp" delay={0.2}>
          <div className="mt-16 text-center">
            <p className="text-[#AECCD9] font-body text-sm mb-6">
              Ready to be our next success story?
            </p>
            <button
              onClick={() => {
                const el = document.querySelector('#contact')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[rgba(62,143,168,0.3)] text-[#3E8FA8] hover:bg-[rgba(62,143,168,0.06)] hover:border-[rgba(62,143,168,0.5)] text-sm font-body font-medium tracking-wide transition-all duration-300 cursor-pointer bg-transparent"
            >
              Start Your Project <ArrowRight size={16} />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default WorkSection
