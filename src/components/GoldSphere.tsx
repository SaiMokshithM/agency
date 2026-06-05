import React, { useRef, useEffect } from 'react'

interface BlueSphereProps {
  className?: string
}

const GoldSphere: React.FC<BlueSphereProps> = ({ className = '' }) => {
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
    const radius = size * 0.36

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - rect.left - cx) / cx,
        y: (e.clientY - rect.top - cy) / cy,
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Floating particles — premium blue
    const particles: Array<{
      angle: number; elevation: number; speed: number; opacity: number; size: number; life: number; maxLife: number
    }> = Array.from({ length: 55 }, () => ({
      angle: Math.random() * Math.PI * 2,
      elevation: (Math.random() - 0.5) * Math.PI,
      speed: 0.002 + Math.random() * 0.004,
      opacity: Math.random(),
      size: 0.5 + Math.random() * 1.8,
      life: Math.random() * 100,
      maxLife: 60 + Math.random() * 80,
    }))

    // AI network nodes
    const nodes: Array<{ x: number; y: number; vx: number; vy: number; r: number }> = Array.from(
      { length: 18 },
      () => {
        const a = Math.random() * Math.PI * 2
        const d = radius * (0.45 + Math.random() * 0.55)
        return {
          x: cx + Math.cos(a) * d,
          y: cy + Math.sin(a) * d * 0.5,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: 1.2 + Math.random() * 2,
        }
      }
    )

    const render = (t: number) => {
      timeRef.current = t * 0.001
      const time = timeRef.current
      const mx = mouseRef.current.x * 0.08
      const my = mouseRef.current.y * 0.08

      ctx.clearRect(0, 0, size, size)

      // ── Outer glow layers (blue)
      for (let g = 4; g >= 0; g--) {
        const glowR = radius + g * 20
        const grd = ctx.createRadialGradient(cx, cy, radius * 0.4, cx, cy, glowR)
        grd.addColorStop(0, `rgba(37,99,235,${0.09 - g * 0.016})`)
        grd.addColorStop(0.5, `rgba(59,130,246,${0.04 - g * 0.006})`)
        grd.addColorStop(1, 'rgba(37,99,235,0)')
        ctx.beginPath()
        ctx.arc(cx, cy, glowR, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()
      }

      // ── Base sphere — deep navy-blue gradient
      const sphereGrd = ctx.createRadialGradient(
        cx - radius * 0.3 + mx * 20,
        cy - radius * 0.3 + my * 20,
        radius * 0.04,
        cx,
        cy,
        radius
      )
      sphereGrd.addColorStop(0, '#93C5FD')      // light blue highlight
      sphereGrd.addColorStop(0.18, '#3B82F6')   // secondary blue
      sphereGrd.addColorStop(0.45, '#1D4ED8')   // primary blue
      sphereGrd.addColorStop(0.72, '#1E3A5F')   // deep blue
      sphereGrd.addColorStop(0.9, '#0B1220')    // near-black surface
      sphereGrd.addColorStop(1, '#030712')      // bg

      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fillStyle = sphereGrd
      ctx.fill()

      // ── Atmospheric surface sheen
      const sheenGrd = ctx.createRadialGradient(
        cx - radius * 0.38 + mx * 14,
        cy - radius * 0.42 + my * 14,
        0,
        cx - radius * 0.18,
        cy - radius * 0.2,
        radius * 0.75
      )
      sheenGrd.addColorStop(0, 'rgba(219,234,254,0.52)')   // white-blue specular
      sheenGrd.addColorStop(0.35, 'rgba(147,197,253,0.15)')
      sheenGrd.addColorStop(1, 'rgba(96,165,250,0)')

      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.clip()
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fillStyle = sheenGrd
      ctx.fill()

      // ── Internal AI grid pattern (subtle)
      ctx.globalAlpha = 0.06 + 0.02 * Math.sin(time * 0.8)
      const gridSpacing = radius * 0.28
      ctx.strokeStyle = 'rgba(147,197,253,1)'
      ctx.lineWidth = 0.5
      for (let gx = -radius; gx <= radius; gx += gridSpacing) {
        ctx.beginPath()
        ctx.moveTo(cx + gx, cy - radius)
        ctx.lineTo(cx + gx, cy + radius)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx - radius, cy + gx)
        ctx.lineTo(cx + radius, cy + gx)
        ctx.stroke()
      }
      ctx.globalAlpha = 1
      ctx.restore()

      // ── Orbiting ring 1 (primary blue)
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(time * 0.22 + mx)
      ctx.scale(1, 0.3)
      const ringGrd1 = ctx.createLinearGradient(-radius * 1.35, 0, radius * 1.35, 0)
      ringGrd1.addColorStop(0, 'rgba(37,99,235,0)')
      ringGrd1.addColorStop(0.25, 'rgba(37,99,235,0.55)')
      ringGrd1.addColorStop(0.5, 'rgba(96,165,250,0.88)')
      ringGrd1.addColorStop(0.75, 'rgba(37,99,235,0.55)')
      ringGrd1.addColorStop(1, 'rgba(37,99,235,0)')
      ctx.beginPath()
      ctx.ellipse(0, 0, radius * 1.48, radius * 1.48, 0, 0, Math.PI * 2)
      ctx.strokeStyle = ringGrd1
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.restore()

      // ── Orbiting ring 2 (accent, subtle)
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(-time * 0.16 + my * 0.5)
      ctx.scale(0.3, 1)
      const ringGrd2 = ctx.createLinearGradient(0, -radius * 1.28, 0, radius * 1.28)
      ringGrd2.addColorStop(0, 'rgba(59,130,246,0)')
      ringGrd2.addColorStop(0.3, 'rgba(59,130,246,0.38)')
      ringGrd2.addColorStop(0.5, 'rgba(96,165,250,0.65)')
      ringGrd2.addColorStop(0.7, 'rgba(59,130,246,0.38)')
      ringGrd2.addColorStop(1, 'rgba(59,130,246,0)')
      ctx.beginPath()
      ctx.ellipse(0, 0, radius * 1.32, radius * 1.32, 0, 0, Math.PI * 2)
      ctx.strokeStyle = ringGrd2
      ctx.lineWidth = 1.2
      ctx.stroke()
      ctx.restore()

      // ── Gold accent ring (subtle, luxury touch — 10-15% gold rule)
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(time * 0.09)
      ctx.scale(0.95, 0.18)
      const goldRing = ctx.createLinearGradient(-radius * 1.6, 0, radius * 1.6, 0)
      goldRing.addColorStop(0, 'rgba(212,175,55,0)')
      goldRing.addColorStop(0.45, 'rgba(212,175,55,0.22)')
      goldRing.addColorStop(0.55, 'rgba(244,208,63,0.35)')
      goldRing.addColorStop(1, 'rgba(212,175,55,0)')
      ctx.beginPath()
      ctx.ellipse(0, 0, radius * 1.62, radius * 1.62, 0, 0, Math.PI * 2)
      ctx.strokeStyle = goldRing
      ctx.lineWidth = 1.5
      ctx.stroke()
      ctx.restore()

      // ── Floating blue particles
      particles.forEach(p => {
        p.life += p.speed * 60
        if (p.life > p.maxLife) {
          p.life = 0
          p.angle = Math.random() * Math.PI * 2
          p.elevation = (Math.random() - 0.5) * Math.PI
        }

        const progress = p.life / p.maxLife
        const drift = progress * 75
        const px = cx + Math.cos(p.angle) * (radius + drift) * Math.cos(p.elevation)
        const py = cy + Math.sin(p.elevation) * (radius + drift) + time * 1.8
        const alpha = Math.sin(progress * Math.PI) * 0.75

        ctx.beginPath()
        ctx.arc(px % size, py % size, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(96,165,250,${alpha})`
        ctx.fill()
      })

      // ── AI network node connections (outside sphere)
      nodes.forEach(n => {
        n.x += n.vx
        n.y += n.vy
        const dx = n.x - cx
        const dy = n.y - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > radius * 1.8) {
          n.vx *= -1; n.vy *= -1
        }
      })
      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach(b => {
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 90) {
            const alpha = (1 - d / 90) * 0.18
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(59,130,246,${alpha})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        })
        // draw node dot
        const dFromCenter = Math.sqrt((a.x - cx) ** 2 + (a.y - cy) ** 2)
        if (dFromCenter > radius) {
          const nodeAlpha = Math.min(0.7, (dFromCenter - radius) / 60)
          ctx.beginPath()
          ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(96,165,250,${nodeAlpha})`
          ctx.fill()
        }
      })

      // ── Inner specular dot
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.clip()
      const dotGrd = ctx.createRadialGradient(
        cx - radius * 0.52 + mx * 10,
        cy - radius * 0.52 + my * 10,
        0,
        cx - radius * 0.52 + mx * 10,
        cy - radius * 0.52 + my * 10,
        radius * 0.22
      )
      dotGrd.addColorStop(0, 'rgba(219,234,254,0.88)')
      dotGrd.addColorStop(0.5, 'rgba(147,197,253,0.28)')
      dotGrd.addColorStop(1, 'rgba(147,197,253,0)')
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
      {/* Ambient blue glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.18) 0%, rgba(37,99,235,0.06) 45%, transparent 70%)',
          filter: 'blur(40px)',
          transform: 'scale(1.45)',
        }}
        aria-hidden="true"
      />
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ borderRadius: '50%' }}
        aria-label="Decorative 3D AI sphere animation"
        role="img"
      />
    </div>
  )
}

export default GoldSphere
