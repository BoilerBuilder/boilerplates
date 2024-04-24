import { exec } from 'child_process';
import path from 'path';

import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { defineConfig, coverageConfigDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';

  return {
    plugins: [
      vue(),
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
