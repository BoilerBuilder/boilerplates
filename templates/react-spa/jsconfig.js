module.exports = {
  compilerOptions: {
    baseUrl: './src', // Define a pasta "src" como base para importações relativas
    paths: {
      '@/*': ['*'], // Permite usar "@" para referenciar diretamente qualquer arquivo dentro de "src"
    },
    target: 'esg', // Define a versão do ECMAScript para ES5
    module: 'es6', // Define o formato do módulo para ES6
    jsx: 'react-jsx', // Define o modo JSX, compatível com o React 17+ sem a necessidade de importar o React em arquivos JSX
  },
  exclude: ['node_modules', 'build'], // Exclui as pastas "node_modules" e "build" do processo do compilador de TypeScript
};
