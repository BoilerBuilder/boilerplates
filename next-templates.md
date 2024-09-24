# Template Implementation File Contents

## 1. Base Framework Selection

### 1.1 Next.js (SSR)

#### package.json (partial)
"{
  "dependencies": {
    "next": "14.1.4",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "typescript": "^5",
    "eslint-config-next": "14.1.4"
  }
}"

### 1.2 Vite

#### package.json (partial)
"{
  "devDependencies": {
    "vite": "^5.2.0"
  }
}"

## 2. Project Type (for Vite)

### 2.1 Language Selection

#### JavaScript (JS)

##### jsconfig.json
"{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./jsconfig.node.json" }]
}"

##### jsconfig.node.json
"{
  "compilerOptions": {
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.js"]
}"

#### TypeScript (TS)

##### tsconfig.json
"{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}"

##### tsconfig.node.json
"{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}"

##### vite.config.ts (with dts for TypeScript)
"import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [dts()],
})"

### 2.2 Library

#### package.json (partial)
"{
  "main": "dist/main.js",
  "module": "dist/main.mjs",
  "types": "dist/main.d.ts",
  "exports": {
    ".": {
      "import": "./dist/main.mjs",
      "require": "./dist/main.js",
      "types": "./dist/main.d.ts"
    }
  },
  "files": ["dist"]
}"

#### vite.config.js (for library)
"import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.ts',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
  plugins: [dts()],
})"

## 3. Framework Selection (for Vite projects)

### 3.1 React

#### vite.config.js or vite.config.ts
"import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})"

### 3.2 Vue

#### vite.config.js or vite.config.ts
"import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
})"

## 4. Linting and Formatting

### 4.1 ESLint

#### .eslintrc.js (for React)
"module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: ['react', 'react-hooks', 'import'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}"

#### .eslintrc.js (for Vue)
"module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript',
  ],
  plugins: ['vue'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
}"

#### .eslintrc.json (for Next.js)
"{
  "extends": "next/core-web-vitals"
}"

### 4.2 Prettier

#### .prettierrc.js
"module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
}"

### 4.3 Stylelint

#### .stylelintrc.js
"module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-alphabetical-order': true,
  },
}"

## 5. Testing

### 5.1 Vitest

#### vitest.config.ts
"import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
})"

## 6. Additional Tools

### 6.1 Husky

#### .husky/pre-commit
"#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn lint-staged"

#### .lintstagedrc.js
"module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{css,scss}': ['stylelint --fix', 'prettier --write'],
  '*.{json,md}': ['prettier --write'],
}"

## 7. Scripts

#### package.json (scripts section for Vite projects)
"{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "format": "prettier --write .",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "prepare": "husky install"
  }
}"

#### package.json (scripts section for Next.js projects)
"{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "prepare": "husky install"
  }
}"

This document provides a reference for the content of key configuration files and package.json sections for each step of the implementation process. You can use these as templates and adjust them as needed for your specific project requirements.