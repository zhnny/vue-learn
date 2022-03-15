## 1. 引言
Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

- [Vue官网](https://vuejs.bootcss.com/guide/index.html)



### 1.1. Vue的优势

- 轻量级， 体积小是一个重要指标。Vue.js压缩后有只有20多kb(Angular压缩后56kb+，React压缩后44kb+)
- 移动优先。更适合移动端， 比如移动端的Touch事件
- 易上手，学习曲线平稳，文档齐全
- 吸取了Angular(模块化) 和React(虚拟DOＭ) 的长处， 并拥有自己独特的功能，如：计算属性
- 开源，社区活跃度高



### 1.2. MVVM

MVVM（Model-View-ViewModel）是一种软件设计模式，是一种简化用户界面的事件驱动编程方式。MVVM源自于经典的MVC（Model-View-Controller）模式。MVVM的核心是ViewModel层，负责转换Model中的数据对象来让数据变得更容易管理和使用。其作用如下：

- 该层向上与视图层进行双向数据绑定
- 向下与Model层通过接口请求进行数据交互

MVVM模式和MVC模式一样，主要目的是分离视图（View）和模型（Model），有几大好处：

- 低耦合：视图（View）可以独立于Model变化和修改，一个ViewModel可以绑定到不同的View上，当View变化的时候Model可以不变，当Model变化的时候View也可以不变。
- 可复用：你可以把一些视图逻辑放在一个ViewModel里面，让很多View重用这段视图逻辑。
- 独立开发：开发人员可以专注于业务逻辑和数据的开发（ViewMode），设计人员可以专注于页面设计。
- 可测试：界面素来是比较难以测试的，而现在测试可以针对ViewModel来写。



### 1.3. MVVM模式的实现者

- Model：模型层， 在这里表示JavaScript对象
- View：视图层， 在这里表示DOM(HTML操作的元素)
- ViewModel：连接视图和数据的中间件， Vue.js就是MVVM中的View Model层的实现者
  在MVVM架构中， 是不允许数据和视图直接通信的， 只能通过ViewModel来通信， 而View Model就是定义了一个Observer观察者：

- ViewModel能够观察到数据的变化， 并对视图对应的内容进行更新
- ViewModel能够监听到视图的变化， 并能够通知数据发生改变
  至此， 我们就明白了， Vue.js就是一个MVVM的实现者， 他的核心就是实现了DOM监听与数据绑定



## 2. 第一个Vue程序

尝试 Vue.js 最简单的方法是使用 Hello World 例子



### 2.1. 创建一个HTML文件

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Hello Vue</title>
	</head>
	<body>
	</body>
</html>
```



### 2.2. 引入Vue.js

```html
<!-- 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```



### 2.3. 创建一个Vue实例

```html
		<script type="text/javascript">
			var app = new Vue({
				el:"",
				data:{
					message:"Hello Vue"
				}
			})
		</script>
```



### 2.4. 将数据绑定到页面元素

```html
		<div id="app">
			{{message}}
		</div>
		
		<script type="text/javascript">
			var app = new Vue({
				el:"#app",
				data:{
					message:"Hello Vue"
				}
			})
		</script>
```



### 2.5. 测试运行

整个HTML文件完整内容如下：
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Hello Vue</title>
		<!-- 开发环境版本，包含了有帮助的命令行警告 -->
		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	</head>
	<body>
		
		<div id="app">
			{{message}}
		</div>
		
		<script type="text/javascript">
			var app = new Vue({
				el:"#app",
				data:{
					message:"Hello Vue"
				}
			})
		</script>
	</body>
</html>

```

用浏览器打开这个文件可以看到（笔者使用HBuilderX）：
![预览界面](https://s2.loli.net/2022/03/15/3d1eFmXk2styYvQ.jpg)
使用F12打开控制台，尝试修改app这个对象的message属性，发现网页也随着变化：
![调试控制台](https://s2.loli.net/2022/03/15/Tba5wyVvfCI8rpk.jpg)

这就再次验证了Vue.js就是一个MVVM的实现者， 他的核心就是实现了DOM监听与数据绑定



## 3. 参考资料

\[1][Vue.js 中文文档](https://vuejs.bootcss.com/guide/index.html)

\[2][ Vue/ Vue课堂笔记 / 02第一个vue程序](https://gitee.com/lzh_gitee/Vue/blob/master/Vue%E8%AF%BE%E5%A0%82%E7%AC%94%E8%AE%B0/02%E7%AC%AC%E4%B8%80%E4%B8%AAvue%E7%A8%8B%E5%BA%8F.md)

