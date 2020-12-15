import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/index.vue'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

export const routes = [
  {
    name: '登录',
    path: '/login',
    hidden: true,
    component: resolve => require(['@/views/login/index.vue'], resolve)
  },
  {
    name: '首页',
    path: '/',
    component: Layout
  } 
]

const createRouter = () => new VueRouter({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

const router = createRouter()

export default router
