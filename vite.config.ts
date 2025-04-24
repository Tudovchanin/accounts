import { fileURLToPath, URL } from 'node:url' // Явное указание модуля node:url
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import checker from 'vite-plugin-checker';


// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    
    checker({ 
      typescript: true, // Включает проверку типов TypeScript
      vueTsc: true // Включает проверку типов для Vue SFC
    }),
  ],
   resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/assets/scss/main.scss';` },
    },
  },
})
