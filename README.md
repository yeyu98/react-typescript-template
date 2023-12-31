<!--
 * @Author: xiaohu
 * @Date: 2023-08-16 10:26:31
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-08-28 22:48:56
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
- 资源懒加载 √ 首屏
  - webpack默认支持资源懒加载,只需要引入资源使用import语法来引入资源,webpack打包的时候就会自动打包为单独的资源文件,等使用到的时候动态加载。
    - React里的组件懒加载需要通过lazy 结合 Suspense实现；
- 资源预加载 √ 首屏
  - prefetch：在空闲的时候告诉浏览器先下载资源但不执行；
  - preload：告诉浏览器先下载资源但不执行；
  - 这两个属性只有在link标签中使用，link标签也可以导入js资源；
  - 在webpack中可以通过 魔法注释里开启这两个属性；
- 打包时生成gzip文件 √
  - compression-webpack-plugin：打包后压缩文件大小，主要压缩js、css文件；  
# 自定义plugin

- webpack构建流程
- `<a>https://blog.csdn.net/zxd1435513775/article/details/125386977</a>`
- 相关链接 `<a>https://webpack.docschina.org/api/compiler-hooks/</a>` `<a>https://webpack.docschina.org/api/compilation-hooks/</a>`
complier.hooks.执行阶段.tap函数('插件名称', (阶段回调参数) => {})
- complier对象：控制整个webpack执行流程，相当于流程控制器，可以在不同流程中修改流水线产物；
  - hooks
    - watchRun(AsyncSeriesHook): 在开发环境下监听文件变化，当文件发生变化就会重新创建一次compilation对象，重新进行一次资源模块处理；
    - run(AsyncSeriesHook): 开始构建之前；
    
    - compile：创建compilation之前；
    - thisCompilation：初始化compilation时调用，触发compilation事件之前调用；
    - compilation：compilation创建之后；
    - 
    - make(AsyncParallelHook)：compilation结束之前；
    - afterCompile(AsyncSeriesHook): compilation结束或封存之后； 
    - emit(AsyncSeriesHook)：在该生命周期阶段所有的模块转换以及所有的代码块都已经生成好了，万事俱备只欠东风只差资源输出；
    - afterEmit(AsyncSeriesHook)：资源输出目录之后；
    - done(AsyncSeriesHook)：compilation对象所有的流程都执行完毕；
    - 
    - failed：compilation执行失败时调用；
  - sync or async
    - AsyncSeriesHook：串行执行异步回调前面一个回调执行完成之后后一个回调才开始执行，最终执行时间是所有任务的总和；
    - AsyncParallelHook：并发执行异步回调可以参考 Promise.all所有的任务同时进行，最终执行的时间看这几个任务中最长的那个；
- compilation对象：能够访问所有的模块以及模块之间的依赖（循环依赖），主要作用是对分析各个模块以及它们的依赖并进行编译，在编译阶段会对模块加载(load)、封存(seal)、优化(optimize)、 分块(chunk)、哈希(hash)和重新创建(restore)；
  - compilation
    - modules：可以访问所有的模块，每个文件对应着一个模块；
    - chunks：由多个modules组成的chunk，例如我们项目中拆分出来的vendors是一个chunk，main是一个chunk，common是一个chunk；
    - assets：可以获取到所有的打包结果；
      - 如果需要修改某个dist文件里面的内容需要通过source以及size来改变；
      - 遍历assets目前只能通过Object.keys的方式获取到对应的assets.source()；
    - hooks：compilation对应的hook用于compilation编译模块时在不同的阶段添加或修改逻辑；
      - buildModule：模块构建开始之前；
      - seal：构建完成，封装；
      - optimize：优化阶段触发；
      - reviveChunks：整理chunks；
- Tapable
  - tap：同步钩子；
  - tapAsync：异步钩子通过callback告知webpack逻辑执行完成；
  - tapPromise：异步钩子通过返回promise告知webpack逻辑执行完成；
# 自定义loader
- loader的本质是一个node模块，由于webpack只能识别js或json因此在webpack中的作用相当于翻译机，将其他类型的文件通过模块转换成js以便告诉webpack如何处理；
- loader工具包
  - `loader-utils` 
  - `loader-schema`
- 处理传参：通过工具包getOptions获取可以是字符串也可以是对象；
- 特性
  - 单一职责原则：每个loader都只做一件事件；
  - 链式调用：执行原则是根据配置从下到上，从右到左执行且每个loader都能拿到上一个loader处理过后的source；
  - 遵循webpack制定的loader标准即输入和输出都得是js（string || buffer）；
  - 模块化：每个loader都是一个模块；
  - 无状态：每个loader都应纯粹不保留任何状态；
- 同步loader
  - 返回值
    - 通过this.callback
      ```
      this.callback(
        // 当无法转换源内容时，给 Webpack 返回一个 Error
        err: Error | null,
        // 源内容转换后的内容
        content: string | Buffer,
        // 用于把转换后的内容得出原内容的 Source Map，方便调试
        sourceMap?: SourceMap,
        // 如果本次转换为原内容生成了 AST 语法树，可以把这个 AST 返回，
        // 以方便之后需要 AST 的 Loader 复用该 AST，以避免重复生成 AST，提升性能
        abstractSyntaxTree?: AST
      );
      ```
    - 通过return source；
