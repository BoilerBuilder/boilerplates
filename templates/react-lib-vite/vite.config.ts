import { exec } from 'child_process';
import path from 'path';

import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { defineConfig, coverageConfigDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';

  return {
    plugins: [
      react(),
      dts({ include: ['src'] }),
      isDevelopment && {
        name: 'yalc-push',
        closeBundle: async () => {
          console.log('[yalc]: Executing `yalc push` command...');
          exec(
            'npx yalc publish --push --changed',
            { cwd: './dist' },
            (error, stdout, stderr) => {
              if (error) {
                console.error(`[yalc error]: ${error}`);
                return;
              }
              if (stderr) {
                console.error(`[yalc stderr]: ${stderr}`);
                return;
              }
              console.log(`[yalc]: ${stdout}`);
            },
          );
        },
      },
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
