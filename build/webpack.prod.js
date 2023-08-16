/*
 * @Author: xiaohu
 * @Date: 2023-08-16 10:31:10
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-08-16 21:19:09
 * @FilePath: \react-typescript-template\build\webpack.prod.js
 * @Description: 
 */

/** @type {import('webpack').Configuration} */

const {merge} = require("webpack-merge")
const prodConfig = require("./webpack.prod")

module.exports = merge(prodConfig, {
  mode: 'production'
})