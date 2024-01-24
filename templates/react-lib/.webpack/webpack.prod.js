const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true, // Ativado por padrão no modo 'production', mas explicitado aqui para clareza
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
});
