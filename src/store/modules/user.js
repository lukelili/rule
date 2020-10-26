import { Login } from '@a/user'
import { Message } from 'element-ui'
import router from '@/router'
import { setItem } from '@/utils/storage'

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
      setItem(key, value)
    }
  },
  SET_STATUS(state, [bool, text]) {
    state.btnLoading = bool
    state.btnLoginText = text
  }
}
const actions = {
  login({ commit }, data) {
    commit('SET_STATUS', [true, '拼命登录中...'])
    Login(data).then(res => {
      commit('SET_STATUS', [false, '登录'])
      const { code, message, data } = res.data
      if (code !== 0) {
        Message.error(message)
        return
      }
      commit('SET_USERINFO', { key: 'token', value: data.token })
      commit('SET_USERINFO', { key: 'userInfo', value: data.username })
      router.push({ path: '/' })
    }).catch(() => {
      commit('SET_STATUS', [false, '登录'])
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
