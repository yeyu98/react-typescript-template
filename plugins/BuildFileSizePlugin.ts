/*
 * @Author: lzy-Jerry
 * @Date: 2023-08-20 10:16:58
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-08-21 20:28:16
 * @Description: 
 */
// chalk 4.0版本支持cjs
const chalk = require('chalk');
const { yellow, green } = chalk
const toKb = (number) => (number / 1024).toFixed(2)

class BuildFileSizePlugin {
    apply(complier) {
        // NOTE 打包输出dist之前
        complier.hooks.emit.tap("buildFileSize", (compilation) => {
            // 构建之后的产物内容 ===>>> dist内容
            let totalSize = 0
            for(const name in compilation.assets) {
                const content = compilation.assets[name].source()
                const size = content.length
                totalSize += size
                console.log(green(`${name} size--->>>`), yellow(`${toKb(size)}KB`))
            }
            console.log(yellow(`total size--->>>`,`${toKb(totalSize)}KB`))
        })
        // 打包完成
        complier.hooks.done.tap("buildFileSize", (stas) => {
            console.log("打包完成")
        })
    }
}

module.exports = BuildFileSizePlugin