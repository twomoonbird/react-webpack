const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  entry: {
    main: [
      'babel-polyfill',
      path.resolve(__dirname, '../src')
    ]
  },
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              minimize: {
                autoprefixer: {
                  add: true,
                  remove: true,
                  browsers: ['last 2 versions']
                },
                discardComments: {
                  removeAll: true
                },
                discardUnused: false,
                mergeIdents: false,
                reduceIdents: false,
                safe: true
              }
            }
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
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/img_[hash:8].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              gifsicle: { interlaced: false },
              optipng: { enabled: false },
              pngquant: { quality: '65-90', speed: 4 },
              mozjpeg: { progressive: true, quality: 65 },
              webp: { quality: 75 }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/main.[chunkhash:8].css',
      chunkFilename: 'css/main.[contenthash:8].css'
    }),
    new OptimizeCssAssetsPlugin()
  ],
  performance: {
    hints: false
  },
  stats: {
    children: false,
    modules: false
  }
});
