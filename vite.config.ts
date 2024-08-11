import { defineConfig } from 'vite'
import ViteReact from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ViteReact(), 
    TanStackRouterVite()
  ],
})
