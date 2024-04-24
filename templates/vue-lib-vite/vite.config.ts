import path from 'path';

import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { defineConfig, coverageConfigDefaults } from 'vitest/config';

import { yalcPublish } from './.config/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';

  return {
    plugins: [
      vue(),
      dts({ include: ['src'] }),
      isDevelopment && yalcPublish('./dist'),
    ],
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/main.ts'),
        name: 'vue-lib',
        fileName: 'vue-lib',
      },
      rollupOptions: {
        external: ['vue'],
        output: {
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
        exclude: [...coverageConfigDefaults.exclude],
      },
    },
  };
});
