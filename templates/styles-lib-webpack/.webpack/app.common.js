const path = require("path");
const autoprefixer = require("autoprefixer")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: './src/index.scss', // ponto de entrada principal
    // helpers: './src/helpers/helpers.scss', // ponto de entrada para helpers
    // theme: './src/themes/theme.scss', // ponto de entrada para tema
    // Adicione mais entradas conforme necessário
  },
  output: {
    assetModuleFilename: 'assets/[name].[hash][ext][query]',
    clean: true,
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: '/',
  },
  resolve: {
    extensions: [".sass", ".scss", ".css"],
    alias: {
      "@": path.resolve(__dirname, "../src")
    }
  },
  module: {
    rules: [
      {
        test: /\.(css|s[c|a]ss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [autoprefixer],
              },
            },
          }, 
          "sass-loader",
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: "asset/resource"
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: '[name].css', // Gera CSS com o nome baseado na entrada
        chunkFilename: '[name].[id].css'
    }),
  ]
};
