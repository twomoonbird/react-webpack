const path = require('path');

module.exports = {
  entry: {
    main: "./src/index.js"
  },
  output: {
    filename: '[name].[chunkhash:8].js',
    path: path.resolve(__dirname, '../dist')
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',    // merge all the css chunk to one file
          enforce: true
        }
      }
    }
  }
}