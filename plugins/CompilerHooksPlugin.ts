/*
 * @Author: lzy-Jerry
 * @Date: 2023-08-22 22:38:40
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-08-22 23:17:33
 * @Description: 
 */
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const { yellow, green } = chalk;

const createFile = (filename, data) => {
    const filePath = path.resolve(__dirname, `../compileHooksData/${filename}.json`)
    fs.writeFileSync(filePath, data)
}
module.exports = class CompilerHooksPlugin {
    constructor() {
        console.log(yellow("Hello，I'm CompilerHooksPlugin"))
    }
    apply(compiler) {
        compiler.hooks.compile.tap('compile', (compilationParams) => {
            console.log(yellow("compile --->>> 创建compilation"))
            // createFile('compilationParams', JSON.stringify(compilationParams))
        })
        compiler.hooks.thisCompilation.tap('thisCompilation', (compilation, compilationParams) => {
            console.log(yellow("thisCompilation --->>> 初始化compilation，开始调用compilation事件之前"))
        })
        compiler.hooks.compilation.tap('compilation', (compilation, compilationParams) => {
            // NOTE 为何会调用两次？？
            console.log(yellow("compilation --->>> compilation创建之后"))
        })
        compiler.hooks.make.tap('make', (compilation, compilationParams) => {
            console.log(yellow("make --->>> compilation 流程之前"))
        })
        compiler.hooks.afterCompile.tap('afterCompile', (compilation, compilationParams) => {
            console.log(yellow("afterCompile --->>> compilation 流程结束之后"))
        })
        compiler.hooks.emit.tap('emit', (compilation, compilationParams) => {
            console.log(yellow("emit --->>> 资源都已经准备好了，即将输出资源"))
        })
        compiler.hooks.afterEmit.tap('afterEmit', (compilation, compilationParams) => {
            console.log(yellow("afterEmit --->>> 资源准备输出目录之后"))
        })
        compiler.hooks.done.tap('done', (compilation, compilationParams) => {
            console.log(yellow("done --->>> compilation完成执行"))
        })
        compiler.hooks.failed.tap('failed', (compilation, compilationParams) => {
            console.log(yellow("failed --->>> compilation执行失败"))
        })

    }
}