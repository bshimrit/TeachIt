<template>
  <div class="topic-review container">
    <h5>review-graph</h5>
<<<<<<< HEAD
    <h5>review-filter</h5>
    <review-add :userId="userId"></review-add>
    <review-list :userId="userId"></review-list>
=======
    <!-- <h5>review-filter</h5> -->
    <review-add></review-add>
    <review-list></review-list>
>>>>>>> 049b11870efabdbdc950a90b7772a6595f92c70f
  </div>
</template>

<script>
import ReviewList from "./ReviewList.vue";
import ReviewAdd from "./ReviewAdd.vue";
import FilterCmp from "@/components/FilterCmp.vue";

export default {
    name: 'TopicReview',
    props: ['userId'],
  data() {
    return {};
  },
  components: {
    ReviewList,
    ReviewAdd,
    FilterCmp
  }
};
</script>


<style scoped>
/* div {
  border: 1px black solid;
} */
</style>

