import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppWidget from '@/components/WhatsAppWidget'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#080808] flex flex-col">
      <Navbar />
      <main
        id="main-content"
        className="flex-1"
        tabIndex={-1}
        aria-label="Main content"
      >
        {children}
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  )
}

export default MainLayout
