import { fileURLToPath } from 'node:url';

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import _import from 'eslint-plugin-import';
import globals from 'globals';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ),
  ),
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tsParser,
    },
    plugins: {
      import: fixupPluginRules(_import),
    },
    rules: {
      'linebreak-style': 0,
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      '@typescript-eslint/no-unused-vars': 'warn',
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    ignores: ['**/dist', '**/.eslintrc.cjs', '**/.prettierrc.cjs'],
  },
];
