# 🎨 AkaDB Sass Library

[![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)](https://prettier.io/)
[![Stylelint](https://img.shields.io/badge/Stylelint-263238?style=for-the-badge&logo=stylelint&logoColor=white)](https://stylelint.io/)

Welcome to the Sass library for AkaDB! This library contains the core styles, mixins, and variables used throughout the AkaDB Design Blocks, providing a solid foundation for consistent and maintainable styling.

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js v18 or higher
- Yarn package manager

## 🎨 Theming

AkaDB Sass library supports multiple themes out of the box. The available themes are:

- Default
- Aon
- Bees
- BMC
- Linker
- Oggi
- Streetgo

To use a specific theme, import the corresponding CSS file in your project.

## 🪄 Customization

You can customize the Sass library by modifying the variables and mixins in the "src" directory. The main files to look into are:

- "variables.scss": Contains the core variables used throughout the library.
- "mixins.scss": Contains the reusable mixins for common styling patterns.

After making changes, rebuild the library to generate the updated CSS files.

## 📦 Dependencies

The `sass-lib` workspace does not have any runtime dependencies. All the necessary tools and libraries are included as dev dependencies.

## 🛠️ Dev Dependencies

The workspace includes the following dev dependencies for building, linting, formatting, and processing CSS and Sass files:

- [Vite](https://vitejs.dev/): A fast build tool and development server
  - [vite-plugin-static-copy](https://github.com/sapphi-red/vite-plugin-static-copy): A Vite plugin for copying static files
- [Sass](https://sass-lang.com/): A powerful CSS extension language
- [PostCSS](https://postcss.org/): A tool for transforming CSS with JavaScript
  - [Autoprefixer](https://github.com/postcss/autoprefixer): A PostCSS plugin to parse CSS and add vendor prefixes
- [Stylelint](https://stylelint.io/): A mighty, modern linter that helps you avoid errors and enforce conventions in your styles
  - [stylelint-config-standard-scss](https://github.com/stylelint-scss/stylelint-config-standard-scss): A Stylelint configuration for SCSS based on stylelint-config-standard
  - [stylelint-order](https://github.com/hudochenkov/stylelint-order): A Stylelint plugin for enforcing the order of CSS properties
  - [stylelint-prettier](https://github.com/prettier/stylelint-prettier): A Stylelint plugin for formatting CSS with Prettier
- [Prettier](https://prettier.io/): An opinionated code formatter
- [Husky](https://typicode.github.io/husky/): A tool for adding Git hooks
- [Lint Staged](https://github.com/okonet/lint-staged): A tool for running linters on Git staged files

## 🤝 Contributing

We welcome contributions to help improve the AkaDB Sass library! Please see our [Contributing Guide](CONTRIBUTING.md) for more information on how to get started.

Happy styling with AkaDB Sass! 🎉
