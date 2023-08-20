<!--
 * @Author: xiaohu
 * @Date: 2023-08-16 10:26:31
 * @LastEditors: xiaohu
 * @LastEditTime: 2023-08-20 17:41:18
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
- 开启持久化存储缓存 √
  - 在webpack5之前做缓存是使用babel-loader缓存解决js的解析结果,cache-loader缓存css等资源的解析结果,还有模块缓存插件hard-source-webpack-plugin,配置好缓存后第二次打包,通过对文件做哈希对比来验证文件前后是否一致,如果一致则采用上一次的缓存,可以极大地节省时间；
  - webpack5内置缓存配置；
    - 本项目启动 6725ms --->>> 2237ms !!!
    - 本项目打包 7323ms --->>> 1587ms !!!
  - 我擦，持久化缓存巨强好吧，我吹爆！！！
- 开启多线程loader √
  - 在thread-loader之后的loader会建立一个线程池，仅将耗时的loader放进去因为开启多线程也需要启动时间大约在600ms左右
  - 这里只针对babel-loader使用， 1.44s --->>> 2.072kb （小项目会存在负优化操作还得是在大项目中使用，哈哈哈）
- 缩小loader作用范围通过include、exclude，小项目目前没看到显著提升；
- 精准使用loader（有显著的性能提升构建时间缩短个100+ms） √
  - 针对不同类型的文件需要精准使用一种loader去解析，比如css文件如果同时使用less-loader先去解析会增加构建的时间，所以这里会精准拆分开；
  - 针对ts、tsx、less、css精准使用各自的loader；
    - dev 4204 --->>> 3930
    - prod 4756 --->>> 4688
- sourcemap  √
  - 开发环境推荐eval-cheap-module-source-map
  - 生产环境不推荐使用
# 优化构建结果包体积大小
- webpack包分析工具
  - webpack-bundle-analyzer 
- 抽离css文件 √
  - 开发模式下将css嵌入到style标签中可以走style-loader的热更新替换；
  - 打包模式下更需要将其抽离到单独的文件中方便做缓存策略，此时需要用到MiniCssExtractPlugin.loader 和 MiniCssExtractPlugin()；
  - mini-css-extract-plugin
- 压缩css文件 √
  - css-minimizer-webpack-plugin 
  - 280kb
- 压缩js文件：webpack5默认支持  √
  - webpack5本身具备和默认开启多线程压缩的能力，如果需要自定义压缩js的配置那么需要手动安装 terser-webpack-plugin；
    - 可配置打包删除指定函数；
    - `terser-webpack-plugin` 和 `uglifyjs-webpack-plugin` 的功能大致相同唯一不同在于前者支持ES5同时也支持ES6的语法；
- 合理配置文件名hash值 √
  - 配置文件名hash值当文件hash值未发生改变时可以走浏览器的缓存策略而不需要重新加载对应的文件，提升页面加载速度减轻服务器压力；
  - hash类型
    - hash：打包后所有的文件共有一个hash值，当整个应用中的某个文件发生改变hash值就会发生变化（这个真的有使用的场景吗？）；
    - chunkhash：根据不同入口文件进行文件解析、依赖构建生成的chunk（可能是多个文件）hash，当某个chunk发生改变或者它的依赖文件发生改变则会重新生成hash；
    - contenthash：根据文件内容生成hash值，每个文件都有自己的hash值，当文件本身发生改变就会重新生成hash值；
  - 针对有依赖的文件可以使用chunkhash，没有依赖的文件使用contenthash；
- 代码分割（拆分不同chunk设置缓存组） √
  - 拆分node_modules为单独的chunk，因为第三方模块变化的几率相对来说比较小；
  - 拆分公共模块chunk；
  - 再就是业务chunk；
- tree-shaking √
  - 针对js：webpack5默认启用；
  - 针对css：purgecss-webpack-plugin、min-css-extract-plugin、glob-all
    - purgecss-webpack-plugin移除未使用css（太强啦！！！）；
      - 主要针对id、class、标签的样式tree-shaking；
    - glob-all作用等同于import.glob 可以批量导入模块；
- 资源懒加载 √
  - webpack默认支持资源懒加载,只需要引入资源使用import语法来引入资源,webpack打包的时候就会自动打包为单独的资源文件,等使用到的时候动态加载。
    - React里的组件懒加载需要通过lazy 结合 Suspense实现；
- 资源预加载 √
  - prefetch：在空闲的时候告诉浏览器先下载资源但不执行；
  - preload：告诉浏览器先下载资源但不执行；
  - 这两个属性只有在link标签中使用，link标签也可以导入js资源；
  - 在webpack中可以通过 魔法注释里开启这两个属性；
- 打包时生成gzip文件 √
  - compression-webpack-plugin：打包后压缩文件大小，主要压缩js、css文件；  
# 自定义plugin
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
## tree-shaking








# 问题记录
- 在build文件使用mode：production时，配置index.tsx作为入口文件但似乎没有生效，此时添加一个index.js文件就行（目前没发现问题在哪先放放把）？
  - 完结是因为merge配置的时候merge导入的文件导错了 ~_~ ;
- 为什么webpack无法监听配置文件的修改而vite可以做到呢？