/*
 * @Author: lzy-Jerry
 * @Date: 2023-08-23 20:23:30
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-08-23 21:12:54
 * @Description: 
 */
/**
 * ​封装一个webpack插件主要作用就是在打包时如果public文件夹下不存在version.json文件就自动创建
 * 存在则自动修改version.json文件中的版本号（防止打包后忘记更改版本号）
 * */ 

// run
// 直接使用fs 操作public判断有无version.json文件有则替换内容无则创建version.json

// emit: 可以判断打包后的产物有无version.json，若有则替换内容，没有则创建version.json
// 那我要怎么拿到source呢？以及如何比对source？

class BuildInjectVersionPlugin {
    options = {
        filename: '',
        ext: ''
    }
    constructor(options) {
        this.options = options
        console.log("BuildInjectVersionPlugin is start！")
    }
    apply(compiler) {
        const { filename, ext  } = this.options
        compiler.hooks.emit.tapPromise('injectVersion', (compilation) => {
            return new Promise((resolve) => { 
                const target = Object.keys(compilation.assets).filter(name => name.indexOf(filename) !== -1 && name.indexOf(ext) !== -1)
                const targetAssets = compilation.assets[target[0]]
                const version = JSON.stringify({
                    version: `version_${Date.now()}`
                })
                if(targetAssets.length === 1) {
                    const { name, source } = targetAssets[0]
                    const alertSource = JSON.parse(source)
                    alertSource.version = `version_${Date.now()}`
                    const content = JSON.stringify(alertSource)
                    compilation.assets[name] = {
                        source: () => content,
                        size: () => content.length
                    }
                } else {
                    compilation.assets['version.json'] = {
                        source: () => version,
                        size: () => version.length
                    }
                }
                resolve('')
            })
        })
    }
}


module.exports = BuildInjectVersionPlugin