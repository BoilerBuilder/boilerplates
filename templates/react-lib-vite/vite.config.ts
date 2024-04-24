import path from 'path';

import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { defineConfig, coverageConfigDefaults } from 'vitest/config';

import { yalcPublish } from './.config/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';

  return {
    plugins: [
      react(),
      dts({ include: ['src'] }),
      isDevelopment && yalcPublish('./dist'),
    ],
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/main.tsx'),
        name: 'react-lib',
        fileName: 'react-lib',
      },
      rollupOptions: {
        external: ['react', 'react/jsx-runtime'],
        output: {
          globals: {
            react: 'React',
            'react/jsx-runtime': 'jsxRuntime',
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
