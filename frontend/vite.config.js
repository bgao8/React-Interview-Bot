import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default defineConfig({
  server: {
    hmr: false,
    proxy: {
      '/interview': { target: 'http://localhost:8000', changeOrigin: true },
      '/grade': { target: 'http://localhost:8000', changeOrigin: true },
    },
  },
  plugins: [react()],
})
