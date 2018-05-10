<template>
  <section>
    <div class="hero flex justify-center align-center flex-column">
      <div class="comp-name">
        <h1>TeachIt</h1>
      </div>
        <h5>Find the right teacher for you</h5>
      <FilterCmp @filtered="filterTeacherTopic"></FilterCmp>
    </div>
    <div class="container header-margin">
        <h4 class="tt-header">Most Popular</h4>
        <ul class="cards-container flex flex-wrap">
          <li class="card-item" v-for="teacherTopic in popularTeacherTopics" :key="teacherTopic._id">
            <TeacherTopic :teacherTopic="teacherTopic" :showLongDesc="false"></TeacherTopic>
          </li>
        </ul>
        <h4 class="tt-header">Categories</h4>
            <div v-for="popularTopic in popularByTopics" :key="popularTopic.topic._id">
              <p class="tt-header font-bold">{{popularTopic.topic.title}}</p>
              <ul class="cards-container flex flex-wrap">
                <li class="card-item" v-for="teacherTopic in popularTopic.teacherTopics" :key="teacherTopic._id">
                  <TeacherTopic :teacherTopic="teacherTopic" :showLongDesc="false"></TeacherTopic>
                </li>
              </ul>
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
    margin-bottom: 0px;
  }
  .home {
      margin-top: 150px;
  }
  .header-margin {
      margin-top: 50px;
  }
  .hero {
      width: 100%;
      height: 80vh;
      background-image: url('https://www.tes.com/tesv2/files/styles/news_article_ml_x2/public/news-images/class_3_6.jpg?itok=8FXsn46X');
      background-repeat: no-repeat;
      background-size: cover;
      /* font-family: 'MontBold', sans-serif; */
      /* background-position-y: 80% */
      font-family: 'ArialBold'
  }
  h1 {
    -webkit-text-stroke: 2px black;
    text-shadow: 
        -1px -1px 0 black, 
        1px -1px 0 black, 
        -1px 1px 0 black, 
        1px 1px 0 black;
    color: #fff7ca;
  }
  h5 {
    text-shadow: 
        -1px -1px 0 black, 
        1px -1px 0 black, 
        -1px 1px 0 black, 
        1px 1px 0 black;
    color: #fff7ca;
    font-family: 'MontBold'
  }

  .comp-name {
    text-align: left;
    margin: 0;
  }

  .comp-name h1{
    text-align: left;
    margin: 0;
  }
</style>