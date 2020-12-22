import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getter'
import user from './modules/user'
import menu from './modules/menu'
import global from './modules/global'
Vue.use(Vuex)
export default new Vuex.Store({
  getters,
  modules: {
    user,
    menu,
    global
  }
})
