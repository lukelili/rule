import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getItem } from '@/utils/storage'

NProgress.configure({ showSpinner: false })
// 可访问的白名单
const whiteList = ['/login']
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  const hasToken = getItem('token')
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    }
    const hasAddRoutes = store.getters.addRoutes && store.getters.addRoutes.length
    if (hasAddRoutes) next()
    try {
      next()
      // const accessRoutes = await store.dispatch('permission/getMenuList')
    } catch(error) {

    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})
