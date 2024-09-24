# 7-1 SCSS Architecture Example

This project demonstrates the 7-1 SCSS architecture pattern, a widely used methodology for organizing large SCSS projects. It provides a structured and maintainable approach to CSS development.

## 📁 Folder Structure

```
sass/
|
|– abstracts/
|   |– _variables.scss    # Sass Variables
|   |– _functions.scss    # Sass Functions
|   |– _mixins.scss       # Sass Mixins
|
|– base/
|   |– _reset.scss        # Reset/normalize
|   |– _typography.scss   # Typography rules
|
|– components/
|   |– _buttons.scss      # Buttons
|   |– _card.scss         # Card
|
|– layout/
|   |– _header.scss       # Header
|   |– _footer.scss       # Footer
|   |– _grid.scss         # Grid system
|
|– pages/
|   |– _home.scss         # Home specific styles
|
|– themes/
|   |– _default.scss      # Default theme
|   |– _dark.scss         # Dark theme
|
|– brands/
|   |– _brand-a.scss      # Brand A specific styles
|   |– _brand-b.scss      # Brand B specific styles
|
`– index.scss             # Main Sass file
```

## 🧩 How It Works

1. `abstracts/`: Contains Sass tools, helper files, variables, functions, mixins, and other config files.
2. `base/`: Contains boilerplate code for the project, including standard styles such as resets and typographic rules.
3. `components/`: Contains all your components' styles.
4. `layout/`: Contains styling for larger layout components (e.g., nav, header, footer, etc.).
5. `pages/`: Contains page-specific styles.
6. `themes/`: Contains styling for different themes.
7. `brands/`: Contains brand-specific styles.

The `index.scss` file imports all other files.

## 🎨 Theming and Branding

This architecture supports both theming and branding:

- Themes are managed in the `themes/` directory, with `_default.scss` and `_dark.scss` as examples.
- Brand-specific styles are kept in the `brands/` directory, with `_brand-a.scss` and `_brand-b.scss` as examples.