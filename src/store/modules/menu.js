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
    state.routes = route
  }
}
const actions = {
  async roleMenu({ commit }) {
    const res = await RoleMenu()
    const { code, data, message } = res.data
    if (code !== 200 && data.length) {
      Message.error(message)
      return
    }
    // 处理数据
    const levelData = data.filter(item => item.level === 0)
    const childData = data.filter(item => item.pid)
    levelData.forEach(item => {
      item.children = []
      childData.find(child => {
        if (child.pid === item._id) {
          item.children.push(child)
        }
      })
    })
    const asyncRoutes = filterAsyncRoutes(levelData)
    commit('SET_ROUTES', asyncRoutes.concat(routes))
    return asyncRoutes
  }
}
function filterAsyncRoutes(routes) {
  const array = []
  routes.forEach((route, index) => {
    const children = route.children
    if (Layout) {
      route.component = Layout
      route.redirect = children && children[0].path
    } else {
      route.component = resolve => require([`${route.path}`], resolve)
    }
    if (children && children.length) {
      filterAsyncRoutes(children)
    }
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
