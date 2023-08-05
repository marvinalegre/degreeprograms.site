// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'src-client/home/index.html'),
        add: resolve(__dirname, 'src-client/add/index.html'),
        program: resolve(__dirname, 'src-client/program/index.html'),
      },
    },
    outDir: 'dist-client'
  },
})