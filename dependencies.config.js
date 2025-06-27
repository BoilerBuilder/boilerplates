//
// Central Dependencies Configuration
// This file defines common dependencies that will be propagated to template package.json files
//

module.exports = {
  // Common dependencies shared across multiple templates
  common: {
    // Development tools
    devDependencies: {
      "eslint": "^8.57.0",
      "prettier": "^3.2.5",
      "husky": "^8.0.3",
      "lint-staged": "^15.2.2",
    },
    // Common configuration
    engines: {
      "npm": "please-use-yarn",
      "yarn": ">= 1.19.1"
    }
  },

  // jsTools-specific dependencies
  jsTools: {
    react: {
      dependencies: {
        "react": "^18.2.0",
        "react-dom": "^18.2.0"
      },
      devDependencies: {
        "@types/react": "^18.2.66",
        "@types/react-dom": "^18.2.22",
        "@testing-library/react": "^15.0.7",
        "@testing-library/jest-dom": "^6.4.5"
      }
    },
    vue: {
      dependencies: {
        "vue": "^3.4.21"
      },
      devDependencies: {
        "@testing-library/vue": "^8.0.3",
        "@testing-library/jest-dom": "^6.4.5",
        "@vitejs/plugin-vue": "^5.0.4",
        "vue-tsc": "^2.0.6"
      }
    },
    typescript: {
      devDependencies: {
        "typescript": "^5.4.5",
        "@typescript-eslint/eslint-plugin": "^7.7.0",
        "@typescript-eslint/parser": "^7.7.0"
      }
    },
    vite: {
      devDependencies: {
        "vite": "^5.2.0",
        "vitest": "^1.6.0",
        "@vitest/coverage-v8": "^1.5.0",
        "@vitest/ui": "^1.5.0",
        "jsdom": "^24.0.0"
      }
    },
    nextjs: {
      devDependencies: {
        "@types/node": "^20.12.2",
        "eslint-config-next": "14.1.4"
      }
    }
  },

  // Build tool specific dependencies
  buildTools: {
    webpack: {
      devDependencies: {
        "webpack": "^5.89.0",
        "webpack-cli": "^5.1.4",
        "webpack-merge": "^5.10.0"
      }
    },
    postcss: {
      devDependencies: {
        "postcss": "^8.4.35",
        "autoprefixer": "^10.4.18"
      }
    },
    sass: {
      devDependencies: {
        "sass": "^1.72.0",
        "stylelint": "^16.2.1",
        "stylelint-config-standard-scss": "^13.0.0",
        "stylelint-order": "^6.0.4",
        "stylelint-prettier": "^5.0.0"
      }
    }
  },

  // Template-specific configurations
  templates: {
    "next-app": {
      jsTools: ["react", "typescript"],
      buildTools: [],
      customDependencies: {
        dependencies: {
          "next": "14.1.4"
        },
        devDependencies: {
          "@vitejs/plugin-react": "^4.2.1",
          "eslint-plugin-import": "^2.29.1"
        }
      }
    },
    "react-spa-vite": {
      jsTools: ["react", "vite"],
      buildTools: ["postcss", "sass"],
      customDependencies: {
        dependencies: {
          "@tanstack/react-query": "^5.52.2",
          "react-router-dom": "^6.22.3",
          "zustand": "^4.5.2"
        },
        devDependencies: {
          "@vitejs/plugin-react": "^4.2.1",
          "eslint-config-prettier": "^9.1.0",
          "eslint-plugin-import": "^2.29.1",
          "eslint-plugin-prettier": "^5.1.3",
          "eslint-plugin-react": "^7.33.2",
          "eslint-plugin-react-hooks": "^4.6.0",
          "vite-plugin-restart": "^0.4.0"
        }
      }
    },
    "react-lib-vite": {
      jsTools: ["react", "typescript", "vite"],
      buildTools: [],
      customDependencies: {
        peerDependencies: {
          "react": "^18.2.0",
          "react-dom": "^18.2.0"
        },
        devDependencies: {
          "@vitejs/plugin-react": "^4.2.1",
          "eslint-config-prettier": "^9.1.0",
          "eslint-plugin-import": "^2.29.1",
          "eslint-plugin-prettier": "^5.1.3",
          "eslint-plugin-react-hooks": "^4.6.0",
          "vite-plugin-dts": "^3.8.3"
        }
      }
    },
    "vue-spa-vite": {
      jsTools: ["vue", "vite"],
      buildTools: [],
      customDependencies: {}
    },
    "vue-lib-vite": {
      jsTools: ["vue", "typescript", "vite"],
      buildTools: [],
      customDependencies: {
        peerDependencies: {
          "vue": "^3.5.17"
        },
        devDependencies: {
          "@vue/eslint-config-typescript": "^13.0.0",
          "eslint-config-prettier": "^9.1.0",
          "eslint-plugin-import": "^2.29.1",
          "eslint-plugin-prettier": "^5.1.3",
          "eslint-plugin-vue": "^9.25.0",
          "vite-plugin-dts": "^3.8.3"
        }
      }
    },
    "ts-lib-vite": {
      jsTools: ["typescript", "vite"],
      buildTools: [],
      customDependencies: {
        devDependencies: {
          "@types/node": "^20.12.2",
          "eslint-config-prettier": "^9.1.0",
          "eslint-plugin-import": "^2.29.1",
          "eslint-plugin-prettier": "^5.1.3",
          "vite-plugin-dts": "^3.8.1"
        }
      }
    },
    "styles-lib-webpack": {
      jsTools: [],
      buildTools: ["webpack", "postcss", "sass"],
      customDependencies: {
        devDependencies: {
          "css-loader": "^6.8.1",
          "mini-css-extract-plugin": "^2.7.6",
          "postcss-loader": "^7.3.3",
          "sass-loader": "^13.3.2",
          "style-loader": "^3.3.3"
        }
      }
    }
  }
}; 