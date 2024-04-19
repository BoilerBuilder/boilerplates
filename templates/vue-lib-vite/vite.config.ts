import path from 'path';

import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts({ include: ['src'] })],
  build: {
    lib: {
      // src/indext.ts is where we have exported the component(s)
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'Library',
      // the name of the output files when the build is run
      fileName: 'library',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
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
