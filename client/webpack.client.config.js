const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./app/index.jsx",
  output: {
    filename: "bundle.js",
    path: __dirname + "/app/build"
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  watch: true,
  watchOptions: { ignored: [/node_modules/] },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".js", ".jsx", ".json"]
  },
  module: {
    rules: [
      { test: [/\.jsx?$/, /\.js?$/], loaders: ["babel-loader"], exclude: /node_modules/ },
      { test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/, loader: 'url' },
    ]
  },
  // target: 'electron-renderer',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
};
