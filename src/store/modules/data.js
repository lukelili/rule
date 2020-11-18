const state = {
  orderType: []
}

const mutations = {
  SET_DATA(state, { key, value }) {
    if (Object.prototype.hasOwnProperty.call(state, key)) {
      state[key] = value
    }
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
