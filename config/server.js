const express = require('express');
const webpack = require('webpack');
const path = require('path');
const opn = require('opn');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require("webpack-hot-middleware");
const compression = require('compression');
const app = express();
const devConfig = require('./webpack.dev.js');
const compiler = webpack(devConfig);

const port = 3000;

app.use(compression());

const devMiddleware = WebpackDevMiddleware(compiler, {
  headers : {'Access-Control-Allow-Origin': '*'},
  publicPath: devConfig.output.publicPath,
  stats: 'errors-only'
});

devMiddleware.waitUntilValid(() => {
  opn('http://localhost:' + port);
})

const hotMiddleware = WebpackHotMiddleware(compiler, {
  path: '/__webpack_hmr',
})

app.use(devMiddleware);
app.use(hotMiddleware);
app.use(express.static(path.resolve(__dirname, '..')))

app.listen(port, ()=>{
  console.log('start on network:  http://localhost:'+ port)
})