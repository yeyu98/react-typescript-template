/*
 * @Author: lzy-Jerry
 * @Date: 2023-08-16 21:05:57
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-08-18 22:27:21
 * @Description: 
 */

/** @type {import('webpack').Configuration} */

const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { DefinePlugin } = require('webpack')

const customEnvs = ['BASE_ENV']
const definitions = {}
customEnvs.forEach(_env => {
  definitions[`process.env.${_env}`] = JSON.stringify(process.env[_env])
})

module.exports = {
  entry:  path.resolve(__dirname, '../src/index.tsx'),
  output: {
    filename: 'static/js/[name].js',
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
          'style-loader',
          'css-loader',
          'postcss-loader'
        ],
        exclude: ['/node_modules']
      }, 
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
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
          filename: 'static/images/[name][ext]'
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
          filename: 'static/fonts/[name][ext]'
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
          filename: 'static/media/[name][ext]'
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
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      inject: true
    }),
    new DefinePlugin(definitions)
  ],
  cache: {
    type: "filesystem" // 使用文件缓存
  }
}