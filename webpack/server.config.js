const path = require('path')
const config = require('sapper/webpack/config.js')
const pkg = require('../package.json')

const postcss = require('postcss')
const postcssPresetEnv = require('postcss-preset-env')
const postcssImport = require('postcss-import')

const styleDir = path.resolve(__dirname, '../styles/')
// const iconDir = path.resolve(__dirname, '../icons/')

const postcssPlugins = [
  postcssImport({
    path: styleDir
  }),
  postcssPresetEnv({
    stage: 0
  })
]

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
            preprocess: {
              style: ({ content, attributes, filename }) => {
                return postcss(postcssPlugins)
                  .process(content, { from: filename })
                  .then(result => {
                    return { code: result.css, map: result.map }
                  })
                  .catch(err => {
                    console.log('failed to preprocess style', err)
                  })
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
              plugins: postcssPlugins
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
