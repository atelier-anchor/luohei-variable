import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import tailwindcssNesting from 'tailwindcss/nesting'

export default defineConfig({
  base: '/luohei-variable/',
  css: {
    postcss: { plugins: [tailwindcssNesting, tailwindcss, autoprefixer] },
  },
  plugins: [
    vue({
      script: { defineModel: true },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
