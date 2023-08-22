
const chalk = require('chalk')
const { yellow, green } = chalk

class CustomPlugin {
    constructor() {
        console.log(yellow("Hello, I'm CustomPlugin!"))
    }
    apply(compiler) {
        console.log(green("I come here"))
        // 分析包资源大小并输出analy.md文件
        compiler.hooks.emit.tap('OutputFileSize', (compilation) => {
            const [name, source] = compilation.assets
            console.log(name)
            let result = ''
            let total = 0
            // for(const name in assets) {
            //     console.log(assets[name])
            //     // result += `file ${name} size --->>> ${fileSize}B \n`
            //     // total += fileSize
            // }
            // result += `total size --->>> ${total}B \n`
            // console.log(result)
            // compilation.assets['analy.md'] = {
            //     source() {
            //         return result
            //     },
            //     size() {
            //         return result.length
            //     }
            // }
        })
    }
}

module.exports = CustomPlugin