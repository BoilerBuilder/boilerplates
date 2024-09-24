import { exec } from 'child_process';
import path from 'path';

import { viteStaticCopy } from 'vite-plugin-static-copy';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    build: {
      rollupOptions: {
        input: {
          default: path.resolve(__dirname, './src/default/index.scss'),
        },
        output: {
          assetFileNames: `[name]-theme.[ext]`,
        },
      },
    },
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: './dist/.',
            dest: './../../dist/css',
          },
        ],
      }),
      !isProduction && {
        name: 'yalc-push',
        closeBundle: async () => {
          console.log('[yalc]: Executing `yalc push` command...');
          exec(
            'npx yalc publish --push --changed',
            { cwd: '../dist' },
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
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
