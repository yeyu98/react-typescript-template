/*
 * @Author: yeyu98
 * @Date: 2024-05-31 10:55:24
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-05-31 11:30:13
 * @FilePath: \react-typescript-template\plugins\InsertDependencyPlugin.ts
 * @Description: 
 */
// 主要想要实现在模块转译时将模块的源码通过调用不同的Dependency对应着不同的Template处理
// Dependency对应着不同的Template在webpack中会形成映射关系理解为什么依赖对应什么源码处理模版
// 当开始模块转译会先调用Template的apply方法开始转译

// import { Dependency, Template } from "webpack";
const { Dependency, Template } = require('webpack')

// 这里的转译只针对依赖吗？那模块本身不需要吗？
class DemoDependency extends Dependency {
  constructor(){
    super()
  }
  static Template = null
}

DemoDependency.Template = class DemoTemplate extends Template {
  // constructor(){
  //   super()
  // }
  apply(dependency, source) {
    const today = new Date().toLocaleDateString()
    source.insert(0, `
    /* Author yeyu98 */
    /* Date ${today} */ 
    `)
  }
}

module.exports = class InsertDependencyPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap('InsertDependencyPlugin', (compilation) => {
      compilation.dependencyTemplates.set(DemoDependency, new DemoDependency.Template())
      compilation.hooks.succeedModule.tap('InsertDependencyPlugin', (module) => {
        console.log('🥳🥳🥳 ~~ InsertDependencyPlugin ~~ compilation.hooks.successModule.tap ~~ module--->>>', module.originalSource())
        module.addDependency(new DemoDependency())
      })
    })
  }
}