import React, { useRef, useEffect } from 'react'
import { motion, useAnimationFrame, useMotionValue, useSpring } from 'framer-motion'

interface GoldSphereProps {
  className?: string
}

const GoldSphere: React.FC<GoldSphereProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const size = canvas.offsetWidth
    canvas.width = size * window.devicePixelRatio
    canvas.height = size * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const cx = size / 2
    const cy = size / 2
    const radius = size * 0.38

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - rect.left - cx) / cx,
        y: (e.clientY - rect.top - cy) / cy,
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    const particles: Array<{
      angle: number; elevation: number; speed: number; opacity: number; size: number; life: number; maxLife: number
    }> = Array.from({ length: 60 }, () => ({
      angle: Math.random() * Math.PI * 2,
      elevation: (Math.random() - 0.5) * Math.PI,
      speed: 0.002 + Math.random() * 0.004,
      opacity: Math.random(),
      size: 0.5 + Math.random() * 2,
      life: Math.random() * 100,
      maxLife: 60 + Math.random() * 80,
    }))

    const render = (t: number) => {
      timeRef.current = t * 0.001
      const time = timeRef.current
      const mx = mouseRef.current.x * 0.08
      const my = mouseRef.current.y * 0.08

      ctx.clearRect(0, 0, size, size)

      // Outer glow layers
      for (let g = 3; g >= 0; g--) {
        const glowR = radius + g * 22
        const grd = ctx.createRadialGradient(cx, cy, radius * 0.5, cx, cy, glowR)
        grd.addColorStop(0, `rgba(212,175,55,${0.08 - g * 0.018})`)
        grd.addColorStop(1, 'rgba(212,175,55,0)')
        ctx.beginPath()
        ctx.arc(cx, cy, glowR, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()
      }

      // Base sphere gradient
      const sphereGrd = ctx.createRadialGradient(
        cx - radius * 0.3 + mx * 20,
        cy - radius * 0.3 + my * 20,
        radius * 0.05,
        cx,
        cy,
        radius
      )
      sphereGrd.addColorStop(0, '#F4D67A')
      sphereGrd.addColorStop(0.2, '#D4AF37')
      sphereGrd.addColorStop(0.5, '#9A7D20')
      sphereGrd.addColorStop(0.8, '#4A3C0A')
      sphereGrd.addColorStop(1, '#1A1500')

      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fillStyle = sphereGrd
      ctx.fill()

      // Surface sheen
      const sheenGrd = ctx.createRadialGradient(
        cx - radius * 0.35 + mx * 15,
        cy - radius * 0.4 + my * 15,
        0,
        cx - radius * 0.2,
        cy - radius * 0.2,
        radius * 0.7
      )
      sheenGrd.addColorStop(0, 'rgba(255,255,220,0.55)')
      sheenGrd.addColorStop(0.4, 'rgba(244,214,122,0.18)')
      sheenGrd.addColorStop(1, 'rgba(244,214,122,0)')

      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.clip()
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fillStyle = sheenGrd
      ctx.fill()
      ctx.restore()

      // Orbiting ring 1
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(time * 0.25 + mx)
      ctx.scale(1, 0.32)
      const ringGrd1 = ctx.createLinearGradient(-radius * 1.3, 0, radius * 1.3, 0)
      ringGrd1.addColorStop(0, 'rgba(212,175,55,0)')
      ringGrd1.addColorStop(0.25, 'rgba(212,175,55,0.6)')
      ringGrd1.addColorStop(0.5, 'rgba(244,214,122,0.9)')
      ringGrd1.addColorStop(0.75, 'rgba(212,175,55,0.6)')
      ringGrd1.addColorStop(1, 'rgba(212,175,55,0)')
      ctx.beginPath()
      ctx.ellipse(0, 0, radius * 1.45, radius * 1.45, 0, 0, Math.PI * 2)
      ctx.strokeStyle = ringGrd1
      ctx.lineWidth = 2.5
      ctx.stroke()
      ctx.restore()

      // Orbiting ring 2
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(-time * 0.18 + my * 0.5)
      ctx.scale(0.35, 1)
      const ringGrd2 = ctx.createLinearGradient(0, -radius * 1.25, 0, radius * 1.25)
      ringGrd2.addColorStop(0, 'rgba(212,175,55,0)')
      ringGrd2.addColorStop(0.3, 'rgba(212,175,55,0.4)')
      ringGrd2.addColorStop(0.5, 'rgba(244,214,122,0.7)')
      ringGrd2.addColorStop(0.7, 'rgba(212,175,55,0.4)')
      ringGrd2.addColorStop(1, 'rgba(212,175,55,0)')
      ctx.beginPath()
      ctx.ellipse(0, 0, radius * 1.3, radius * 1.3, 0, 0, Math.PI * 2)
      ctx.strokeStyle = ringGrd2
      ctx.lineWidth = 1.5
      ctx.stroke()
      ctx.restore()

      // Floating particles
      particles.forEach(p => {
        p.life += p.speed * 60
        if (p.life > p.maxLife) {
          p.life = 0
          p.angle = Math.random() * Math.PI * 2
          p.elevation = (Math.random() - 0.5) * Math.PI
        }

        const progress = p.life / p.maxLife
        const drift = progress * 80

        const px = cx + Math.cos(p.angle) * (radius + drift) * Math.cos(p.elevation)
        const py = cy + Math.sin(p.elevation) * (radius + drift) + time * 2

        const alpha = Math.sin(progress * Math.PI) * 0.8

        ctx.beginPath()
        ctx.arc(px % size, py % size, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212,175,55,${alpha})`
        ctx.fill()
      })

      // Inner reflection dot
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.clip()
      const dotGrd = ctx.createRadialGradient(
        cx - radius * 0.55 + mx * 10,
        cy - radius * 0.55 + my * 10,
        0,
        cx - radius * 0.55 + mx * 10,
        cy - radius * 0.55 + my * 10,
        radius * 0.2
      )
      dotGrd.addColorStop(0, 'rgba(255,255,240,0.9)')
      dotGrd.addColorStop(0.5, 'rgba(255,255,220,0.3)')
      dotGrd.addColorStop(1, 'rgba(255,255,220,0)')
      ctx.fillStyle = dotGrd
      ctx.fillRect(0, 0, size, size)
      ctx.restore()

      animFrameRef.current = requestAnimationFrame(render)
    }

    animFrameRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
          transform: 'scale(1.4)',
        }}
        aria-hidden="true"
      />
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ borderRadius: '50%' }}
        aria-label="Decorative 3D gold sphere animation"
        role="img"
      />
    </div>
  )
}

export default GoldSphere
