const getters = {
  routes: state => {
    const routes = state.menu.routes
    return routes.filter(item => !item.hidden)
  },
  addroutes: state => state.menu.addroutes
}

export default getters
