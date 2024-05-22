# Boilerplate Configuration Modules

## Motivation

As our collection of boilerplate templates grows, maintaining consistent configurations across templates becomes increasingly challenging. Duplicating configurations in each template leads to code duplication, making it difficult to keep the templates up to date and in sync with the latest best practices and dependencies.

To address this issue, we introduce the concept of configuration modules. Configuration modules are shared packages that encapsulate common configurations and dependencies for specific aspects of our boilerplate templates. By extracting these configurations into separate modules, we can maintain them centrally, promote code reuse, and ensure consistency across our templates.

## Architecture

Our boilerplate repository, @boilerplates, will have the following structure:

```
boilerplates/
  ├── config/
  │   ├── react/
  │   ├── vue/
  │   ├── next/
  │   ├── lib/
  │   ├── spa/
  │   ├── vite/
  │   ├── code-quality/
  │   └── testing/
  └── templates/
      ├── next-app/
      ├── react-lib-vite/
      ├── react-spa-vite/
      ├── styles-lib-vite/
      ├── ts-lib-vite/
      ├── vue-lib-vite/
      └── vue-spa-vite/
```

The config folder contains the configuration modules, organized by their respective categories. Each configuration module is a separate package with its own set of configurations and dependencies.

The templates folder contains our boilerplate templates, each representing a specific project setup.

## Configuration Modules

### React Config Module
Package name: @boilerplates/config-react
Description: Contains React-specific configurations and dependencies
Dependencies:
- @vitejs/plugin-react: Vite plugin for React support
Files:
- vite.config.js: React-specific Vite configuration

### Vue Config Module
Package name: @boilerplates/config-vue
Description: Contains Vue-specific configurations and dependencies
Dependencies:
- @vitejs/plugin-vue: Vite plugin for Vue support
Files:
- vite.config.js: Vue-specific Vite configuration

### Next.js Config Module
Package name: @boilerplates/config-next
Description: Contains Next.js-specific configurations and dependencies
Files:
- next.config.js: Next.js configuration

### Library Config Module
Package name: @boilerplates/config-lib
Description: Contains configurations for library projects
Dependencies:
- rollup: Module bundler for library builds
Files:
- rollup.config.js: Rollup configuration for library builds

### Single Page Application (SPA) Config Module
Package name: @boilerplates/config-spa
Description: Contains configurations for single-page application projects
Files:
- vite.config.js: SPA-specific Vite configuration

### Vite Config Module
Package name: @boilerplates/config-vite
Description: Contains Vite-specific configurations
Files:
- vite.config.js: Base Vite configuration

### Code Quality Config Module
Package name: @boilerplates/config-code-quality
Description: Contains code quality configurations
Dependencies:
- eslint: JavaScript linter
- prettier: Code formatter
- typescript: TypeScript compiler
Files:
- .eslintrc.js: ESLint configuration
- .prettierrc.js: Prettier configuration
- tsconfig.base.json: Base TypeScript configuration

### Testing Config Module
Package name: @boilerplates/config-testing
Description: Contains testing configurations
Dependencies:
- vitest: Test runner for Vite projects
- jest: Test runner for Next.js and Webpack projects
Files:
- vitest.config.js: Vitest configuration
- jest.config.js: Jest configuration

## Implementation Steps
1. Create the config folder in the @boilerplates root directory.
2. For each configuration module:
Create a new folder within the config directory.
Initialize a package.json file with the appropriate package name and dependencies.
Add the necessary configuration files specific to that module.
3. Update each boilerplate template's package.json to reference the required configuration modules as dependencies:
```json
{
  "dependencies": {
    "@boilerplates/config-react": "github:boilerbuilder/config/react",
    "@boilerplates/config-lib": "github:boilerbuilder/config/lib",
    "@boilerplates/config-vite": "github:boilerbuilder/config/vite",
    "@boilerplates/config-code-quality": "github:boilerbuilder/config/code-quality",
    "@boilerplates/config-testing": "github:boilerbuilder/config/testing"
  }
}
```
4. In each template's configuration files, extend from the respective configuration module:
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@boilerplates/config-react/vite.config';

export default defineConfig({
  ...react,
  // Additional template-specific Vite configuration
});
```
5. Commit and push the changes to the @boilerplates repository.

### Usage
When creating a new project from a boilerplate template:
1. Clone the template repository.
2. Run npm install to install the template dependencies, including the referenced configuration modules.
3. The template's configuration files will automatically extend from the installed configuration modules.

### Benefits
- Centralized maintenance of configurations: Configuration modules are maintained in a single place, making it easier to update and keep them in sync across templates.
- Code reuse: Configuration modules promote code reuse by extracting common configurations into separate packages.
- Consistency: Templates that use the same configuration modules will have consistent configurations, ensuring a uniform development experience.
- Flexibility: Templates can selectively include the required configuration modules based on their specific needs.
- Versioning: Configuration modules can be versioned independently, allowing templates to upgrade to newer versions when needed.

### Conclusion
By introducing configuration modules, we can streamline the management of our boilerplate templates, promote code reuse, and ensure consistency across projects. This modular approach allows for easier maintenance, flexibility, and scalability as our collection of templates grows.

The implementation steps outlined above provide a clear roadmap for setting up the configuration modules and integrating them into our existing boilerplate templates. By following this architecture and leveraging the power of shared configurations, we can create a more efficient and maintainable boilerplate ecosystem.