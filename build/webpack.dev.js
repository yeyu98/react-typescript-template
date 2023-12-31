/*
 * @Author: xiaohu
 * @Date: 2023-08-16 10:31:02
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-08-17 20:16:46
 * @FilePath: \react-typescript-template\build\webpack.dev.js
 * @Description: 
 */

/** @type {import('webpack').Configuration} */
const path = require("path")
const {merge} = require("webpack-merge")
const baseConfig = require("./webpack.base")
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 3000,
    compress: false, // gzip压缩
    open: true,
    hot: true, // 热更新
    historyApiFallback: true, // 解决history模式下的404问题
    static: {
      directory: path.resolve(__dirname, '../public') // 配置直接访问public里的静态文件
    }
  },
  plugins: [
    new ReactRefreshWebpackPlugin()
  ]
})
