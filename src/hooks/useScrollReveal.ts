import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export type RevealAnimation = 'fadeUp' | 'fadeIn' | 'scaleIn' | 'slideLeft' | 'slideRight'

interface UseScrollRevealOptions {
  animation?: RevealAnimation
  delay?: number
  duration?: number
  once?: boolean
  stagger?: number
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const ref = useRef<T>(null)
  const {
    animation = 'fadeUp',
    delay = 0,
    duration = 0.9,
    once = true,
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const getFromVars = () => {
      switch (animation) {
        case 'fadeUp': return { y: 50, opacity: 0 }
        case 'fadeIn': return { opacity: 0 }
        case 'scaleIn': return { scale: 0.9, opacity: 0 }
        case 'slideLeft': return { x: -60, opacity: 0 }
        case 'slideRight': return { x: 60, opacity: 0 }
        default: return { y: 50, opacity: 0 }
      }
    }

    gsap.fromTo(
      el,
      getFromVars(),
      {
        y: 0,
        x: 0,
        scale: 1,
        opacity: 1,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once,
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === el) t.kill()
      })
    }
  }, [animation, delay, duration, once])

  return ref
}
