import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import { program } from 'commander';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the main configuration file
const CONFIG_PATH = path.join(__dirname, 'config', 'boilerplate-config.json');
let config;

// Load the configuration file
try {
  config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
} catch (error) {
  console.warn(`Warning: Could not read ${CONFIG_PATH}. Using empty config.`);
  config = {};
}

// Safely read and parse a JSON file
function safeReadJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(path.join(__dirname, filePath), 'utf8'));
  } catch (error) {
    console.warn(`Warning: Could not read ${filePath}. Skipping.`);
    return {};
  }
}

// Ensure a directory exists, creating it if necessary
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirpSync(dir);
    console.log(`Created directory: ${dir}`);
  }
}

// Merge two ESLint configurations
function mergeEslintConfigs(baseConfig, specificConfig) {
  const mergedConfig = { ...baseConfig };

  // Merge extends
  if (specificConfig.extends) {
    mergedConfig.extends = [
      ...(baseConfig.extends || []),
      ...(Array.isArray(specificConfig.extends) ? specificConfig.extends : [specificConfig.extends]),
    ];
  }

  // Merge plugins
  if (specificConfig.plugins) {
    mergedConfig.plugins = [
      ...(baseConfig.plugins || []),
      ...(Array.isArray(specificConfig.plugins) ? specificConfig.plugins : [specificConfig.plugins]),
    ];
  }

  // Merge rules
  if (specificConfig.rules) {
    mergedConfig.rules = { ...(baseConfig.rules || {}), ...specificConfig.rules };
  }

  return mergedConfig;
}

// Merge package.json files based on project selections
export function mergePackageJsons(selections) {
  console.log('Merging package.json files...');
  let mergedPackageJson = {
    dependencies: {},
    devDependencies: {},
    scripts: {}
  };

  function mergePackageProperties(source) {
    if (source.dependencies) {
      mergedPackageJson.dependencies = { ...mergedPackageJson.dependencies, ...source.dependencies };
    }
    if (source.devDependencies) {
      mergedPackageJson.devDependencies = { ...mergedPackageJson.devDependencies, ...source.devDependencies };
    }
    if (source.scripts) {
      mergedPackageJson.scripts = { ...mergedPackageJson.scripts, ...source.scripts };
    }
    // Merge other top-level properties
    for (const [key, value] of Object.entries(source)) {
      if (!['dependencies', 'devDependencies', 'scripts'].includes(key)) {
        mergedPackageJson[key] = value;
      }
    }
  }

  // Merge base project package.json
  let basePackageJsonPath;
  if (selections.projectType === 'ssr') {
    basePackageJsonPath = 'config/base/next/package.json';
  } else {
    basePackageJsonPath = `config/frameworks/${selections.framework}/package.json`;
  }
  console.log(`Merging base ${selections.projectType} package.json...`);
  mergePackageProperties(safeReadJson(basePackageJsonPath));

  // Merge project type specific package.json
  if (selections.projectType !== 'ssr') {
    const projectTypePackageJsonPath = `config/frameworks/${selections.framework}/${selections.projectType}/package.json`;
    console.log(`Merging ${selections.projectType} ${selections.framework} package.json...`);
    mergePackageProperties(safeReadJson(projectTypePackageJsonPath));
  }

  // Merge language package.json
  const languageConfig = config.languages[selections.language];
  if (languageConfig) {
    console.log(`Merging ${selections.language} package.json...`);
    mergePackageProperties(safeReadJson(languageConfig.packageJson));
  }

  // Merge tool package.jsons
  selections.tools.forEach(tool => {
    const toolConfig = config.additionalTools.find(t => t.name === tool);
    if (toolConfig) {
      console.log(`Merging ${tool} package.json...`);
      mergePackageProperties(safeReadJson(toolConfig.packageJson));
    }
  });

  console.log('Package.json files merged successfully.');
  return mergedPackageJson;
}

// Safely copy files or directories
function safeCopySync(src, dest, options = {}) {
  try {
    if (fs.existsSync(src)) {
      if (!options.dryRun) {
        fs.copySync(src, dest, options);
      }
      console.log(`${options.dryRun ? '[Dry run] Would copy' : 'Copied'} ${src} to ${dest}`);
    } else {
      console.warn(`Warning: Source directory not found: ${src}. Skipping.`);
    }
  } catch (error) {
    console.error(`Error copying from ${src} to ${dest}: ${error.message}`);
  }
}

