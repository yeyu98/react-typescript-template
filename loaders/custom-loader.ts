/*
 * @Author: lzy-Jerry
 * @Date: 2023-08-25 22:35:11
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-08-26 15:02:30
 * @Description: 
 */
const { yellow } = require('chalk')
const fs = require('fs')
const path = require('path')
module.exports =  function(source) {
    console.log(yellow('👋👋👋, this is custom loader'))
    console.log(source)
    return source
}