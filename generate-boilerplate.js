const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');

const CONFIG_PATH = path.join(__dirname, 'config', 'boilerplate-config.json');
const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));

function safeReadJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(path.join(__dirname, filePath), 'utf8'));
  } catch (error) {
    console.warn(`Warning: Could not read ${filePath}. Skipping.`);
    return {};
  }
}

function mergePackageJsons(selections) {
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
  }

  // Merge base project package.json
  mergePackageProperties(safeReadJson(selections.baseProject.packageJson));

  if (selections.baseProject.name === 'vite') {
    // Merge Vite variant package.json
    mergePackageProperties(safeReadJson(selections.baseProject.variants[selections.projectType].packageJson));
  }

  // Merge framework package.json
  if (selections.framework) {
    mergePackageProperties(safeReadJson(config.frameworks[selections.framework].packageJson));
    
    // Merge framework-specific variant package.json
    const variantPackageJson = selections.projectType === 'lib' 
      ? config.frameworks[selections.framework].lib.packageJson
      : config.frameworks[selections.framework].spa.packageJson;
    mergePackageProperties(safeReadJson(variantPackageJson));
  }

  // Merge language package.json
  if (selections.language) {
    const languageConfig = config.languages.find(lang => lang.name === selections.language);
    mergePackageProperties(safeReadJson(languageConfig.packageJson));
  }

  // Merge tool package.jsons
  selections.tools.forEach(tool => {
    const toolConfig = config.additionalTools.find(t => t.name === tool);
    mergePackageProperties(safeReadJson(toolConfig.packageJson));
  });

  return mergedPackageJson;
}

function safeCopySync(src, dest, options = {}) {
  try {
    if (fs.existsSync(src)) {
      fs.copySync(src, dest, options);
    } else {
      console.warn(`Warning: Source directory not found: ${src}. Skipping.`);
    }
  } catch (error) {
    console.error(`Error copying from ${src} to ${dest}: ${error.message}`);
  }
}

function copyTemplateFiles(projectPath, selections) {
  // Copy base project templates
  if (selections.baseProject.name === 'vite') {
    safeCopySync(path.join(__dirname, selections.baseProject.variants[selections.projectType].templatePath), projectPath);
  } else {
    safeCopySync(path.join(__dirname, selections.baseProject.templatePath), projectPath);
  }

  // Copy framework templates if applicable
  if (selections.framework) {
    const frameworkTemplatePath = selections.projectType === 'lib' 
      ? config.frameworks[selections.framework].lib.templatePath
      : config.frameworks[selections.framework].spa.templatePath;
    safeCopySync(path.join(__dirname, frameworkTemplatePath), projectPath, { overwrite: true });
  }

  // Copy language templates
  const languageConfig = config.languages.find(lang => lang.name === selections.language);
  safeCopySync(path.join(__dirname, languageConfig.templatePath), projectPath, { overwrite: true });

  // Copy additional tool templates
  selections.tools.forEach(tool => {
    const toolConfig = config.additionalTools.find(t => t.name === tool);
    safeCopySync(path.join(__dirname, toolConfig.templatePath), projectPath, { overwrite: true });
  });

  // Copy common templates
  safeCopySync(path.join(__dirname, config.commonTemplates), projectPath, { overwrite: true });
}

function validateResources() {
  let isValid = true;
  const missingResources = [];

  function checkResource(resourcePath, type) {
    const fullPath = path.join(__dirname, resourcePath);
    if (!fs.existsSync(fullPath)) {
      isValid = false;
      missingResources.push(`${type}: ${resourcePath}`);
    }
  }

  // Check base projects
  config.baseProjects.forEach(project => {
    if (project.name === 'vite') {
      checkResource(project.packageJson, 'Base project package.json');
      Object.values(project.variants).forEach(variant => {
        checkResource(variant.templatePath, 'Variant template');
        checkResource(variant.packageJson, 'Variant package.json');
      });
    } else {
      checkResource(project.templatePath, 'Base project template');
      checkResource(project.packageJson, 'Base project package.json');
    }
  });

  // Check frameworks
  Object.values(config.frameworks).forEach(framework => {
    checkResource(framework.packageJson, 'Framework package.json');
    if (framework.spa) checkResource(framework.spa.templatePath, 'Framework SPA template');
    if (framework.lib) checkResource(framework.lib.templatePath, 'Framework Library template');
  });

  // Check languages
  config.languages.forEach(lang => {
    checkResource(lang.templatePath, 'Language template');
    checkResource(lang.packageJson, 'Language package.json');
  });

  // Check additional tools
  config.additionalTools.forEach(tool => {
    checkResource(tool.templatePath, 'Tool template');
    checkResource(tool.packageJson, 'Tool package.json');
  });

  // Check common templates
  checkResource(config.commonTemplates, 'Common templates');

  return { isValid, missingResources };
}

async function generateBoilerplate() {
  try {
    const { isValid, missingResources } = validateResources();
    if (!isValid) {
      console.error('Error: The following resources are missing:');
      missingResources.forEach(resource => console.error(`- ${resource}`));
      console.error('Please ensure all necessary files and directories are present before running the script.');
      return;
    }

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Enter the project name:',
        default: 'my-project'
      },
      {
        type: 'list',
        name: 'baseProject',
        message: 'Select a base project:',
        choices: config.baseProjects.map(project => ({ name: project.name, value: project }))
      },
      {
        type: 'list',
        name: 'projectType',
        message: 'Select project type:',
        choices: (answers) => answers.baseProject.type,
        when: (answers) => Array.isArray(answers.baseProject.type)
      },
      {
        type: 'list',
        name: 'framework',
        message: 'Select a framework:',
        choices: (answers) => answers.baseProject.frameworks,
        when: (answers) => answers.baseProject.frameworks && answers.baseProject.frameworks.length > 0
      },
      {
        type: 'list',
        name: 'language',
        message: 'Select a language:',
        choices: (answers) => answers.baseProject.languages,
        when: (answers) => answers.baseProject.languages && answers.baseProject.languages.length > 1
      },
      {
        type: 'checkbox',
        name: 'tools',
        message: 'Select additional tools:',
        choices: config.additionalTools.map(tool => tool.name)
      }
    ]);

    console.log('Generating boilerplate with the following configuration:');
    console.log(JSON.stringify(answers, null, 2));

    const projectPath = path.join(process.cwd(), answers.projectName);
    fs.ensureDirSync(projectPath);

    const mergedPackageJson = mergePackageJsons(answers);
    copyTemplateFiles(projectPath, answers);

    // Write the final package.json
    fs.writeJsonSync(path.join(projectPath, 'package.json'), {
      name: answers.projectName,
      version: '1.0.0',
      private: true,
      ...mergedPackageJson
    }, { spaces: 2 });

    console.log(`Boilerplate generated successfully in ${projectPath}!`);
  } catch (error) {
    console.error('An error occurred during boilerplate generation:', error);
  }
}

generateBoilerplate().catch(console.error);