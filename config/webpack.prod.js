const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common,{
  mode: 'production',
  output: {
    filename: 'js/[name].[chunkhash:5].js',
    chunkFilename: 'js/[name].[chunkhash:5].chunk.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/main.[chunkhash:5].css',
      chunkFilename: 'css/main.[contenthash:5].css'
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../dll/*.dll.js'),
      to: path.resolve(__dirname, '../dist')
    }])
  ]
}); 