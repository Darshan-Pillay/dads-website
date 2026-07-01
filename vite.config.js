import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// See: docs/architecture.md
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    sourcemap: true,
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
