const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common,{
  mode: 'production',
  entry: {
    main: "./src/index.js"
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
  output: {
    filename: 'js/[name].[chunkhash:5].js',
    path: path.resolve(__dirname, '../dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.[chunkhash:5].css',
      chunkFilename: 'css/main.[contenthash:5].css'
    })
  ]
});