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
    rollupOptions: {
      external: (id) => {
        // Externalize server-side OpenTelemetry packages for client build
        if (id.includes('@opentelemetry/sdk-node') ||
            id.includes('@opentelemetry/sdk-trace-node') ||
            id.includes('@opentelemetry/auto-instrumentations-node')) {
          return true
        }
        return false
      }
    }
  }
})
