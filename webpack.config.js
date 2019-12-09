const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv =  require('dotenv-webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { _extractPath } = require('./util')
const PATH_DIR = path.join('src', 'public', path.sep)

const entry = _extractPath(PATH_DIR, ['.js']).reduce((obj, filePath) => {
  const entryChunkName = filePath.replace(path.extname(filePath), '').replace(PATH_DIR, '')
  obj[entryChunkName] = `./${filePath}`
  return obj
}, {})

const EntryHtmlPlugins = _extractPath(PATH_DIR, ['.html']).map(filepath => {
  const filename = filepath.replace(PATH_DIR, '')
  return new HtmlWebpackPlugin({
    chunks: [filename.replace(path.extname(filename), ''), 'vendor'],
    template: filepath,
    filename
  })
})

module.exports = {
  entry: entry,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.[hash].js'
  },
  module: {
    rules: [
      {
        test: /.j(s|sx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPatch: '/assets',
              reloadAll: true
            }
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /.(gif|png|jpe?g|svg)/i,
        use: {
          loader: 'file-loader',
          options: {
            filename: '[name].[ext]'
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@' : path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.EnvironmentPlugin([ 'NODE_ENV' ]),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv(),
    ...EntryHtmlPlugins,
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
      chunkFilename: '[id].min.css',
      ignoreOrder: false
    })
  ]
}
