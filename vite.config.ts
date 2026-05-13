import path from 'node:path'
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

export default defineConfig(({ command }) => ({
  // GitHub Pages URL: https://<user>.github.io/<repo>/
  base: command === 'serve' ? '/' : '/Rahul_Portfolio/',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/github-api': {
        target: 'https://api.github.com',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/github-api/, ''),
      },
    },
  },
}))
