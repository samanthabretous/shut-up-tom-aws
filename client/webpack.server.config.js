var glob = require('glob');
var path = require('path');
var nodeExternals = require('webpack-node-externals');

// Required for Create React App Babel transform
process.env.NODE_ENV = 'production';

module.exports = {
  // Use all js files in project root (except
  // the webpack config) as an entry
  entry: './server.js',
  target: 'node',
  // Since 'aws-sdk' is not compatible with webpack,
  // we exclude all node dependencies
  externals: [nodeExternals({
    moduleDir: [__dirname, path.join(__dirname, '../aws-serverless')]
  }), 'ws'],
  // Run babel on all .js files and skip those in node_modules
  module: {
    loaders: [{
      test: [/\.jsx?$/, /\.js?$/],
      loaders: ['babel-loader'],
      include: [__dirname, path.join(__dirname, '../')],
      exclude: [/node_modules/, path.join(__dirname, '../aws-serverless/node_modules')],
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
  devtool: 'source-map'
};

