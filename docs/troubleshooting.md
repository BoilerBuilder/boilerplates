# Troubleshooting Guide

This guide provides solutions to common issues you might encounter when using the Boilerplate Generator.

## Table of Contents

1. [Missing Dependencies](#missing-dependencies)
2. [Template Not Found](#template-not-found)
3. [ESLint Configuration Errors](#eslint-configuration-errors)
4. [Merge Conflicts in package.json](#merge-conflicts-in-packagejson)
5. [Invalid Project Type or Framework](#invalid-project-type-or-framework)

## Missing Dependencies

**Problem**: You encounter errors related to missing dependencies when running the generator.

**Solution**: 
1. Ensure you have Node.js (version 12 or higher) installed.
2. Run `yarn install` in the project root directory to install all required dependencies.
3. If the issue persists, try deleting the `node_modules` folder and `yarn.lock` file, then run `yarn install` again.

## Template Not Found

**Problem**: The generator reports that a template file or directory is not found.

**Solution**:
1. Check that all template files and directories exist in the `config/` directory.
2. Verify that the paths in `config/boilerplate-config.json` are correct and match the actual file structure.
3. If you've added a new template, make sure it's properly referenced in the configuration file.

## ESLint Configuration Errors

**Problem**: The generated ESLint configuration is causing errors or unexpected behavior.

**Solution**:
1. Check the ESLint configuration files in `config/tools/eslint/` for any syntax errors.
2. Ensure that all referenced ESLint plugins and configurations are included in the `package.json` file.
3. Verify that the merging of ESLint configurations in `generate-boilerplate.js` is working correctly for your specific project type and framework.

## Merge Conflicts in package.json

**Problem**: The generated `package.json` file has conflicting or duplicate entries.

**Solution**:
1. Review the `mergePackageJsons` function in `generate-boilerplate.js` to ensure it's correctly merging properties.
2. Check for duplicate entries in the source `package.json` files for your project type, framework, and selected tools.
3. If necessary, manually resolve conflicts in the source `package.json` files.

## Invalid Project Type or Framework

**Problem**: The generator doesn't recognize the specified project type or framework.

**Solution**:
1. Check that you're using a valid project type and framework as defined in `config/boilerplate-config.json`.
2. If you're using command-line options, ensure they match the expected values (e.g., `-t ssr` for SSR projects).
3. If you've added a new project type or framework, make sure it's properly added to the configuration file and all necessary templates are in place.

If you encounter any issues not covered in this guide, please [open an issue](https://github.com/yourusername/boilerplate-generator/issues/new) on the GitHub repository.