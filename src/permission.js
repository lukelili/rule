import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { setItem, getItem, removeItem } from '@/utils/storage'

NProgress.configure({ showSpinner: false })
// 可访问的白名单
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  NProgress.start()
  const hasToken = getItem('token')
  if (hasToken) {
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
