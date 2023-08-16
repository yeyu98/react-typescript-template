/*
 * @Author: lzy-Jerry
 * @Date: 2023-08-16 23:39:25
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-08-16 23:40:20
 * @Description: 
 */
module.exports = {
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