import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Target modern browsers — smaller output, no unnecessary polyfills
    target: 'es2020',
    minify: 'esbuild',
    // Raise warning limit since we're aware of Three.js size
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          // Three.js gets its own chunk — only loaded on desktop
          if (id.includes('three')) return 'three'

          // Heavy animation libs split out
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('gsap'))          return 'gsap'

          // Supabase — only used in contact form
          if (id.includes('@supabase'))     return 'supabase'

          // Router
          if (id.includes('react-router'))  return 'router'

          // Core React
          if (id.includes('react-dom') || id.includes('/react/')) return 'react'

          // Everything else
          return 'vendor'
        },
      },
    },
  },
  optimizeDeps: {
    // Pre-bundle only what's needed for first paint — keep Three.js out
    include: ['react', 'react-dom', 'framer-motion'],
    exclude: ['three', 'gsap'],
  },
})
