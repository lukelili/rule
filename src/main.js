import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 工具
import './utils/tools'
// 路由守卫
import './permission'
// 组件挂载
import './components/use'
// Mockjs
require('./mock')
// UI库
Vue.config.productionTip = false
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.scss'
Vue.use(ElementUI, {
  size: 'mini'
})
// 滚动条
import vuescroll from 'vuescroll'
Vue.use(vuescroll, {
  name: 'vuescroll'
})
// vue实例
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
