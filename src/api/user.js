import request from './request'
import qs from 'qs'

// 登录
export function Login(parame) {
  return request.post(`/login`, qs.parse(parame))
}
// 获取用户菜单
export function RoleMenu(parame) {
  return request.get('/menu')
}
