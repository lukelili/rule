const state = {
  scrollTop: 0
}
const mutations = {
  SET_SCROLL_TOP(state, value) {
    state.scrollTop = value
  }
}

const actions = {

}

export default {
  namespace: true,
  state,
  mutations,
  actions
}