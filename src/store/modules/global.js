import http from '@/utils/request'
const state = {
  isCollapse: false,
  roles: [],
  genders: {
    male: '男',
    woman: '女'
  }
}
const mutations = {
  SET_DATA(state, { key, value }) {
    if (Object.prototype.hasOwnProperty.call(state, key)) {
      state[key] = value
    }
  }
}

const actions = {
  async getData({ commit }, parame) {
    const result = await http.get(parame.api)
    if (!result) return
    const { code, data, message} = result.data
    if (code !== 200) {
      return []
    }
    commit('SET_DATA', { key: parame.key, value: data })
    return data
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
