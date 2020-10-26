import { Login } from '@a/user'
import { Message } from 'element-ui'
// import { encrypt } from '@/utils/tools'
// import { Message } from 'element-ui'
// import { setItem, getItem, removeItem } from '@/utils/storage'

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
  },
  SET_STATUS() {

  }
}
const actions = {
  login({ commit }, data) {
    commit('SET_USERINFO', { key: 'btnLoading', value: true })
    commit('SET_USERINFO', { key: 'btnLoginText', value: '拼命登录中...' })
    Login(data).then(res => {
      const { code, message } = res.data
      if (code === 0) {
        
      } else {
        Message.error(message)
        commit('SET_USERINFO', { key: 'btnLoading', value: false })
        commit('SET_USERINFO', { key: 'btnLoginText', value: '登录' })
      }
      console.log(res)
    }).catch(() => {
      commit('SET_USERINFO', { key: 'btnLoading', value: false })
      commit('SET_USERINFO', { key: 'btnLoginText', value: '登录' })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
