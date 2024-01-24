module.exports = {
  "ignoreFiles": [
    "node_modules/**/*",  // Ignora arquivos dentro do diretório node_modules
    "build/**/*",         // Ignora arquivos dentro do diretório build
    "dist/**/*",          // Ignora arquivos dentro do diretório dist
    "src/vendors/**/*"    // Ignora arquivos dentro do diretório src/vendors
  ],
  "plugins": [
    "stylelint-order"     // Plugin para especificar a ordem das propriedades
  ],
  "extends": [
    "stylelint-config-standard-scss",  // Configuração padrão para SCSS
    "stylelint-prettier"               // Executa o Prettier como uma regra do Stylelint
  ],
  "rules": {
    "at-rule-no-unknown": null,                   // Desabilita a regra para at-rules desconhecidas
    "scss/at-rule-no-unknown": true,              // Habilita a verificação de at-rules do SCSS
    "max-nesting-depth": 3,                       // Limita a profundidade de aninhamento a 3
    "selector-max-compound-selectors": 3,         // Limita o número de seletores compostos
    "order/properties-alphabetical-order": true,  // Ordena as propriedades CSS em ordem alfabética
    "no-descending-specificity": null             // Desabilita a regra de especificidade descendente
  }
}
