module.exports = {
  clearMocks: true,  // Limpa automaticamente todas as instâncias e chamadas de mocks entre os testes.
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",  // Indica quais arquivos devem ser considerados para a cobertura de código, excluindo alguns específicos.
    "!src/index.js",
    "!src/**/*.test.js",
    "!src/**/index.js"
  ],
  coverageDirectory: "coverage",  // Especifica o diretório onde os relatórios de cobertura serão gerados.
  moduleFileExtensions: ["js", "json", "jsx"],  // Define as extensões de arquivo a serem tratadas como módulos.
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"  // Mapeia os imports que usam o alias "@" para o diretório "src".
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],  // Especifica scripts que devem ser executados após a configuração do ambiente de teste, para estender as expectativas do Jest.
  testEnvironment: "jsdom",  // Define o ambiente de teste, neste caso, "jsdom", que simula um navegador.
  testEnvironmentOptions: {
    url: "http://localhost"  // Configura a URL base para o ambiente "jsdom".
  },
  testMatch: ["**/?(*.)+(spec|test).js?(x)"],  // Padrões de nome de arquivo para identificar arquivos de teste.
  testPathIgnorePatterns: ["/node_modules/"],  // Padrões para ignorar ao procurar por arquivos de teste.
  transformIgnorePatterns: ["/node_modules/"],  // Padrões de caminho para ignorar durante a transformação de código.
  verbose: false  // Define se o Jest deve ou não exibir informações detalhadas durante a execução dos testes.
};
