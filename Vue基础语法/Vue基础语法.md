## 1. 概述
Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。所有 Vue.js 的模板都是合法的 HTML，所以能被遵循规范的浏览器和 HTML 解析器解析。

在底层的实现上，Vue 将模板编译成虚拟 DOM 渲染函数。结合响应系统，Vue 能够智能地计算出最少需要重新渲染多少组件，并把 DOM 操作次数减到最少。



## 2. 插值

### 2.1. 文本
数据绑定最常见的形式就是使用“Mustache”语法 (双大括号) 的文本插值：
```html
		<div id="app">
			{{message}}
		</div>
```
整个页面完整代码如下：
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Vue基础语法</title>
		<!-- 开发环境版本，包含了有帮助的命令行警告 -->
		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	</head>
	<body>
		<div id="app">
			{{message}}
		</div>
		<script type="text/javascript">
			var app = new Vue({
				el: "#app",
				data:{
					message: "Vue基础语法"
				}
			})
		</script>
	</body>
</html>

```
其显示结果如下：
![](https://s2.loli.net/2022/03/15/HAsvkEwRohd3YJx.jpg)
Mustache 标签将会被替代为对应数据对象上 message property 的值。无论何时，绑定的数据对象上 message property 发生了改变，插值处的内容都会更新。我们在控制台改变message这个属性：
![](https://s2.loli.net/2022/03/15/rHpZlGB1Yvn6IUt.jpg)
可以看到DOM即页面元素随机更新
通过使用 `v-once` 指令，你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。但请留心这会影响到该节点上的其它数据绑定：

```html
		<div id="app" v-once>
			{{message}}
		</div>
```
再次运行：
![](https://s2.loli.net/2022/03/15/kixlgS9XAcDzuIV.jpg)
可以看到DOM即页面元素没有更新



### 2.2. 原始HTML

双大括号会将数据解释为普通文本，而非 HTML 代码。为了输出真正的 HTML，你需要使用 `v-html` 指令：
```html
		<div id="app" v-html="message">
			{{message}}
		</div>
