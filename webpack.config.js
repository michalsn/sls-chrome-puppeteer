const webpack = require('webpack')
const slsw = require('serverless-webpack')
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  target: 'node',
  resolve: {
    alias: {
      // @note This alias is required if building service on Node.js > v6,
      // because webpack tree shaking drops built-in runtime check logic in puppeteer package
      "puppeteer": require.resolve("puppeteer/node6/lib/Puppeteer")
    }
  },

  node: {
    __dirname: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        // include: '/node_modules/@browserless/aws-lambda-chrome/',
        options: {
          cacheDirectory: true,
        },
      },
      { test: /\.json$/, loader: 'json-loader' },
    ],
  },
  resolve: {
    symlinks: true,
  },
  output: {
    libraryTarget: 'commonjs',
    path: `${__dirname}/.webpack`,
    filename: '[name].js',
  },

  // externals: [nodeExternals()],
  externals: [
    'aws-sdk',
    'puppeteer/node6/lib/Puppeteer',
    // '@browserless/aws-lambda-chrome',
  ],

  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new CopyWebpackPlugin([{
      copyPermissions: true, // necessary for AWS lambda
      from: 'dist',
      to: 'dist'
    }])
  ],
  entry: slsw.lib.entries,
}