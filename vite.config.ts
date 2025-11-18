import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 3001,
    host: '0.0.0.0',
    allowedHosts: ['aau-basketball-tryouts.observe-demo.com'],
  },
  // Enable experimental features for better performance
  esbuild: {
    // Remove console.log in production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
  plugins: [
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart({
      srcDirectory: 'src',
    }),
    viteReact(),
  ],
  build: {
    // Enable compression and optimization
    minify: 'esbuild',
    cssMinify: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      external: (id) => {
        // Externalize server-side OpenTelemetry packages for client build
        if (id.includes('@opentelemetry/sdk-node') ||
            id.includes('@opentelemetry/sdk-trace-node') ||
            id.includes('@opentelemetry/auto-instrumentations-node')) {
          return true
        }
        return false
      },
      output: {
        // Optimize chunk naming for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks: (id) => {
          // Only apply manual chunks for client build, not SSR
          if (process.env.VITE_SSR) return undefined

          // React vendor bundle
          if (id.includes('react') || id.includes('react-dom')) {
            return 'vendor-react'
          }

          // TanStack router bundle
          if (id.includes('@tanstack/react-router') ||
              id.includes('@tanstack/react-start')) {
            return 'vendor-router'
          }

          // OpenTelemetry instrumentation bundle
          if (id.includes('@opentelemetry/')) {
            return 'vendor-otel'
          }

          // Utility libraries
          if (id.includes('axios') || id.includes('zod') || id.includes('tailwind-merge')) {
            return 'vendor-utils'
          }

          return undefined
        }
      }
    },
    // Asset optimization
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
    cssCodeSplit: true, // Split CSS into separate files
  }
})
