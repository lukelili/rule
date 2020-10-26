import { Login } from '@a/user'
import { encrypt } from '@/utils/tools'
import { Message } from 'element-ui'
import { setItem, getItem, removeItem } from '@/utils/storage'

const state = {
  roles: '',
  token: '',
  userInfo: '',
  btnLoading: false,
  btnLoginText: '登录'
}
const mutations = {
  SET_USERINFO(state, { key, value }) {
    if (Object.prototype.hasOwnProperty.call(state, key)) {
      state[key] = value
      // value && setItem(key, value)
    }
  }
}
const actions = {
  login({ commit }, data) {
    console.log(Login)
    console.log(setItem)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
