/*
 * @Author: lzy-Jerry
 * @Date: 2023-08-26 15:20:12
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-08-26 15:42:52
 * @Description: 
 */
const less = require('less')

module.exports = function(source) {
    const callback = this.async()
    less.render(source).then((output, error) => {
        callback(error, output.css)
    })
}