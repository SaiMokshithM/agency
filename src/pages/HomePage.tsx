import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MainLayout from '@/layouts/MainLayout'
import HeroSection from '@/sections/HeroSection'
import ServicesSection from '@/sections/ServicesSection'
import StatementStrip from '@/sections/StatementStrip'
import ProcessSection from '@/sections/ProcessSection'
import AboutSection from '@/sections/AboutSection'
import CTASection from '@/sections/CTASection'
import ContactSection from '@/sections/ContactSection'

gsap.registerPlugin(ScrollTrigger)

const HomePage: React.FC = () => {
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => clearTimeout(id)
  }, [])

  return (
    <MainLayout>
      <HeroSection />
      <ServicesSection />
      <StatementStrip />
      <ProcessSection />
      <AboutSection />
      <CTASection />
      <ContactSection />
    </MainLayout>
  )
}

export default HomePage
