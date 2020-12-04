import request from './request'
import qs from 'qs'

export default {
  orderType(parame) {
    return request.get(`/parameter/query?${qs.stringify(parame)}`)
  }
}
