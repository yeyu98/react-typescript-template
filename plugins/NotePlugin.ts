// NOTE 给每个打包输出的文件头添加上注释
const chalk = require('chalk')
const { yellow, green } = chalk

module.exports = class NotePlugin {
    constructor() {
        console.log(yellow("Hello, I'm NotePlugin!"))
    }
    apply(compiler) {
        compiler.hooks.emit.tap('Output note in head', (compilation) => {
            const assets = Object.entries(compilation.assets)
            for(let i=0; i<assets.length; i++) { 
                const [name, source] = assets[i]
                console.log(name)
                const note = `/** aaa file is：${name} */`
                if(name.endsWith('js')) {
                    console.log(green(name))
                    const content = note + source
                    compilation.assets[name] = {
                        source: () => content,
                        size: () => content.length
                    }
                }
            }
        })
    }
}
