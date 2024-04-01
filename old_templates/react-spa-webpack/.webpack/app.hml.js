const { merge } = require('webpack-merge');
const commonConfig = require('./app.common');
const Dotenv = require('dotenv-webpack');

module.exports = merge(commonConfig, {
  mode: "development",
  plugins: [
    new Dotenv({
      path: `./.env.homolog`, // Carrega o arquivo .env.homolog
    }),
  ],
  devtool: "eval-source-map"
});
