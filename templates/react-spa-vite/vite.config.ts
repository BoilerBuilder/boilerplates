import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import ViteRestart from 'vite-plugin-restart';
import { defineConfig, coverageConfigDefaults } from 'vitest/config';

export default defineConfig({
  build: {
    outDir: 'build/',
  },
  plugins: [react(), ViteRestart({ restart: ['yalc.lock'] })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    setupFiles: ['./.config/vitest.setup.ts'],
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      exclude: [...coverageConfigDefaults.exclude],
    },
  },
});
