/*
 * @Author: lzy-Jerry
 * @Date: 2023-08-21 20:30:34
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-08-22 21:45:46
 * @Description: 
 */

const chalk = require('chalk')
const { yellow, green } = chalk

// NOTE 打包后输出一个每个文件大小的md文件
module.exports = class CustomPlugin {
    constructor() {
        console.log(yellow("Hello, I'm CustomPlugin!"))
    }
    apply(compiler) {
        console.log(green("I come here"))
        // 分析包资源大小并输出analy.md文件
        compiler.hooks.emit.tap('OutputFileSize', (compilation) => {
            // compilation.assets 是一个proxy对象，对象里包含name和source两个属性
            const assets = Object.entries(compilation.assets)
            let result = ''
            let total = 0
            for(let i=0; i<assets.length; i++) {
                const [name, source] = assets[i]
                const fileSize = source.size()
                result += `file ${name} size --->>> ${fileSize}B \n`
                total += fileSize
            }
            result += `total size --->>> ${total}B \n`
            console.log(result)
            compilation.assets['analy.md'] = {
                source() {
                    return result
                },
                size() {
                    return result.length
                }
            }
        })
    }
}

