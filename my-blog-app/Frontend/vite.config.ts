import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import rollupNodePolyFill from 'rollup-plugin-polyfill-node'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    rollupNodePolyFill(), // only if you need Node.js polyfills
  ],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
})
