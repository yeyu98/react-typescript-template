/*
 * @Author: lzy-Jerry
 * @Date: 2023-08-22 22:38:40
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-08-22 22:57:05
 * @Description: 
 */
const chalk = require('chalk');
const { yellow, green } = chalk;

module.exports = class CompilerHooksPlugin {
    constructor() {
        console.log(yellow("Hello，I'm CompilerHooksPlugin"))
    }
    apply(compiler) {
        compiler.hooks.compile.tap('compile', (compilationParams) => {
            console.log("创建compilation --->>>", compilationParams)
        })
    }
}