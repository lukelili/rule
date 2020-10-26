import request from './request'
import qs from 'qs'

// 登录
export function Login(param) {
  return request.post(`/login`, qs.parse(param))
}

// export default {
//   Login: (param) => {
//     return request.post(`/login`, qs.parse(param))
//   }
// }
