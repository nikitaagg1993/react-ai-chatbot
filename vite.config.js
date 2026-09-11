import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Use a custom prefix to prevent routing overlaps
      '/openai-api': {
        target: 'https://api.openai.com/v1', // Target the base endpoint directory directly
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/openai-api/, ''), // Strip the proxy prefix cleanly
      }
    }
  }
})
