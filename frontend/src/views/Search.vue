<template>
    <section class="search">
        Filter: by topic | by price <br>
        Sort: by topic | by price<br>
        <h4>Teachers is Tel Aviv:</h4>
        <div class="map-list">
            <teacher-list :topics="topics" class="teacher-list"></teacher-list>
            <teacher-map class="teacher-map"></teacher-map>
        </div>
    </section> 
</template>

<script>
import TeacherList from "@/components/Teacher/TeacherList.vue";
import TeacherMap from "@/components/Teacher/TeacherMap.vue";

export default {
  computed: {
    topics() {
      return this.$store.getters.topicsForDisplay;
    }
  },
  components: {
    TeacherList,
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
