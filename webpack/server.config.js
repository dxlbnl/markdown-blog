const path = require('path')
const config = require('sapper/webpack/config.js')
const pkg = require('../package.json')

const getPreprocessor = require('svelte-preprocess')

const preprocess = getPreprocessor({
  transformers: {
    postcss: true
  }
})

const styleDir = path.resolve(__dirname, '../styles/')
// const iconDir = path.resolve(__dirname, '../icons/')

module.exports = {
  entry: config.server.entry(),
  output: config.server.output(),
  target: 'node',
  resolve: {
    extensions: ['.js', '.json', '.html'],
    mainFields: ['svelte', 'module', 'browser', 'main'],
    alias: {
      styles: styleDir
    }
  },
  externals: Object.keys(pkg.dependencies),
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'svelte-loader',
          options: {
            css: false,
            generate: 'ssr',
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
              // plugins: postcssPlugins(['routes/**.html', 'components/**.html'])
            }
          }
        ]
      }
    ]
  },
  mode: process.env.NODE_ENV,
  performance: {
    hints: false // it doesn't matter if server.js is large
  }
}
