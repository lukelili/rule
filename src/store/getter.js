import store from './index'
const getters = {
  routes: state => state.menu.routes,
  addroutes: state => state.menu.addroutes,
  roles: async state => {
    const roles = state.global.roles
    if (roles && roles.length) {
      return roles
    }
    return await store.dispatch('global/getData', { key: 'roles', api: '/role/filter' })
  }
}

export default getters
