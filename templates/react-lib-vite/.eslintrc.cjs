module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: [
    'node_modules/', // Ignore all files in the node_modules directory
    'build/', // Ignore all files in the build directory
    'dist/', // Ignore all files in the dist directory
    'coverage/', // Ignore all files in the coverage directory
    '.yalc/', // Ignore all files that end with .test.js
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'import'],
  rules: {
    'linebreak-style': 0, // Desliga o uso lineabreak para evitar conflito de diferentes OS
    quotes: [
      'error',
      'single', // Força o uso de aspas simples
    ],
    semi: [
      'error',
      'always', // Garante que declarações terminem com ponto e vírgula
    ],
    'no-unused-vars': 'warn', // Adverte sobre variáveis declaradas mas não utilizadas
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
    'react/jsx-sort-props': 'error', // Força a ordenação das propriedades do JSX
  },
};
