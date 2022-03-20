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

