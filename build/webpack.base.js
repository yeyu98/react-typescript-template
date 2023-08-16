/*
 * @Author: xiaohu
 * @Date: 2023-08-16 10:30:32
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-08-16 11:25:23
 * @FilePath: \react-typescript-template\build\webpack.base.js
 * @Description: 
 */

/** @type {import('webpack').Configuration} */

const path = require("path")

module.exports = {
  entry: path.resolve(__dirname, "../src/index.tsx"),
  output: {
    filename: 'static/js/[name].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true, // webpack5内置clean-webpack-plugin
    publicPath: './' // 最终静态资源dist里文件的访问路径  ./static/js/[name].js
  }
}