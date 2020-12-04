import request from './request'
import qs from 'qs'

// 菜单列表
export async function MenuList(parame) {
  return await request.get(`/menu?${qs.stringify(parame)}`)
}
// 菜单 增 删 改 查
export async function OperationMenu(type, parame) {
  return await request.post(`/menu/${type}`, qs.parse(parame))
}
