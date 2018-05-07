<template>
  <div class="topic-review">
    <h5>review-graph</h5>
    <review-add @addedReview="loadReviews" :teacherId="teacherId"></review-add>
    <review-list :reviews="reviews"></review-list>
  </div>
</template>

<script>
import ReviewList from "./ReviewList.vue";
import ReviewAdd from "./ReviewAdd.vue";
import FilterCmp from "@/components/FilterCmp.vue";

export default {
    name: 'TopicReview',
    props: ['teacherId','teacherTopicId'],
  created(){
      this.loadReviews()
    },
  data() {
    return {
      }
  },
  computed:{
    reviews() {
      return this.$store.getters.reviewsForDisplay
    }
  },
  methods: {
    loadReviews(){
      if (this.teacherTopicId) {
        this.$store.dispatch({type: 'loadReviewsByTeacherTopicId', teacherTopicId: this.teacherTopicId})
      } else {
        this.$store.dispatch({type: 'loadReviewsByTeacherId', teacherId: this.teacherId})
        
      }
    }
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

