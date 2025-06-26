#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const config = require('../dependencies.config.js');

// Utility function to deep merge objects
function deepMerge(target, source) {
  const result = { ...target };
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

// Function to sort object keys
function sortObjectKeys(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  return Object.keys(obj).sort().reduce((result, key) => {
    result[key] = obj[key];
    return result;
  }, {});
}

// Function to merge dependencies for a specific template
function buildTemplateDependencies(templateName, templateConfig) {
  let mergedConfig = {
    dependencies: {},
    devDependencies: {},
    peerDependencies: {},
    engines: {}
  };

  // 1. Start with common configuration
  mergedConfig = deepMerge(mergedConfig, config.common);

  // 2. Add framework-specific dependencies
  if (templateConfig.frameworks) {
    templateConfig.frameworks.forEach(framework => {
      if (config.frameworks[framework]) {
        mergedConfig = deepMerge(mergedConfig, config.frameworks[framework]);
      }
    });
  }

  // 3. Add build tool dependencies
  if (templateConfig.buildTools) {
    templateConfig.buildTools.forEach(tool => {
      if (config.buildTools[tool]) {
        mergedConfig = deepMerge(mergedConfig, config.buildTools[tool]);
      }
    });
  }

  // 4. Add custom dependencies (template-specific)
  if (templateConfig.customDependencies) {
    mergedConfig = deepMerge(mergedConfig, templateConfig.customDependencies);
  }

  // Sort dependencies alphabetically
  mergedConfig.dependencies = sortObjectKeys(mergedConfig.dependencies);
  mergedConfig.devDependencies = sortObjectKeys(mergedConfig.devDependencies);
  mergedConfig.peerDependencies = sortObjectKeys(mergedConfig.peerDependencies);

  return mergedConfig;
}

// Function to update a template's package.json
function updateTemplatePackageJson(templatePath, templateName, templateConfig) {
  const packageJsonPath = path.join(templatePath, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.warn(`⚠️  Package.json not found for template: ${templateName}`);
    return;
  }

  // Read existing package.json
  const existingPackageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Build merged dependencies from central config
  const centralDeps = buildTemplateDependencies(templateName, templateConfig);
  
  // Merge dependencies properly - preserve existing + add/update from central config
  const mergedDependencies = {
    ...(existingPackageJson.dependencies || {}),
    ...(centralDeps.dependencies || {})
  };
  
  const mergedDevDependencies = {
    ...(existingPackageJson.devDependencies || {}),
    ...(centralDeps.devDependencies || {})
  };
  
  const mergedPeerDependencies = {
    ...(existingPackageJson.peerDependencies || {}),
    ...(centralDeps.peerDependencies || {})
  };
  
  // We'll construct the final package.json in the ordered section below

  // Preserve specific fields in their original order
  const orderedPackageJson = {
    name: existingPackageJson.name,
    version: existingPackageJson.version,
    ...(existingPackageJson.private && { private: existingPackageJson.private }),
    ...(existingPackageJson.type && { type: existingPackageJson.type }),
    ...(existingPackageJson.description && { description: existingPackageJson.description }),
    ...(existingPackageJson.main && { main: existingPackageJson.main }),
    ...(existingPackageJson.module && { module: existingPackageJson.module }),
    ...(existingPackageJson.types && { types: existingPackageJson.types }),
    ...(existingPackageJson.exports && { exports: existingPackageJson.exports }),
    ...(existingPackageJson.files && { files: existingPackageJson.files }),
    ...(existingPackageJson.scripts && { scripts: existingPackageJson.scripts }),
    ...(existingPackageJson['lint-staged'] && { 'lint-staged': existingPackageJson['lint-staged'] }),
    ...(existingPackageJson.browserslist && { browserslist: existingPackageJson.browserslist }),
    ...(Object.keys(mergedDependencies).length > 0 && { dependencies: sortObjectKeys(mergedDependencies) }),
    ...(Object.keys(mergedDevDependencies).length > 0 && { devDependencies: sortObjectKeys(mergedDevDependencies) }),
    ...(Object.keys(mergedPeerDependencies).length > 0 && { peerDependencies: sortObjectKeys(mergedPeerDependencies) }),
    ...(centralDeps.engines && { engines: centralDeps.engines }),
    ...(existingPackageJson.author && { author: existingPackageJson.author }),
    ...(existingPackageJson.license && { license: existingPackageJson.license }),
    ...(existingPackageJson.keywords && { keywords: existingPackageJson.keywords })
  };

  // Write updated package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(orderedPackageJson, null, 2) + '\n');
  console.log(`✅ Updated dependencies for: ${templateName}`);
}

// Main function
function updateAllTemplates() {
  console.log('🚀 Starting dependency update process...\n');
  
  const templatesDir = path.join(__dirname, '../templates');
  
  if (!fs.existsSync(templatesDir)) {
    console.error('❌ Templates directory not found!');
    process.exit(1);
  }

  let updatedCount = 0;
  let skippedCount = 0;

  // Process each template
  for (const [templateName, templateConfig] of Object.entries(config.templates)) {
    const templatePath = path.join(templatesDir, templateName);
    
    if (fs.existsSync(templatePath) && fs.statSync(templatePath).isDirectory()) {
      updateTemplatePackageJson(templatePath, templateName, templateConfig);
      updatedCount++;
    } else {
      console.warn(`⚠️  Template directory not found: ${templateName}`);
      skippedCount++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Updated: ${updatedCount} templates`);
  if (skippedCount > 0) {
    console.log(`   Skipped: ${skippedCount} templates`);
  }
  console.log('\n✨ Dependencies update completed!');
}

// Run the script
if (require.main === module) {
  updateAllTemplates();
}

module.exports = { updateAllTemplates, buildTemplateDependencies }; 