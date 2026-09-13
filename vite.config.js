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
    // Dev backend is the PHP built-in server: run `php -S localhost:8000`
    // from the repo root (ADR-0010 §9). The rewrite maps the contract URL
    // /api/contact onto the physical file api/contact.php.
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        rewrite: (path) => path.replace(/^\/api\/contact$/, '/api/contact.php'),
      },
    },
  },
});
