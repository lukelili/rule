import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/index.vue'

Vue.use(VueRouter)

export const routes = [
  {
    name: '登录',
    path: '/login',
    hidden: true,
    component: () => import('@/views/login/index.vue')
  },
  {
    name: '首页',
    path: '/',
    component: Layout
  },
  {
    name: '系统配置',
    path: '/system',
    component: Layout,
    children: [
      {
        name: '账号管理',
        path: '/account',
        component: () => import('@/views/system/account.vue')
      },
      {
        name: '角色管理',
        path: '/roles',
        component: () => import('@/views/system/roles.vue')
      },
      {
        name: '菜单管理',
        path: '/menu',
        component: () => import('@/views/system/menu.vue')
      }
    ]
  }
]

const createRouter = () => new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

const router = createRouter()

export default router
