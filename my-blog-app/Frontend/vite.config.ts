import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import rollupNodePolyFill from 'rollup-plugin-polyfill-node';

export default defineConfig({
  plugins: [
    react(),
    rollupNodePolyFill(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      global: 'globalthis',
    },
  },
  define: {
    global: 'globalThis',
  },
});
