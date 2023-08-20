/*
 * @Author: lzy-Jerry
 * @Date: 2023-08-20 10:16:58
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-08-20 10:29:10
 * @Description: 
 */
class BuildFileSizePlugin {
    apply(complier) {
        complier.hooks.done.tap("buildFileSize", (stas) => {
            console.log("buildFileSize")
        })
    }
}

module.exports = BuildFileSizePlugin