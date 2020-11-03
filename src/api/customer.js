import request from './request'
import qs from 'qs'

export default {
  list(param) {
    return request.get(`/customerList?${qs.stringify(param)}`)
  }
}