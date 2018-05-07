<template>
  <section>
    <FilterCmp @filtered="filterTeacherTopic"></FilterCmp>
    <div class="container home">
        <h4 class="tt-header">Most Popular</h4>
        <div class="row">
            <div class="flex col" v-for="teacherTopic in popularTeacherTopics" :key="teacherTopic._id">
              <TeacherTopic :teacherTopic="teacherTopic" :showLongDesc="false"></TeacherTopic>
            </div>
        </div>
        <h4 class="tt-header">Categories</h4>
            <div v-for="popularTopic in popularByTopics" :key="popularTopic.topic._id">
              <p class="tt-header font-bold">{{popularTopic.topic.title}} - {{popularTopic.topic.subtitle}}</p>
              <div class="row">
              <div class="flex col" v-for="teacherTopic in popularTopic.teacherTopics" :key="teacherTopic._id">
                  <TeacherTopic :teacherTopic="teacherTopic" :showLongDesc="false"></TeacherTopic>
              </div>
            </div>
        </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import FilterCmp from '@/components/FilterCmp.vue'
import TeacherTopic from '@/components/topic/TeacherTopicPreview.vue'
import TeacherTopicService from '@/services/TeacherTopicService.js'


export default {
  name: 'home',
  data() {
    return {}
  },
  created(){
    this.$store.commit({type:'setTeacherTopicFilter', filter: TeacherTopicService.emptyTeacherTopicFilter()})
    this.$store.dispatch({type: 'loadPopularTeacherTopics'})
    this.$store.dispatch({type: 'loadPopularTopics'})
  },
  computed: {
    popularTeacherTopics() {     
      return this.$store.getters.popularTeacherTopicsForDisplay;
    },
    teacherTopics(){
      return this.$store.getters.teacherTopicsForDisplay;
    },
    popularByTopics() {
      return this.$store.getters.popularByTopicsForDisplay;
    }
  },
  methods: {
    filterTeacherTopic(filter){
      this.$store.commit({type:'setTeacherTopicFilter', filter: JSON.parse(JSON.stringify(filter))})
      this.$router.push('/search/?text='+ filter.text)
      }
  },
  components: {
    FilterCmp,
    TeacherTopic,
    TeacherTopicService
  },
  
}
</script>
<style scoped>
  .tt-header{
    text-align:left;
    display:block;
  }
  .home {
      margin-top: 150px;
  }
</style>