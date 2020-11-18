import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getter'
import user from './modules/user'
import permission from './modules/permission'
import global from './modules/global'
import event from './modules/event'
import data from './modules/data'

Vue.use(Vuex)
export default new Vuex.Store({
  getters,
  modules: {
    user,
    permission,
    global,
    event,
    data
  }
})
