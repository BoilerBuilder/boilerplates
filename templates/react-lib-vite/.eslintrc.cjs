module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['import', 'react-refresh'],
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
    'react/jsx-sort-props': 'error', // Força a ordenação das propriedades do JSX
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
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};
