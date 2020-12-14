import router from './router'
import store from './store'
import { getItem } from './utils/storage'
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })
// 可访问的白名单
const whiteList = ['/login']
// 路由守卫
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (getItem('token')) {
    const { addroutes } = store.state.menu
    if (addroutes && addroutes.length) {
      next()
    } else {
      try{
        const accessRoutes = await store.dispatch('menu/roleMenus')
        router.addRoutes(accessRoutes)
        next({ ...to, replace: true })
      }catch(err) {
        await store.dispatch('user/resetToken')
        next(`/login`)
        NProgress.done()
      }
    }
  } else {
    // 如果现在是去/login页 直接next()
    whiteList.includes(to.path) ? next() : next('/login')
    NProgress.done()
  }
})
router.afterEach(() => {
  NProgress.done()
})
