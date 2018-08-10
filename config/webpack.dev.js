const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common,{
  mode: 'development',
  entry: {
    main: [
      'babel-polyfill',
      path.resolve(__dirname, '../src/index.js')
    ],
  },
  output: {
    filename: 'js/[name].[hash:8].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname, './postcss.config.js')
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|ico)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'images/img_[hash:8].[ext]'
          }
        }
      }
    ]
  },
  devServer: {
    port: 8080,
    compress: true,
    hot: true,
    historyApiFallback: true,
    open: true,
    clientLogLevel: 'warning',
    overlay: {
      warnings: true,
      errors: true
    },
    stats: {
      assets: false,
      children: false,
      modules: false,
      entrypoints: false,
      hash: false,
      version: false
    }
  },
  resolve:{
    modules: [path.resolve(__dirname, "../node_modules"), path.resolve(__dirname, "../src")]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, '../dll/*.dll.js'),
      includeSourcemap: false
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.resolve(__dirname, '../dll', 'manifest.json')
    })
  ]
});