# Boilerplate Generator

This project is a flexible and customizable boilerplate generator for various types of web development projects. It allows you to quickly set up a new project with your preferred stack and configuration.

## Features

- Supports multiple project types: SSR (Next.js), SPA, and library projects
- Configurable framework selection (e.g., React, Vue)
- TypeScript support
- Integrated ESLint configuration
- Customizable additional tools (e.g., Prettier, Stylelint, Vitest, Husky, PostCSS, Sass)
- Automatic merging of package.json files based on selected options
- Flexible template system for easy customization and expansion

## Prerequisites

- Node.js (version 12 or higher)
- Yarn package manager

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/your-username/boilerplate-generator.git
   ```
2. Navigate to the project directory:
   ```
   cd boilerplate-generator
   ```
3. Install dependencies:
   ```
   yarn install
   ```

## Usage

Run the generator using the following command:

```
node generate-boilerplate.js
```

You can also use command-line options to specify your choices:

```
node generate-boilerplate.js -n my-project -t ssr --tools eslint prettier
```

Available options:
- `-n, --project-name <n>`: Specify the project name
- `-t, --project-type <type>`: Choose the project type (ssr, spa, lib)
- `-f, --framework <framework>`: Select the framework (e.g., react, vue)
- `-l, --language <language>`: Choose the programming language (e.g., javascript, typescript)
- `--tools <tools...>`: Specify additional tools to include
- `-d, --dry-run`: Perform a dry run without creating files

## Project Structure

- `generate-boilerplate.js`: Main script for generating boilerplates
- `config/`: Contains configuration files and templates
  - `boilerplate-config.json`: Main configuration file for project types, frameworks, and tools
  - `base/`: Base templates for different project types
  - `frameworks/`: Framework-specific templates and configurations
  - `languages/`: Language-specific templates and configurations
  - `tools/`: Additional tools templates and configurations
  - `common/`: Common templates shared across project types

## Documentation

For more detailed information about the project, please refer to the following documentation:

- [Creating Templates](docs/creating-templates.md): Guide on how to create new templates
- [Configuration Structure](docs/configuration-structure.md): Detailed explanation of the configuration file structure
- [Troubleshooting](docs/troubleshooting.md): Solutions to common issues and problems

## Customization

### Adding a New Framework

1. Update `config/boilerplate-config.json` to include the new framework under the appropriate project type.
2. Create a new directory in `config/frameworks/` for the framework.
3. Add framework-specific templates and configurations in the new directory.
4. If necessary, create framework-specific ESLint configurations in `config/tools/eslint/variations/`.

### Adding a New Tool

1. Add the new tool to the `additionalTools` array in `config/boilerplate-config.json`.
2. Create a new directory in `config/tools/` for the tool.
3. Add tool-specific templates and configurations in the new directory.
4. If the tool requires project type-specific configurations, create subdirectories for each project type.

### Modifying Templates

To modify existing templates or add new ones:

1. Navigate to the appropriate directory in `config/`.
2. Edit existing template files or add new ones as needed.
3. Update the corresponding `package.json` files if necessary.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For more information on how to contribute, please read our [Contributing Guide](CONTRIBUTING.md).

## Changelog

For a detailed list of changes and version history, please refer to our [Changelog](CHANGELOG.md).

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Commander.js](https://github.com/tj/commander.js/)
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/)
- [fs-extra](https://github.com/jprichardson/node-fs-extra)
