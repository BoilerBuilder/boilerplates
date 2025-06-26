# Centralized Dependency Management

This document explains how to manage dependencies across all boilerplate templates using the centralized dependency system.

## Overview

The centralized dependency management system allows you to:
- Define common dependencies once and propagate them to all templates
- Organize dependencies by framework (React, Vue, TypeScript, etc.)
- Organize dependencies by build tools (Vite, Webpack, PostCSS, etc.)
- Maintain template-specific dependencies and configurations
- Keep all dependencies consistent and up-to-date across templates

## Files Structure

```
boilerplates/
├── dependencies.config.js    # Central configuration file
├── scripts/
│   └── update-dependencies.js  # Propagation script
└── templates/                # Individual template directories
    ├── next-app/
    ├── react-spa-vite/
    └── ...
```

## Configuration File (`dependencies.config.js`)

The configuration is organized into several sections:

### Common Dependencies
Dependencies shared across multiple templates (eslint, prettier, husky, etc.)

### Framework Dependencies
Dependencies specific to frameworks:
- `react`: React and React DOM + testing libraries
- `vue`: Vue + testing libraries  
- `typescript`: TypeScript + ESLint plugins
- `vite`: Vite + Vitest testing tools
- `nextjs`: Next.js specific dependencies

### Build Tools
Dependencies for build tools:
- `webpack`: Webpack core and CLI
- `postcss`: PostCSS and Autoprefixer
- `sass`: Sass and Stylelint tools

### Template-Specific Configuration
Each template can specify:
- Which frameworks to include
- Which build tools to include
- Custom dependencies unique to that template
- Custom scripts unique to that template

## Usage

### Update All Templates
To propagate the central configuration to all templates:

```bash
# Run the update script
yarn update-deps

# Or use the alias
yarn sync-deps
```

### Check for Dependency Updates
To check for available updates and security vulnerabilities:

