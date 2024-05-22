import react from '@vitejs/plugin-react';
import { defineConfig, coverageConfigDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: ['./.config/vitest.setup.js'],
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'lcov', 'html'],
      exclude: [...coverageConfigDefaults.exclude, 'next.config.mjs'],
    },
  },
});
