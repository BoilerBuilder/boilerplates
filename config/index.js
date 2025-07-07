/**
 * Boilerbuilder Config - Unified Configuration
 * Imports all tools and templates into a single configuration object
 */

// Import tools
const common = require('./tools/common.json');
const react = require('./tools/react.json');
const vue = require('./tools/vue.json');
const typescript = require('./tools/typescript.json');
const vite = require('./tools/vite.json');
const nextjs = require('./tools/nextjs.json');
const postcss = require('./tools/postcss.json');
const sass = require('./tools/sass.json');

// Import templates
const reactSpaVite = require('./templates/react-spa-vite.json');
const reactLibVite = require('./templates/react-lib-vite.json');
const nextApp = require('./templates/next-app.json');
const tsLibVite = require('./templates/ts-lib-vite.json');
const vueSpaVite = require('./templates/vue-spa-vite.json');
const vueLibVite = require('./templates/vue-lib-vite.json');

module.exports = {
  tools: {
    common,
    react,
    vue,
    typescript,
    vite,
    nextjs,
    postcss,
    sass
  },
  templates: {
    'react-spa-vite': reactSpaVite,
    'react-lib-vite': reactLibVite,
    'next-app': nextApp,
    'ts-lib-vite': tsLibVite,
    'vue-spa-vite': vueSpaVite,
    'vue-lib-vite': vueLibVite
  }
};
