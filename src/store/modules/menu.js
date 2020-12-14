import { routes } from '@/router'
import Layout from '@/layout'
import http from '@/utils/request'

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
  async roleMenus(context) {
    const result = await http.get('/menu')
    if (!result) return
    const { data } = result.data
    const asyncRoutes = await context.dispatch('cascade', data)
    context.commit('SET_ROUTES', asyncRoutes)
    return asyncRoutes
  },
  cascade(context, data) {
    const arr = []
    data.forEach(item => {
      item.children = []
      if (!item.pid) {
        item.component = Layout
      } else {
        item.component = resolve => require([`@/views${item.filePath}`], resolve)
      }
      data.forEach(child => {
        if (item._id === child.pid) {
          item.children.push(child)
        }
      })
      arr.push(item)
    })
    return arr.filter(item => !item.pid)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
