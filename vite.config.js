import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ВАЖНО: замени 'antigravity' на имя твоего GitHub репозитория
export default defineConfig({
  plugins: [react()],
  base: '/form/',
})
