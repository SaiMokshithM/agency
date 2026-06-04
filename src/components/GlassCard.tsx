import React from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  glowOnHover?: boolean
  onClick?: () => void
  role?: string
}

const GlassCard: React.FC<CardProps> = ({
  children,
  className = '',
  glowOnHover = true,
  onClick,
  role,
}) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!glowOnHover) return
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const background = useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(212,175,55,0.08), transparent 80%)`

  return (
    <motion.div
      role={role}
      className={`relative overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.12)] bg-[#0B0B0B] ${className}`}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      whileHover={glowOnHover ? {
        borderColor: 'rgba(212,175,55,0.35)',
        boxShadow: '0 0 40px rgba(212,175,55,0.12)',
      } : {}}
      transition={{ duration: 0.3 }}
    >
      {/* Spotlight effect */}
      {glowOnHover && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0"
          style={{ background }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        />
      )}
      {children}
    </motion.div>
  )
}

export default GlassCard
