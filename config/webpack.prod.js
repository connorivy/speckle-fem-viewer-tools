const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { merge } = require('webpack-merge')
const webpack = require('webpack');
const paths = require('./paths')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    path: paths.build,
    publicPath: '/',
    filename: 'js/[name].[contenthash].bundle.js',
    library: 'plugin',
    libraryTarget: 'window'
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
              modules: false,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    // Extracts CSS into separate files
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
    new webpack.optimize.LimitChunkCountPlugin({
         maxChunks: 1
     })
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), '...'],
    // runtimeChunk: {
    //   name: 'runtime',
    // },
    // // not allowing chunks for the sake of simplifying the upload
    // splitChunks: {
    //   chunks: 'all',
    //   name: false,
    //   cacheGroups: {
    //     default:false
    //   }
    // },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    // maxAssetSize: 512000,
  },
})
