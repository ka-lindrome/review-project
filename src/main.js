import {createApp} from 'vue'
import App from './App.vue'


import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css'

import './css/style.css'
import 'element-plus/theme-chalk/index.css'
import router from './router';
import {createPinia} from 'pinia';

const app = createApp(App)
const pinia = createPinia()

app.use(ElementPlus)
app.use(router)
app.use(pinia)


import * as ElementPlusIconsVue from '@element-plus/icons-vue'

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


// createApp(App).mount('#app')
app.mount('#app')
