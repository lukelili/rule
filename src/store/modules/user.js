import { setItem, getItem, clear } from '@/utils/storage'
import { isIn } from '@/utils/tools'
const state = {
  role: getItem('role'),
  token: getItem('token'),
  username: getItem('username')
}
const mutations = {
  SET_USERINFO(state, data = []) {
    data.forEach(item => {
      if (isIn(state, item.key)) {
        state[item.key] = item.value
        setItem(item.key, item.value)
      }
    })
  }
}
const actions = {
  resetToken() {
    clear()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
