const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const glob = require('glob');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  // Use all js files in project root (except
  // the webpack config) as an entry
  entry: globEntries('aws-serverless/handlers/*'),
  target: 'node',
  // Since 'aws-sdk' is not compatible with webpack,
  // we exclude all node dependencies
  externals: [nodeExternals()],
  // Run babel on all .js and .jsx files and skip those in node_modules
  module: {
    loaders: [{
      test: [/\.jsx?$/, /\.js?$/],
      loaders: ['babel-loader'],
      include: __dirname,
      exclude: /node_modules/,
    }]
  },
  // We are going to create multiple APIs, and we are
  // going to create a js file to for each, we need this output block
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  devtool: 'source-map'
};

function globEntries(globPath) {
  var files = glob.sync(globPath);
  var entries = {};
  for (var i = 0; i < files.length; i++) {
    var entry = files[i];
    entries[path.basename(entry, path.extname(entry))] = './' + entry;
  }

  return entries;
}
