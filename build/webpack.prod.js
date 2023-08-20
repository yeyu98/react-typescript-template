/*
 * @Author: xiaohu
 * @Date: 2023-08-16 10:31:10
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-08-20 11:23:32
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
// const BuildFileSizePlugin = require('../plugins/BuildFileSizePlugin.ts')

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
      filename: 'static/css/[name].[contenthash:8].css'
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
    // new BuildFileSizePlugin()
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 第三方模块单独拆一个chunk
        vendors: {
          test: /node_modules/, // 匹配node_modules
          name: 'vendors',
          minChunks: 1, // 使用一次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块，排除异步模块
          minSize: 0, // 体积大于1就提取
          priority: 1 // 优先级最高
        },
        // 公共模块拆分成一个chunk
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'initial',
          minSize: 0
        }
      }
    } 
  }
})