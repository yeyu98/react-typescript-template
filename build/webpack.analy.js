/*
 * @Author: xiaohu
 * @Date: 2023-08-17 20:26:18
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-08-17 20:33:00
 * @FilePath: \react-typescript-template\build\webpack.analy.js
 * @Description: 
 */

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
const smp = new SpeedMeasurePlugin({
  compareLoadersBuild: {
    filePath: "../buildInfo.json"
  }
})
const {merge} = require("webpack-merge")
const prodConfig = require("./webpack.prod")

module.exports = smp.wrap(merge(prodConfig, {}))