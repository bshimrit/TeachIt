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
        <slick ref="slick" :options="slickOptions">    
          <div  class="card-item" v-for="teacherTopic in popularTeacherTopics" :key="teacherTopic._id">
            <TeacherTopic :teacherTopic="teacherTopic" :showLongDesc="false"></TeacherTopic>
          </div>
        </slick>
        <h4 class="tt-header">Categories</h4>
            <div v-for="popularTopic in popularByTopics" :key="popularTopic.topic._id">
              <p class="tt-header font-bold">{{popularTopic.topic.title}}</p>
              <!-- <ul class="cards-container flex flex-wrap">
                <li class="card-item" v-for="teacherTopic in popularTopic.teacherTopics" :key="teacherTopic._id">
                  <TeacherTopic :teacherTopic="teacherTopic" :showLongDesc="false"></TeacherTopic>
                </li>
              </ul> -->
              <slick ref="slick" :options="slickOptions">    
                <div class="card-item" v-for="teacherTopic in popularTopic.teacherTopics" :key="teacherTopic._id">
                  <TeacherTopic :teacherTopic="teacherTopic" :showLongDesc="false"></TeacherTopic>
                </div>                
              </slick>
            </div>
      </div>
  </section>
</template>

<script>
// @ is an alias to /src
import FilterCmp from '@/components/FilterCmp.vue'
import TeacherTopic from '@/components/topic/TeacherTopicPreview.vue'
import TeacherTopicService from '@/services/TeacherTopicService.js'
import Slick from 'vue-slick';


export default {
  name: 'home',
  data() {
    return {
      slickOptions: {
        slidesToShow: 4,
        centerMode: true,
        // Any other options that can be got from plugin documentation
            },
    }
  },
  created(){
    this.$store.commit({type:'setTeacherTopicFilter', filter: TeacherTopicService.emptyTeacherTopicFilter()})
    this.$store.dispatch({type: 'loadPopularTeacherTopics'}).then(() =>{
        this.$refs.slick.reSlick();
    })
    this.$store.dispatch({type: 'loadPopularTopics'}).then(() => {
      // this.$refs.slickA.reSlick();
    })
  },
  // mounted() {
  //   this.$refs.slick.reSlick();
  // },
  // updated() {
  //   this.$refs.slick.reSlick();
  // },
  computed: {
    popularTeacherTopics() {    
      console.log(this.$store.getters.popularTeacherTopicsForDisplay) 
      return this.$store.getters.popularTeacherTopicsForDisplay;
    },
    popularByTopics() {
      return this.$store.getters.popularByTopicsForDisplay;
    }
  },
  methods: {
    filterTeacherTopic(filter){
      this.$store.commit({type:'setTeacherTopicFilter', filter: JSON.parse(JSON.stringify(filter))})
      this.$router.push('/search/?text='+ filter.text)
      },
    next() {
        this.$refs.slick.next();
    },
    prev() {
      this.$refs.slick.prev();
    },

    reInit() {
        // Helpful if you have to deal with v-for to update dynamic lists
        this.$nextTick(() => {
            this.$refs.slick.reSlick();
        });
    },
  },
  components: {
    FilterCmp,
    TeacherTopic,
    TeacherTopicService,
    Slick
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
      background-image: url('https://images.pexels.com/photos/355988/pexels-photo-355988.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
      background-repeat: no-repeat;
      background-size: cover;
      font-family: 'MontBlack'
  }
  h1 {
    -webkit-text-stroke: 2px black;
    text-shadow: 
        -1px -1px 0 black, 
        1px -1px 0 black, 
        -1px 1px 0 black, 
        1px 1px 0 black;
    color: #f9e759;
  }
  h5 {
    text-shadow: 
        -1px -1px 0 black, 
        1px -1px 0 black, 
        -1px 1px 0 black, 
        1px 1px 0 black;
    color: #f9e759;
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

  .card-item {
    width: 250px;
  }



</style>