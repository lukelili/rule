import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import qs from 'qs'
import request from '@/utils/request'
// 工具
import './utils/tools'
// 路由守卫
import './permission'
// 组件挂载
import './components/use'
// UI库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.scss'
Vue.use(ElementUI, {
  size: 'small'
})
Vue.config.productionTip = false
Vue.prototype.$http = request
Vue.prototype.$qs = qs
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
