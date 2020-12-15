const state = {
  scrollTop: 0,
  isCollapse: false,
  roles: []
}
const mutations = {
  SET_SCROLL_TOP(state, value) {
    state.scrollTop = value
  },
  SET_DATA(state, { key, value }) {
    if (Object.prototype.hasOwnProperty.call(state, key)) {
      state[key] = value
    }
  }
}

const actions = {
  getGlobalData({ commit }, parame) {

  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions
}
