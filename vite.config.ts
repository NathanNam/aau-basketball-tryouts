import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 3001,
    host: '0.0.0.0',
    allowedHosts: ['aau-basketball-tryouts.observe-demo.com'],
    // Enable compression in dev mode
    compress: true,
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
        manualChunks: {
          // React vendor bundle
          'vendor-react': ['react', 'react-dom'],
          // TanStack router bundle
          'vendor-router': [
            '@tanstack/react-router',
            '@tanstack/react-router-devtools',
            '@tanstack/react-start'
          ],
          // OpenTelemetry instrumentation bundle
          'vendor-otel': [
            '@opentelemetry/api',
            '@opentelemetry/api-logs',
            '@opentelemetry/exporter-logs-otlp-http',
            '@opentelemetry/exporter-metrics-otlp-proto',
            '@opentelemetry/exporter-trace-otlp-http',
            '@opentelemetry/instrumentation',
            '@opentelemetry/instrumentation-document-load',
            '@opentelemetry/instrumentation-fetch',
            '@opentelemetry/instrumentation-xml-http-request',
            '@opentelemetry/resources',
            '@opentelemetry/sdk-logs',
            '@opentelemetry/sdk-metrics',
            '@opentelemetry/sdk-trace-web',
            '@opentelemetry/semantic-conventions'
          ],
          // Utility libraries
          'vendor-utils': ['axios', 'zod', 'tailwind-merge']
        }
      }
    },
    // Asset optimization
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
    cssCodeSplit: true, // Split CSS into separate files
  }
})
