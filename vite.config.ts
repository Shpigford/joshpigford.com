import path from 'path'
import inertia from '@inertiajs/vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'app/frontend'),
    },
  },
  plugins: [
    inertia({
      ssr: {
        // Path is relative to the Vite root, which vite-plugin-ruby
        // sets to app/frontend (via sourceCodeDir in config/vite.json).
        entry: 'entrypoints/inertia.tsx',
        // Rails only ever connects via localhost; don't expose the worker's
        // unauthenticated /render and /shutdown endpoints on all interfaces.
        host: '127.0.0.1',
        // Baked into the bundle at build time, so INERTIA_SSR_PORT must be set
        // when `vite build --ssr` runs (assets:precompile), not just at boot.
        // Each Inertia+SSR app on a shared host needs a unique port — the
        // default 13714 collides with whichever app grabbed it first.
        port: Number(process.env.INERTIA_SSR_PORT) || 13714,
      },
    }),
    react(),
    tailwindcss(),
    RubyPlugin(),
  ],
})
