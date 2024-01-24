module.exports = {
    presets: [
        "@babel/preset-env", // Para converter ES6+ em código compatível com navegadores mais antigos
        "@babel/preset-react", // Para compilar JSX em chamadas de funções JavaScript
        "@babel/preset-typescript" // Adiciona suporte para TypeScript
    ],
    plugins: [
        // Aqui você pode adicionar plugins Babel específicos, se necessário
    ]
};
