import React from 'react'
import { motion } from 'framer-motion'
import { useMagneticButton } from '@/hooks/useMagneticButton'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  magnetic?: boolean
  icon?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  magnetic = true,
  icon,
  className = '',
  ...props
}) => {
  const magneticRef = useMagneticButton<HTMLButtonElement>()

  const baseStyles = 'relative inline-flex items-center justify-center gap-2 font-body font-medium tracking-wide rounded-full transition-all duration-300 cursor-pointer border-0 select-none'

  const sizeStyles = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3.5 text-sm',
    lg: 'px-10 py-5 text-base',
  }

  const variantStyles = {
    primary: 'bg-[#D4AF37] text-[#050505] hover:bg-[#F4D67A]',
    secondary: 'border border-[rgba(212,175,55,0.3)] text-white hover:border-[rgba(212,175,55,0.7)] hover:bg-[rgba(212,175,55,0.06)]',
    ghost: 'text-[#D4AF37] hover:text-[#F4D67A]',
  }

  const glowStyle = variant === 'primary'
    ? { boxShadow: '0 0 24px rgba(212,175,55,0.3)' }
    : {}

  return (
    <motion.button
      ref={magnetic ? magneticRef : undefined}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      style={glowStyle}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      {...(props as any)}
    >
      {children}
      {icon && <span aria-hidden="true">{icon}</span>}
    </motion.button>
  )
}

export default Button
