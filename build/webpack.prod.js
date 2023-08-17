/*
 * @Author: xiaohu
 * @Date: 2023-08-16 10:31:10
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-08-17 19:36:02
 * @FilePath: \react-typescript-template\build\webpack.prod.js
 * @Description: 
 */

/** @type {import('webpack').Configuration} */

const path = require("path")
const {merge} = require("webpack-merge")
const baseConfig = require("./webpack.base")
const CopyPlugin  = require("copy-webpack-plugin")

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'), to: path.resolve(__dirname, '../dist')
        }
      ]
    })
  ]
})