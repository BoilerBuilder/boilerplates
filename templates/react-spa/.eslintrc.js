module.exports = {
  env: {
    browser: true, // Indica que o código será executado em um ambiente de navegador
    es2021: true, // Habilita as funcionalidades do ES2021
    node: true, // Indica que o código será executado em um ambiente Node.js
    jest: true, // Adiciona suporte para variáveis globais do Jest
  },
  extends: [
    'eslint:recommended', // Regras recomendadas pelo ESLint
    'plugin:react/recommended', // Regras recomendadas para React
    'plugin:react-hooks/recommended', // Regras recomendadas para Hooks do React
    'plugin:prettier/recommended', // Integra o Prettier com o ESLint
  ],
  settings: {
    react: {
      version: 'detect', // Detecta automaticamente a versão do React
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Habilita o suporte para a sintaxe JSX
    },
    ecmaVersion: 12, // Define a versão do ECMAScript para o ES12
    sourceType: 'module', // Indica que o código usa módulos do ES6
  },
  plugins: [
    'react', // Plugin ESLint para React
    'react-hooks', // Plugin ESLint para Hooks do React
  ],
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
    'react/react-in-jsx-scope': 'off', // Desabilita a regra para ter React no escopo com JSX
    'react/jsx-sort-props': 'error', // Força a ordenação das propriedades do JSX
    'react-hooks/rules-of-hooks': 'error', // Verifica as regras dos Hooks do React
    'react-hooks/exhaustive-deps': 'warn', // Adverte sobre dependências ausentes nos Hooks do React
  },
};
