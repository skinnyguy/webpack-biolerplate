const merge = require('webpack-merge')
const config = require('../webpack.config')
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(config, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new UglifyJsWebpackPlugin({ sourceMap: false }), new OptimizeCSSAssetsWebpackPlugin()],
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true
        }
      }
    }
  }
})
