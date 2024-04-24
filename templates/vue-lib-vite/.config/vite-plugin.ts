import { exec } from 'child_process';

export const yalcPublish = (path: string) => ({
  name: 'yalc-push',
  closeBundle: async () => {
    console.log('[yalc]: Executing `yalc push` command...');
    exec(
      'npx yalc publish --push --changed',
      { cwd: path },
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
});

export default yalcPublish;
