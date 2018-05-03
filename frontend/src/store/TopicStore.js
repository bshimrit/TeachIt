import topicService from '../services/TopicService.js'

export default {
  strict: true,
  state: {
    topics: [],
    popularTeacherTopics:[],
    topicFilter: '',
  },
  mutations: {
    setTopicFilter(state, { filter }) {
      state.topicFilter = filter;
    },
    deleteTopic(state, { topicId }) {
      state.topics = state.topics.filter(topic => topic.id !== topicId)
    },
    setSelectedTopic(state, { topic }) {
      state.selectedTopic = topic;
    },
    addTopic(state, { topic }) {
      state.topics = [topic, ...state.topics];
    },
    updateTopic(state, { topic }) {
      const topicIdx = state.topics.findIndex(currTopic => currTopic.id === topic.id)
      state.topics.splice(topicIdx, 1, topic)
    },
    setTopics(state, {topics}) {
      state.topics = topics;
    }
  },
  getters: {
    topicsForDisplay(state) {
      console.log(state.topics)
      return state.topics;
    },
    popularTopicsForDisplay(state) {
      return state.popularTeacherTopics;
    }

  },
  actions: {
    loadTopics(store) {
      return topicService.getTopics(store.state.topicFilter)
      .then(topics => {
          store.commit({ type: 'setTopics', topics });
      })
    },
    loadTopic(store, {topicId}) {
      return topicService.getById(topicId)
      .then(topic => {
        store.commit({type: 'setSelectedTopic', topic});
        return topic;
      })
    },
    deleteTopic(store, {topicId}) {
      return topicService.deleteTopic(topicId)
      .then(()=>{
        store.commit({type: 'deleteTopic', topicId});
      })
    },
    saveTopic(store, {topic}) {
      const isEdit = !!topic.id;
      return topicService.saveTopic(topic)
      .then(topic => {
        if (isEdit) store.commit({type: 'updateTopic', topic})
        else store.commit({type: 'addTopic', topic})
        return topic;
      })
    },
    getTopicById(store, {topicId}) {
          return topicService.getTopicById(topicId)
            .then(topic => {
              return topic;
        })   
    },
  }
}
