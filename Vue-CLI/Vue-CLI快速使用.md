## 1. 概述

Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统，提供：

- 通过 `@vue/cli` 实现的交互式的项目脚手架。

- 通过 `@vue/cli` + `@vue/cli-service-global` 实现的零配置原型开发。

- 一个运行时依赖 ( @vue/cli-service )，该依赖：

  - 可升级；
  - 基于 webpack 构建，并带有合理的默认配置；
  - 可以通过项目内的配置文件进行配置；
  - 可以通过插件进行扩展。

- 一个丰富的官方插件集合，集成了前端生态中最好的工具。

- 一套完全图形化的创建和管理 Vue.js 项目的用户界面。

Vue CL确保了各种构建工具能够基于智能的默认配置即可平稳衔接，不必纠结配置的问题。与此同时，它也为每个工具提供了调整配置的灵活性，无需 eject。

### 1.1. 组件

Vue CLI 有几个独立的部分——多个单独发布的包

#### 1.1.1. CLI

CLI (`@vue/cli`) 是一个全局安装的 npm 包，提供了终端里的 `vue` 命令。它可以通过 `vue create` 快速搭建一个新项目，或者直接通过 `vue serve` 构建新想法的原型。你也可以通过 `vue ui` 通过一套图形化界面管理你的所有项目

#### 1.1.2. CLI 服务

CLI 服务 (`@vue/cli-service`) 是一个开发环境依赖。它是一个 npm 包，局部安装在每个 `@vue/cli` 创建的项目中。

CLI 服务是构建于 [webpack](http://webpack.js.org/) 和 [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 之上的。它包含了：

- 加载其它 CLI 插件的核心服务；
- 一个针对绝大部分应用优化过的内部的 webpack 配置；
- 项目内部的 `vue-cli-service` 命令，提供 `serve`、`build` 和 `inspect` 命令。

#### 1.1.3. CLI 插件

CLI 插件是向你的 Vue 项目提供可选功能的 npm 包，例如 Babel/TypeScript 转译、ESLint 集成、单元测试和 end-to-end 测试等。Vue CLI 插件的名字以 `@vue/cli-plugin-` (内建插件) 或 `vue-cli-plugin-` (社区插件) 开头，非常容易使用。

当在项目内部运行 `vue-cli-service` 命令时，它会自动解析并加载 `package.json` 中列出的所有 CLI 插件。

## 2. 安装

### 2.1. 环境准备

Vue CLI 4.x 需要 [Node.js](https://nodejs.org/) v8.9 或更高版本 (推荐 v10 以上)

```shell
[root@DESKTOP-MSD7I5A ~]# node -v
v16.2.0

```

### 2.2. 安装Vue CLI

可以使用下列任一命令全局安装这个包：

```shell
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

笔者使用局部安装：

```shell
[root@DESKTOP-MSD7I5A node]# mkdir vue
[root@DESKTOP-MSD7I5A node]# cd vue
[root@DESKTOP-MSD7I5A vue]# npm install @vue/cli

```

- 提示：全局安装使用起来会比较方便

检查版本：

```shell
[root@DESKTOP-MSD7I5A vue]# npx vue -V
@vue/cli 5.0.3

```

- 注意：npx 是调用项目内部安装的模块，运行的时候会到`node_modules/.bin`路径和环境变量`$PATH`里面，检查命令是否存在（详细可见[npx 使用教程 - 阮一峰的网络日志 (ruanyifeng.com)](https://www.ruanyifeng.com/blog/2019/02/npx.html)）

## 3. 创建

### 3.1. 命令行创建

运行以下命令来创建一个新项目：

```shell
[root@DESKTOP-MSD7I5A vue]# npx vue create hello-world

```

在创建的时候会预设一些可选项，主要是镜像选择、预设配置（preset）、包管理器（package manager）：

```shell
[root@DESKTOP-MSD7I5A vue]# npx vue create hello-world
?  Your connection to the default yarn registry seems to be slow.
   Use https://registry.npmmirror.com for faster installation? Yes


Vue CLI v5.0.3
? Please pick a preset: Default ([Vue 3] babel, eslint)
? Pick the package manager to use when installing dependencies: NPM


Vue CLI v5.0.3
✨  Creating project in /root/vscode/node/vue/hello-world.
🗃  Initializing git repository...
⚙️  Installing CLI plugins. This might take a while...


added 858 packages in 43s
🚀  Invoking generators...
📦  Installing additional dependencies...


added 97 packages in 18s
⚓  Running completion hooks...

📄  Generating README.md...

🎉  Successfully created project hello-world.
👉  Get started with the following commands:

 $ cd hello-world
 $ npm run serve

```

### 3.2. 图形化界面创建

可以通过 `vue ui` 命令以图形化界面创建和管理项目：

```shell
[root@DESKTOP-MSD7I5A vue]# npx vue ui
🚀  Starting GUI...
🌠  Ready on http://localhost:8000

```

此时会自动打开浏览器界面：

![image-20220320155042569](https://s2.loli.net/2022/03/20/teDI5GOJ6UjKVXo.png)

接下里就是图形化的操作界面：

![image-20220320155328598](https://s2.loli.net/2022/03/20/bz28jDFVydnGirQ.png)

操作的可选项和CLI基本一致，诚然可视化界面确实更清爽明了

创建完成后：

![image-20220320155703826](https://s2.loli.net/2022/03/20/jtxcudLWVBk7siq.png)



## 4.  测试运行

### 4.1. 通过CLI运行

```shell
[root@DESKTOP-MSD7I5A vue]# cd hello-world
[root@DESKTOP-MSD7I5A hello-world]# npm run serve

> hello-world@0.1.0 serve
> vue-cli-service serve

 INFO  Starting development server...


 DONE  Compiled successfully in 10900ms                                4:17:55 PM


  App running at:
  - Local:   http://localhost:8080/
  - Network: unavailable

```

浏览器查看：

![image-20220320161849872](https://s2.loli.net/2022/03/20/Oqw7onCd9L6RWhY.png)

### 4.2. 通过GUI运行

通过可视化图形界面运行Vue项目：

![image-20220320160129872](https://s2.loli.net/2022/03/20/bk5seitlBrTANg8.png)

## 5. 资料参考

\[1][介绍 | Vue CLI (vuejs.org)](https://cli.vuejs.org/zh/guide/)

\[2][npx 使用教程 - 阮一峰的网络日志 (ruanyifeng.com)](https://www.ruanyifeng.com/blog/2019/02/npx.html)

\[3][Vue课堂笔记 · 卢泽华/Vue - 码云 - 开源中国 (gitee.com)](https://gitee.com/lzh_gitee/Vue/tree/master/Vue课堂笔记)



