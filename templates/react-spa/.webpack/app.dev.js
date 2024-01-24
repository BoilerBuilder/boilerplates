const { merge } = require('webpack-merge');
const commonConfig = require('./app.common');
const Dotenv = require('dotenv-webpack');

module.exports = merge(commonConfig, {
  mode: "development",
  devServer: {
    historyApiFallback: true,
    hot: true
  },
  plugins: [
    new Dotenv({
      path: `./.env.development`, // Carrega o arquivo .env.development
    }),
  ],
  devtool: "eval-source-map"
});
