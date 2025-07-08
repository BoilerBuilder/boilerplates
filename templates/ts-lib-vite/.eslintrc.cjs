module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['import'],
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
    '@typescript-eslint/no-unused-vars': 'warn', // Adverte sobre variáveis declaradas mas não utilizadas no TypeScript
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
};
