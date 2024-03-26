import { createApp } from 'vue'
import App from './App.vue'


import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css'

import './css/style.css'
import 'element-plus/theme-chalk/index.css'
import router from './router';
import zhCn from "element-plus/es/locale/lang/zh-cn";


const app = createApp(App)
app.use(ElementPlus,{
    locale:zhCn
})
app.use(router)
// app.use(store)
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


// createApp(App).mount('#app')
app.mount('#app')
