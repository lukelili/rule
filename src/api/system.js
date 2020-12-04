import request from './request'
import qs from 'qs'

// 菜单列表
export async function MenuList() {
  return await request.get(`/menu`)
}
// 菜单 增 删 改 查
export async function OperationMenu(type, param) {
  return await request.post(`/menu/${type}`, qs.parse(param))
}
