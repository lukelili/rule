import router from './router'
import store from './store'
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })
// 用户信息
const user = store.state.user
// 可访问的白名单
const whiteList = ['/login']
// 路由守卫
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  // 1. token判断不存 > 跳转登录
  if (!user.token) {
    whiteList.includes(to.path) ? next() : next('/login')
    NProgress.done()
    // 2. token判断存在 > 判断菜单
  } else {
    const addroutes = store.state.menu.addroutes
    const hasRoutes = addroutes && addroutes.length
    // 3. 菜单存在的话 > 跳转首页
    if (hasRoutes) {
      next()
      // 4. 菜单不存在 > 请求菜单接口
    } else {
      try {
        const accessRoutes = await store.dispatch('menu/roleMenu')
        router.addRoutes(accessRoutes)
        next({ ...to, replace: true })
      } catch (err) {
        await store.dispatch('user/resetToken')
        // vm.$msg.error(error || 'Has Error')
        next(`/login?redirect=${to.path}`)
        NProgress.done()

      }
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})
