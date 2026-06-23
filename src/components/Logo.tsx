import React from 'react'

interface LogoProps {
  className?: string
  fontSize?: string
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  fontSize = '22px',
}) => {
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: 0,
        lineHeight: 1,
        userSelect: 'none',
      }}
    >
      {/* VELO — dark purple-black gradient matching logo */}
      <span
        style={{
          fontFamily: "'Inter', 'Montserrat', sans-serif",
          fontWeight: 900,
          fontSize,
          letterSpacing: '-0.02em',
          background: 'linear-gradient(90deg, #1a0a2e 0%, #3d1466 60%, #6b21a8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        VELO
      </span>

      {/* technoz — purple → pink → orange gradient */}
      <span
        style={{
          fontFamily: "'Inter', 'Montserrat', sans-serif",
          fontWeight: 400,
          fontSize,
          letterSpacing: '-0.02em',
          background: 'linear-gradient(90deg, #7B2FBE 0%, #C2185B 50%, #F97316 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        technoz
      </span>
    </span>
  )
}

export default Logo
