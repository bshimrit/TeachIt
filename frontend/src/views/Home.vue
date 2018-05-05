<template>
  <div class="container home">
    <FilterCmp @filtered="filterTeacherTopic"></FilterCmp>
      <h3 class="tt-header">Most Popular</h3>
      <div class="row">
          <div class="col s12 m3" v-for="teacherTopic in popularTeacherTopics" :key="teacherTopic._id">
            <TeacherTopic :teacherTopic="teacherTopic" :showLongDesc="false"></TeacherTopic>
          </div>
      </div>        
      <h2 class="tt-header">Categories</h2>
          <div v-for="category in categoryTeacherTopics" :key="category.topic">
            <h4 class="tt-header">{{category.topic}}</h4>
            <div class="row">
            <div class="col s12 m3" v-for="teacherTopic in category.teacherTopics" :key="teacherTopic._id">
                <!-- <TeacherTopic :teacherTopic="teacherTopic" :showLongDesc="false"></TeacherTopic> -->
            </div>
          </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import FilterCmp from '@/components/FilterCmp.vue'
import TeacherTopic from '@/components/topic/TeacherTopicPreview.vue'

export default {
  name: 'home',
  data() {
    return {}
  },
  created(){
    this.$store.dispatch({type: 'loadPopularTeacherTopics'})
    this.$store.dispatch({type: 'loadTeacherTopics'})
    this.$store.commit({type:'setTeacherTopicFilter', filter: {text:'',price:[0,10],topics:[]}})
  },
  computed: {
    popularTeacherTopics() {     
      return this.$store.getters.popularTeacherTopicsForDisplay;
    },
    teacherTopics(){
      return this.$store.getters.teacherTopicsForDisplay;
    },
    categoryTeacherTopics() {
      console.log(this.$store.getters.teacherTopicsForDisplay)
      return [
        {topic: 'English', 
          teacherTopics: [
            {_id: '1', teacher: 'firstTeacher', rating: 3, teacherImg:'./img/users/user1.jpg', topic: 'English',shortDes: 'English is the best', longDes: 'English is the best', topicImg:'./img/topics/topic4.jpg'},
            {_id: '3', teacher: 'secondTeacher', rating: 3, teacherImg:'./img/users/user2.jpg', topic: 'English',shortDes: 'English is the best', longDes: 'English is the best', topicImg:'./img/topics/topic5.jpg'}
          ]},
          {topic: 'Spanish', teacherTopics: [{_id: '2', teacher: 'firstTeacher', rating: 4, teacherImg:'./img/users/user1.jpg', topic: 'Spanish',shortDes: 'Spanish is the best', longDes: 'English is the best', topicImg:'./img/topics/topic3.jpg'}]},
          {topic: 'Algebra', teacherTopics: [{_id: '4', teacher: 'thirdTeacher', rating: 5, teacherImg:'./img/users/user3.jpg', topic: 'Algebra',shortDes: 'Algebra is the best', longDes: 'English is the best', topicImg:'./img/topics/topic1.jpg'}]}
          ]
    }
  },
  methods: {
    filterTeacherTopic(filter){
      this.$store.commit({type:'setTeacherTopicFilter', filter: JSON.parse(JSON.stringify(filter))})
      this.$router.push('/search/?text='+filter.text)
      }
  },
  components: {
    FilterCmp,
    TeacherTopic
  },
  
}
</script>
<style scoped>
.tt-header{
  text-align:left;
  display:block;
  /* margin-left: 20px; */
}
</style>