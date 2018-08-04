const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader?cacheDirectory'  //cacheDirectory用于缓存编译结果，下次编译加速
        },
        include: path.resolve(__dirname,'src'), //对src文件夹中的文件进行编译
        exclude: /node_modules/,
      },
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
    contentBase: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}