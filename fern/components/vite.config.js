import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../dist',
    lib: {
      entry: './filter-init.js',
      name: 'FernFilter',
      formats: ['iife'],
      fileName: () => 'filter.js'
    },
    rollupOptions: {
      output: {
        // Generate deterministic file names for Fern docs
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'filter.css';
          }
          return assetInfo.name;
        }
      }
    }
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  }
}); 