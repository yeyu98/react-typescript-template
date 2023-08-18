/*
 * @Author: xiaohu
 * @Date: 2023-08-17 20:26:18
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-08-18 22:33:04
 * @FilePath: \react-typescript-template\build\webpack.analy.js
 * @Description: 
 */

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const {merge} = require("webpack-merge")
const prodConfig = require("./webpack.prod")

const smp = new SpeedMeasurePlugin({
  compareLoadersBuild: {
    filePath: "../buildInfo.json"
  }
})

module.exports = smp.wrap(merge(prodConfig, {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}))