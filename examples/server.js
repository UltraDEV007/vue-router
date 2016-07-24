const express = require('express')
const rewrite = require('express-urlrewrite')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()

app.use(webpackDevMiddleware(webpack(WebpackConfig), {
  publicPath: '/__build__/',
  stats: {
    colors: true
  }
}))

const fs = require('fs')
const path = require('path')

fs.readdirSync(__dirname).forEach(file => {
  if (fs.statSync(path.join(__dirname, file)).isDirectory()) {
    app.use(rewrite('/' + file + '/*', '/' + file + '/index.html'))
  }
})

app.use(express.static(__dirname))

app.listen(8080, () => {
  console.log('Server listening on http://localhost:8080, Ctrl+C to stop')
})
