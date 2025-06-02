import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [react(), eslintPlugin()],
  server: {
    open: true,
  },
  optimizeDeps: {
    include: ['react-router-dom'],
  },
})
