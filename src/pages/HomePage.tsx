import React, { Suspense, lazy, useEffect } from 'react'
import MainLayout from '@/layouts/MainLayout'
import HeroSection from '@/sections/HeroSection'

// Lazy-load every below-fold section — only Hero is eagerly loaded
const ServicesSection = lazy(() => import('@/sections/ServicesSection'))
const ProcessSection  = lazy(() => import('@/sections/ProcessSection'))
const AboutSection    = lazy(() => import('@/sections/AboutSection'))
const CTASection      = lazy(() => import('@/sections/CTASection'))
const ContactSection  = lazy(() => import('@/sections/ContactSection'))

// Thin placeholder while a section is being fetched
const SectionFallback = () => (
  <div style={{ minHeight: '200px', background: '#07111F' }} />
)

const HomePage: React.FC = () => {
  useEffect(() => {
    // Defer GSAP ScrollTrigger setup so it never blocks the first paint
    let cleanup: (() => void) | undefined
    const id = setTimeout(async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      ScrollTrigger.refresh()
      cleanup = () => ScrollTrigger.getAll().forEach(t => t.kill())
    }, 500)
    return () => {
      clearTimeout(id)
      cleanup?.()
    }
  }, [])

  return (
    <MainLayout>
      <HeroSection />
      <Suspense fallback={<SectionFallback />}>
        <ServicesSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ProcessSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <CTASection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ContactSection />
      </Suspense>
    </MainLayout>
  )
}

export default HomePage
