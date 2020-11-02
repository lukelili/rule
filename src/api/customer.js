import request from './request'
import qs from 'qs'

export default {
  customerLis(param) {
    return request.get(`/customerList?${qs.stringify(param)}`)
  }
}