const path = require('path')

module.exports = {
  output: {
    publicPath: '/accounts/'
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
}
