var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, 'build');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
  entry: "./entry.js",
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  output: {
    path: buildPath,
    filename: "bundle.js"
  },
  plugins: [
    //Allows error warnings but does not stop compiling. Will remove when eslint is added
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/, //All .js and .jsx files
        loader: 'babel-loader',
        exclude: [nodeModulesPath],
        query: {
          presets: ['react']
        }
      }
    ]
  }
};