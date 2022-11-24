const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: './src/index.js',

  mode: 'production',

  output: {
    filename: '[name].[chunkhash:8].js',
  },

  optimization: {
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        default: false,
        defaultVendors: false,
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors~main',
        },
        common: {
          test: /[\\/]common[\\/]/,
          name: 'common~main',
          enforce: true
        },
        module1: {
          test: /[\\/]module-1[\\/]/,
          name: 'module1~main',
          enforce: true
        },
        module2: {
          test: /[\\/]module-2[\\/]/,
          name: 'module2~main',
          enforce: true
        },
      },
      chunks: 'all'
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
  ]
}
