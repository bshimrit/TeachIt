<template>
    <section>
        <div class="filter">
          <FilterCmp @filtered="filterTeacherTopic" :showExtraSearch="true" />
        </div>
        <div class="blank">
          <FilterCmp @filtered="filterTeacherTopic" :showExtraSearch="true" />
        </div>
      <section class="container search flex">
        <ul class="cards-container flex flex-wrap">
          <li class="card-item" v-for="teacherTopic in teacherTopics" :key="teacherTopic._id">
              <TeacherTopic :teacherTopic="teacherTopic" :showLongDesc="false"></TeacherTopic>
          </li>
        </ul>
        <teacher-map v-if="$mq ==='lg'" class="teacher-map relative"></teacher-map>
      </section> 
    </section>
</template>

<script>
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
      this.$store.commit({type:'setTeacherTopicFilter', filter: JSON.parse(JSON.stringify(filter))})
      this.$store.dispatch({type: 'loadTeacherTopics'});
      var filterUrl = TeacherTopicService.convertFilterToURL(filter);
      this.$router.push('/search/' + filterUrl)
      
    },
    setFilter(){
      var curFilter = TeacherTopicService.emptyTeacherTopicFilter();
      var curQuery = this.$router.history.current.query;
      if (curQuery.text) curFilter.text = curQuery.text;
      if (curQuery.minprice && curQuery.maxprice) curFilter.price = [curQuery.minprice,curQuery.maxprice];
      if (curQuery.topics) curFilter.topics = (Array.isArray(curQuery.topics) ? curQuery.topics : [curQuery.topics]) 
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

.col {
  width: 100%;
  /* height: 50vh; */
}

.cards-container {
  width: 100%;
  padding-left: 0;
}
.teacher-map {
    display: none;
    margin-top: 0.5rem;
    height: calc(90vh - 250px);
}
.blank {
    visibility: hidden
}

  .card-item:not(:last-child) {
    margin-right: 20px;
  }

.filter {
    position: fixed;
    z-index: 5;
    background-color: white;
    width: 100vw
}
.filter-cmp {
    margin: 0 auto;
}

@media(min-width: 750px){
  .col{
    width: initial;
  }
}
@media(min-width: 1024px){
    .cards-container {
      width: 850px;        
    }
    .teacher-map {
        display: inline-block;
        width: calc(100vw - 850px);
}
}
@media(min-width: 1400px){
    .teacher-map {
        width: calc(1400px - 850px);
}
}

</style>
