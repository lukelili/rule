const state = {
  btnLoading: false

}
const mutations = {
  SET_LOADING(state, bool) {
    state.btnLoading = bool
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
