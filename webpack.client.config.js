const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const glob = require('glob');
const nodeExternals = require('webpack-node-externals');

const client = {
  entry: "./client/app/index.jsx",
  output: {
    filename: "bundle.js",
    path: __dirname + "/client/app/build"
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

const server = {
  entry: './client/server.js',
  target: 'node',
  context: __dirname,
  externals: [nodeExternals()],
  module: {
    loaders: [{
      test: [/\.jsx?$/, /\.js?$/],
      loaders: ['babel-loader'],
      include: __dirname,
      exclude: /node_modules/,
    }],
  },
  // We are going to create multiple APIs, and we are
  // going to create a js file to for each, we need this output block
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  node: {
    __dirname: false,
    __filename: false,
  }
};

module.exports = [client, server]
