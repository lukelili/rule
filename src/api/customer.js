import request from './request'
import qs from 'qs'

export default {
  getTableList(param) {
    return request.get(`/customerList?${qs.stringify(param)}`)
  }
}