const path = require('path')
const merge = require('webpack-merge')
const config = require('../webpack.config')

module.exports = merge(config, {
  mode: 'development',
  devServer: {
    port: process.env.PORT,
    open: true,
    inline: true,
    contentBase: path.resolve(__dirname, '..', 'src')
  }
})
