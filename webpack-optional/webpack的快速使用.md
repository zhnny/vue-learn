## 1. 概述

本质上，*webpack* 是一个现代 JavaScript 应用程序的*静态模块打包器(module bundler)*。当 webpack 处理应用程序时，它会递归地构建一个*依赖关系图(dependency graph)*，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 *bundle*

Vue的运行时依赖 (`@vue/cli-service`)基于 webpack 构建，并带有合理的默认配置，所以作为快速入门，对于webpack的了解是可选的

## 2. 安装

在开始之前，请确保安装了 [Node.js](https://nodejs.org/en/) 的最新版本。使用 Node.js 最新的长期支持版本(LTS - Long Term Support)，是理想的起步

```shell
[root@DESKTOP-MSD7I5A node]# node -v
v16.2.0

```

安装最新版本或特定版本，请运行以下命令：

```shell
npm install --save-dev webpack
npm install --save-dev webpack@<version>
```

对于大多数项目，我们建议本地安装。这可以使我们在引入破坏式变更(breaking change)的依赖时，更容易分别升级项目

## 3. 简单使用

### 3.1. 使用的原因

首先创建一个目录，初始化 npm，然后 [在本地安装 webpack](https://www.webpackjs.com/guides/installation#local-installation)，接着安装 webpack-cli（此工具用于在命令行中运行 webpack）：

```shell
[root@DESKTOP-MSD7I5A node]# mkdir webpack
[root@DESKTOP-MSD7I5A node]# cd webpack
[root@DESKTOP-MSD7I5A webpack]# npm init -y
[root@DESKTOP-MSD7I5A webpack]# npm install webpack webpack-cli

```

创建index.html、文件夹src、src下的index.js：

```shell
[root@DESKTOP-MSD7I5A webpack]# touch index.js
[root@DESKTOP-MSD7I5A webpack]# mkdir src
[root@DESKTOP-MSD7I5A webpack]# mv index.js src/
[root@DESKTOP-MSD7I5A webpack]# touch index.html

```

目前这个文件夹看起来是这样的：

```shell
[root@DESKTOP-MSD7I5A webpack]# ls src ./
./:
index.html  node_modules  package.json  package-lock.json  src

src:
index.js

```

index.js中输入：

```javascript
function component() {
  var element = document.createElement('div');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
```

index.html中输入：

```html
<!doctype html>
<html>
  <head>
    <title>起步</title>
    <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
    <script src="./src/index.js"></script>
  </body>
</html>
```

在此示例中，`<script>` 标签之间存在隐式依赖关系。`index.js` 文件执行之前，还依赖于页面中引入的 `lodash`。之所以说是隐式的是因为 `index.js` 并未显式声明需要引入 `lodash`，只是假定推测已经存在一个全局变量 `_`

使用这种方式去管理 JavaScript 项目会有一些问题：

- 无法立即体现，脚本的执行依赖于外部扩展库(external library)
- 如果依赖不存在，或者引入顺序错误，应用程序将无法正常运行
- 如果依赖被引入但是并没有使用，浏览器将被迫下载无用代码

### 3.2. 使用webpack打包

首先，我们稍微调整下目录结构，将“源”代码(`/src`)从我们的“分发”代码(`/dist`)中分离出来。“源”代码是用于书写和编辑的代码。“分发”代码是构建过程产生的代码最小化和优化后的“输出”目录，最终将在浏览器中加载：

```shell
[root@DESKTOP-MSD7I5A webpack]# mkdir dist
[root@DESKTOP-MSD7I5A webpack]# mv index.html dist/

```

现在这个文件夹的文件分布是这样的：

```shell
[root@DESKTOP-MSD7I5A webpack]# ls ./  dist/ src/
./:
dist  node_modules  package.json  package-lock.json  src

dist/:
index.html

src/:
index.js

```

要在 `index.js` 中打包 `lodash` 依赖，我们需要在本地安装 library：

```shell
[root@DESKTOP-MSD7I5A webpack]# npm install --save lodash

```

现在，在我们的脚本中 import `lodash`：

```javascript
import _ from 'lodash';

```

现在index.js的内容是这样的：

```jav
import _ from 'lodash';

function component() {
  var element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());

```

现在，由于通过打包来合成脚本，我们必须更新 `index.html` 文件。因为现在是通过 `import` 引入 lodash，所以将 lodash `<script>` 删除，然后修改另一个 `<script>` 标签来加载 bundle，而不是原始的 `/src` 文件：

现在的dist下的index.html是这样的：

```html
<!doctype>
<html>
 <head>
    <title>起步</title>
  </head>
  <body>
        <script src="main.js"></script>
  </body>
</html>

```

在这个设置中，`index.js` 显式要求引入的 `lodash` 必须存在，然后将它绑定为 `_`（没有全局作用域污染）。通过声明模块所需的依赖，webpack 能够利用这些信息去构建依赖图，然后使用图生成一个优化过的，会以正确顺序执行的 bundle

执行 `npx webpack`，会将我们的脚本作为[入口起点](https://www.webpackjs.com/concepts/entry-points)，然后 [输出](https://www.webpackjs.com/concepts/output) 为 `main.js`

```shell
[root@DESKTOP-MSD7I5A webpack]# npx webpack
asset main.js 69.5 KiB [emitted] [minimized] (name: main) 1 related asset
runtime modules 1010 bytes 5 modules
cacheable modules 532 KiB
  ./src/index.js 304 bytes [built] [code generated]
  ./node_modules/lodash/lodash.js 531 KiB [built] [code generated]

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value.
Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/

webpack 5.70.0 compiled with 1 warning in 5734 ms

```

- *输出可能会稍有不同，但是只要构建成功，那么你可以不要担心*

此时的文件目录如下：

```shell
[root@DESKTOP-MSD7I5A webpack]# ls ./  dist/ src/
./:
dist  node_modules  package.json  package-lock.json  src

dist/:
index.html  main.js  main.js.LICENSE.txt

src/:
index.js

```

可以看到dist文件夹下多了一个`main.js`和一个main.js.LICENSE.txt许可文件，当然这个许可文件是由于`lodash` 的发行许可带来的，可以不管

最后在浏览器打开这个index.html：

![image-20220320182435604](https://s2.loli.net/2022/03/20/FGEvRObtImg31Tc.png)

可以看到显示了`Hello webpack`

## 4. 资料参考

\[1][起步 | webpack 中文网 (webpackjs.com)](https://www.webpackjs.com/guides/getting-started/)

\[2][概念 | webpack 中文网 (webpackjs.com)](https://www.webpackjs.com/concepts/)