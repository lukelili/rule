import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './permission'
import './components/use'
Vue.config.productionTip = false
import './mock/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.scss'
Vue.use(ElementUI, {
  size: 'mini'
})
import vuescroll from 'vuescroll'
Vue.use(vuescroll, {
  name: 'vuescroll'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
