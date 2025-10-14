import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['cookie'], // Add 'cookie' to external dependencies
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // server: {
  //   proxy: {
  //     '/api': 'http://localhost:3000',
  //   },
  // },
});