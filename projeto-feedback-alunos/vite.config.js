import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // tudo que começar com /auth vai para localhost:8081
      '/api': 'http://localhost:8081'
    }
  }
})