import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import _import from 'eslint-plugin-import';
import globals from 'globals';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Read tsMode from package.json at runtime (defaults to 'strict').
// Modes allowJs and checkJs are activated via `boilerbuilder ts <mode>` which
// materialises the tsconfig preset and updates this field — so the linter
// automatically widens its file scope to include .js/.jsx.
let tsMode = 'strict';
try {
  const pkg = JSON.parse(
    readFileSync(new URL('./package.json', import.meta.url), 'utf8'),
  );
  tsMode = pkg?.boilerbuilder?.tsMode ?? 'strict';
} catch {
  // keep default
}

// strict → TypeScript only (.ts/.tsx); allowJs/checkJs → also lint .js/.jsx
const files =
  tsMode === 'strict' ? ['**/*.{ts,tsx}'] : ['**/*.{ts,tsx,js,jsx}'];

// Relax `no-explicit-any` during JS→TS migration; keep it as error in strict mode.
const noExplicitAny = tsMode === 'strict' ? 'error' : 'warn';

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

// Scope every extended config to the same `files` array so that rules like
// no-undef and react/* don't run on .cjs / .js config files which lack the
// globals (module, URL…) declared in the block below.
const extendedConfigs = fixupConfigRules(
  compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ),
).map((config) => ({ ...config, files }));

export default [
  ...extendedConfigs,
  {
    files,
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        React: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        vi: 'readonly',
        test: 'readonly',
      },
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      import: fixupPluginRules(_import),
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'linebreak-style': 0,
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'no-unused-vars': 'off', // superseded by @typescript-eslint/no-unused-vars
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { ignoreRestSiblings: true },
      ],
      '@typescript-eslint/no-explicit-any': noExplicitAny,
      'react/prop-types': 'off', // TypeScript handles prop types
      'react/jsx-sort-props': 'error',
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
    ignores: ['**/build', '**/dist', '**/.eslintrc.cjs'],
  },
];
