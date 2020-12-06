import { Login } from '@a/user'
import { Message } from 'element-ui'
import router from '@/router'
import { setItem, getItem, removeItem } from '@/utils/storage'

const state = {
  role: getItem('role'),
  token: getItem('token'),
  username: getItem('username'),
  btnLoading: false,
  btnLoginText: '登录'
}
const mutations = {
  SET_USERINFO(state, data = []) {
    data.forEach(item => {
      if (Object.prototype.hasOwnProperty.call(state, item.key)) {
        state[item.key] = item.value
        setItem(item.key, item.value)
      }
    })
  },
  SET_STATUS(state, [bool, text]) {
    state.btnLoading = bool
    state.btnLoginText = text
  }
}
const actions = {
  async login({ commit }, userInfo) {
    commit('SET_STATUS', [true, '登录中...'])
    const res = await Login(userInfo)
    const { code, message, data } = res.data
    commit('SET_STATUS', [false, '登录'])
    if (code !== 200) {
      Message.error(message)
      return
    }
    const { role, username } = data
    commit('SET_USERINFO', [
      { key: 'role', value: role },
      { key: 'username', value: username },
      { key: 'token', value: res.headers.token }
    ])
    router.push({ path: '/' })
  },
  resetToken() {
    removeItem('token')
    removeItem('username')
    removeItem('role')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
