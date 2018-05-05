<template>
    <section class="search container">
      <FilterCmp @filtered="filterTeacherTopic" :showExtraSearch="true"/>
        Sort: by topic | by price<br>
        <div class="map-list">
            <!-- <teacher-list :topics="topics" class="teacher-list"></teacher-list> -->
            <div class="row">
              <div class="col s12 m3" v-for="teacherTopic in teacherTopics" :key="teacherTopic._id">
                  <TeacherTopic :teacherTopic="teacherTopic" :showLongDesc="false"></TeacherTopic>
              </div>
            </div>   
            <teacher-map class="teacher-map"></teacher-map>
        </div>
    </section> 
</template>

<script>
// import TeacherList from "@/components/Teacher/TeacherList.vue";
import FilterCmp from '@/components/FilterCmp.vue'
import TeacherTopic from '@/components/topic/TeacherTopicPreview.vue'
import TeacherMap from "@/components/Teacher/TeacherMap.vue";

export default {
  created(){
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
    this.$store.commit({type:'setTeacherTopicFilter', filter: JSON.parse(JSON.stringify(filter))})
    this.$store.dispatch({type: 'loadTeacherTopics'});
    }
  },
  components: {
    FilterCmp,
    TeacherTopic,
    TeacherMap
  }
};
</script>

<style>
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
</style>
