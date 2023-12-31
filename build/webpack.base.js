/*
 * @Author: lzy-Jerry
 * @Date: 2023-08-16 21:05:57
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-08-26 15:55:46
 * @Description: 
 */

/** @type {import('webpack').Configuration} */

const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { DefinePlugin } = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'

const customEnvs = ['BASE_ENV']
const definitions = {}
customEnvs.forEach(_env => {
  definitions[`process.env.${_env}`] = JSON.stringify(process.env[_env])
})

module.exports = {
  entry:  path.resolve(__dirname, '../src/index.tsx'),
  output: {
    filename: 'static/js/[name].[chunkhash:8].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true, // webpack5内置clean-webpack-plugin
    publicPath: '/' // 最终静态资源dist里文件的访问路径  ./static/js/[name].js
  },
  module: {
    rules: [
      // NOTE 针对ts使用局部的预设配置
      {
        test: /\.ts$/,
        use: [
          'thread-loader', 
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    'useBuiltIns': 'usage',
                    'corejs': 3 
                  }
                ],
                '@babel/preset-typescript'
              ]
            }
          }
        ],
        include: [path.resolve(__dirname, '../src')]
      },
      // NOTE 针对tsx使用全局的babel config
      {
        test: /\.tsx$/,
        use: ['thread-loader', 'babel-loader'],
        include: [path.resolve(__dirname, '../src')]
      },
      {
        test: /\.css$/,
        use: [
          // 解析从下向上，从右往左
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ],
        exclude: ['/node_modules']
      }, 
      // {
      //   test: /\.less$/,
      //   use: [
      //     isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      //     'css-loader',
      //     'postcss-loader',
      //     'less-loader',
      //   ],
      //   exclude: ['/node_modules']
      // }, 
      // NOTE 自定义loader
      {
        test: /\.less$/,
        use: [
          'custom-style-loader',
          {
            loader: 'custom-css-loader',
            options: {
              name: 'css-loader'
            }
          },
          'custom-less-loader',
        ],
        exclude: ['/node_modules']
      }, 
      // NOTE 图片资源处理
      {
        test: /\.(png|jpg|jpeg|gif|webp|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 大于10kb移动到指定文件，否则转换成base64
          }
        },
        generator: {
          filename: 'static/images/[name].[contenthash:8][ext]'
        },
        exclude: ['/node_modules']
      },
      // NOTE 字体资源处理
      {
        test:/.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 大于10kb移动到指定文件，否则转换成base64
          }
        },
        generator: {
          filename: 'static/fonts/[name].[contenthash:8][ext]'
        },
        exclude: ['/node_modules']
      },
      // NOTE 媒体资源处理
      {
        test:/.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 大于10kb移动到指定文件，否则转换成base64
          }
        },
        generator: {
          filename: 'static/media/[name].[contenthash:8][ext]'
        },
        exclude: ['/node_modules']
      },
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  resolveLoader: {
    // 根据配置先后顺序 先在node_modules中查找若没有则在loaders中查找
    modules: ['node_modules', path.resolve(__dirname, '../loaders')],
    extensions: ['.js', '.json', '.ts']
  },
  plugins: [
    // NOTE 自定义处理index.html
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      inject: true
    }),
    // NOTE 注入自定义环境变量
    new DefinePlugin(definitions),
  ],
  cache: {
    type: "filesystem" // 使用文件缓存
  }
}