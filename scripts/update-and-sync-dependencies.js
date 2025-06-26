#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { updateAllTemplates } = require('./update-dependencies.js');

// ANSI color codes for better console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Utility function to log with colors
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Function to execute command and return output
function executeCommand(command, options = {}) {
  try {
    const result = execSync(command, { 
      encoding: 'utf8', 
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options 
    });
    return { success: true, output: result };
  } catch (error) {
    return { 
      success: false, 
      error: error.message, 
      output: error.stdout || error.stderr || '' 
    };
  }
}

// Function to check if npm-check-updates is available
function ensureNpmCheckUpdates() {
  log('🔍 Checking if npm-check-updates is available...', 'blue');
  
  const checkResult = executeCommand('npx npm-check-updates --version', { silent: true });
  
  if (!checkResult.success) {
    log('⚠️  npm-check-updates not found. Installing...', 'yellow');
    const installResult = executeCommand('npm install -g npm-check-updates');
    
    if (!installResult.success) {
      log('❌ Failed to install npm-check-updates. Please install it manually:', 'red');
      log('npm install -g npm-check-updates', 'yellow');
      process.exit(1);
    }
  }
  
  log('✅ npm-check-updates is available', 'green');
}

// Function to get all unique dependencies from config
function getAllDependenciesFromConfig() {
  const configPath = path.join(__dirname, '../dependencies.config.js');
  delete require.cache[require.resolve(configPath)]; // Clear cache
  const config = require(configPath);
  
  const allDeps = {
    dependencies: {},
    devDependencies: {},
    peerDependencies: {}
  };

  // Collect from common section
  if (config.common) {
    Object.assign(allDeps.dependencies, config.common.dependencies || {});
    Object.assign(allDeps.devDependencies, config.common.devDependencies || {});
    Object.assign(allDeps.peerDependencies, config.common.peerDependencies || {});
  }

  // Collect from frameworks
  if (config.frameworks) {
    Object.values(config.frameworks).forEach(framework => {
      Object.assign(allDeps.dependencies, framework.dependencies || {});
      Object.assign(allDeps.devDependencies, framework.devDependencies || {});
      Object.assign(allDeps.peerDependencies, framework.peerDependencies || {});
    });
  }

  // Collect from build tools
  if (config.buildTools) {
    Object.values(config.buildTools).forEach(tool => {
      Object.assign(allDeps.dependencies, tool.dependencies || {});
      Object.assign(allDeps.devDependencies, tool.devDependencies || {});
      Object.assign(allDeps.peerDependencies, tool.peerDependencies || {});
    });
  }

  // Collect from templates
  if (config.templates) {
    Object.values(config.templates).forEach(template => {
      if (template.customDependencies) {
        Object.assign(allDeps.dependencies, template.customDependencies.dependencies || {});
        Object.assign(allDeps.devDependencies, template.customDependencies.devDependencies || {});
        Object.assign(allDeps.peerDependencies, template.customDependencies.peerDependencies || {});
      }
    });
  }

  return allDeps;
}

