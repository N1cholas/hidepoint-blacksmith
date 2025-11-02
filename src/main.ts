import { createApp } from 'vue'
import App from './App.vue'
import TDesign from 'tdesign-vue-next'
import router from './router'
import pinia from './stores'
import i18n from './locales'

// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(i18n)
app.use(TDesign)

app.mount('#app')