// Copy template files based on project selections
export async function copyTemplateFiles(projectPath, selections, options) {
  console.log('Copying template files...');

  // Copy base project templates
  let baseTemplatePath;
  if (selections.projectType === 'ssr') {
    baseTemplatePath = 'config/base/next/template';
  } else {
    baseTemplatePath = `config/frameworks/${selections.framework}/template`;
  }
  
  if (fs.existsSync(path.join(__dirname, baseTemplatePath))) {
    console.log(`Copying base ${selections.projectType} templates...`);
    safeCopySync(path.join(__dirname, baseTemplatePath), projectPath, options);
  } else {
    console.log(`No base ${selections.projectType} templates found. Skipping.`);
  }

  // Copy project type specific templates (for non-SSR projects)
  if (selections.projectType !== 'ssr') {
    const projectTypeTemplatePath = `config/frameworks/${selections.framework}/${selections.projectType}/template`;
    console.log(`Copying ${selections.projectType} ${selections.framework} templates...`);
    safeCopySync(path.join(__dirname, projectTypeTemplatePath), projectPath, { ...options, overwrite: true });
  }

  // Copy language templates
  const languageConfig = config.languages[selections.language];
  if (languageConfig) {
    console.log(`Copying ${selections.language} templates...`);
    safeCopySync(path.join(__dirname, languageConfig.templatePath), projectPath, { ...options, overwrite: true });
  }

  // Copy additional tool templates
  selections.tools.forEach(tool => {
    const toolConfig = config.additionalTools.find(t => t.name === tool);
    if (toolConfig) {
      console.log(`Copying ${tool} templates...`);
      safeCopySync(path.join(__dirname, toolConfig.templatePath), projectPath, { ...options, overwrite: true });

      // Copy project type specific tool config if it exists
      const projectTypeToolConfigPath = `config/tools/${tool}/${selections.projectType}`;
      if (fs.existsSync(path.join(__dirname, projectTypeToolConfigPath))) {
        console.log(`Copying ${selections.projectType}-specific ${tool} config...`);
        safeCopySync(path.join(__dirname, projectTypeToolConfigPath), projectPath, { ...options, overwrite: true });
      }
    }
  });

  // Copy common templates
  if (config.commonTemplates) {
    console.log('Copying common templates...');
    safeCopySync(path.join(__dirname, config.commonTemplates), projectPath, { ...options, overwrite: true });
  }

  // Handle ESLint configuration
  if (selections.tools.includes('eslint')) {
    console.log('Merging ESLint configurations...');
    const baseEslintConfigPath = path.join(__dirname, 'config/tools/eslint/template/.eslintrc.js');
    const baseEslintConfig = await import(baseEslintConfigPath);
    let mergedEslintConfig = baseEslintConfig.default;

    // Merge framework-specific ESLint config if it exists
    const frameworkEslintPath = path.join(__dirname, `config/tools/eslint/variations/${selections.framework}/.eslintrc.js`);
    if (fs.existsSync(frameworkEslintPath)) {
      const frameworkEslintConfig = await import(frameworkEslintPath);
      mergedEslintConfig = mergeEslintConfigs(mergedEslintConfig, frameworkEslintConfig.default);
    }

    // Merge project type-specific ESLint config if it exists
    const typeEslintPath = path.join(__dirname, `config/tools/eslint/variations/${selections.projectType}/.eslintrc.js`);
    if (fs.existsSync(typeEslintPath)) {
      const typeEslintConfig = await import(typeEslintPath);
      mergedEslintConfig = mergeEslintConfigs(mergedEslintConfig, typeEslintConfig.default);
    }

    // Write the merged ESLint configuration
    const eslintConfigPath = path.join(projectPath, '.eslintrc.js');
    fs.writeFileSync(eslintConfigPath, `export default ${JSON.stringify(mergedEslintConfig, null, 2)}`);
    console.log(`ESLint configuration written to ${eslintConfigPath}`);
  }

  console.log('All template files copied successfully.');
}

// Validate that all necessary resources exist
export function validateResources() {
  console.log('Validating resources...');
  let isValid = true;
  const missingResources = [];

  function checkResource(resourcePath, type) {
    const fullPath = path.join(__dirname, resourcePath);
    if (!fs.existsSync(fullPath)) {
      isValid = false;
      missingResources.push(`${type}: ${resourcePath}`);
    }
  }

  // Check project types, frameworks, and languages
  Object.entries(config.projectTypes || {}).forEach(([projectType, projectTypeConfig]) => {
    if (projectType === 'ssr') {
      checkResource('config/base/next/template', 'SSR template');
      checkResource('config/base/next/package.json', 'SSR package.json');
    } else {
      Object.entries(projectTypeConfig.frameworks || {}).forEach(([framework, frameworkConfig]) => {
        checkResource(frameworkConfig.templatePath, `${projectType} ${framework} template`);
        checkResource(frameworkConfig.packageJson, `${projectType} ${framework} package.json`);
      });
    }
  });

  // Check languages
  Object.entries(config.languages || {}).forEach(([language, languageConfig]) => {
    checkResource(languageConfig.templatePath, `${language} template`);
    checkResource(languageConfig.packageJson, `${language} package.json`);
  });

  // Check additional tools
  (config.additionalTools || []).forEach(tool => {
    checkResource(tool.templatePath, `${tool.name} template`);
    checkResource(tool.packageJson, `${tool.name} package.json`);
  });

  // Check common templates
  if (config.commonTemplates) {
    checkResource(config.commonTemplates, 'Common templates');
  }

  if (isValid) {
    console.log('All resources validated successfully.');
  } else {
    console.log('Resource validation failed.');
  }

  return { isValid, missingResources };
}