- 异步loader：当某个loader里面包含某些异步任务的时候可以使用
  - 使用`const callback = this.async()` 开启异步
  - 通过callback返回结果类似this.callback
- 配置自定义loader路径
  - 可以通过`path.resolve(__dirname, '../loaders/custom-loader.ts')`的方式use；
  - 配置`resolveLoader`来指定查找loader的位置
    - 根据配置先后顺序查找对应的loader；
    ```
    resolveLoader: {
      // 根据配置先后顺序 先在node_modules中查找若没有则在loaders中查找
      modules: ['node_modules', path.resolve(__dirname, '../loaders')]
    }
    ```
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
## 构建过程
整个构建过程核心完成了 <b>内容转换 + 资源合并</b> 两种功能，划分为三个阶段初始化阶段、构建阶段、生成阶段；
addEntry === make（从入口开始将不同的模块转换成module，调用loader将模块解析成js之后再调用js解释器将内容解析成ast，通过ast对象递归分析对应的依赖，最终生成依赖图） === seal（将多个module根据规则合并成chunk） === emit
- 初始化阶段：
  - 初始化参数：从配置文件、 配置对象、Shell 参数中读取，与默认配置结合得出最终的参数；
  - 创建编译器对象：用上一步得到的参数创建 Compiler 对象；
  - 初始化编译环境：包括注入内置插件、注册各种模块工厂、初始化 RuleSet 集合、加载配置的插件等；
  - 开始编译：执行 compiler 对象的 run 方法；
  - 确定入口：根据配置中的 entry 找出所有的入口文件，调用 compilition.addEntry 将入口文件转换为 dependence 对象；
- 构建阶段：
  - 编译模块(make)：根据 entry 对应的 dependence 创建 module 对象，调用 loader 将模块转译为标准 JS 内容，调用 JS 解释器将内容转换为 AST 对象，从中找出该模块依赖的模块，再 递归 本步骤直到所有入口依赖的文件都经过了本步骤的处理；
  - 完成模块编译：上一步递归处理所有能触达到的模块后，得到了每个模块被翻译后的内容以及它们之间的 依赖关系图；
- 生成阶段：
  - 输出资源(seal)：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
  - 写入文件系统(emit)：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统；

## 文件监听与热更新HMR
在开发时文件发生了变动webpack是如何监听到文件的变化的呢？
文件发生变化重新build保存到内存之后是如何通知到浏览器的呢？
build之后的产物是如何做到增量热更新的呢？

webpack-dev-server源码

- setupHooks
  - invalid告知compilation编译完成； 
  - done这个hooks里通过websocket向客户端发送 最新更新模块的信息（hash值），告知模块是否更新；
- setupApp：开启一个express服务；
- setupHostHeaderCheck：校验配置的Host请求头是否合理；
- setupDevMiddleware：初始化webpackDevMiddleware；
- setupBuiltInRoutes
- setupWatchFiles
- setupWatchStaticFiles
- setupMiddlewares
- createServer




## tree-shaking








# 问题记录
- 在build文件使用mode：production时，配置index.tsx作为入口文件但似乎没有生效，此时添加一个index.js文件就行（目前没发现问题在哪先放放把）？
  - 完结是因为merge配置的时候merge导入的文件导错了 ~_~ ;
- 为什么webpack无法监听配置文件的修改而vite可以做到呢？
  - 因为vite的配置文件最终只有一个 vite.config.ts ~_~;

- 执行该plugin时需要注释一下 HtmlWebpackPlugin 否则会有影响，猜测使用了相同的hook，那为什么会影响到这边的compilation和afterCompiler执行两次呢？
- custom-style-loader返回的其实只有字符串为什么能正常运行而custom-css-loader 返回字符串却不行?


# 关于debug
首先呢我们整个debug需要通过node 自带的 inspect 来debugger 特定的文件
我们在package.json里的脚本配置如下
--inspect-brk 
	(1)启动调试代理; (2)监听默认地址和端口(127.0.0.1:9229); (3)用户代码启动前断点(此时将我们的代码包裹在一个函数中)
--config 所配置的是你自己要debug的文件，你需要在文件的开头或者你需要debug的地方输入debugger
```
"debug": "node --inspect-brk ./node_modules/webpack/bin/webpack.js --config ./build/webpack.prod.js"
```
之后我们运用到了 vscode 自带的debug功能，通过配置 launch.json 在该文件里添加`通过npm启动`的配置
在runtimeArgs配置你自己自定义的script，我这边配置的是 run debug
runtimeExecutable配置成npm即可，接下来你启动你自己的launch 就可以在vscode 里面调试了

大概的调试过程是先会进入到webpack.js 里走打包流程，此时你可以直接跳过进入到你所需要debug的文件里就可以debug你自己的内容了；