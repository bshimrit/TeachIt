<template>
    <section class="search container">
      <FilterCmp @filtered="filterTeacherTopic" :showExtraSearch="true" class="fix-filter"/>
        Sort: by topic | by price<br>
        <div class="map-list">
            <!-- <teacher-list :topics="topics" class="teacher-list"></teacher-list> -->
            <div class="cards">
                <div class="row">
                    <div class="col s12 m4" v-for="teacherTopic in teacherTopics" :key="teacherTopic._id">
                        <TeacherTopic :teacherTopic="teacherTopic" :showLongDesc="false"></TeacherTopic>
                    </div>
                </div>
            </div>   
            <teacher-map class="teacher-map relative"></teacher-map>
        </div>
    </section> 
</template>

<script>
// import TeacherList from "@/components/Teacher/TeacherList.vue";
import FilterCmp from '@/components/FilterCmp.vue'
import TeacherTopic from '@/components/topic/TeacherTopicPreview.vue'
import TeacherMap from "@/components/Teacher/TeacherMap.vue";
import TeacherTopicService from '@/services/TeacherTopicService.js'


export default {
  created(){
    this.$store.commit({type:'setTeacherTopicFilter', filter: this.setFilter()})
    this.$store.dispatch({type: 'loadTeacherTopics'})
  },
  data(){
    return {
    }
  },
  computed: {
    teacherTopics(){
      return this.$store.getters.teacherTopicsForDisplay;
    }
  },
  methods: {
    filterTeacherTopic(filter){
      console.log(filter)
      this.$store.commit({type:'setTeacherTopicFilter', filter: JSON.parse(JSON.stringify(filter))})
      this.$store.dispatch({type: 'loadTeacherTopics'});
    },
    setFilter(){
      var curFilter = TeacherTopicService.emptyTeacherTopic();
      var curQuery = this.$router.history.current.query;
      if (curQuery.text) curFilter = {text: curQuery.text};
      if (curQuery.minprice && curQuery.maxprice) curFilter.price = [curQuery.minprice,curQuery.maxprice];
      if (curQuery.topics) curFilter.topics.push(curQuery.topics);
      console.log(curFilter)
      return curFilter;
    }
  },
  components: {
    FilterCmp,
    TeacherTopic,
    TeacherMap
  }
};
</script>

<style scoped>
.map-list {
    display: flex
}
.teacher-list {
  display: inline-block;
  width: 70%;
}
.teacher-map {
    margin-top: 0.5rem;
    display: inline-block;
    width: 30%;
}
.fix-filter {
    position: fixed;
    top: 100px;
    background-color: white;
    z-index: 2;
    left: 0;
}
.search {
    margin-top: 110px
}
</style>
