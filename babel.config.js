/*
 * @Author: lzy-Jerry
 * @Date: 2023-08-16 23:39:25
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-08-17 20:18:12
 * @Description: 
 */
const isDev = process.env.NODE_ENV === 'development'
module.exports = {
  plugins: [isDev && require.resolve('react-refresh/babel')].filter(Boolean), // 过滤空值
  presets: [
      [
        '@babel/preset-env',
        {
          'useBuiltIns': 'usage', // 按需添加根据配置的浏览器以及使用到的api
          'corejs': 3 // 3版本的corejs
        }
      ],
      '@babel/preset-react',
      '@babel/preset-typescript'
  ]
}