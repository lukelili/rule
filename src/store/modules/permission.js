
const state = {
  routes: [],
  addRoutes: []
}
const mutations = {
  SET_ROUTES(state, routes) {
    state.addRoutes = routes
    state.routes = routes
  }
}
const actions = {
  getMenuList({ commit }) {
    console.log('ss')
  }
}
export default {
  namespace: true,
  state,
  mutations,
  actions
}
