import axios from 'axios'
import router from '@/router'
import store from '@/store'
import { getItem, removeItem } from '@/utils/storeage'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 提示函数
const tip = (msg, type) => {
  Message({
    message: msg,
    type: type
  })
}
// 跳转登录页面
const toLogin = () => {
  router.replace({
    path: '/login'
  })
}
// 请求失败后的错误处理
const errorHandle = (status, other) => {
  // 状态码
  switch (status) {
    case 401:
      store.dispatch('user/resetStorage')
      toLogin()
      break
    case 403:
      tip('登录过期，请重新登录')
      removeItem('token')
      setTimeout(toLogin(), 1000)
      break
    case 404:
      tip('请求的资源不存在')
      break
    case 500:
      tip('服务器崩溃,请稍后再试', 'warning')
      break
    case 502:
      tip('服务器崩溃,请稍后再试', 'warning')
      break
    default:
      break
  }
}
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})
// 设置POST请求头
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// 国际化标识
instance.defaults.headers.lang = getItem('lang')
// 请求拦截
instance.interceptors.request.use(config => {
  const token = getItem('token')
  token && (config.headers['Authentication'] = token)
  return config
}, error => Promise.error(error)
)
// 响应拦截
instance.interceptors.response.use(res => {
  if (res.status === 200) {
    return Promise.resolve(res)
  } else {
    return Promise.reject(res)
  }
}, error => {
  const { response } = error
  if (response) {
    errorHandle(response.status)
    return Promise.reject(response)
  } else {
    console.error('网络链接失败了')
  }
}
)

export default instance
