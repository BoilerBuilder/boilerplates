import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./.config/vitest.setup.js'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});