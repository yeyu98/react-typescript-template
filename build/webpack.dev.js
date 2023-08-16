/*
 * @Author: xiaohu
 * @Date: 2023-08-16 10:31:02
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-08-16 14:34:53
 * @FilePath: \react-typescript-template\build\webpack.config.js
 * @Description: 
 */

/** @type {import('webpack').Configuration} */
const path = require("path")
const {merge} = require("webpack-merge")
const baseConfig = require("./webpack.base")

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 3000,
    compress: false, // gizp压缩
    hot: true, // 热更新
    historyApiFallback: true, // 解决hisotry模式下的404问题
    static: {
      directory: path.resolve(__dirname, '../public') // 配置直接访问public里的静态文件
    }
  }
})
