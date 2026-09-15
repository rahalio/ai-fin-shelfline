import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/v0': 'http://127.0.0.1:4010',
      '/v1': 'http://127.0.0.1:4010',
      '/health': 'http://127.0.0.1:4010',
    },
  },
});
