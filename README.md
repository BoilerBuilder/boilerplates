# Boilerplates

This project provides a modular boilerplate generation system for quickly starting and maintaining various types of projects.

## Features

- Supports multiple base projects (Next.js, Vite SPA, Vite Library)
- Configurable for different frameworks (React, Vue)
- Language options (JavaScript, TypeScript)
- Includes various additional tools (ESLint, Prettier, Stylelint, Vitest, Husky, PostCSS, Sass)

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/your-username/boilerplates.git
   cd boilerplates
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Generate a new boilerplate:
   ```
   npm run generate
   ```
   or
   ```
   yarn generate
   ```

4. Follow the prompts to select your desired project configuration.

## Project Generation Workflow

1. The script reads the configuration from `config/boilerplate-config.json`
2. It prompts you for:
   - Project name
   - Base project type (e.g., Next.js, Vite)
   - Project type (SPA or Library, if applicable)
   - Framework (React or Vue, if applicable)
   - Language (JavaScript or TypeScript)
   - Additional tools to include
3. Based on your choices, it:
   - Merges package.json files from:
     * Base project
     * Selected framework
     * Selected language
     * Selected additional tools
   - Copies template files from:
     * Base project
     * Selected framework
     * Selected language
     * Selected additional tools
     * Common templates
4. It creates the project structure in the current working directory
5. It writes the merged package.json file to the project directory

The generated project will be located in:
```
[current working directory]/[project name]
```

## Customizing Boilerplates

You can customize the generated boilerplates by modifying the templates and configurations in the `config` directory. The structure is as follows:

- `config/`
  - `base/`: Base project configurations and templates
  - `frameworks/`: Framework-specific configurations and templates
  - `languages/`: Language-specific configurations and templates
  - `tools/`: Additional tools configurations and templates
  - `common/`: Common templates for all projects

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.