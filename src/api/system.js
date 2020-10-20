import request from './request'
import qs from 'qs'

// 登录
export function getInfo(param) {
  return request.get(`/getinfo`, qs.parse(param))
}
