const { merge } = require('webpack-merge');
const commonConfig = require('./app.common');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = merge(commonConfig, {
  mode: "production",
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
    minimizer: ["...", new CssMinimizerPlugin()],
  },
  plugins: [
    new Dotenv({
      path: `./.env.production`, // Carrega o arquivo .env.production
    }),
  ],
  devtool: "source-map"
});
