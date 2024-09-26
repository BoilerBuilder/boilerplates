# Configuration File Structure

This document explains the structure of the `config/boilerplate-config.json` file, which is the main configuration file for the Boilerplate Generator.

## Overview

The configuration file is a JSON object with the following top-level keys:

- `projectTypes`
- `languages`
- `additionalTools`
- `commonTemplates`

## Project Types

The `projectTypes` object contains configurations for different project types (e.g., SSR, SPA, library). Each project type has its own set of frameworks.

```json
{
  "projectTypes": {
    "ssr": {
      "frameworks": {
        "react": {
          "templatePath": "config/base/next/template",
          "packageJson": "config/base/next/package.json",
          "languages": ["typescript"]
        }
      }
    },
    "spa": {
      "frameworks": {
        "react": {
          "templatePath": "config/frameworks/react/spa/template",
          "packageJson": "config/frameworks/react/spa/package.json",
          "languages": ["javascript", "typescript"]
        },
        "vue": {
          "templatePath": "config/frameworks/vue/spa/template",
          "packageJson": "config/frameworks/vue/spa/package.json",
          "languages": ["javascript", "typescript"]
        }
      }
    },
    "lib": {
      "frameworks": {
        "react": {
          "templatePath": "config/frameworks/react/lib/template",
          "packageJson": "config/frameworks/react/lib/package.json",
          "languages": ["typescript"]
        }
      }
    }
  }
}
```

## Languages

The `languages` object contains configurations for different programming languages.

```json
{
  "languages": {
    "javascript": {
      "templatePath": "config/languages/javascript/template",
      "packageJson": "config/languages/javascript/package.json"
    },
    "typescript": {
      "templatePath": "config/languages/typescript/template",
      "packageJson": "config/languages/typescript/package.json"
    }
  }
}
```

## Additional Tools

The `additionalTools` array contains configurations for various tools that can be added to the project.

```json
{
  "additionalTools": [
    {
      "name": "eslint",
      "templatePath": "config/tools/eslint/template",
      "packageJson": "config/tools/eslint/package.json"
    },
    {
      "name": "prettier",
      "templatePath": "config/tools/prettier/template",
      "packageJson": "config/tools/prettier/package.json"
    }
  ]
}
```

## Common Templates

The `commonTemplates` key specifies the path to templates that are common across all project types.

```json
{
  "commonTemplates": "config/common/template"
}
```

## Extending the Configuration

To add new project types, frameworks, languages, or tools, simply add them to the appropriate section of the configuration file and create the corresponding directories and files in the `config/` directory.