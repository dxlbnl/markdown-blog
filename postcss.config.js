const path = require('path')

const stylePath = path.resolve(__dirname, 'styles/')

console.log('Loading postcss shitw with:', stylePath)
module.exports = {
  plugins: [
    require('postcss-import')({
      path: path.resolve(__dirname, 'styles/')
    }),
    require('postcss-preset-env')({
      stage: 0
    }),
    require('tailwindcss')('./tailwind.config.js')
  ]
}
