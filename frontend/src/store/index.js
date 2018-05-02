import TopicStore from './TopicStore.js'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {},
  modules: {
    TopicStore
  }
  
})
