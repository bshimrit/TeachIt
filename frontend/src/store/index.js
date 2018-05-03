import TopicStore from './TopicStore.js'
import UserStore from './UserStore'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {},
  modules: {
    TopicStore,
    UserStore
  }
  
})
