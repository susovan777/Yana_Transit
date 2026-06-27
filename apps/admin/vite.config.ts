import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Tailwind v4 — no tailwind.config.ts needed
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // Proxy /api calls to the Express backend during development
      // so you don't have to hardcode http://localhost:4000 everywhere
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
});