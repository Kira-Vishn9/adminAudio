import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/': `${resolve(__dirname, 'src')}/`,
      '@components': `${resolve(__dirname, 'src/component')}/`,
      '@api': `${resolve(__dirname, 'src/api')}/`,
      '@assets': `${resolve(__dirname, 'src/assets')}/`,
      '@context': `${resolve(__dirname, 'src/context')}/`,
      '@module': `${resolve(__dirname, 'src/module')}/`,
      '@page': `${resolve(__dirname, 'src/page')}/`,
      '@router': `${resolve(__dirname, 'src/router')}/`,
      '@type': `${resolve(__dirname, 'src/type')}/`,
    }
  }
})
