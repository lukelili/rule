import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getItem } from '@/utils/storage'

NProgress.configure({ showSpinner: false })
// 可访问的白名单
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  NProgress.start()
  const hasToken = getItem('token')
  if (hasToken) {
    console.log('我已经登录了')
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
