const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common,{
  mode: 'development',
  entry: {
    main: [
      path.resolve(__dirname, '../src/index.js'),
      'webpack-hot-middleware/client?path=/__webpack_hmr'
    ],
  },
  output: {
    filename: 'js/[name].[hash:5].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  devServer: {
    port: 8080,
    compress: true,
    hot: true,
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, '../dist'),
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});