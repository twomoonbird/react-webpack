const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dllConfig = require('../dll/dll-config.json');

module.exports = {
  entry: {
    main: path.resolve(__dirname, '../src')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader?cacheDirectory'  //cacheDirectory用于缓存编译结果，下次编译加速
        },
        include: path.resolve(__dirname, '../src'), //对src文件夹中的文件进行编译
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      dllName: dllConfig.vendor.js,
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.resolve(__dirname, '../dll', 'manifest.json')
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          name: 'common',
          test: /node_modules/,
          chunks: 'initial',
          priority: -10,
          enforce : true
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',    // 将css集中到一个文件
          enforce: true
        }
      }
    }
  }
}