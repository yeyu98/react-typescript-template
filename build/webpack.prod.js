/*
 * @Author: xiaohu
 * @Date: 2023-08-16 10:31:10
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-08-20 10:49:23
 * @FilePath: \react-typescript-template\build\webpack.prod.js
 * @Description: 
 */

/** @type {import('webpack').Configuration} */

const path = require("path")
const {merge} = require("webpack-merge")
const baseConfig = require("./webpack.base")
const CopyPlugin  = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
// NOTE 自定义插件用于计算打包后的dist文件大小
const BuildFileSizePlugin = require('../plugins/BuildFileSizePlugin.ts')

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    // NOTE 打包时将public下的文件移动到dist中
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'), to: path.resolve(__dirname, '../dist')
        }
      ]
    }),
    // NOTE 抽离css成单独文件
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css'
    }),
    // NOTE 压缩css === 丑化js
    new CssMinimizerPlugin(),
    // NOTE 多线程压缩js
    new TerserPlugin({
      parallel: true,
      terserOptions: {
        compress: {
          pure_funcs: ['console.log'] // 删除指定函数
        }
      }
    }),
    // NOTE 计算打包后dist文件大小
    new BuildFileSizePlugin()
  ]
})