import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import seo from './seo.config.js'

// base './' keeps asset paths relative, so the build works on GitHub Pages
// (https://nikhil270703.github.io/My-Portfolio/) or any other host.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), seo()],
})
