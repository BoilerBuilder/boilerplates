import path from 'path';

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
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    setupFiles: ['./.config/vitest.setup.js'],
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'lcov', 'html'],
      exclude: [...coverageConfigDefaults.exclude],
    },
  },
});
