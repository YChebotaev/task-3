import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  mode: 'development',
  build: {
    target: 'esnext',
    modulePreload: false,
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      input: {
        'sidePanel': 'src/sidePanel/index.html',
        'options': 'src/options/index.html',
      }
    },
    emptyOutDir: true,
    copyPublicDir: true
  },
  resolve: {
    alias: {
      '@mui/material': '@mui/joy'
    }
  }
})
