const path = require('path')
const webpack = require('webpack')
const config = require('sapper/webpack/config.js')

const getPreprocessor = require('svelte-preprocess')

const mode = process.env.NODE_ENV
const isDev = mode === 'development'

const preprocess = getPreprocessor({
  transformers: {
    postcss: true
  }
})

const styleDir = path.resolve(__dirname, '../styles/')
// const iconDir = path.resolve(__dirname, '../icons/')

module.exports = {
  entry: config.client.entry(),
  output: config.client.output(),
  resolve: {
    extensions: ['.js', '.json', '.html'],
    mainFields: ['svelte', 'module', 'browser', 'main'],
    alias: {
      styles: styleDir
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'svelte-loader',
          options: {
            dev: isDev,
            hydratable: true,
            hotReload: true,
            preprocess,
            onwarn: (warning, cont) => {
              if (warning.code !== 'css-unused-selector') {
                cont(warning)
              }
            }
          }
        }
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
            }
          }
        ]
      }
    ]
  },
  mode,
  plugins: [
    isDev && new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.browser': true,
      'process.env.NODE_ENV': JSON.stringify(mode)
    })
  ].filter(Boolean),
  devtool: isDev && 'inline-source-map'
}
