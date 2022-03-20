## 1. 概述

Vue Router 是 [Vue.js](http://v3.vuejs.org/) 的官方路由。它与 Vue.js 核心深度集成，让用 Vue.js 构建单页应用变得轻而易举。功能包括：

- 嵌套路由映射
- 动态路由选择
- 模块化、基于组件的路由配置
- 路由参数、查询、通配符
- 展示由 Vue.js 的过渡系统提供的过渡效果
- 细致的导航控制
- 自动激活 CSS 类的链接
- HTML5 history 模式或 hash 模式
- 可定制的滚动行为
- URL 的正确编码

## 2. 安装

### 2.1.直接下载 / CDN

[Unpkg.com](https://unpkg.com/) 提供了基于 npm 的 CDN 链接：

```html
<script src="https://unpkg.com/vue-router@3.0.0/dist/vue-router.js"></script>
```

### 2.2. NPM

```shell
[root@DESKTOP-MSD7I5A hello-world]# npm install vue-router@4

```

- 注意：`hello-world`是我们使用`vue\cli`创建的一个项目 ，vue版本为3.x

## 3. 测试

### 3.1. 删除模板文件

创建的模板里具有`HelloWorld`、logo的我们不需要的文件或组件，删除

### 3.2. 编写自己的组件

定义一个`Content.vue` 和`Main.vue`的组件，在`components` 目录下存放我们自己编写的组件 

`Content.vue`

```vue
<template>
    <div>
        <h1>内容页</h1>
    </div>
</template>

<script>
export default {
    name:"ContentP"
}
</script>

<style>

</style>
```

`Main.vue`

```vue
<template>
  <div>
      <h1>首页</h1>
  </div>
</template>

<script>
export default {
    name: "MainPage"
}
</script>

<style>

</style>
```

### 3.3.  安装路由

在src目录下，新建一个文件夹：`router`，专门存放路由，配置路由index.js，如下

```javascript
// import Vue from 'vue'
// import Router from 'vue-router' //导入路由插件
import { createRouter,createWebHistory } from "vue-router"
import Main from '../components/Main'  //导入首页
import Content from '../components/Content'  //导入首页

// Vue.use(Router);  //安装路由

export default new createRouter({ //配置路由
    routes: [
        {
            //路由路径
            path: '/content',
            //路由名称
            name: 'content',
            //跳转到组件
            component: Content
        }, {
            path: '/main',
            name: 'main',
            component: Main
        }
    ],
    // 采用 history 模式
    history: createWebHistory(),
})
```



### 3.4.  配置路由

在`main.js`中配置路由

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' //自动扫描里面的路由配置

// createApp(App).mount('#app')
createApp(App).use(router).mount('#app')

```

### 3.5.  使用路由

在`App.vue`中使用路由

```vue
<template>
	<div id="app">
		<!--
			router-link：默认会被渲染成一个<a>标签，to属性为指定链接
			router-view：用于渲染路由匹配到的组件
		-->
		<router-link to="/">首页</router-link> | 
		<router-link to="/content">内容</router-link>
		<router-view></router-view>
	</div>
</template>

<script>
	export default{
		name:'App'
	}
</script>

<style></style>
```

### 3.6. 结果

执行`npm run serve`，打开浏览器：

![image-20220320200851179](https://s2.loli.net/2022/03/20/IQuZ8J9VwkvxCX7.png)

## 4. 遇到的问题

\[1]["export 'default' (imported as 'VueRouter') was not found in 'vue-router' - 简书 (jianshu.com)](https://www.jianshu.com/p/e2e2f2ce3ae6)

\[2]Uncaught TypeError: Cannot read property ‘use‘ of undefined：[Vue3.0 - 安装路由 vue-router_Jie_1997的博客-CSDN博客_vue下载路由](https://blog.csdn.net/jie_1997/article/details/118728628)

\[3][一次尴尬的vue-router的bug. Invalid route component at extractComponentsGuards - 小白小承 - 博客园 (cnblogs.com)](https://www.cnblogs.com/Initial-C-/p/15811728.html)

\[4][vue/multi-word-component-names | eslint-plugin-vue (vuejs.org)](https://eslint.vuejs.org/rules/multi-word-component-names.html)

## 5. 参考资料

\[1][安装 | Vue Router (vuejs.org)](https://v3.router.vuejs.org/zh/installation.html)

\[2][Vue课堂笔记/09vue-router路由.md · 卢泽华/Vue - 码云 - 开源中国 (gitee.com)](https://gitee.com/lzh_gitee/Vue/blob/master/Vue课堂笔记/09vue-router路由.md)