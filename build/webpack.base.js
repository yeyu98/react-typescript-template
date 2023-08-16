/*
 * @Author: lzy-Jerry
 * @Date: 2023-08-16 21:05:57
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-08-16 23:40:17
 * @Description: 
 */

/** @type {import('webpack').Configuration} */

const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { DefinePlugin } = require('webpack')

const customEnvs = ['BASE_ENV']
const definitions = {}
customEnvs.forEach(_env => {
  definitions[`process.env.${_env}`] = JSON.stringify(process.env[_env])
})

module.exports = {
  entry:  path.resolve(__dirname, '../src/index.tsx'),
  output: {
    filename: 'static/js/[name].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true, // webpack5内置clean-webpack-plugin
    publicPath: '/' // 最终静态资源dist里文件的访问路径  ./static/js/[name].js
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'babel-loader'
      },
      {
        test: /\.(css|less)$/,
        use: [
          // 解析从下向上，从右往左
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      inject: true
    }),
    new DefinePlugin(definitions)
  ]
}