```bash
# Check for ALL updates without making changes (dry run)
yarn check-updates

# Check for MINOR/PATCH updates only (recommended for safety)
yarn check-updates-minor

# Check for PATCH updates only (safest option)
yarn check-updates-patch

# Interactive update process (shows what will be updated and asks for confirmation)
yarn update-and-sync        # All updates
yarn update-minor           # Minor/patch only
yarn update-patch           # Patch only

# Automatically apply updates without confirmation
yarn auto-update            # All updates
yarn auto-update-minor      # Minor/patch only (recommended)
yarn auto-update-patch      # Patch only (safest)
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `yarn update-deps` | Propagate current config to all templates (no update checking) |
| `yarn sync-deps` | Alias for `update-deps` |
| `yarn check-deps` | Dry run of dependency propagation |
| `yarn check-updates` | Check for available updates and security issues (dry run) |
| `yarn check-updates-minor` | Check for minor/patch updates only (dry run) |
| `yarn check-updates-patch` | Check for patch updates only (dry run) |
| `yarn update-and-sync` | Interactive process to update all dependencies |
| `yarn update-minor` | Interactive process to update minor/patch versions only |
| `yarn update-patch` | Interactive process to update patch versions only |
| `yarn auto-update` | Automatically update all dependencies |
| `yarn auto-update-minor` | Automatically update minor/patch versions only |
| `yarn auto-update-patch` | Automatically update patch versions only |

### Adding New Dependencies

#### 1. Common Dependencies (shared across templates)
Edit `dependencies.config.js` and add to the `common` section:

```javascript
common: {
  devDependencies: {
    "eslint": "^8.57.0",
    "prettier": "^3.2.5",
    "new-common-tool": "^1.0.0"  // Add here
  }
}
```

#### 2. Framework Dependencies
Add to the appropriate framework section:

```javascript
frameworks: {
  react: {
    devDependencies: {
      "@testing-library/react": "^15.0.7",
      "new-react-tool": "^2.0.0"  // Add here
    }
  }
}
```

#### 3. Template-Specific Dependencies
Add to the specific template configuration:

```javascript
templates: {
  "react-spa-vite": {
    customDependencies: {
      dependencies: {
        "template-specific-lib": "^1.0.0"  // Add here
      }
    }
  }
}
```

### Adding New Templates

1. Create the template directory in `templates/`
2. Add configuration in `dependencies.config.js`:

```javascript
templates: {
  "new-template": {
    frameworks: ["react", "typescript"],  // Which frameworks to include
    buildTools: ["vite", "sass"],        // Which build tools to include
    customDependencies: {
      dependencies: {
        "template-specific-dep": "^1.0.0"
      }
    },
    customScripts: {
      "dev": "custom-dev-command"
    }
  }
}
```

3. Run the update script to generate the `package.json`

### Updating Dependency Versions

#### Manual Updates
1. Update the version in `dependencies.config.js`
2. Run `yarn sync-deps` to propagate to all templates
3. Optionally run `yarn install` in each template directory

#### Automated Updates
1. **Check what updates are available:**
   ```bash
   yarn check-updates
   ```

2. **Interactive update process:**
   ```bash
   yarn update-and-sync
   ```
   This will:
   - Check for dependency updates using `npm-check-updates`
   - Check for security vulnerabilities using `npm audit`
   - Show you what will be updated
   - Ask for confirmation before applying changes
   - Update `dependencies.config.js` with new versions
   - Propagate changes to all templates

3. **Automated update (no confirmation):**
   ```bash
   yarn auto-update
   ```

#### What the Update Process Does

1. **Dependency Checking**: Uses `npx npm-check-updates` to find newer versions
   - **All updates**: Includes major, minor, and patch versions
   - **Minor updates** (`--minor`): Only minor and patch versions (recommended)
   - **Patch updates** (`--patch`): Only patch versions (safest)
2. **Security Audit**: Uses `npm audit` to identify security vulnerabilities
3. **Config Update**: Automatically updates version numbers in `dependencies.config.js`
4. **Template Sync**: Propagates all changes to template `package.json` files
5. **Clean Up**: Removes temporary files used during the process

**Update Levels Explained:**
- **Patch** (1.0.0 → 1.0.1): Bug fixes only, should be safe to apply
- **Minor** (1.0.0 → 1.1.0): New features, backwards compatible
- **Major** (1.0.0 → 2.0.0): Breaking changes, may require code updates

**Note**: The script requires `npm-check-updates` to be available. It will attempt to install it globally if not found.

## Best Practices

### 1. Version Consistency
- Keep dependency versions consistent across templates
- Use exact versions for build tools and loose versions for libraries
- Update versions in the central config first, then propagate

### 2. Framework Separation
- Keep framework-specific dependencies in their respective sections
- Don't mix React and Vue dependencies in common sections

### 3. Build Tool Organization
- Separate build tool dependencies from framework dependencies
- Group related tools together (e.g., PostCSS + Autoprefixer)

### 4. Template Customization
- Use `customDependencies` for template-specific needs
- Use `customScripts` for template-specific build processes
- Keep custom configurations minimal when possible

## Script Details

The `update-dependencies.js` script:
1. Reads the central configuration
2. For each template, merges:
   - Common dependencies
   - Framework dependencies (based on template config)
   - Build tool dependencies (based on template config)
   - Custom dependencies (template-specific)
3. Preserves existing package.json fields (name, version, description, etc.)
4. Sorts dependencies alphabetically
5. Writes the updated package.json

## Troubleshooting

### Script Fails
- Ensure all template directories exist
- Check that `dependencies.config.js` has valid JavaScript syntax
- Verify template names match directory names exactly

### Dependencies Not Applied
- Check the template configuration in `dependencies.config.js`
- Ensure framework/buildTool names are spelled correctly
- Run script with increased verbosity: `node scripts/update-dependencies.js`

### Conflicts Between Dependencies
- Custom dependencies override framework/common dependencies
- Check for conflicting version requirements
- Use peer dependencies for libraries that should be provided by the consuming application

### Update Script Issues
- **npm-check-updates not found**: The script will try to install it globally, or install manually: `npm install -g npm-check-updates`
- **Permission errors**: You may need to use `sudo` for global npm installations
- **Network issues**: Update checks require internet connection
- **Audit failures**: Some security vulnerabilities may require manual resolution
- **Parse errors**: If JSON parsing fails, check that all dependencies have valid version formats

## Example Workflow

1. **Check for and apply safe updates (recommended approach):**
   ```bash
   # Check what minor/patch updates are available (safer)
   yarn check-updates-minor

   # Interactive minor update (recommended for regular maintenance)
   yarn update-minor

   # Or auto-apply minor updates only
   yarn auto-update-minor
   
   # For maximum safety, only patch updates
   yarn check-updates-patch
   yarn update-patch
   ```

2. **Check for all updates (including major versions):**
   ```bash
   # Check what's available first
   yarn check-updates

   # Interactive update (use with caution for major versions)
   yarn update-and-sync

   # Or auto-apply all updates (not recommended for major versions)
   yarn auto-update
   ```

3. **Manual update of ESLint across all templates:**
   ```javascript
   // In dependencies.config.js
   common: {
     devDependencies: {
       "eslint": "^8.58.0"  // Update version
     }
   }
   ```
   ```bash
   yarn sync-deps
   ```

4. **Add new React testing utility:**
   ```javascript
   // In dependencies.config.js
   frameworks: {
     react: {
       devDependencies: {
         "@testing-library/user-event": "^14.0.0"  // Add new tool
       }
     }
   }
   ```
   ```bash
   yarn sync-deps
   ```

5. **Create new Vue template:**
   ```javascript
   // In dependencies.config.js
   templates: {
     "vue-ssr-nuxt": {
       frameworks: ["vue", "typescript"],
       buildTools: ["postcss"],
       customDependencies: {
         dependencies: {
           "nuxt": "^3.0.0"
         }
       }
     }
   }
   ```
   ```bash
   yarn sync-deps
   ```

6. **Weekly maintenance routine (recommended):**
   ```bash
   # Every week, check for safe updates and security issues
   yarn update-minor
   
   # Monthly, review major version updates manually
   yarn check-updates
   
   # After updates, run tests in templates to ensure compatibility
   cd templates/react-spa-vite && yarn test
   cd ../next-app && yarn test
   # etc...
   ``` 