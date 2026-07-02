# react-spa-vite

TypeScript-first React SPA template powered by Vite. Includes routing, data fetching, state management, testing, linting, and formatting — all pre-configured.

## Stack

| Tool | Purpose |
|---|---|
| React 18 | UI |
| TypeScript ~5.8 | Type safety |
| Vite 7 | Dev server & bundler |
| React Router v6 | Client-side routing |
| TanStack Query v5 | Async data fetching |
| Zustand v5 | Client state management |
| Vitest + Testing Library | Unit & component testing |
| ESLint 9 (flat config) | Linting |
| Prettier | Code formatting |
| Stylelint | CSS/SCSS linting |
| Husky + lint-staged | Git hooks |
| SASS | SCSS support |
| PostCSS + Autoprefixer | CSS processing |

## Getting started

```bash
boilerbuilder create my-app --template react-spa-vite
cd my-app
yarn install
yarn dev
```

## Scripts

| Script | Description |
|---|---|
| `yarn dev` | Start dev server |
| `yarn typecheck` | Run TypeScript type-check (`tsc -b`) |
| `yarn build:production` | Typecheck + production build |
| `yarn build:staging` | Typecheck + staging build |
| `yarn build:development` | Typecheck + development build |
| `yarn lint` | ESLint with auto-fix |
| `yarn format` | Prettier |
| `yarn stylelint` | Stylelint with auto-fix |
| `yarn test` | Vitest in watch mode |
| `yarn test:coverage` | Single-run with coverage |
| `yarn test:ui` | Vitest UI |

## TypeScript adoption ladder

New projects start in **`strict` mode** (pure TypeScript, no JS allowed). The ladder exists for teams migrating an existing JS codebase to TypeScript — JS modes are **activated on demand** via the CLI and are never present in a freshly created project.

All three modes keep `strict: true` — the only axis that changes is whether JS files are allowed and type-checked:

| Mode | `allowJs` | `checkJs` | `strict` | When to use |
|---|---|---|---|---|
| `allowJs` | ✅ | ❌ | ✅ | Entry point for migrating a JS codebase — `.jsx` files compile but aren't type-checked |
| `checkJs` | ✅ | ✅ | ✅ | Intermediate step — JS files are type-checked too |
| `strict` | ❌ | — | ✅ | Full TypeScript — no `.js`/`.jsx` allowed **(default)** |

### Switching modes

```bash
boilerbuilder ts allowJs   # start migration — materialises allowJs preset
boilerbuilder ts checkJs   # intermediate step — materialises checkJs preset
boilerbuilder ts strict    # full TypeScript — removes JS presets
```

The current mode is stored in `package.json`:

```json
{
  "boilerbuilder": {
    "template": "react-spa-vite",
    "tsMode": "strict"
  }
}
```

Switching modes:
- Materialises or removes `.config/ts/allowJs.json` / `.config/ts/checkJs.json` (CLI-managed)
- Updates `tsconfig.app.json` `extends` to point to the active preset
- `eslint.config.js` reads `tsMode` from `package.json` at runtime — no restart needed

### Config presets

```
.config/
  ts/
    base.json       ← shared TS compiler flags (all modes)
    strict.json     ← strict: true, allowJs: false  (ships with template)
    allowJs.json    ← strict: true, allowJs: true, checkJs: false  (materialised by CLI)
    checkJs.json    ← strict: true, allowJs: true, checkJs: true   (materialised by CLI)
  vitest.setup.ts   ← @testing-library/jest-dom setup
```

## Looking for the JavaScript version?

The `react-spa-vite-js` directory is the legacy JS template preserved as an internal reference for migrating existing JS projects. It is not available as a CLI template option — use `boilerbuilder ts allowJs` after creating a new project to unlock mixed JS+TS mode.
