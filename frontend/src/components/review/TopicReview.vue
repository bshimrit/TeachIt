<template>
  <div class="topic-review container">
    <h5>review-graph</h5>
  
    <review-add :userId="userId"></review-add>
    <review-list :userId="userId"></review-list>
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

