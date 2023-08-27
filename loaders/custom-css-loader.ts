/*
 * @Author: lzy-Jerry
 * @Date: 2023-08-26 15:20:03
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-08-26 16:13:43
 * @Description: 
 */
const { getOptions } = require('loader-utils')
module.exports = function(source) {
    console.log('options --->>>', getOptions(this))
    console.log('source --->>>', typeof source)

    return JSON.stringify(source)
}