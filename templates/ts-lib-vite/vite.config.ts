import path from 'path';

import dts from 'vite-plugin-dts';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts({ include: ['src'] })],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'ts-lib',
      fileName: 'ts-lib',
    },
    rollupOptions: {
      external: [],
    },
  },
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
    },
  },
});
