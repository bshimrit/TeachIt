<template>
  <div class="topic-review">
    <h3>review-graph</h3>
    <h3>review-filter</h3>
    <filter-cmp></filter-cmp>
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
div {
  border: 1px black solid;
}
</style>

