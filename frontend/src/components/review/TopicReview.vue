<template>
  <div class="topic-review">
    <h5>review-graph</h5>
    <h5>review-filter</h5>
  
    <review-add></review-add>
    <review-list></review-list>
  </div>
</template>

<script>
import ReviewList from "./ReviewList.vue";
import ReviewAdd from "./ReviewAdd.vue";
import FilterCmp from "@/components/FilterCmp.vue";

export default {
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

