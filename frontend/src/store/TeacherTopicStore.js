import TeacherTopicService from '../services/TeacherTopicService.js'
import UserService from '../services/UserService.js'
import TopicService from '../services/TopicService.js'
import { resolve } from 'path';

export default {
  strict: true,
  state: {
    teacherTopics: [],
    popularTeacherTopics:[],
    teacherTopicFilter: '',
    MAX_POPULAR: 4
  },
  mutations: {
    setTeacherTopicFilter(state, { filter }) {
      state.teacherTopicFilter = filter;
    },
    deleteTeacherTopic(state, { teacherTopicId }) {
      state.teacherTopics = state.teacherTopics.filter(teacherTopic => teacherTopic.id !== teacherTopicId)
    },
    setSelectedTeacherTopic(state, { teacherTopic }) {
      state.selectedTeacherTopic = teacherTopic;
    },
    addTeacherTopic(state, { teacherTopic }) {
      state.teacherTopics = [teacherTopic, ...state.teacherTopics];
    },
    updateTeacherTopic(state, { teacherTopic }) {
      const teacherTopicIdx = state.teacherTopics.findIndex(currTeacherTopic => currTeacherTopic.id === teacherTopic.id)
      state.teacherTopics.splice(teacherTopicIdx, 1, teacherTopic)
    },
    setTeacherTopics(state, {teacherTopics}) {
      state.teacherTopics = teacherTopics;
    },
    setPopularTeacherTopics(state, {extendedPTT}) {
      state.popularTeacherTopics = extendedPTT;
    }
  },
  getters: {
    teacherTopicsForDisplay(state) {
      return state.teacherTopics;
    },
    popularTeacherTopicsForDisplay(state) {
      return state.popularTeacherTopics;
    }
    
  },
  actions: {
    loadTeacherTopics(store) {
      return TeacherTopicService.getTeacherTopics(store.state.teacherTopicFilter)
      .then(teacherTopics => {
        store.commit({ type: 'setTeacherTopics', teacherTopics });
      })
    },
    loadTeacherTopics(store) {
      return TeacherTopicService.getTeacherTopics(store.state.teacherTopicFilter)
      .then(teacherTopics => {
        store.commit({ type: 'setTeacherTopics', teacherTopics });
      })
    },
    loadPopularTeacherTopics(store) {
      var extendedPTT = [];
      return TeacherTopicService.getTeacherTopics(store.state.teacherTopicFilter)
      .then(popularTeacherTopics => {
          popularTeacherTopics = popularTeacherTopics.slice(0,store.state.MAX_POPULAR);
          var pTTPrms = popularTeacherTopics.map(popularTeacherTopic => {
            return UserService.getUserById(popularTeacherTopic.teacherId)
              .then(user => {
                popularTeacherTopic.teacher = user;
                return TopicService.getTopicById(popularTeacherTopic.topicId)
                  .then(topic => {
                      popularTeacherTopic.topic = topic;
                      extendedPTT.push(popularTeacherTopic)
                  })
                })
              })
            return Promise.all(pTTPrms);
          }).then((pTTPrms) => {
            store.commit({ type: 'setPopularTeacherTopics', extendedPTT });
        })
    }, 
     deleteTeacherTopic(store, {teacherTopicId}) {
      return TeacherTopicService.deleteTeacherTopic(teacherTopicId)
      .then(()=>{
        store.commit({type: 'deleteTeacherTopic', teacherTopicId});
      })
    },

    saveTeacherTopic(store, {teacherTopic}) {
      const isEdit = !!teacherTopic.id;
      return TeacherTopicService.saveTeacherTopic(teacherTopic)
      .then(teacherTopic => {
        if (isEdit) store.commit({type: 'updateTeacherTopic', teacherTopic})
        else store.commit({type: 'addTeacherTopic', teacherTopic})
        return teacherTopic;
      })
    },
    getTeacherTopicById(store, {teacherTopicId}) {
          return TeacherTopicService.getTeacherTopicById(teacherTopicId)
            .then(teacherTopic => {
              return teacherTopic;
        })   
    },
  }
}