// Main function to generate the boilerplate
async function generateBoilerplate(options) {
  try {
    console.log('Starting boilerplate generation...');
    const { isValid, missingResources } = validateResources();
    if (!isValid) {
      console.error('Error: The following resources are missing:');
      missingResources.forEach(resource => console.error(`- ${resource}`));
      console.error('Please ensure all necessary files and directories are present before running the script.');
      return;
    }

    let answers = options;

    // Prompt for missing information
    if (!options.projectName || !options.projectType || !options.tools) {
      console.log('Starting interactive prompt for project configuration...');
      const promptAnswers = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'Enter the project name:',
          default: 'my-project',
          when: !options.projectName
        },
        {
          type: 'list',
          name: 'projectType',
          message: 'Select project type:',
          choices: Object.keys(config.projectTypes || {}),
          when: !options.projectType
        },
        {
          type: 'checkbox',
          name: 'tools',
          message: 'Select additional tools:',
          choices: config.additionalTools.map(tool => tool.name),
          when: !options.tools || options.tools.length === 0
        }
      ]);
      answers = { ...options, ...promptAnswers };

      // Only prompt for framework and language if it's not an SSR project
      if (answers.projectType !== 'ssr' && (!options.framework || !options.language)) {
        const additionalPrompts = await inquirer.prompt([
          {
            type: 'list',
            name: 'framework',
            message: 'Select a framework:',
            choices: Object.keys(config.projectTypes[answers.projectType].frameworks || {}),
            when: !options.framework
          },
          {
            type: 'list',
            name: 'language',
            message: 'Select a language:',
            choices: (answers) => {
              const framework = answers.framework || options.framework;
              return config.projectTypes[answers.projectType].frameworks[framework].languages || [];
            },
            when: !options.language
          }
        ]);
        answers = { ...answers, ...additionalPrompts };
      }

      console.log('Interactive prompt completed.');
    }

    // Set default values for SSR projects
    if (answers.projectType === 'ssr') {
      answers.framework = 'react';
      answers.language = 'typescript';
    }

    console.log('Generating boilerplate with the following configuration:');
    console.log(JSON.stringify(answers, null, 2));

    const projectPath = path.join(process.cwd(), answers.projectName);
    console.log(`${options.dryRun ? '[Dry run] Would create' : 'Creating'} project directory: ${projectPath}`);
    if (!options.dryRun) {
      ensureDirectoryExists(projectPath);
    }

    const mergedPackageJson = mergePackageJsons(answers);
    await copyTemplateFiles(projectPath, answers, { dryRun: options.dryRun });

    // Write the final package.json
    console.log(`${options.dryRun ? '[Dry run] Would write' : 'Writing'} final package.json...`);
    if (!options.dryRun) {
      fs.writeJsonSync(path.join(projectPath, 'package.json'), {
        name: answers.projectName,
        version: '1.0.0',
        private: true,
        ...mergedPackageJson
      }, { spaces: 2 });
    }

    console.log(`Boilerplate ${options.dryRun ? 'would be' : 'was'} generated successfully in ${projectPath}!`);
    if (!options.dryRun) {
      console.log('You can now cd into your project directory and start working on your project.');
      console.log(`To get started, run the following commands:
      cd ${answers.projectName}
      yarn install
      yarn start`);
    }
  } catch (error) {
    console.error('An error occurred during boilerplate generation:', error);
  }
}

// Set up command-line interface
program
  .version('1.0.0')
  .description('Generate a project boilerplate')
  .option('-n, --project-name <n>', 'Project name')
  .option('-t, --project-type <type>', 'Project type (ssr, spa, lib)')
  .option('-f, --framework <framework>', 'Framework')
  .option('-l, --language <language>', 'Programming language')
  .option('--tools <tools...>', 'Additional tools')
  .option('-d, --dry-run', 'Perform a dry run without creating files')
  .action((options) => {
    generateBoilerplate(options);
  });

program.parse(process.argv);
