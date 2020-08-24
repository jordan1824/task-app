const path = require("path")
const webpack = require("webpack")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const postCSSPlugins = [
  require("postcss-import"),
  require("postcss-mixins"),
  require("postcss-nested"),
  require("autoprefixer"),
  require("cssnano")
]

module.exports = {
  entry: "./assets/scripts/main.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public")
  },
  mode: "production",
  optimization: {
    splitChunks: {chunks: 'all'}
  },
  plugins: [new CleanWebpackPlugin(), new MiniCssExtractPlugin({filename: 'styles.css'})],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", {loader: "postcss-loader", options: {plugins: postCSSPlugins}}]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
}