import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import "lucide-react";


// https://vite.dev/config/
export default defineConfig({
  server:{
    port:3000
  },
  plugins: [
    react(),
    tailwindcss()
  ],
})
