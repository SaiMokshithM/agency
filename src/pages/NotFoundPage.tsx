import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowRight } from 'lucide-react'
import MainLayout from '@/layouts/MainLayout'

const NotFoundPage: React.FC = () => {
  return (
    <MainLayout>
      <section
        className="relative min-h-screen flex items-center justify-center bg-[#050505] overflow-hidden"
        aria-labelledby="notfound-title"
      >
        {/* BG glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.06) 0%, transparent 65%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 text-center px-6 max-w-lg mx-auto">
          {/* 404 Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <span
              className="font-display font-bold text-[160px] md:text-[200px] leading-none"
              style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(244,214,122,0.08) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              aria-hidden="true"
            >
              404
            </span>
          </motion.div>

          <motion.h1
            id="notfound-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-white text-3xl md:text-4xl mb-4"
          >
            Page Not Found
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#A1A1AA] font-body text-base mb-10 leading-relaxed"
          >
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-[#050505] font-body font-semibold text-sm tracking-wide transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #F4D67A)',
                boxShadow: '0 0 30px rgba(212,175,55,0.3)',
              }}
            >
              <Home size={17} aria-hidden="true" />
              Back to Home
            </Link>
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[rgba(212,175,55,0.3)] text-white font-body font-medium text-sm tracking-wide hover:border-[rgba(212,175,55,0.6)] hover:bg-[rgba(212,175,55,0.04)] transition-all duration-300"
            >
              Contact Us <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  )
}

export default NotFoundPage
