//
// Central Dependencies Configuration
// This file defines common dependencies that will be propagated to template package.json files
//

module.exports = {
  // Common dependencies shared across multiple templates
  common: {
    // Development tools
    devDependencies: {
      "eslint": "^8.57.1",
      "prettier": "^3.6.2",
      "husky": "^8.0.3",
      "lint-staged": "^15.5.2",
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
        "react": "^18.3.1",
        "react-dom": "^18.3.1"
      },
      devDependencies: {
        "@types/react": "^18.3.23",
        "@types/react-dom": "^18.3.7",
        "@testing-library/react": "^15.0.7",
        "@testing-library/jest-dom": "^6.6.3"
      }
    },
    vue: {
      dependencies: {
        "vue": "^3.5.17"
      },
      devDependencies: {
        "@testing-library/vue": "^8.1.0",
        "@testing-library/jest-dom": "^6.6.3",
        "@vitejs/plugin-vue": "^5.2.4",
        "vue-tsc": "^2.2.10"
      }
    },
    typescript: {
      devDependencies: {
        "typescript": "^5.8.3",
        "@typescript-eslint/eslint-plugin": "^7.18.0",
        "@typescript-eslint/parser": "^7.18.0"
      }
    },
    vite: {
      devDependencies: {
        "vite": "^5.4.19",
        "vitest": "^1.6.1",
        "@vitest/coverage-v8": "^1.6.1",
        "@vitest/ui": "^1.6.1",
        "jsdom": "^24.1.3"
      }
    },
    nextjs: {
      devDependencies: {
        "@types/node": "^20.19.1",
        "eslint-config-next": "14.2.30"
      }
    }
  },

  // Build tool specific dependencies
  buildTools: {
    webpack: {
      devDependencies: {
        "webpack": "^5.99.9",
        "webpack-cli": "^5.1.4",
        "webpack-merge": "^5.10.0"
      }
    },
    postcss: {
      devDependencies: {
        "postcss": "^8.5.6",
        "autoprefixer": "^10.4.21"
      }
    },
    sass: {
      devDependencies: {
        "sass": "^1.89.2",
        "stylelint": "^16.21.0",
        "stylelint-config-standard-scss": "^13.1.0",
        "stylelint-order": "^6.0.4",
        "stylelint-prettier": "^5.0.3"
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
          "next": "14.2.30"
        },
        devDependencies: {
          "@vitejs/plugin-react": "^4.6.0",
          "eslint-plugin-import": "^2.32.0"
        }
      }
    },
    "react-spa-vite": {
      jsTools: ["react", "vite"],
      buildTools: ["postcss", "sass"],
      customDependencies: {
        dependencies: {
          "@tanstack/react-query": "^5.81.2",
          "react-router-dom": "^6.30.1",
          "zustand": "^4.5.7"
        },
        devDependencies: {
          "@vitejs/plugin-react": "^4.6.0",
          "eslint-config-prettier": "^9.1.0",
          "eslint-plugin-import": "^2.32.0",
          "eslint-plugin-prettier": "^5.5.1",
          "eslint-plugin-react": "^7.37.5",
          "eslint-plugin-react-hooks": "^4.6.2",
          "vite-plugin-restart": "^0.4.2"
        }
      }
    },
    "react-lib-vite": {
      jsTools: ["react", "typescript", "vite"],
      buildTools: [],
      customDependencies: {
        peerDependencies: {
          "react": "^18.3.1",
          "react-dom": "^18.3.1"
        },
        devDependencies: {
          "@vitejs/plugin-react": "^4.6.0",
          "eslint-config-prettier": "^9.1.0",
          "eslint-plugin-import": "^2.32.0",
          "eslint-plugin-prettier": "^5.5.1",
          "eslint-plugin-react-hooks": "^4.6.2",
          "vite-plugin-dts": "^3.9.1"
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
          "eslint-plugin-import": "^2.32.0",
          "eslint-plugin-prettier": "^5.5.1",
          "eslint-plugin-vue": "^9.33.0",
          "vite-plugin-dts": "^3.9.1"
        }
      }
    },
    "ts-lib-vite": {
      jsTools: ["typescript", "vite"],
      buildTools: [],
      customDependencies: {
        devDependencies: {
          "@types/node": "^20.19.1",
          "eslint-config-prettier": "^9.1.0",
          "eslint-plugin-import": "^2.32.0",
          "eslint-plugin-prettier": "^5.5.1",
          "vite-plugin-dts": "^3.9.1"
        }
      }
    },
    "styles-lib-webpack": {
      jsTools: [],
      buildTools: ["webpack", "postcss", "sass"],
      customDependencies: {
        devDependencies: {
          "css-loader": "^6.11.0",
          "mini-css-extract-plugin": "^2.9.2",
          "postcss-loader": "^7.3.4",
          "sass-loader": "^13.3.3",
          "style-loader": "^3.3.4"
        }
      }
    }
  }
}; 