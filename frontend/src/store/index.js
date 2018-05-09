import TopicStore from './TopicStore.js'
import UserStore from './UserStore'
import TeacherTopicStore from './TeacherTopicStore'
import ReviewStore from './ReviewStore'
import ChatStore from './ChatStore'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {},
  modules: {
    TopicStore,
    UserStore,
    TeacherTopicStore,
    ReviewStore,
    ChatStore
  }
  
})
