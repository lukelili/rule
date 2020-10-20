import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    sort: 1,
    level: '0',
    name: '入口文件',
    path: '/',
    status: 1,
    hidden: true,
    component: Layout,
    children: [
      {
        sort: 1,
        level: '0-0',
        path: 'index',
        name: '首页',
        status: 1,
        component: () => import('@/views/home/index.vue')
      }
    ]
  },
  {
    sort: 2,
    level: '1',
    name: '客户管理',
    path: '/customer',
    status: 1,
    component: Layout,
    children: [
      {
        sort: 1,
        level: '1-0',
        path: '/customerList',
        name: '客户列表',
        status: 1,
        component: () => import('@/views/customer/customerList.vue'),
        children: [
          {
            sort: 1,
            level: '1-0-0',
            path: '/customerDetails',
            name: '客户详情',
            status: 1,
            component: () => import('@/views/customer/customerDetails.vue')
          }
        ]
      }
    ]
  },
  {
    sort: 3,
    level: '2',
    name: '信审管理',
    path: '/checker',
    status: 1,
    component: Layout,
    children: [
      {
        sort: 1,
        level: '2-0',
        path: '/firstChecke',
        name: '初审管理',
        status: 1,
        component: () => import('@/views/checker/firstCheck.vue')
      }
    ]
  },
  {
    id: 4,
    sort: 4,
    pid: 0,
    level: '3',
    name: '系统配置',
    path: '/systeam',
    status: 1,
    component: Layout,
    children: [
      {
        sort: 1,
        level: '3-0',
        name: '角色管理',
        path: '/roles',
        status: 1,
        component: () => import('@/views/systeam/roles.vue')
      },
      {
        sort: 2,
        level: '3-1',
        name: '用户管理',
        path: '/account',
        status: 1,
        component: () => import('@/views/systeam/account.vue')
      },
      {
        sort: 3,
        level: '3-2',
        name: '菜单管理',
        path: '/menu',
        status: 1,
        component: () => import('@/views/systeam/menu.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
