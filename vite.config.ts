// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  let outDir = 'dist'; // default
  let base = '/';

  if (mode === 'prod') {
    outDir = '/var/www/osc';
    base = '/osc';
  }

  return {
    base,
    plugins: [react(), tailwindcss()],
    server: {
      host: true,
      port: 5173,
    },
    build: {
      outDir,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, 'src'),
      }
    }
  };
});
