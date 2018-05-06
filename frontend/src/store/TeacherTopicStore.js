import TeacherTopicService from '../services/TeacherTopicService.js'
import UserService from '../services/UserService.js'
import TopicService from '../services/TopicService.js'
import { resolve } from 'path';

export default {
  strict: true,
  state: {
    teacherTopics: [],
    popularTeacherTopics:[],
    teacherTopicFilter: {text:'',price:[0,500],topics:[]},
    popularByTopics: [],
    MAX_VIEW: 4
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
    setPopularTeacherTopics(state, {popularTeacherTopics}) {
      state.popularTeacherTopics = popularTeacherTopics;
    },
    setPopularByTopics(state, {popularByTopics}) {
      state.popularByTopics = popularByTopics;
    }
  },
  getters: {
    teacherTopicsForDisplay(state) {
      return state.teacherTopics;
    },
    popularTeacherTopicsForDisplay(state) {
      return state.popularTeacherTopics;
    },
    popularByTopicsForDisplay(state) {
      return state.popularByTopics;
    },
    teacherTopicFilter(state) {
        return state.teacherTopicFilter;
    }
    
  },
  actions: {
    loadTeacherTopics(store) {
      return TeacherTopicService.getTeacherTopics(store.state.teacherTopicFilter)
      .then(teacherTopics => {
            store.commit({ type: 'setTeacherTopics', teacherTopics });
        })
    },
    loadPopularTeacherTopics(store) {
      return TeacherTopicService.getTeacherTopics({text:'',price:[],topics:[]})
      .then(popularTeacherTopics => {
          popularTeacherTopics = popularTeacherTopics.slice(0,store.state.MAX_VIEW);
          store.commit({ type: 'setPopularTeacherTopics', popularTeacherTopics });
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
        console.log('ID in store:', teacherTopicId);
        
          return TeacherTopicService.getTeacherTopicById(teacherTopicId)
            .then(teacherTopic => {
              return teacherTopic;
        })   
    },
    getTopicsByTeacherId(store, {teacherId}) {
      return TeacherTopicService.getTopicsByTeacherId(teacherId)
            .then(teacherTopics => {
              return teacherTopics;
        })
    },
    loadPopularTopics(store) {
      return TeacherTopicService.getPopularTopics()
          .then(popularTopics => {
            if (popularByTopics) popularByTopics = popularByTopics.slice(0,store.state.MAX_VIEW);
            var popularByTopics = popularTopics.map(popularTopic => {
              return {topic: popularTopic[0].topic,teacherTopics:popularTopic}
            })
            store.commit({ type: 'setPopularByTopics', popularByTopics });
        })
    }
  }
}
