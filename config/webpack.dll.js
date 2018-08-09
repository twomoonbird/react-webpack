const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    vendor: [
      'react','react-dom','react-router-dom',
      'react-loadable','mobx','mobx-react',
      
    ]  //提前提取的模块
  },
  output: {
    path: path.resolve(__dirname, '../dll'),
    filename: '[name].[chunkhash:8].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_library',
      path: path.resolve(__dirname, '../dll', 'manifest.json'),
      context: __dirname
    })
  ]
};