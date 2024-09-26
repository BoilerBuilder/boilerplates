# Template Building Methodology

This document explains the comprehensive methodology used to build templates using config partials in the Boilerplate Generator.

## Overview

The Boilerplate Generator uses a modular approach to build project templates. It combines various config partials based on the user's selections to create a customized project structure. This methodology allows for flexibility and easy maintenance of templates.

## Config Partials Structure

Config partials are organized in the `config/` directory with the following structure:

```
config/
├── base/
│   ├── next/
│   │   ├── package.json
│   │   └── template/
│   └── vite/
│       ├── package.json
│       ├── lib/
│       │   ├── package.json
│       │   └── template/
│       └── spa/
│           ├── package.json
│           └── template/
├── frameworks/
│   ├── react/
│   │   ├── package.json
│   │   ├── lib/
│   │   │   ├── package.json
│   │   │   └── template/
│   │   └── spa/
│   │       ├── package.json
│   │       └── template/
│   └── vue/
│       ├── package.json
│       ├── lib/
│       │   ├── package.json
│       │   └── template/
│       └── spa/
│           ├── package.json
│           └── template/
├── languages/
│   ├── javascript/
│   │   ├── package.json
│   │   └── template/
│   └── typescript/
│       ├── package.json
│       └── template/
├── tools/
│   ├── eslint/
│   │   ├── package.json
│   │   ├── template/
│   │   └── variations/
│   │       ├── react/
│   │       ├── vue/
│   │       ├── ssr/
│   │       ├── spa/
│   │       └── lib/
│   ├── prettier/
│   │   ├── package.json
│   │   └── template/
│   ├── stylelint/
│   │   ├── package.json
│   │   └── template/
│   ├── vitest/
│   │   ├── package.json
│   │   └── template/
│   ├── husky/
│   │   ├── package.json
│   │   └── template/
│   ├── postcss/
│   │   ├── package.json
│   │   └── template/
│   └── sass/
│       ├── package.json
│       └── template/
└── common/
    └── template/
```

Each subdirectory contains template files and a `package.json` file specific to that partial.

## Template Building Process

1. **Project Type Selection**: 
   - For SSR projects, the base is selected from `config/base/next/`.
   - For SPA or lib projects, the base is selected from `config/base/vite/` and then combined with the respective framework directory in `config/frameworks/`.

2. **Framework Selection**: For SPA and lib projects, a framework is selected from the `config/frameworks/` directory.

3. **Language Selection**: The chosen language's partials are added from the `config/languages/` directory.

4. **Additional Tools**: Selected tools' partials are added from the `config/tools/` directory.

5. **Common Templates**: Lastly, common templates are added from the `config/common/` directory.

## Merging Process

The `mergePackageJsons` function in `generate-boilerplate.js` is responsible for merging the `package.json` files from various partials:

1. It starts with the base project's `package.json`:
   - For SSR: `config/base/next/package.json`
   - For SPA/lib: `config/base/vite/package.json`
2. For non-SSR projects, it merges the framework-specific `package.json` (e.g., `config/frameworks/react/package.json`).
3. It then merges the project type-specific `package.json` (e.g., `config/frameworks/react/spa/package.json` or `config/frameworks/react/lib/package.json`).
4. Adds language-specific dependencies and scripts from `config/languages/{language}/package.json`.
5. Incorporates dependencies and scripts from selected tools in `config/tools/{tool}/package.json`.

## File Copying Process

The `copyTemplateFiles` function in `generate-boilerplate.js` handles the copying of template files:

1. Copies base project templates:
   - For SSR: `config/base/next/template/`
   - For SPA/lib: `config/base/vite/{projectType}/template/`
2. For non-SSR projects, copies framework-specific templates from `config/frameworks/{framework}/{projectType}/template/`.
3. Copies language-specific templates from `config/languages/{language}/template/`.
4. Adds templates for each selected tool from `config/tools/{tool}/template/`.
5. Copies common templates from `config/common/template/`, potentially overwriting previous files.

## ESLint Configuration

ESLint configurations are handled separately:

1. Starts with the base ESLint config from `config/tools/eslint/template/.eslintrc.js`.
2. Merges framework-specific ESLint config if it exists in `config/tools/eslint/variations/{framework}/.eslintrc.js`.
3. Adds project type-specific ESLint rules if they exist in `config/tools/eslint/variations/{projectType}/.eslintrc.js`.

## Configuration File

The `config/boilerplate-config.json` file defines the available options for project types, frameworks, languages, and additional tools. It specifies the paths for templates and package.json files for each option.

## Vite Configuration

For SPA and lib projects that use Vite, the base configuration is located in `config/base/vite/`. This includes:

- A root `package.json` with basic Vite scripts and dependencies.
- A `lib/` directory with lib-specific configurations:
  - `package.json`: Lib-specific configurations
  - `template/`: Lib-specific template files
- An `spa/` directory with SPA-specific configurations:
  - `package.json`: SPA-specific configurations
  - `template/`: SPA-specific template files

## Tools

The boilerplate generator supports the following tools, each located in `config/tools/`:

1. **ESLint**: JavaScript and TypeScript linting
   - Includes variations for different frameworks and project types
2. **Prettier**: Code formatting
3. **Stylelint**: CSS linting
4. **Vitest**: Testing framework
5. **Husky**: Git hooks
6. **PostCSS**: CSS post-processing
7. **Sass**: CSS preprocessor

Each tool has its own `package.json` for dependencies and a `template/` directory for configuration files.

## Customization and Extension

To add new partials or modify existing ones:

1. Add or modify files in the appropriate `config/` subdirectory.
2. Update the `config/boilerplate-config.json` file to include new options.
3. If necessary, modify the `generate-boilerplate.js` script to handle new partial types.

## Validation

Before generating a project, the `validateResources` function checks that all necessary template files and configurations exist based on the `boilerplate-config.json` file.

## Interactive Prompts

The generator uses interactive prompts to gather information about the project type, framework, language, and additional tools when not provided as command-line arguments. For SSR projects, it automatically sets React as the framework and TypeScript as the language.

## Project Generation

The `generateBoilerplate` function orchestrates the entire process:

1. Validates resources
2. Prompts for project configuration (if not provided)
3. Merges package.json files
4. Copies template files
5. Writes the final package.json and other configuration files

This modular and flexible approach allows for easy customization and extension of the boilerplate generator to support various project types, frameworks, and tools.