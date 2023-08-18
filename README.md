<!--
 * @Author: xiaohu
 * @Date: 2023-08-16 10:26:31
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-08-18 22:31:05
 * @FilePath: \react-typescript-template\README.md
 * @Description: 
-->
# react-typescript-template
This is a react, ts, less template.

# 技术栈
- pnpm
- webpack webpack-cli （两个包分别都有哪些功能）
  - webpack 
  - webpack-cli：webpack命令行工具，webpack真正执行依赖于webpack-cli，在命令行中执行 webpack 命令，会执行 node_modules 下的 .bin 目录下的 webpack 文件；
- react18 react-dom（两个包分别都有哪些功能）
  - react：为开发者提供react开发中所需要使用的api；
  - react-dom：渲染器，一般用于协调后渲染真实dom到界面上，这里所使用到的api更多的是createRoot；
  - 类型依赖： @types/react @types/react-dom （这个有必要安装吗？？？）
    - Typescript项目中有必要！！！ https://blog.csdn.net/qq_58459674/article/details/126773659
- 配置文件如果用的ts就需要安装types/node
- typescript
- less
- tailwinds

- babel


# 配置
## 基本配置
- entry
- output
- module （loader）
  - babel-loader
  - @babel/core：babel核心功能 其他都以预设形式添加（类似于插件）；
  - jsx、ts的loader：需要通过babel
    - @babel/preset-react：解析jsx语法；
    - @babel/preset-typescript：解析ts语法；
- resolve
  - extensions: 配置改配置项之后引入模块就无须使用后缀，高频出现的放后面；
- plugins
  - html-webpack-plugin：设置index.html文件可以使用自定义模板；

## 开发环境配置
- 合并配置
- mode
- devtool
- devServer
webpack-dev-server：启动开发环境服务、热更新；
webpack-merge：配置合并
## 生产环境配置
# 基础功能配置
- 环境变量配置
  - cross-env：设置环境变量
  - definePlugin：将环境变量注入webpack里面，NODE_ENV：cross-env内置，其他定义的环境变量需要通过
- 样式处理
  - style-loader：将css插入到style标签中；
  - css-loader：解析css文件；
  - less-loader：解析less文件；
- 处理CSS3在不同浏览器中的兼容
  - postcss-loader：为新特性或需要兼容的css属性添加前缀、压缩css；
  - autoprefixer：决定哪些浏览器需要添加前缀；
- babel预设js兼容处理
  - babel-preset: 将js转换为最新标准语法；
  - core-js：垫片兼容用低版本语法模拟实现最新标准；
- build复制public文件夹
  - 在开发模式中因为会启动devServer，可以通过服务直接配置访问，而在生产环境上如果不配置就无法访问到文件；
  - copy-webpack-plugin：打包的时候将public的文件直接copy到dist里；
- 处理图片、字体、媒体文件
  - 图片处理
    - file-loader & url-loader ===>>> asset
    - raw-loader
- 热更新
  - 整体热更新需要通过配置devServer: {hot: true}；
  - 样式热更新是通过style-loader完成的；
  - react组件状态不发生改变的热更新需要通过  @pmmmwh/react-refresh-webpack-plugin react-refresh，当然hooks的更改会触发完全刷新；

# 构建速度优化
- 分析构建速度
  - speed-measure-webpack-plugin分析构建打包时各个loader/plugins的耗时；
  - 为了不影响开发构建/打包的速度我们可以单独开一个配置来做分析；
- 开启持久化存储缓存
  - 在webpack5之前做缓存是使用babel-loader缓存解决js的解析结果,cache-loader缓存css等资源的解析结果,还有模块缓存插件hard-source-webpack-plugin,配置好缓存后第二次打包,通过对文件做哈希对比来验证文件前后是否一致,如果一致则采用上一次的缓存,可以极大地节省时间；
  - webpack5内置缓存配置；
    - 本项目启动 6725ms --->>> 2237ms !!!
    - 本项目打包 7323ms --->>> 1587ms !!!
  - 我擦，持久化缓存巨强好吧，我吹爆！！！
- 开启多线程loader
  - 在thread-loader之后的loader会建立一个线程池，仅将耗时的loader放进去因为开启多线程也需要启动时间大约在600ms左右
  - 这里只针对babel-loader使用， 1.44s --->>> 2.072kb （小项目会存在负优化操作还得是在大项目中使用，哈哈哈）
- 缩小loader作用范围通过include、exclude，小项目目前没看到显著提升；
- 精准使用loader（有显著的性能提升构建时间缩短个100+ms）
  - 针对不同类型的文件需要精准使用一种loader去解析，比如css文件如果同时使用less-loader先去解析会增加构建的时间，所以这里会精准拆分开；
  - 针对ts、tsx、less、css精准使用各自的loader；
    - dev 4204 --->>> 3930
    - prod 4756 --->>> 4688
- sourcemap
  - 开发环境推荐eval-cheap-module-source-map
  - 生产环境不推荐使用
# 优化构建结果包体积大小
- webpack包分析工具
  - webpack-bundle-analyzer 
# 项目目录

```
├── build
|   ├── webpack.base.js # 公共配置
|   ├── webpack.dev.js  # 开发环境配置
|   └── webpack.prod.js # 打包环境配置
├── public
│   └── index.html # html模板
├── src
|   ├── App.tsx 
│   └── index.tsx # react应用入口页面
├── tsconfig.json  # ts配置
└── package.json
```
- index.html tsconfig.json的配置是直接cv的，后续再去理清内容



https://juejin.cn/post/7111922283681153038#heading-4



# 原理
## 不同类型模块的处理（如何磨平差异）
## 文件监听与热更新








# 问题记录
- 在build文件使用mode：production时，配置index.tsx作为入口文件但似乎没有生效，此时添加一个index.js文件就行（目前没发现问题在哪先放放把）？
  - 完结是因为merge配置的时候merge导入的文件导错了 ~_~ ;
- 为什么webpack无法监听配置文件的修改而vite可以做到呢？