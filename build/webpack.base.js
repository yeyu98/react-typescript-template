/*
 * @Author: xiaohu
 * @Date: 2023-08-16 10:30:32
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-08-16 11:52:53
 * @FilePath: \react-typescript-template\build\webpack.base.js
 * @Description: 
 */

/** @type {import('webpack').Configuration} */

const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: path.resolve(__dirname, "../src/index.tsx"),
  output: {
    filename: 'static/js/[name].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true, // webpack5内置clean-webpack-plugin
    publicPath: './' // 最终静态资源dist里文件的访问路径  ./static/js/[name].js
  },
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/,
        use: {
          loader: 'babel-loader',
          // 解析从下向上，从右往左
          preset: [
            '@babel/preset-react',
            '@babel/preset-typescript'
          ]
        }
      }
    ]
  },
  resolve: {
    extensions: ['js', 'tsx', 'ts']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      inject: true
    })
  ]
}