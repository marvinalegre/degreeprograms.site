// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'home.html'),
        add: resolve(__dirname, 'add.html'),
        program: resolve(__dirname, 'program.html'),
      },
    },
    outDir: '../dist-client'
  },
})