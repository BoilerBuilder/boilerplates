# Creating Templates

This guide explains how to create new templates for the Boilerplate Generator.

## Template Structure

Templates are organized in the `config/` directory, with subdirectories for different project types, frameworks, languages, and tools.

```
config/
├── base/
├── frameworks/
├── languages/
├── tools/
└── common/
```

## Steps to Create a New Template

1. Determine the appropriate location for your template based on its type (framework, language, tool, etc.).
2. Create a new directory or file within the chosen location.
3. Add the necessary files and configurations for your template.
4. Update the `config/boilerplate-config.json` file to include your new template.

## Example: Adding a New Framework Template

1. Create a new directory in `config/frameworks/`:
   ```
   mkdir config/frameworks/new-framework
   ```

2. Add necessary files to the new directory:
   ```
   touch config/frameworks/new-framework/package.json
   mkdir config/frameworks/new-framework/template
   ```

3. Add framework-specific files to the `template/` directory.

4. Update `config/boilerplate-config.json` to include the new framework:
   ```json
   {
     "projectTypes": {
       "spa": {
         "frameworks": {
           "new-framework": {
             "templatePath": "config/frameworks/new-framework/template",
             "packageJson": "config/frameworks/new-framework/package.json",
             "languages": ["javascript", "typescript"]
           }
         }
       }
     }
   }
   ```

5. If necessary, create framework-specific ESLint configurations in `config/tools/eslint/variations/`.

Remember to test your new template thoroughly before submitting a pull request.