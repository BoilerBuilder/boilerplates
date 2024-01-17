const { merge } = require('webpack-merge');
const commonConfig = require('./app.common');

module.exports = merge(commonConfig, {
  mode: "production",
  devtool: "source-map"
});