```
整个页面完整代码如下：
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Vue基础语法</title>
		<!-- 开发环境版本，包含了有帮助的命令行警告 -->
		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	</head>
	<body>
		<div id="app" v-html="message">
			{{message}}
		</div>
		<script type="text/javascript">
			var app = new Vue({
				el: "#app",
				data:{
					message: "<h1>Vue基础语法</h1>"
				}
			})
		</script>
	</body>
</html>

```
其显示结果如下：
![](https://s2.loli.net/2022/03/15/DJg7u5ifAL8sBG4.jpg)

可以看到message被解析为HTML，如果不加` v-html="message"`：
![](https://s2.loli.net/2022/03/15/xXIEJwemF4D63CY.jpg)
则message被解析为普通文本

- 注意，你不能使用 v-html 来复合局部模板，因为 Vue 不是基于字符串的模板引擎。反之，对于用户界面 (UI)，组件更适合作为可重用和可组合的基本单位
- 你的站点上动态渲染的任意 HTML 可能会非常危险，因为它很容易导致 XSS 攻击。请只对可信内容使用 HTML 插值，绝不要对用户提供的内容使用插值——可参考[XSS(跨站脚本攻击)详解](https://www.cnblogs.com/csnd/p/11807592.html)



### 2.3. Attribute

Mustache 语法不能作用在 HTML attribute 上，遇到这种情况应该使用 `v-bind` 指令：
```html
		<div id="app">
			<p v-bind:style="style">{{message}}</p>
		</div>
```
整个页面完整代码如下：
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Vue基础语法</title>
		<!-- 开发环境版本，包含了有帮助的命令行警告 -->
		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<p v-bind:style="style">{{message}}</p>
		</div>
		<script type="text/javascript">
			var app = new Vue({
				el: "#app",
				data:{
					message: "Vue基础语法",
					style: {
						color: "red"
					}
				}
			})
		</script>
	</body>
</html>
```
其显示结果如下：
![](https://s2.loli.net/2022/03/15/ZO3YW6hFH5lN9Ay.jpg)

指令的意思是：“将这个元素节点的style特性和Vue实例的style属性保持一致”
如果你再次打开浏览器的JavaScript控制台， 输入app.style={color: "bule"}，就会再一次看到这个绑定了style特性的HTML已经进行了更新:
![](https://s2.loli.net/2022/03/15/sAUwYirt7LRaWfD.jpg)
对于布尔 attribute (它们只要存在就意味着值为 true)，v-bind 工作起来略有不同，在这个例子中：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Vue基础语法</title>
		<!-- 开发环境版本，包含了有帮助的命令行警告 -->
		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<button v-bind:disabled="isButtonDisabled">Button</button>
		</div>
		<script type="text/javascript">
			var app = new Vue({
				el: "#app",
				data:{
					message: "Vue基础语法",
					isButtonDisabled:{}
				}
			})
		</script>
	</body>
</html>
```
如果 isButtonDisabled 的值是 null、undefined 或 false，则 disabled attribute 甚至不会被包含在渲染出来的 \<button> 元素中:
![](https://s2.loli.net/2022/03/15/AJGd13qztR2Kkah.jpg)



### 2.4. 使用 JavaScript 表达式

迄今为止，在我们的模板中，我们一直都只绑定简单的 property 键值。但实际上，对于所有的数据绑定，Vue.js 都提供了完全的 JavaScript 表达式支持:
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Vue基础语法</title>
		<!-- 开发环境版本，包含了有帮助的命令行警告 -->
		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	</head>
	<body>
		<div id="app">
			{{ message.split('').reverse().join('') }}
		</div>
		<script type="text/javascript">
			var app = new Vue({
				el: "#app",
				data:{
					message: "Vue 基础 语法",
				}
			})
		</script>
	</body>
</html>

```
其展示结果如下：
![](https://s2.loli.net/2022/03/15/ohsajkb6Qze8LFY.jpg)

可以看到表达式会在所属 Vue 实例的数据作用域下作为 JavaScript 被解析
有个限制就是，每个绑定都只能包含单个表达式，所以下面的例子都不会生效：
```html
<!-- 这是语句，不是表达式 -->
{{ var a = 1 }}

<!-- 流控制也不会生效，请使用三元表达式 -->
{{ if (ok) { return message } }}
```
- 注意：模板表达式都被放在沙盒中，只能访问全局变量的一个白名单，如 Math 和 Date 。你不应该在模板表达式中试图访问用户定义的全局变量



## 3. 指令

指令 (Directives) 是带有 v- 前缀的特殊 attribute。指令 attribute 的值预期是单个 JavaScript 表达式 (v-for 是例外情况，稍后我们再讨论)。指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM
一些指令能够接收一个“参数”，在指令名称之后以冒号表示。例如，v-bind 指令可以用于响应式地更新 HTML attribute：
```html
<p v-bind:style="style">{{message}}</p>
```
在这里 style 是参数，告知 v-bind 指令将该元素的 style attribute 与表达式 style 的值绑定
v-bind之前已经使用过，现在讲述一些常用的指令



### 3.1. v-if和v-else

显而易见的判断指令：
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Vue基础语法</title>
		<!-- 开发环境版本，包含了有帮助的命令行警告 -->
		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<h1 v-if="OK">OK</h1>
			<h1 v-else>NO</h1>
		</div>
		<script type="text/javascript">
			var app = new Vue({
				el: "#app",
				data:{
					message: "Vue 基础 语法",
					OK: false
				}
			})
		</script>
	</body>
</html>
```
![](https://s2.loli.net/2022/03/15/4XebSDCOTjAR8t7.jpg)
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Vue基础语法</title>
		<!-- 开发环境版本，包含了有帮助的命令行警告 -->
		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<h1 v-if="OK">OK</h1>
			<h1 v-else>NO</h1>
		</div>
		<script type="text/javascript">
			var app = new Vue({
				el: "#app",
				data:{
					message: "Vue 基础 语法",
					OK: true
				}
			})
		</script>
	</body>
</html>

```
![](https://s2.loli.net/2022/03/15/2DV7SrJg6f1cA4L.jpg)



### 3.2. v-else-if

组合判断：
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Vue基础语法</title>
		<!-- 开发环境版本，包含了有帮助的命令行警告 -->
		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<h1 v-if="type === 'A'">OK</h1>
			<h1 v-else-if="type === 'B'">OK</h1>
			<h1 v-else>C</h1>
		</div>
		<script type="text/javascript">
			var app = new Vue({
				el: "#app",
				data:{
					message: "Vue 基础 语法",
					type: 'A'
				}
			})
		</script>
	</body>
</html>
```
![](https://s2.loli.net/2022/03/15/m6bgWQ5xaeTolAV.jpg)



### 3.3. v-for

大致语法形式：
```html
<div id="app">
    <li v-for="(item,index) in items">
        {{item.message}}---{{index}}
    </li>

</div>
```
- 注：items是数组，item是数组元素迭代的别名
代码如下：
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Vue基础语法</title>
		<!-- 开发环境版本，包含了有帮助的命令行警告 -->
		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<li v-for="(item,index) in type">
				{{item}}---{{index}}
			</li>
		</div>
		<script type="text/javascript">
			var app = new Vue({
				el: "#app",
				data:{
					type: ['A', 'B', 'C']
				}
			})
		</script>
	</body>
</html>

```

实现效果：
![](https://s2.loli.net/2022/03/15/XCLaH9PzUR4uIDr.jpg)

测试：在控制台输入app.type.push('D')，尝试追加一条数据，你会发现浏览器中显示的内容会增加一条D
![](https://s2.loli.net/2022/03/15/O2SxfQ5Gpd8LbH9.jpg)



### 3.4. v-on

v-on用于监听 DOM 事件：
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Vue基础语法</title>
		<!-- 开发环境版本，包含了有帮助的命令行警告 -->
		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<button type="button" v-on:click="sayHi()">Hi</button>
		</div>
		<script type="text/javascript">
			var app = new Vue({
				el: "#app",
				data:{
					type: ['A', 'B', 'C']
				},
				methods:{
					sayHi:()=>{
						console.log("Hi")
					}
				}
			})
		</script>
	</body>
</html>

```
效果：
![](https://s2.loli.net/2022/03/15/XKp7dLwkUVY4QWv.jpg)



### 3.5. 动态参数

从 2.6.0 开始，可以用方括号括起来的 JavaScript 表达式作为一个指令的参数：
```html
<a v-bind:[attributeName]="url"> ... </a>
```
这里的 attributeName 会被作为一个 JavaScript 表达式进行动态求值，求得的值将会作为最终的参数来使用。例如，如果你的 Vue 实例有一个 data 属性为 attributeName，其值为 "href"，那么这个绑定将等价于 v-bind:href
代码如下：
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Vue基础语法</title>
		<!-- 开发环境版本，包含了有帮助的命令行警告 -->
		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<a v-bind:[attributeName]='url'>
				百度
			</a>
		</div>
		<script type="text/javascript">
			var app = new Vue({
				el: "#app",
				data:{
					attributename: "herf",
					url: 'www.baidu.com'
				}
			})
		</script>
	</body>
</html>
```
实现效果：
![](https://s2.loli.net/2022/03/15/jKWQkOsY78maEpo.jpg)

- 注意：在 DOM 中使用模板时 (直接在一个 HTML 文件里撰写模板)，还需要避免使用大写字符来命名键名，因为浏览器会把 attribute 名全部强制转为小写：
```html
<!--
在 DOM 中使用模板时这段代码会被转换为 `v-bind:[someattr]`。
除非在实例中有一个名为“someattr”的 property，否则代码不会工作。
-->
<a v-bind:[someAttr]="value"> ... </a>
```

- 动态参数预期会求出一个字符串，异常情况下值为 null。这个特殊的 null 值可以被显性地用于移除绑定。任何其它非字符串类型的值都将会触发一个警告。
- 动态参数表达式有一些语法约束，因为某些字符，如空格和引号，放在 HTML attribute 名里是无效的。例如：
```html
<!-- 这会触发一个编译警告 -->
<a v-bind:['foo' + bar]="value"> ... </a>
```



## 4. 缩写

v- 前缀作为一种视觉提示，用来识别模板中 Vue 特定的 attribute。当你在使用 Vue.js 为现有标签添加动态行为 (dynamic behavior) 时，v- 前缀很有帮助，然而，对于一些频繁用到的指令来说，就会感到使用繁琐。同时，在构建由 Vue 管理所有模板的单页面应用程序 (SPA - single page application) 时，v- 前缀也变得没那么重要了。因此，Vue 为 v-bind 和 v-on 这两个最常用的指令，提供了特定简写



### 4.1. v-bind 缩写

```html
<!-- 完整语法 -->
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>

<!-- 动态参数的缩写 (2.6.0+) -->
<a :[key]="url"> ... </a>
```



### 4.2. v-on 缩写

```html
<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>

<!-- 缩写 -->
<a @click="doSomething">...</a>

<!-- 动态参数的缩写 (2.6.0+) -->
<a @[event]="doSomething"> ... </a>
```



## 5. 参考资料

\[1][模板语法 — Vue.js 中文文档 (bootcss.com)](https://vuejs.bootcss.com/guide/syntax.html)

\[2][Vue课堂笔记/03基础语法指令.md · 卢泽华/Vue - 码云 - 开源中国 (gitee.com)](https://gitee.com/lzh_gitee/Vue/blob/master/Vue课堂笔记/03基础语法指令.md)

