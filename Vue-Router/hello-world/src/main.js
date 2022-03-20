import { createApp } from 'vue'
import App from './App.vue'
import router from './router' //自动扫描里面的路由配置

// createApp(App).mount('#app')
createApp(App).use(router).mount('#app')