// Function to create temporary package.json for checking updates
function createTempPackageJson(dependencies) {
  const tempPackage = {
    name: "temp-update-check",
    version: "1.0.0",
    dependencies: dependencies.dependencies,
    devDependencies: dependencies.devDependencies,
    peerDependencies: dependencies.peerDependencies
  };

  // Remove empty sections
  Object.keys(tempPackage).forEach(key => {
    if (typeof tempPackage[key] === 'object' && Object.keys(tempPackage[key]).length === 0) {
      delete tempPackage[key];
    }
  });

  const tempDir = path.join(__dirname, '../temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  const tempPackagePath = path.join(tempDir, 'package.json');
  fs.writeFileSync(tempPackagePath, JSON.stringify(tempPackage, null, 2));
  
  return { tempDir, tempPackagePath };
}

// Function to check for updates using npm-check-updates
function checkForUpdates(dependencies, targetLevel = 'latest') {
  log('\n🔄 Checking for dependency updates...', 'blue');
  
  const { tempDir, tempPackagePath } = createTempPackageJson(dependencies);
  
  try {
    // Change to temp directory and run ncu
    process.chdir(tempDir);
    
    // Build command with target level
    const targetFlag = targetLevel === 'minor' ? '--target minor' : 
                      targetLevel === 'patch' ? '--target patch' : '';
    
    // Check for updates without modifying
    log(`📋 Available updates (${targetLevel === 'minor' ? 'minor & patch only' : targetLevel === 'patch' ? 'patch only' : 'all versions'}):`, 'cyan');
    const checkResult = executeCommand(`npx npm-check-updates --format group ${targetFlag}`);
    
    if (!checkResult.success) {
      log('⚠️  Error checking for updates', 'yellow');
      return null;
    }

    // Get updates in JSON format
    const updatesResult = executeCommand(`npx npm-check-updates --jsonUpgraded ${targetFlag}`, { silent: true });
    
    let updates = {};
    if (updatesResult.success && updatesResult.output.trim()) {
      try {
        updates = JSON.parse(updatesResult.output);
      } catch (e) {
        log('⚠️  Could not parse update results', 'yellow');
      }
    }

    return updates;
    
  } finally {
    // Clean up and return to original directory
    process.chdir(path.join(__dirname, '..'));
    if (fs.existsSync(tempPackagePath)) {
      fs.unlinkSync(tempPackagePath);
    }
    if (fs.existsSync(tempDir)) {
      fs.rmdirSync(tempDir);
    }
  }
}

// Function to check for security vulnerabilities
function checkSecurityVulnerabilities(dependencies) {
  log('\n🔒 Checking for security vulnerabilities...', 'blue');
  
  const { tempDir, tempPackagePath } = createTempPackageJson(dependencies);
  
  try {
    process.chdir(tempDir);
    
    // Install dependencies to create package-lock.json
    log('📦 Installing dependencies for audit...', 'cyan');
    const installResult = executeCommand('npm install --package-lock-only', { silent: true });
    
    if (!installResult.success) {
      log('⚠️  Could not install dependencies for audit', 'yellow');
      return { vulnerabilities: [], fixes: [] };
    }

    // Run audit
    log('🔍 Running security audit...', 'cyan');
    const auditResult = executeCommand('npm audit --json', { silent: true });
    
    let auditData = { vulnerabilities: {}, metadata: {} };
    if (auditResult.output) {
      try {
        auditData = JSON.parse(auditResult.output);
      } catch (e) {
        log('⚠️  Could not parse audit results', 'yellow');
      }
    }

    // Check for available fixes
    const fixResult = executeCommand('npm audit fix --dry-run --json', { silent: true });
    let fixData = { actions: [] };
    if (fixResult.output) {
      try {
        fixData = JSON.parse(fixResult.output);
      } catch (e) {
        // Ignore parse errors for fix data
      }
    }

    const vulnerabilities = Object.entries(auditData.vulnerabilities || {})
      .map(([name, vuln]) => ({
        name,
        severity: vuln.severity,
        range: vuln.range,
        via: vuln.via
      }));

    const fixes = fixData.actions || [];

    if (vulnerabilities.length > 0) {
      log(`🚨 Found ${vulnerabilities.length} security vulnerabilities:`, 'red');
      vulnerabilities.forEach(vuln => {
        log(`   ${vuln.name}: ${vuln.severity} severity`, 'yellow');
      });
    } else {
      log('✅ No security vulnerabilities found', 'green');
    }

    return { vulnerabilities, fixes };
    
  } finally {
    // Clean up
    process.chdir(path.join(__dirname, '..'));
    ['package.json', 'package-lock.json', 'node_modules'].forEach(item => {
      const itemPath = path.join(tempDir, item);
      if (fs.existsSync(itemPath)) {
        if (fs.statSync(itemPath).isDirectory()) {
          fs.rmSync(itemPath, { recursive: true, force: true });
        } else {
          fs.unlinkSync(itemPath);
        }
      }
    });
    if (fs.existsSync(tempDir)) {
      fs.rmdirSync(tempDir);
    }
  }
}

// Function to update dependencies in config file
function updateDependenciesInConfig(updates) {
  if (!updates || Object.keys(updates).length === 0) {
    log('✅ No updates to apply', 'green');
    return;
  }

  log('\n📝 Updating dependencies.config.js...', 'blue');
  
  const configPath = path.join(__dirname, '../dependencies.config.js');
  let configContent = fs.readFileSync(configPath, 'utf8');

  // Apply updates
  Object.entries(updates).forEach(([packageName, newVersion]) => {
    const oldVersionRegex = new RegExp(`"${packageName}":\\s*"[^"]*"`, 'g');
    const newVersionString = `"${packageName}": "${newVersion}"`;
    
    const matches = configContent.match(oldVersionRegex);
    if (matches) {
      // Replace all occurrences
      configContent = configContent.replace(oldVersionRegex, newVersionString);
      log(`   Updated ${packageName}: ${newVersion}`, 'green');
    }
  });

  // Write updated config
  fs.writeFileSync(configPath, configContent);
  log('✅ Dependencies configuration updated', 'green');
}

// Function to prompt user for confirmation
function promptUser(question) {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase().startsWith('y'));
    });
  });
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const autoApply = args.includes('--auto-apply');
  const minorOnly = args.includes('--minor');
  const patchOnly = args.includes('--patch');

  // Determine target level
  const targetLevel = patchOnly ? 'patch' : minorOnly ? 'minor' : 'latest';

  log('🚀 Starting dependency update and sync process...', 'bright');
  
  if (dryRun) {
    log('📋 Running in DRY RUN mode - no changes will be made', 'yellow');
  }
  
  if (minorOnly) {
    log('🔒 Minor updates only - major versions will be skipped', 'yellow');
  } else if (patchOnly) {
    log('🔒 Patch updates only - minor and major versions will be skipped', 'yellow');
  }

  // Ensure npm-check-updates is available
  ensureNpmCheckUpdates();

  // Get all dependencies from config
  const allDependencies = getAllDependenciesFromConfig();
  
  log(`\n📊 Found dependencies in config:`, 'cyan');
  log(`   Regular: ${Object.keys(allDependencies.dependencies).length}`, 'cyan');
  log(`   Development: ${Object.keys(allDependencies.devDependencies).length}`, 'cyan');
  log(`   Peer: ${Object.keys(allDependencies.peerDependencies).length}`, 'cyan');

  // Check for updates
  const updates = checkForUpdates(allDependencies, targetLevel);
  
  // Check for security vulnerabilities
  const security = checkSecurityVulnerabilities(allDependencies);

  // Summary
  const updateCount = updates ? Object.keys(updates).length : 0;
  const vulnerabilityCount = security.vulnerabilities.length;

  log('\n📋 Summary:', 'bright');
  log(`   Available updates: ${updateCount}`, updateCount > 0 ? 'yellow' : 'green');
  log(`   Security vulnerabilities: ${vulnerabilityCount}`, vulnerabilityCount > 0 ? 'red' : 'green');

  if (updateCount === 0 && vulnerabilityCount === 0) {
    log('\n✅ All dependencies are up to date and secure!', 'green');
    return;
  }

  if (dryRun) {
    log('\n📋 DRY RUN completed - no changes made', 'yellow');
    return;
  }

  // Ask for confirmation unless auto-apply is enabled
  let shouldApply = autoApply;
  
  if (!shouldApply && (updateCount > 0 || vulnerabilityCount > 0)) {
    shouldApply = await promptUser('\n❓ Do you want to apply these updates? (y/N): ');
  }

  if (shouldApply) {
    // Apply updates
    if (updateCount > 0) {
      updateDependenciesInConfig(updates);
    }

    // Propagate to templates
    log('\n🔄 Propagating changes to templates...', 'blue');
    updateAllTemplates();

    log('\n🎉 Update and sync process completed successfully!', 'green');
    
    if (vulnerabilityCount > 0) {
      log('\n⚠️  Note: Some security vulnerabilities may require manual intervention.', 'yellow');
      log('   Run "npm audit" in individual template directories for more details.', 'yellow');
    }
  } else {
    log('\n⏭️  Updates skipped by user', 'yellow');
  }
}

// Run the script
if (require.main === module) {
  main().catch(error => {
    log(`❌ Error: ${error.message}`, 'red');
    process.exit(1);
  });
}

module.exports = { main }; 