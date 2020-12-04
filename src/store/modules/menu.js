import { RoleMenu } from '@a/user'
import { Message } from 'element-ui'
import { setItem } from '@/utils/storage'
import { routes } from '@/router'
import Layout from '@/layout'

const state = {
  routes: [],
  addroutes: []
}
const mutations = {
  SET_ROUTES(state, route) {
    state.addroutes = route
    state.routes = route.concat(routes)
  }
}
const actions = {
  async roleMenu({ commit }) {
    const res = await RoleMenu()
    const { code, data, message } = res.data
    if (code !== 200) {
      Message.error(message)
      return
    }
    const asyncRoutes = filterAsyncRoutes(data)
    commit('SET_ROUTES', asyncRoutes)
    return asyncRoutes
  }
}
function filterAsyncRoutes(routes) {
  const array = []
  routes.forEach(route => {
    route.component = resolve => require([route.component], resolve)
    array.push(route)
  })
  return array
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
